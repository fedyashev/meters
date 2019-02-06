const createError = require('http-errors');
const validator = require('validator');
const crypt = require('../lib/crypt');
const {Role} = require('../lib/roles');
const {User, UserRole, Session} = require('../models');

module.exports.getAll = async (req, res, next) => {
    try {
        const users = await User
            .findAll({include: [{model: UserRole}]})
            .map(({id, login, UserRole: {role}}) => ({id, login, role}));
        return res.json(users);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.create = async (req, res, next) => {
    const login = req.body.login && validator.trim(req.body.login) || "";
    const password = req.body.password && validator.trim(req.body.password) || "";
    const role = req.body.role;

    if (!login) return next(createError(400, 'Login is required'));
    if (!password) return next(createError(400, 'Password is required'));
    if (!(validator.isAlphanumeric(login) && login.length >= 2)) return next(createError(400, 'Login must contain letters, numbers and length min 2 chars'));
    if (!(validator.isAlphanumeric(password) && password.length >= 2)) return next(createError(400, 'Password must contain letters, numbers and length min 2 chars'));
    if (role && !(validator.isAlpha(role) && password.length >= 2)) return next(createError(400, 'Role must contain letters, numbers and length min 2 chars'));

    try {
        const noneRole = await UserRole.findOne({where: {role: Role.NONE}});
        const userRole = await UserRole.findOne({where: {role: role}});
        const passwordHash = await crypt.getPasswordHash(password);
        const user = await User.create({login, passwordHash, UserRoleId: userRole ? userRole.id : noneRole.id});
        return res.json({
            id: user.id,
            login: user.login,
            role: userRole ? userRole.role : noneRole.role
        });
    } catch(err) {
        return next(createError(err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    const {user_id} = req.params;

    if (!user_id) {
        return next(createError(400, 'Incorrect user id'));
    }

    try {
        const user = await User.findOne({
            where: {id: user_id},
            include: [{model: UserRole}]
        });
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        return res.json({
            id: user.id,
            login: user.login,
            role: user.UserRole.role
        });
    } catch(err) {
        return next(createError(500, err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    const {user_id} = req.params;
    const {password, role} = req.body;

    if (!user_id) return next(createError(400, 'User id is required'));
    if (!password) return next(createError(400, 'Password is required'));
    if (!(validator.isAlphanumeric(password) && password.length >= 2)) return next(createError(400, 'Password must contain letters, numbers and length min 2 chars'));
    if (role && !(validator.isAlpha(role) && password.length >= 2)) return next(createError(400, 'Role must contain letters, numbers and length min 2 chars'));

    try {
        const user = await User.findOne({where: {id: user_id}});
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        const userRole = await UserRole.findOne({where: {role}});
        if (!userRole) {
            return next(createError(404, 'User role not found'));
        }
        const passwordHash = await crypt.getPasswordHash(password);
        const [count, ...rest] = await User.update({passwordHash, UserRoleId: userRole.id}, {where: {id: user_id}});
        if (!count) {
            return next(createError(500, 'Failed to update a user'));
        }
        return res.json({done: true});
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    const {user_id} = req.params;
    if (!user_id) {
        return next(createError(400, 'Incorrect user id'));
    }
    try {
        const user = await User.findOne({where: {id: user_id}});
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        const count = await User.destroy({where: {id: user_id}});
        if (!count) {
            return next(createError(500, 'Failed to delete a user'));
        }
        return res.json({done: true});
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.changePassword = async (req, res, next) => {
    const {password} = req.body;
    const {user_id} = req.params;

    if (!user_id) return next(createError(400, 'User id is required'));
    if (!password) return next(createError(400, 'Password is required'));
    if (!(validator.isAlphanumeric(password) && password.length >= 2)) return next(createError(400, 'Password must contain letters, numbers and length min 2 chars'));

    try {
        const user = await User.findOne({where: {id: user_id}});
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        const passwordHash = await crypt.getPasswordHash(password);
        const [count, ...rest] = await User.update({passwordHash}, {where: {id: user_id}});
        if (!count) {
            return next(createErro(500, 'Failed to update a user password'));
        }
        return res.json({done: true});
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.changeRole = async (req, res, next) => {
    const {role} = req.body;
    const {user_id} = req.params;

    if (!user_id) return next(createError(400, 'User id is required'));
    if (role && !(validator.isAlpha(role) && password.length >= 2)) return next(createError(400, 'Role must contain letters, numbers and length min 2 chars'));

    try {
        const userRole = await UserRole.findOne({where: {role: role}});
        if (!userRole) {
            return next(createError(400, 'User role not found'));
        }
        const [count, ...rest] = await User.update({UserRoleId: userRole.id}, {where: {id: user_id}});
        if (!count) {
            return next(createError(500, 'Failed to update a user role'));
        }
        return res.json({done: true});
    } catch (err) {
        return next(createError(500, err.message));
    }
}