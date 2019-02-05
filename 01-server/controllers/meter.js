const createError = require('http-errors');
const { Meter, Place, Data, Sequelize, sequelize } = require('../models');
const validator = require('validator');
const Op = Sequelize.Op;

module.exports.count = async (req, res, next) => {
    try {
        const count = await Meter.count();
        return res.json({ count });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getAll = async (req, res, next) => {
    try {
        const { limit, offset } = req.query;
        const lim = Number(limit);
        const off = Number(offset);
        let meters = null;
        if (!isNaN(lim) && !isNaN(off) && off >= 0 && lim > 0) {
            meters = await Meter
                .findAll({offset: off, limit: lim})
                .map(({ id, number }) => ({ id, number }));
        }
        else {
            meters = await Meter.findAll().map(({ id, number }) => ({ id, number }));
        }

        return res.json(meters);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const { number } = req.body;

        if (!number) return next(createError(400, 'Number is required'));
        if (!validator.isAlphanumeric(number)) return next(createError(400, 'Number is not valid. Only letters and digits.'));

        const meter = await Meter.create({ number });
        if (!meter) {
            return next(createError(500, 'Failed to create a meter'));
        }

        return res.json({
            id: meter.id,
            number
        });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const { meter_id } = req.params;
        if (!meter_id) {
            return next(createError(400, 'Incorrect meter id'));
        }

        const meter = await Meter.findOne({ where: { id: meter_id } });
        if (!meter) {
            return next(createError(404, 'Meter not found'));
        }

        return res.json({
            id: meter.id,
            number: meter.number
        });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        const { number } = req.body;
        const { meter_id } = req.params;

        if (!meter_id) return next(createError(400, 'Meter id is required'));
        if (!number) return next(createError(400, 'Number is required'));
        if (!validator.isAlphanumeric(number)) return next(createError(400, 'Number is not valid. Only letters and digits.'));

        const [count, ...rest] = await Meter.update({ number }, { where: { id: meter_id } });
        if (!count) {
            return next(createError(500, 'Updating failed'));
        }
        
        return res.json({
            id: meter_id,
            number
        });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        const { meter_id } = req.params;
        if (!meter_id) {
            return next(createError(400, 'Incorrect meter id'));
        } 

        const countMeter = await Meter.destroy({ where: { id: meter_id } });
        if (!countMeter) {
            return next(createError(500, 'Failed to delete a meter'));
        }

        return res.json({ done: true });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getAllNotInPlace = async (req, res, next) => {
    try {
        const metersInPlace = await Place
            .findAll({
                where: {
                    MeterId: { [Op.ne]: null }
                },
                include: [
                    { model: Meter },
                ]
            })
            .map(place => place.MeterId)
        const metersNotInPlace = await Meter
            .findAll({
                where: {
                    id: { [Op.notIn]: metersInPlace }
                }
            })
            .map(({ id, number }) => ({ id, number }));
        return res.json(metersNotInPlace);
    } catch (err) {
        console.log(err);
        return next(createError(500, err.message));
    }
}