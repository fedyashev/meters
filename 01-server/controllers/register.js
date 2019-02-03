const createError = require('http-errors');
const { Register, Place, SubAbonentSchema, Consumer, Meter, Data, sequelize } = require('../models');

module.exports.getAll = async (req, res, next) => {
    try {
        const registers = await Register
            .findAll({
                include: [
                    { model: Place, as: 'GroupAbonent' }
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
        //console.log(req.body);
        if (!name || !Array.isArray(sub_abonentes)) {
            return next(createError(500, 'Incorrect register name'));
        }

        let register = null;
        let subabonents = null;
        try {
            let result = await sequelize.transaction(async (t) => {
                register = await Register.create({ name, GroupAbonentId: group_abonent_id }, { transaction: t });
                if (register && sub_abonentes.length > 0) {
                    subabonents = await SubAbonentSchema
                        .bulkCreate(
                            sub_abonentes.map(id => ({ RegisterId: register.id, SubAbonentId: id })),
                            { transaction: t }
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
        const { register_id } = req.params;
        if (!register_id) {
            return next(createError(400, 'Incorrect register id'));
        }

        const register = await Register.getRegisterById(register_id);

        if (!register) {
            return next(createError(404, 'Register not found'));
        }

        return res.json(register);
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
        const { name, group_abonent_id, sub_abonentes } = req.body;
        const { register_id } = req.params;

        if (!register_id) {
            return next(createError(400, 'Incorrect register id'));
        }

        if (!name) {
            return next(createError(400, 'Incorrect register name'));
        }

        const register = await Register.findOne({ where: { id: register_id } });
        if (!register) {
            return next(createError(404, 'Register not found'));
        }

        let groupAbonent = null;
        if (group_abonent_id) {
            groupAbonent = await Place.findOne({ where: { id: group_abonent_id } });
            if (!groupAbonent) {
                return next(createError(404, 'Group abonent not found'));
            }
        }

        const subAbonentsPromise = await sub_abonentes.map(async (p) => {
            return await Place.findOne({ where: { id: p } })
        });

        const subabonents = await Promise.all(subAbonentsPromise);
        if (!subabonents) {
            return next(createError(404, 'Subabonents not found'));
        }

        try {
            const result = sequelize.transaction(async (t) => {
                const [count, ...rows] = await Register
                    .update(
                        {
                            name: name,
                            GroupAbonentId: group_abonent_id
                        },
                        {
                            where: { id: register_id },
                            transaction: t
                        }
                    );

                const countSubabonents = await SubAbonentSchema
                    .destroy({
                        where: { RegisterId: register_id },
                        transaction: t
                    });

                const subs = await SubAbonentSchema
                    .bulkCreate(
                        sub_abonentes.map(id => ({ RegisterId: register_id, SubAbonentId: id })),
                        { transaction: t }
                    );

                return res.json({ done: true });
            });
        } catch (err) {
            throw err;
        }

    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        const { register_id } = req.params;
        if (!register_id) {
            return next(createError(500, 'Incorrect input parameters'));
        }
        try {
            const result = await sequelize.transaction(async (t) => {
                const countRegister = await Register.destroy({ where: { id: register_id }, transaction: t });
                const countSubabonents = await SubAbonentSchema.destroy({ where: { RegisterId: register_id }, transaction: t });
                return res.json({ done: true });
            });
        } catch (err) {
            return next(createError(500, err.message));
        }
    } catch (err) {
        return next(createError(500, err.message));
    }
};