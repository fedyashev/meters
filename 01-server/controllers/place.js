const createError = require('http-errors');
const {Place} = require('../models');

module.exports.getAll = async (req, res, next) => {
    try {
        const rawPlaces = await Place.findAll({
            include: [
                {model: 'Consumer'},
                {model: 'Meter'}
            ]
        });
        const places = rawPlaces.map(place => {
            const consumer = place.Consumer;
            const meter = place.Meter;
            return {
                id: place.id
            };
        });
    }
    catch (err) {
        return next(createError(500, err.errors[0].message || err.message));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        
    }
    catch (err) {
        return next(createError(500, err.errors[0].message || err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        
    }
    catch (err) {
        return next(createError(500, err.errors[0].message || err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        
    }
    catch (err) {
        return next(createError(500, err.errors[0].message || err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        
    }
    catch (err) {
        return next(createError(500, err.errors[0].message || err.message));
    }
};