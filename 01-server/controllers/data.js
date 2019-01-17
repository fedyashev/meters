const createError = require('http-errors');
const {Data, Meter} = require('../models');
const validator = require('validator');

module.exports.getAll = async (req, res, next) => {
    try {
        const datas = await Data.findAll({
            include: [
                {model: Meter}
            ]
        });
        return res.json(datas);
    } catch (err) {
        return next(createError(500, err.message));    
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const {date, value, meter_id} = req.body;
        if (!date || !value || !meter_id) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const existsMeter = await Meter.findOne({where: {id: meter_id}});
        if (!existsMeter) {
            return next(createError(400, 'Meter is not exists'));
        }

        const existsData = await Data.findAll({where: {MeterId: meter_id, date: date}});
        if (existsData.length > 0) {
            return next(createError('Data already exists'));
        }

        const isValid = 
            !isNaN(Date.parse(date)) &&
            !Number.isNaN(value) && value >= 0;

        if (!isValid) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const data = await Data.create({date, value, MeterId: meter_id});

        if (!data) {
            return next(createError(500, 'Failed to create a data'));
        }

        return res.json({
            id: data.id,
            date: data.date,
            value: data.value,
            meter: {
                id: existsMeter.id,
                number: existsMeter.number
            }
        });
    } catch (err) {
        return next(createError(500, err.message));    
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const {data_id} = req.params;
        if (!data_id) {
            return next(createError(400, 'Incorrect data id'));
        }
        const data = await Data.findOne({
            where: {
                id: data_id
            },
            include: [
                {model: Meter}
            ]
        });
        if (!data) {
            return next(createError(404, 'Data not found'));
        }
        return res.json({
            id: data.id,
            date: data.date,
            meter: {
                id: data.Meter.id,
                number: data.Meter.number
            }
        });
    } catch (err) {
        return next(createError(500, err.message));    
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        const {data_id} = req.params;
        const {date, value, meter_id} = req.body;

        if (!data_id || !date || !value || !meter_id) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const isValid = 
            !isNaN(Date.parse(date)) &&
            !Number.isNaN(value) && value >= 0;


        if (!isValid) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const existsMeter = await Meter.findOne({where: {id: meter_id}});

        if (!existsMeter) {
            return next(createError(400, 'Meter is not exists'));
        }

        // const existsData = await Data.findAll({where: {MeterId: meter_id, date: date}});
        // if (existsData.length > 1) {
        //     return next(createError('Data already exists'));
        // }

        const [count, ...rest] = await Data.update({date, value, MeterId: meter_id}, {where: {id: data_id}});

        if (!count) {
            return next(createError(500, 'Failed to update a data'));
        }

        const data = await Data.findOne({
            where: {
                id: data_id
            },
            include: [
                {model: Meter}
            ]
        });

        return res.json({
            id: data.id,
            date: data.date,
            value: data.value,
            meter: {
                id: data.Meter.id,
                number: data.Meter.number
            }
        });
    } catch (err) {
        return next(createError(500, err.message));    
    }
};

module.exports.deteleById = async (req, res, next) => {
    try {
        const {data_id} = req.params;
        if (!data_id) {
            return next(createError(400, 'Incorrect data_id'));
        }
        const count = Data.destroy({where: {id: data_id}});
        if (!count) {
            return next(createError(500, 'Failed to delete a data'));
        }
        return res.json({done: true});
    } catch (err) {
        return next(createError(500, err.message));    
    }
};
