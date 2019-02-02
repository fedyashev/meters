const createError = require('http-errors');
const { Meter, Place, Sequelize } = require('../models');
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
        if (!number) {
            return next(createError(400, 'Incorrect number'));
        }
        // const isValid = validator.isAlphanumeric(number);
        // if (!isValid) {
        //     return next(createError(400, 'Incorrect number'));
        // }
        const meter = await Meter.create({ number });
        if (!meter) {
            return next(createError(500, 'Creation faild'));
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
        if (!number || !meter_id) {
            return next(createError(400, 'Incorrect number id'))
        }
        // const isValid = validator.isAlphanumeric(number);
        // if (!isValid) {
        //     return next(createError(400, 'Incorrect number id'));
        // }
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
        const count = await Meter.destroy({ where: { id: meter_id } });
        if (!count) {
            return next(createError(500, 'Deleting failed'));
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