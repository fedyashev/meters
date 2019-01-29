const createError = require('http-errors');
const validator = require('validator');
const { Inspector, User, UserRole, sequelize } = require('../models');
const crypt = require('../lib/crypt');
const { Role } = require('../lib/roles');

const pattern = '[a-zA-Zа-яА-Я0-9.]';

module.exports.count = async (req, res, next) => {
    try {
        const count = await Inspector.count();
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
        let inspectors = null;
        if (!isNaN(lim) && !isNaN(off) && off >= 0 && lim > 0) {
            inspectors = await Inspector
                .findAll({
                    offset: off,
                    limit: lim,
                    include: [{ model: User }]
                })
                .map(({ id, name, User: { login } }) => ({ id, login, name }));
        }
        else {
            inspectors = await Inspector
                .findAll({ include: [{ model: User }] })
                .map(({ id, name, User: { login } }) => ({ id, login, name }));
        }
        res.json(inspectors);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const { inspector_id } = req.params;
        if (!inspector_id) {
            return next(createError(400, 'Incorrect inspector id'));
        }
        const inspector = await Inspector.findOne({
            where: { id: inspector_id },
            include: [{ model: User }]
        });
        if (!inspector) {
            return next(createError(404, 'Inspector not found'));
        }
        return res.json({
            id: inspector.id,
            name: inspector.name,
            login: inspector.User.login
        });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getByUserId = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return next(createError(400, 'Incorrect inspector id'));
        }
        const inspector = await Inspector.findOne({
            where: { UserId: user_id },
            include: [{ model: User }]
        });
        if (!inspector) {
            return next(createError(404, 'Inspector not found'));
        }
        return res.json({
            id: inspector.id,
            name: inspector.name,
            login: inspector.User.login
        });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const { name, login, password } = req.body;
        if (!name || !login || !password) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const isValid =
            validator.matches(name, pattern) &&
            validator.isAlphanumeric(login) &&
            validator.isAlphanumeric(password);

        if (!isValid) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const role = await UserRole.findOne({ where: { role: Role.INSPECTOR } });
        if (!role) {
            return next(createError(404, 'User role not found'));
        }

        // Create inspector transaction
        let inspector = null;
        let user = null;
        try {
            let result = await sequelize.transaction(async (t) => {
                const passwordHash = await crypt.getPasswordHash(password);
                user = await User.create({ login, passwordHash, UserRoleId: role.id }, { transaction: t });
                inspector = await Inspector.create({ UserId: user.id, name }, { transaction: t });
            });
        } catch (err) {
            return next(createError(500, err.message));
        }

        return res.json({
            id: inspector.id,
            name: inspector.name,
            user: {
                id: user.id,
                login: user.login,
                role: Role.INSPECTOR
            }
        });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { inspector_id } = req.params;

        if (!name || !inspector_id) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const isValid =
            validator.matches(name, pattern);

        if (!isValid) {
            return next(createError(400, 'Incorrect input parameters'));
        }

        const [count, ...rest] = await Inspector.update({ name: name }, { where: { id: inspector_id } });

        if (!count) {
            return next(createError(500, 'Inspector updating failed'));
        }

        return res.json({
            id: inspector_id,
            name
        });
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        const { inspector_id } = req.params;

        if (!inspector_id) {
            return next(createError(404, 'Inspector not found'));
        }

        const count = await Inspector.destroy({ where: { id: inspector_id } });

        if (!count) {
            return next(createError(404, 'Failed to delete an inspector'));
        }
        return res.json({ done: true });
    } catch (err) {
        return next(createError(500, err.message));
    }
};