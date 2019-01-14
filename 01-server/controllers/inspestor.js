const createError = require('http-errors');
const validator = require('validator');
const {Inspector, User, UserRole} = require('../models');
const crypt = require('../lib/crypt');
const {Role} = require('../lib/roles');

const pattern = '[a-zA-Zа-яА-Я0-9.]';

module.exports.getAll = (req, res, next) => {
    Inspector.findAll()
        .then(result => {
            const inspectors = result.map(i => {
                const {id, name} = i;
                return {id, name};
            });
            return res.json(inspectors);
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.getInspectorById = (req, res, next) => {
    const {inspector_id} = req.params;

    if (!inspector_id) {
        return next(createError(400, 'Incorrect inspector id'));
    }

    Inspector
        .findOne({
            where: {
                id: inspector_id
            }
        })
        .then(inspector => {
            if (inspector) {
                const {id, name} = inspector;
                return res.json({id, name});
            }
            else {
                return next(createError(404, 'Inspector not found'));
            }
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.createInspector = (req, res, next) => {
    const {name, login, password} = req.body;

    if (!name || !login || !password) {
        return next(createError(400, 'Incorrect input parameters'));
    }

    const isValid = 
        validator.matches(name, pattern)  &&
        validator.isAlphanumeric(login) && 
        validator.isAlphanumeric(password);

    if (!isValid) {
        return next(createError(400, 'Incorrect input parameters'));
    }

    const operation = async () => {
        const user = await User.findOne({where: {login: login}});

        if (user) {
            return next(createError(400, `User with login ${user.login} already exists`));
        }

        const hash = await crypt.getPasswordHash(password);
        const role = await UserRole.findOne({where: {role: Role.INSPECTOR}});

        if (!role) {
            return next(createError(500, 'Incorrect role'));
        }

        const newUser = await User.create({login, passwordHash: hash, UserRoleId: role.id});
        const newInspector = await Inspector.create({name, UserId: newUser.id});

        const inspector = {
            id: newInspector.id,
            name
        };

        res.json(inspector);
    };

    Promise.resolve()
        .then(operation)
        .catch(err => next(createError(500, err.message)));
};

module.exports.updateInspectorById = (req, res, next) => {
    return Promise
        .resolve()
        .then(async () => {
            const {name} = req.body;
            const {inspector_id} = req.params;
        
            if (!name || !inspector_id) {
                return next(createError(400, 'Incorrect input parameters'));
            }

            const isValid = validator.matches(name, pattern);
    
            if (!isValid) {
                return next(createError(400, 'Incorrect input parameters'));
            }

            const [count, ...rest] = await Inspector.update({name: name}, {where: {id: inspector_id}});

            if (count > 0) {
                const {id, name} = await Inspector.findOne({where: {id: inspector_id}});
                return res.json({id, name});
            }

            return next(createError(500, 'Inspector updating failed'));
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.deleteInspectorById = (req, res, next) => {
    return Promise
        .resolve()
        .then(async () => {
            const {inspector_id} = req.params;

            if (!inspector_id) {
                return next(createError(404, 'Inspector not found'));
            }

            const count = await Inspector.destroy({where: {id: inspector_id}});

            if (count > 0) {
                return res.json({done: true});
            }

            return next(createError(404, 'Inspector deleting failed'));
        })
        .catch(err => next(createError(500, err.message)));
};