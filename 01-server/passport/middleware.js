const passport = require('passport');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const secret = require('./secret.json');

module.exports.login = async (req, res, next) => {
    try {
        return await passport.authenticate('login', async (err, user, info) => {
            try {
                if (err) {
                    return next(createError(500, err.message));
                }
                if (!user) {
                    return next(createError(403, 'Incorrect login or password'));
                }
                req.login(user, { session : false }, async (err) => {
                    if (err) {
                        return next(createError(500, err.message));
                    }
                    const body = {id: user.id};
                    const token = jwt.sign({user: body}, secret.key);
                    return res.json({id: user.id, login: user.login, role: user.role, token});
                });
            } catch (err) {
                return next(createError(500, err.message));
            }
        })(req, res, next);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.jwt = async (req, res, next) => {
    try {
        await passport.authenticate('jwt', {session: false}, async (err, user) => {
            if (err) {
                return next(createError(500, err.message));
            }
            if (!user) {
                return next(createError(401, 'Unauthorized'));
            }
            req.login(user, {session: false}, async (err) => {
                if (err) {
                    return next(createError(500, err.message));
                }
                return next();
            });
        })(req, res, next);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.role = roles => (req, res, next) => {
    if (!req.user) {
        return next(createError(401, 'Unauthorized'));
    }
    const {role} = req.user;
    if (!role) {
        return next(createError(500, 'User role not found'));
    }
    if (!roles || !Array.isArray(roles)) {
        return next(createError(500, 'Roles not found'));
    }
    return roles.includes(role) ? next() : next(createError(403, 'Forbidden')); 
};

module.exports.allow = (roles, selfPredicate) => async (req, res, next) => {
    if (!req.user) {
        return next(createError(401, 'Unauthorized'));
    }
    if (selfPredicate) {
        try {
            const isSelf = await selfPredicate(req);
            if (isSelf) {
                return next();
            }
        } catch (err) {
            return next(createError(500, err.message));
        }
    }
    if (roles) {
        const {role} = req.user;
        if (!Array.isArray(roles)) {
            return next(createError(500, 'Roles is not array'));
        }
        return roles.includes(role) ? next() : next(createError(403, 'Forbidden')); 
    }
    return next();
};