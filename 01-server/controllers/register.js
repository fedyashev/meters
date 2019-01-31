const createError = require('http-errors');
const { Register, Place, SubAbonent, Consumer, Meter, Data, sequelize } = require('../models');

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
                    subabonents = await SubAbonent
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
        let last_data = null;
        if (register.GroupAbonent) {
            consumer = register.GroupAbonent.Consumer || null;
            meter = register.GroupAbonent.Meter || null;
            if (meter) {
                const data = await Data
                    .findAll({
                        where: {MeterId: meter.id},
                        order: [['date', 'desc']],
                        limit: 1,
                    });
                if (data.length > 0) {
                    last_data = {
                        id: data[0].id,
                        date: data[0].date,
                        value: data[0].value
                    };
                    console.log(last_data);
                }
            }
            //console.log(meter);
            group_abonent = {
                id: register.GroupAbonent.id,
                name: register.GroupAbonent.name,
                consumer: consumer,
                meter: {
                    id: meter.id,
                    number: meter.number,
                    last_data: last_data
                }
            }
        }
        
        return res.json({
            id: register.id,
            name: register.name,
            group_abonent: group_abonent
        });
    } catch (err) {
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