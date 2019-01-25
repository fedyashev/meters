const createError = require('http-errors');
const {Place, Meter, Consumer, Data, Sequelize} = require('../models');
const validator = require('validator');
const Op = Sequelize.Op;

const pattern = '[a-zA-Zа-яА-Я0-9.]';

module.exports.getAll = async (req, res, next) => {
    try {
        const rawPlaces = await Place.findAll({
            include: [
                {model: Consumer},
                {model: Meter}
            ]
        });
        const places = rawPlaces.map(place => {
            const c = place.Consumer;
            const m = place.Meter;
            const consumer = c && {id: c.id, name: c.name, email: c.email} || null;
            const meter = m && {id: m.id, number: m.number} || null;
            return {
                id: place.id,
                name: place.name,
                isSignNeed: place.isSignNeed,
                consumer,
                meter
            };
        });
        return res.json(places);
    }
    catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getAllForAudit = async (req, res, next) => {
    try {
        const rawPlaces = await Place.findAll({
            where: {
                [Op.and]: [
                    {MeterId: {[Op.ne]: null}},
                    {ConsumerId: {[Op.ne]: null}}
                ]
            },
            include: [
                {model: Meter},
                {model: Consumer}
            ]
        });
        const places = await rawPlaces.map(async (place) => {
            let lastData = null;
            if (place.Meter) {
                const data = await Data.findAll({
                    where: {MeterId: place.Meter.id},
                    order: [['date', 'desc']],
                    limit: 1,
                });
                if (data.length > 0) {
                    lastData = {
                        id: data[0].id,
                        date: data[0].date,
                        value: data[0].value
                    };
                }
            }
            return {
                id: place.id,
                name: place.name,
                isSignNeed: place.isSignNeed,
                consumer: {
                    id: place.Consumer.id,
                    name: place.Consumer.name,
                    email: place.Consumer.email
                },
                meter: {
                    id: place.Meter.id,
                    number: place.Meter.number,
                    lastData: lastData
                }
            };
        });
        Promise.all(places)
            .then(results => res.json(results))
            .catch(err => next(createError(500, err.message)));
    } catch (err) {
        return next(createError(500, err.message));
    }

};

module.exports.create = async (req, res, next) => {
    try {

        const name = req.body.name;
        const consumer_id = req.body.consumer_id || null;
        const meter_id = req.body.meter_id || null;
        const isSignNeed = req.body.isSignNeed || false;

        if (!name) {
            return next(createError(400, 'Incorrect place name'));
        }

        const isValid =
            validator.matches(name, pattern);

        if (!isValid) {
            return next(createError(400, 'Incorrect place name'));
        }

        if (meter_id) {
            const existsMeter = await Meter.findOne({where: {id: meter_id}});
            if (!existsMeter) {
                return next(createError(404, 'Meter not exists'));
            }

            const existsPlace = await Place.findOne({where: {MeterId: meter_id}});
            if (existsPlace) {
                return next(createError(400, 'Place with meter already exists'));            
            }
        }

        if (consumer_id) {
            const existsConsumer = await Consumer.findOne({where: {id: consumer_id}});
            if (!existsConsumer) {
                return next(createError(404, 'Consumer not exists'));
            }
        }

        const place = await Place.create({name, ConsumerId: consumer_id, MeterId: meter_id, isSignNeed});

        if (!place) {
            return next(createError(500, 'Failed to create place'));
        }

        const c = await place.getConsumer();
        const m = await place.getMeter();

        const consumer = c && {id: c.id, name: c.name, email: c.email} || null;
        const meter = m && {id: m.id, number: m.number} || null;
        
        return res.json({id: place.id, name: place.name, isSignNeed: place.isSignNeed, consumer: consumer, meter: meter});
    }
    catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const {place_id} = req.params;
        if (!place_id) {
            return next(createError(400, 'Incorrect place id'));
        }
        const place = await Place.findOne({
            where: {
                id: place_id
            },
            include: [
                {model: Consumer},
                {model: Meter}
            ]
        });

        if (!place) {
            return next(createError(404, 'Place not found'));
        }

        let lastData = null;
        if (place.Meter) {
            const data = await Data.findAll({
                where: {MeterId: place.Meter.id},
                order: [['date', 'desc']],
                limit: 1,
            });
            if (data.length > 0) {
                lastData = {
                    id: data[0].id,
                    date: data[0].date,
                    value: data[0].value
                };
            }
        }

        const c = place.Consumer;
        const m = place.Meter;
        const consumer = c && {id: c.id, name: c.name, email: c.email} || null;
        const meter = m && {id: m.id, number: m.number, lastData} || null;

        return res.json({
            id: place.id,
            name: place.name,
            isSignNeed: place.isSignNeed,
            consumer,
            meter
        });
    }
    catch (err) {
        return next(createError(500, err.errors[0].message || err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        const {place_id} = req.params;
        const name = req.body.name || null;
        const isSignNeed = req.body.isSignNeed || false;
        const consumer_id = req.body.consumer_id || null;
        const meter_id = req.body.meter_id || null;

        if (!place_id || !name) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const isValid = 
            validator.matches(name, pattern);

        if (!isValid) {
            return next(createError(400, 'Incorrect place name'));
        }

        if (meter_id) {
            const existsMeter = await Meter.findOne({where: {id: meter_id}});
            if (!existsMeter) {
                return next(createError(404, 'Meter not exists'));
            }

            const existsPlace = await Place.findOne({where: {MeterId: meter_id}});
            if (existsPlace && existsPlace.id !== Number(place_id)) {
                return next(createError(400, 'Place with meter already exists'));            
            }
        }

        if (consumer_id) {
            const existsConsumer = await Consumer.findOne({where: {id: consumer_id}});
            if (!existsConsumer) {
                return next(createError(404, 'Consumer not exists'));
            }
        }

        const [count, ...rest] = await Place.update(
            {name, isSignNeed, ConsumerId: consumer_id, MeterId: meter_id},
            {where: {id: place_id}}
        );

        if (!count) {
            return next(createError(500, 'Failed to update place'));
        }

        const place = await Place.findOne({
            where: {
                id: place_id
            },
            include: [
                {model: Consumer},
                {model: Meter}
            ]
        });

        const c = place.Consumer;
        const m = place.Meter;

        const consumer = c && {id: c.id, name: c.name, email: c.email} || null;
        const meter = m && {id: m.id, number: m.number};

        return res.json({
            id: place.id,
            name: place.name,
            isSignNeed: place.isSignNeed,
            consumer,
            meter
        });
    }
    catch (err) {
        return next(createError(500, err.errors[0].message || err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        const {place_id} = req.params;
        if (!place_id) {
            return next(createError(400, 'Incorrect place id'));
        }
        const count = await Place.destroy({where: {id: place_id}});
        if (!count) {
            return next(createError(500, 'Failed to delete place'));
        }
        return res.json({done: true});
    }
    catch (err) {
        return next(createError(500, err.errors[0].message || err.message));
    }
};