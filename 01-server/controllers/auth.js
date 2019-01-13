const createError = require('http-errors');
const crypt = require('../lib/crypt');
const validator = require('validator');
const {User, Session, UserRole} = require('../models');
const rack = require('hat').rack();

module.exports.login = (req, res, next) => {
    const login = req.body.login && validator.trim(req.body.login) || "";
    const password = req.body.password && validator.trim(req.body.password) || "";

    const isBodyValid = 
        validator.isAlphanumeric(login) &&
        validator.isAlphanumeric(password);

    if (!isBodyValid) {
        next(createError(400, "Invalid login or password"));
    }

    User.findOne({
        where: {login: login},
        include: [{model: UserRole}]
    })
    .then(user => {
        if (user) {
            crypt.comparePassword(password, user.passwordHash)
                .then(isMatch => {
                    console.log(isMatch);
                    if (isMatch) {
                        const {id, login} = user;
                        Session.findOne({
                            where: {UserId: id}
                        })
                        .then(session => {
                            if (session) {
                                res.json({id, login, role: user.UserRole.role, session_token: session.token});
                            }
                            else {
                                Session.create({UserId: id, token: rack()})
                                    .then(session => {
                                        res.json({id, login, role: user.UserRole.role, session_token: session.token});
                                    })
                                    .catch(err => next(createError(500, err.message)));
                            }
                        })
                        .catch(err => next(createError(500, err.message)));
                    }
                    else {
                        next(createError(404, "Incorrect login or password"));
                    }
                })
                .catch(err => next(createError(500, err.message)));
        }
        else {
            next(createError(404, "Incorrect login or password"));
        }
    })
    .catch(err => next(createError(500, err.message)));
};

module.exports.logout = (req, res, next) => {
    const {session_token} = req.body;
    if (!session_token) {
        return next(createError(401, 'Unauthorized'));
    }
    Session.destroy({
        where: {
            token: session_token
        }
    })
    .then(count => {
        if (count) {
            res.json({done: true});
        }
        else {
            return next(createError(404, 'Not found'));
        }
    })
    .catch(err => next(createError(500, err.message)));
};