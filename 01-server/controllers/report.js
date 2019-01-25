const createError = require('http-errors');
const {Report, Inspector, Consumer, Place, Meter, Data, Sign, sequelize} = require('../models');
const PdfDocument = require('pdfkit');
const fs = require('fs');

const reportMapper = report => ({
    id: report.id,
    date: report.date,
    inspector: {
        id: report.Inspector.id,
        name: report.Inspector.name
    },
    consumer: {
        id: report.Consumer.id,
        name: report.Consumer.name,
        email: report.Consumer.email
    },
    place: {
        id: report.Place.id,
        name: report.Place.name,
    },
    meter: {
        id: report.Meter.id,
        number: report.Meter.number
    },
    last_data: report.LastData ?
        {
            id: report.LastData.id,
            date: report.LastData.date,
            value: report.LastData.value
        } : null,
    current_data: {
        id: report.CurrentData.id,
        date: report.CurrentData.date,
        value: report.CurrentData.value
    },
    sign: report.Sign ? {id: report.Sign.id, filename: report.Sign.filename} : null
});

const queryIncludes = [
    {model: Inspector},
    {model: Consumer},
    {model: Place},
    {model: Meter},
    {model: Data, as: 'LastData'},
    {model: Data, as: 'CurrentData'},
    {model: Sign, attributes: ['id', 'filename']}
];

///////////////////////////////////////////////////////////////////////////////

module.exports.getAll = async (req, res, next) => {
    try {
        const {inspector_id} = req.query;
        let reports = null;

        if (inspector_id) {
            reports = await Report
                .findAll({where: {InspectorId: inspector_id}, include: queryIncludes})
                .map(reportMapper);
        }
        else {
            // All reports
            reports = await Report
                .findAll({include: queryIncludes})
                .map(reportMapper);
        };
        return res.json(reports);
    } catch (err) {
        return next(createError(500, err.message));        
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const {inspector_id, place_id, sign_id, date, value} = req.body;
        if (!inspector_id || !place_id || !date || !value) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const inspector = await Inspector.findOne({where: {id: inspector_id}});
        if (!inspector) {
            return next(createError(404, 'Inspector not found'));
        }

        let meter = null;
        let consumer = null;
        let sign = null;
        const place = await Place.findOne({where: {id: place_id}});
        if (place) {
            meter = await place.getMeter();
            if (!meter) {
                return next(createError(404, 'Meter not found'));
            }
            consumer = await place.getConsumer();
            if (!consumer) {
                return next(createError(404, 'Consumer not found'));
            }
            sign = await Sign.findOne({
                where: {id: sign_id},
                attrubutes: ['id']
            });
            if (place.isSignNeed && !sign) {
                return next(createError(404, 'Sign not found'));
            }
        }
        else {
            return next(createError(404, 'Place not found'));
        }

        const existsData = await Data.findAll({where: {MeterId: meter.id, date: date}});
        if (existsData.length > 0) {
            return next(createError(500, 'Data already exists'));
        }

        const lastData = await Data.findAll({
            where: {MeterId: meter.id},
            order: [['date', 'desc']],
            limit: 1,
        });

        let report = null;
        let currentData = null;
        try {
            let result = await sequelize.transaction(async (t) => {
                currentData = await Data.create({MeterId: meter.id, date, value}, {transaction: t});
                report = await Report.create({
                    date: date,
                    InspectorId: inspector.id,
                    ConsumerId: consumer.id,
                    MeterId: meter.id,
                    PlaceId: place.id,
                    LastDataId: lastData.length > 0 ? lastData[0].id : null,
                    CurrentDataId: currentData.id,
                    SignId: place.isSignNeed ? sign.id : null
                },
                {
                    transaction: t
                });
            })
        } catch (err) {
            return next(createError(500, err.message));
        }

        return res.json(report);

    } catch (err) {
        return next(createError(500, err.message));        
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const {report_id} = req.params;
        if (!report_id) {
            next(createError(400, 'Incorrect report id'));
        }

        const report = await Report.findOne({where: {id: report_id}, include: queryIncludes});
        if (!report) {
            return next(createError(404, 'Report not found'));
        }

        return res.json(reportMapper(report));
    } catch (err) {
        return next(createError(500, err.message));        
    }
};

module.exports.getByIdPdf = async (req, res, next) => {
    try {
        const {report_id} = req.params;
        
        if (!report_id) {
            return next(createError(400, 'Incorrect report id'));
        }
        
        const report = await Report.findOne({where: {id: report_id}, include: queryIncludes});
        
        if (!report) {
            return next(createError(404, 'Report not found'));
        }

        const doc = new PdfDocument({});
        doc.registerFont('Roboto', 'fonts/Roboto/Roboto-Regular.ttf');
        doc.font('Roboto');
        doc.text(`Дата: ${report.date.toLocaleString()}`);
        doc.text(`Инспектор: ${report.Inspector.name}`);
        doc.text(`Потребитель: ${report.Consumer.name}`);
        doc.text(`Место: ${report.Place.name}`);
        doc.text(`Счетчик: ${report.Meter.number}`);
        doc.text(` `);
        doc.text(`Предыдущие показания:`);
        doc.text(`   дата: ${report.LastData ? report.LastData.date.toLocaleString() : '---'}`);
        doc.text(`   показания: ${report.LastData ? report.LastData.value : '---'}`);
        doc.text(` `);
        doc.text(`Текущие показания:`);
        doc.text(`   дата: ${report.CurrentData ? report.CurrentData.date.toLocaleString() : '---'}`);
        doc.text(`   показания: ${report.CurrentData ? report.CurrentData.value : '---'}`);
        doc.text(` `);
        const w = report.LastData ? report.CurrentData.value - report.LastData.value : report.CurrentData.value;
        doc.text(`Потребление за период: ${w}`);
        
        res.set('Content-disposition', `attachment; filename=report-${Date.now()}.pdf`);
        res.set('Content-Type', 'application/pdf');

        doc.pipe(res);
        doc.end();

    } catch (err) {
        return next(createError(500, err.message));        
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        //return next(createError(501, 'Report update not implemented'));
        const {value} = req.body;
        const {report_id} = req.params;
        if (!value || !report_id) {
            return next(createError(400, 'Incorrect input parameters'));
        }
        const report = await Report.findOne({where: {id: report_id}, include: [{model: Data, as: 'CurrentData'}]});
        const [count, ...rest] = await Data.update({value}, {where: {id: report.CurrentData.id}});
        if (!count) {
            return next(createError(500, 'Failed to update current data'));
        }

        return res.json({done: true});
    } catch (err) {
        return next(createError(500, err.message));        
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        const {report_id} = req.params;
        if (!report_id) {
            next(createError(400, 'Incorrect report id'));
        };
        const count = await Report.destroy({where: {id: report_id}});
        if (!count) {
            return next(createError(500, 'Failed to delete a report'));
        };
        return res.json({done: true});
    } catch (err) {
        return next(createError(500, err.message));        
    }
};