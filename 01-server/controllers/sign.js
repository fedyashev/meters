const createError = require('http-errors');
const {Sign} = require('../models');

const fs = require('fs');

module.exports.getAll = async (req, res, next) => {
    try {
        const signs = (await Sign.findAll()).map(({id}) => ({id}));
        return res.json(signs);
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            return next(createError(400, 'Incorrect input data'));
        }

        const sign = await Sign.create({data: file.buffer});

        console.log(req.body);

        if (!sign) {
            return next(createError(500, 'Failed to create a sign'));
        }

        return res.json({id: sign.id});
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(createError(500, err.message));
    }
};