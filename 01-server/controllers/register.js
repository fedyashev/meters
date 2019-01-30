const createError = require('http-errors');
const {Register, Place} = require('../models');

module.exports.getAll = async (req, res, next) => {
    try {
        return next(createError(503, 'Not implemented'));
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        return next(createError(503, 'Not implemented'));
    } catch (err) {
        return next(createError(500, err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        return next(createError(503, 'Not implemented'));
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