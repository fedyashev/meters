const createError = require('http-errors');
const { Report, Inspector, Consumer, Place, Meter, Data, Sign, sequelize } = require('../models');
//const PdfDocument = require('pdfkit');
//const fs = require('fs');
//const { prettyDate } = require('../lib/helpers');
const pdfTemplates = require('../lib/pdf-templates');
const email = require('../lib/email-sender');

//const nodemailer = require('nodemailer');

//const email = require('../config/email.json');

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
    sign: report.Sign ? { id: report.Sign.id, filename: report.Sign.filename } : null
});

const queryIncludes = [
    { model: Inspector },
    { model: Consumer },
    { model: Place },
    { model: Meter },
    { model: Data, as: 'LastData' },
    { model: Data, as: 'CurrentData' },
    { model: Sign, attributes: ['id', 'filename'] }
];

const queryIncludesWithSign = [
    { model: Inspector },
    { model: Consumer },
    { model: Place },
    { model: Meter },
    { model: Data, as: 'LastData' },
    { model: Data, as: 'CurrentData' },
    { model: Sign }
];

///////////////////////////////////////////////////////////////////////////////

module.exports.count = async (req, res, next) => {
    try {
        const {inspector_id} = req.query;
        console.log(typeof inspector_id, inspector_id);
        let count = null;
        if (inspector_id) {
            count = await Report.count({where: {InspectorId: inspector_id}});
        }
        else {
            count = await Report.count();
        }
        return res.json({ count });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getAll = async (req, res, next) => {
    try {
        const { inspector_id, limit, offset } = req.query;
        const lim = Number(limit);
        const off = Number(offset);

        let reports = null;
        const withPages = !isNaN(lim) && !isNaN(off) && off >= 0 && lim > 0;
        if (inspector_id && withPages) {
            reports = await Report
                .findAll({
                    where: { InspectorId: inspector_id },
                    offset: off,
                    limit: lim,
                    order: [['id', 'DESC']],
                    include: queryIncludes
                })
                .map(reportMapper);
        }
        else if (inspector_id && !withPages) {
            reports = await Report
                .findAll({
                    where: { InspectorId: inspector_id },
                    order: [['id', 'DESC']],
                    include: queryIncludes
                })
                .map(reportMapper);
        }
        else if (!inspector_id && withPages) {
            reports = await Report
                .findAll({
                    offset: off,
                    limit: lim,
                    order: [['id', 'DESC']],
                    include: queryIncludes
                })
                .map(reportMapper);
        }
        else {
            reports = await Report
                .findAll({
                    order: [['id', 'DESC']],
                    include: queryIncludes
                })
                .map(reportMapper);
        };
        return res.json(reports);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const { inspector_id, place_id, sign_id, date, value } = req.body;
        if (!inspector_id || !place_id || !date || !value) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const inspector = await Inspector.findOne({ where: { id: inspector_id } });
        if (!inspector) {
            return next(createError(404, 'Inspector not found'));
        }

        let meter = null;
        let consumer = null;
        let sign = null;
        const place = await Place.findOne({ where: { id: place_id } });
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
                where: { id: sign_id },
                attrubutes: ['id']
            });
            if (place.isSignNeed && !sign) {
                return next(createError(404, 'Sign not found'));
            }
        }
        else {
            return next(createError(404, 'Place not found'));
        }

        const existsData = await Data.findAll({ where: { MeterId: meter.id, date: date } });
        if (existsData.length > 0) {
            return next(createError(500, 'Data already exists'));
        }

        const lastData = await Data.findAll({
            where: { MeterId: meter.id },
            order: [['date', 'desc']],
            limit: 1,
        });

        let report = null;
        let currentData = null;
        try {
            let result = await sequelize.transaction(async (t) => {
                currentData = await Data.create({ MeterId: meter.id, date, value }, { transaction: t });
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
        const { report_id } = req.params;
        if (!report_id) {
            next(createError(400, 'Incorrect report id'));
        }

        const report = await Report.findOne({ where: { id: report_id }, include: queryIncludes });
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
        const { report_id } = req.params;

        if (!report_id) {
            return next(createError(400, 'Incorrect report id'));
        }

        const report = await Report.findOne({ where: { id: report_id }, include: queryIncludesWithSign });

        if (!report) {
            return next(createError(404, 'Report not found'));
        }

        const doc = pdfTemplates.report(report);

        res.set('Content-disposition', `attachment; filename=report-${Date.now()}.pdf`);
        res.set('Content-Type', 'application/pdf');

        doc.pipe(res);
        doc.end();

    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.sendEmailById = async (req, res, next) => {
    try {
        const { report_id } = req.params;

        if (!report_id) {
            return next(createError(400, 'Incorrect report id'));
        }

        const report = await Report.findOne({ where: { id: report_id }, include: queryIncludesWithSign });

        if (!report) {
            return next(createError(404, 'Report not found'));
        }

        const doc = pdfTemplates.report(report);
        email.sendEmail(report, doc)
            .then(result => {
                console.log(result);
                return res.json({ done: true });
            })
            .catch(err => {
                return next(createError(500, err.message));
            });

        doc.end();
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        //return next(createError(501, 'Report update not implemented'));
        const { value } = req.body;
        const { report_id } = req.params;
        if (!value || !report_id) {
            return next(createError(400, 'Incorrect input parameters'));
        }
        const report = await Report.findOne({ where: { id: report_id }, include: [{ model: Data, as: 'CurrentData' }] });
        const [count, ...rest] = await Data.update({ value }, { where: { id: report.CurrentData.id } });
        if (!count) {
            return next(createError(500, 'Failed to update current data'));
        }

        return res.json({ done: true });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        const { report_id } = req.params;
        if (!report_id) {
            next(createError(400, 'Incorrect report id'));
        };

        let countReport;
        let countData;
        let countSign;
        try {
            let result = await sequelize.transaction(async (t) => {
                const report = await Report.findOne({ where: { id: report_id } });
                if (report && report.CurrentDataId) {
                    countData = await Data.destroy({ where: { id: report.CurrentDataId } }, { transaction: t });
                }
                if (report && report.SignId) {
                    countSign = await Sign.destroy({ where: { id: report.SignId } }, { transaction: t });
                }
                countReport = await Report.destroy({ where: { id: report.id } }, { transaction: t });
            });
        } catch (err) {
            next(createError(500, 'Failed to delete a report'));
        }

        if (!countReport) {
            next(createError(500, 'Failed to delete a report'));
        }

        return res.json({ done: true });
    } catch (err) {
        return next(createError(500, err.message));
    }
};