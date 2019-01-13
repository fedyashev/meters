const createError = require('http-errors');
const validator = require('validator');
const crypt = require('../lib/crypt');
const {User, UserRole, Session} = require('../models');

// Create a new user
module.exports.createNewUser = (req, res, next) => {
    const login = req.body.login && validator.trim(req.body.login) || "";
    const password = req.body.password && validator.trim(req.body.password) || "";

    const isBodyValid = 
        validator.isAlphanumeric(login) &&
        validator.isAlphanumeric(password);

    if (!isBodyValid) {
        return next(createError(400, "Incorrect user parameters"));
    }

    User.findOne({
        where: {
            login: login
        }
    })
    .then(user => {
        if (user) {
            next(createError(400, "User already exists."));
        }
        else {
            crypt.getPasswordHash(password)
                .then(hash => {
                    User.create({login, passwordHash: hash})
                        .then(user => res.json(user))
                        .catch(err => next(createError(500, err.message)));            
                })
                .catch(err => next(createError(500, err.message)));            
        }
    })
    .catch(err => next(createError(500, err.message)));
};

module.exports.getUsersList = (req, res, next) => {
    User
        .findAll({
            order: [['id', 'ASC']],
            include: [{
                model: UserRole
            }]
        })
        .then(result => {
            if (result) {
                const users = result.map(user => ({
                    id: user.id,
                    login: user.login,
                    role: user.UserRole.role
                }));
                res.json(users);
            }
            else {
                const arr = [];
                res.json(arr);
            }
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.getUserById = (req, res, next) => {
    const {user_id} = req.params;

    User
        .findOne({
            where: {
                id: user_id
            },
            include: [{
                model: UserRole
            }]
        })
        .then(user => {
            if (user) {
                const obj = {
                    id: user.id,
                    login: user.login,
                    role: user.UserRole.role
                };
                res.json(obj);
            }
            else {
                return next(createError(404, 'User not found'));
            }
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.changeUserPassword = (req, res, next) => {
    const {password} = req.body;
    const {user_id} = req.params;

    if (!user_id || !password) {
        return next(createError(400, 'Incorrect user id or password'));
    }

    const isValid = 
        validator.isAlphanumeric(password);

    if (!isValid) {
        return next(createError(400, 'Password is not valid'));
    }

    crypt.getPasswordHash(password)
        .then(hash => {
            User
                .update(
                    {
                        passwordHash: hash
                    },
                    {
                        where: {
                            id: user_id
                        }
                    }
                )
                .then(result => {
                    const [count, ...rest] = result;
                    if (count > 0) {
                        Session
                            .destroy({
                                where: {
                                    UserId: user_id
                                }
                            })
                            .then(result => {
                                res.json({done: true});
                            })
                            .catch(err => next(createError(500, err.message)));
                    }
                    else {
                        res.json({done: false});
                    }
                })
                .catch(err => next(createError(500, err.message)));
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.changeUserRole = (req, res, next) => {
    const {role} = req.body;
    const {user_id} = req.params;

    if (!user_id || !role) {
        return next(createError(400, 'Incorrect user id or user role'));
    }

    const isValid =
        validator.isAlpha(role) &&
        validator.isUppercase(role);

    if (!isValid) {
        return next(createError(400, 'Incorrect user role'));
    }

    UserRole
        .findOne({
            where: {
                role: role
            }
        })
        .then(role => {
            if (role) {
                User
                    .update(
                        {
                            UserRoleId: role.id
                        },
                        {
                            where: {
                                id: user_id
                            }
                        }
                    )
                    .then(result => {
                        const [count, ...rest] = result;
                        if (count > 0) {
                            Session
                                .destroy({
                                    where: {
                                        UserId: user_id
                                    }
                                })
                                .then(result => {
                                    res.json({done: true});
                                })
                                .catch(err => next(createError(500, err.message)));
                        }
                        else {
                            return next(createError(404, 'User not found'));
                        }
                    })
                    .catch(err => next(createError(500, err.message)));
            }
            else {
                return next(createError(404, 'Incorrect user role'));
            }
        })
        .catch(err => next(createError(500, err.message)));
}