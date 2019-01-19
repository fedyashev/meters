const {User, Inspector, Consumer} = require('../models');

module.exports.user = async (req) => {
    if (!(req.user && req.user.id)) {
        return false;
    }
    const user_id = Number(req.params.user_id);
    return req.user.id === user_id;
};

module.exports.inspector = async (req) => {
    if (!(req.user && req.user.id)) {
        return false;
    }
    const {inspector_id} = req.params;
    if (!inspector_id) {
        return false;
    }
    try {
        const inspector = await Inspector.findOne({where: {id: inspector_id}});
        if (!inspector) {
            return false;
        }
        return req.user.id === inspector.UserId;
    } catch (err) {
        return false;
    }
};

module.exports.consumer = async (req) => {
    if (!(req.user && req.user.id)) {
        return false;
    }
    const {consumer_id} = req.params;
    if (!consumer_id) {
        return false;
    }
    try {
        const consumer = await Consumer.findOne({where: {id: consumer_id}});
        if (!consumer) {
            return false;
        }
        return req.user.id === consumer.UserId;
    } catch (err) {
        return false;
    }
};