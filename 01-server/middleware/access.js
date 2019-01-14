const createError = require('http-errors');
const {Session, User, UserRole, Inspector} = require('../models');

module.exports.session = (req, res, next) => {
    const session_token = req.body.session_token || req.query.session_token;

    if (!session_token) {
        return next(createError(401, "Unauthorized"));
    }

    Session
        .findOne({
            where: {
                token: session_token
            }
        })
        .then(session => {
            if (session) {
                return next();
            }
            else {
                return next(createError(401, "Unauthorized"));
            }
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.allow = roles => (req, res, next) => {
    if (!roles) {
        return next();
    }

    if (!Array.isArray(roles)) {
        return next(createError(500, 'Internal server error'));
    }

    const session_token = req.body.session_token || req.query.session_token;

    if (!session_token) {
        return next(createError(401, 'Unauthorized'));
    }

    Session
        .findOne({
            where: {
                token: session_token
            },
            include: [{
                model: User,
                include: [{
                    model: UserRole
                }]
            }]
        })
        .then(session => {
            if (session) {
                const role = session.dataValues.User.UserRole.role;
                if (roles.includes(role)) {
                    return next();
                }
                else {
                    return next(createError(404, 'Not found'));
                }
            }
            else {
                return next(createError(401, 'Unauthorized'));
            }
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.allowUserSelfExceptRoles = roles => (req, res, next) => {
    const session_token = req.body.session_token || req.query.session_token;
    let user_id = req.params.user_id;

    if (!session_token) {
        return next(createError(401, 'Unauthorized'));
    }

    if (user_id == null) {
        return next(createError(400, "User id not found"));
    }

    user_id = parseInt(user_id);

    Session
        .findOne({
            where: {
                token: session_token
            },
            include: [{
                model: User,
                include: [{
                    model: UserRole
                }]
            }]
        })
        .then(session => {
            if (session) {
                const userId = session.User.id;
                const role = session.User.UserRole.role;

                //console.log(typeof user_id, typeof userId);

                if (user_id === userId) {
                    return next();
                }

                if (roles && Array.isArray(roles) && roles.includes(role)) {
                    return next();
                }

                return next(createError(404, "Not found"));
            }
            else {
                return next(createError(401, 'Unauthorized'));
            }
        })
        .catch(err => next(createError(500, err.message)));
};

module.exports.allowInspectorSelfExceptRoles = roles => (req, res, next) => {
    const operation = async () => {
        const session_token = req.body.session_token || req.query.session_token;
        let inspector_id = req.params.inspector_id;

        if (!session_token) {
            return next(createError(401, 'Unauthorized'));
        }

        if (inspector_id == null) {
            return next(createError(400, "Inspector id not found"));
        }

        inspector_id = parseInt(inspector_id);

        const session = await Session.findOne({
            where: {
                token: session_token
            },
            include: [{
                model: User,
                include: [{
                    model: UserRole
                }]
            }]
        });

        if (!session) {
            return next(createError(401, 'Unauthorized'));
        }

        const user_id = session.User.id;
        const role = session.User.UserRole.role;

        const inspector = await Inspector.findOne({
            where: {
                id: inspector_id
            },
            include: [
                {
                    model: User
                }
            ]
        });

        if (!inspector) {
            return next(createError(404, 'Inspector not found'));
        };

        if (inspector.User.id === user_id) {
            return next();
        }

        if (roles && Array.isArray(roles) && roles.includes(role)) {
            return next();
        }

        return next(createError(404, 'Inspector not found'));
    };
    Promise.resolve()
        .then(operation)
        .catch(err => next(createError(500, err.message)));
};