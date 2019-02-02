const createError = require('http-errors');
const { Register, Place, SubAbonentSchema, Consumer, Meter, Data, sequelize } = require('../models');

module.exports.getAll = async (req, res, next) => {
    try {
        const registers = await Register
            .findAll({
                include: [
                    {model: Place, as: 'GroupAbonent'}
                ]
            })
            .map(p => {
                const group_abonent = p.GroupAbonent || null;
                return {
                    id: p.id,
                    name: p.name,
                    group_abonent: group_abonent
                };
            });

        return res.json(registers);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const { name, group_abonent_id, sub_abonentes } = req.body;
        console.log(req.body);
        if (!name || !Array.isArray(sub_abonentes)) {
            return next(createError(500, 'Incorrect register name'));
        }

        let register = null;
        let subabonents = null;
        try {
            let result = await sequelize.transaction(async (t) => {
                register = await Register.create({name, GroupAbonentId: group_abonent_id}, {transaction: t});
                if (register && sub_abonentes.length > 0) {
                    subabonents = await SubAbonentSchema
                        .bulkCreate(
                            sub_abonentes.map(id => ({RegisterId: register.id, SubAbonentId: id})),
                            {transaction: t}
                        )
                }
            });
        } catch (err) {
            return next(createError(500, err));
        }
        
        if (!register) {
            return next(createError(500, 'Failed to create a register'));
        }
        return res.json(register);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const {register_id} = req.params;
        if (!register_id) {
            return next(createError(400, 'Incorrect register id'));
        }

        const register = await Register
            .findOne({
                where: {id: register_id},
                include: [
                    {
                        model: Place,
                        as: 'GroupAbonent',
                        include: [
                            {model: Consumer},
                            {model: Meter}
                        ]
                    }
                ]
            });

        if (!register) {
            return next(createError(404, 'Register not found'));
        }

        let consumer = null;
        let meter = null;
        let group_abonent = null;
        if (register.GroupAbonent) {
            consumer = register.GroupAbonent.Consumer || null;
            meter = register.GroupAbonent.Meter || null;
            if (meter) {
                let data = await Data
                    .findAll({
                        where: {MeterId: meter.id},
                        order: [['date', 'desc']],
                        limit: 2,
                    })
                    .map(d => {
                        return {
                            id: d.id,
                            date: d.date,
                            value: d.value
                        };
                    });
                let currData = data[0];
                let month = (new Date(Date.now())).getMonth();
                if (currData) {
                    const currMonth = (new Date(currData.date)).getMonth()
                    if (month !== currMonth) {
                        data = [null, currData];
                    }
                }
                meter = {
                    id: register.GroupAbonent.Meter.id,
                    number: register.GroupAbonent.Meter.number,
                    data: data
                }
            }
            group_abonent = {
                id: register.GroupAbonent.id,
                name: register.GroupAbonent.name,
                consumer: consumer,
                meter: meter
            }
        }

        const raw_sub_abonents = await SubAbonentSchema
            .findAll({
                where: {RegisterId: register_id},
                include: [
                    {
                        model: Place,
                        as: 'SubAbonent',
                        include: [
                            {model: Consumer},
                            {model: Meter}
                        ]
                    }
                ]
            });

        const subabonentesPromise = await raw_sub_abonents
            .map(async (record) => {
                if (!record.SubAbonent) return null;
                const place = record.SubAbonent;
                let data = [];
                if (place.Meter) {
                    data = await Data
                        .findAll({
                            where: {MeterId: place.Meter.id},
                            order: [['date', 'desc']],
                            limit: 2,
                        })
                        .map(d => {
                            return {
                                id: d.id,
                                date: d.date,
                                value: d.value
                            };
                        });                        
                }

                let currData = data[0];
                let month = (new Date(Date.now())).getMonth();
                if (currData) {
                    const currMonth = (new Date(currData.date)).getMonth()
                    if (month !== currMonth) {
                        data = [null, currData];
                    }
                }

                return {
                    id: place.id,
                    name: place.name,
                    isSignNeed: place.isSignNeed,
                    consumer: place.Consumer ?
                    {
                        id: place.Consumer.id,
                        name: place.Consumer.name,
                        email: place.Consumer.email
                    } : null,
                    meter: place.Meter ? 
                    {
                        id: place.Meter.id,
                        number: place.Meter.number,
                        data: data
                    } : null
                };
            });

        Promise
            .all(subabonentesPromise)
            .then(subabonents => {
                //console.log(subabonents);
                return res.json({
                    id: register.id,
                    name: register.name,
                    group_abonent: group_abonent,
                    sub_abonents: subabonents
                });
            })
            .catch(err => {throw err});

    } catch (err) {
        console.log(err);
        return next(createError(500, err.message));
    }
};

module.exports.getPdfById = async (req, res, next) => {
    try {
        return next(createError(503, 'Not implemented'));
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        return next(createError(503, 'Not implemented'));
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        return next(createError(503, 'Not implemented'));
    } catch (err) {
        return next(createError(500, err.message));
    }
};