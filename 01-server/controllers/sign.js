const createError = require('http-errors');
const {Sign} = require('../models');

const stream = require('stream');

const fs = require('fs');

module.exports.getAll = async (req, res, next) => {
    try {
        const signs = (await Sign.findAll()).map(({id, filename, date}) => ({id, filename, date}));
        return res.json(signs);
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        console.log(req);
        const file = req.file // || (req.body.sign ? {mimetype: 'image/png', originalname: `sign-${Date.now()}.png`, buffer: new Buffer(req.body.sign, 'base64')} : null);

        if (!file) {
            return next(createError(400, 'Incorrect input data'));
        }

        console.log("ok");

        const sign = await Sign.create({
            mimetype: file.mimetype,
            filename: file.originalname,
            data: file.buffer,
        });

        console.log("ok");

        if (!sign) {
            return next(createError(500, 'Failed to create a sign'));
        }

        return res.json({id: sign.id, filename: sign.filename, date: sign.date});
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.getById = async (req, res, next) => {
    try {
        const {sign_id} = req.params;
        
        if (!sign_id) {
            return next(createError(400, 'Incorrect sign id'));
        }
        
        const sign = await Sign.findOne({where: {id: sign_id}});
        
        if (!sign) {
            return next(createError(404, 'Sign not found'));
        }
        
        const fileContent = Buffer.from(sign.data, 'base64');
        const readStream = new stream.PassThrough();
        readStream.end(fileContent);

        res.set('Content-disposition', `attachment; filename=${sign.filename}`);
        res.set('Content-Type', sign.mimetype);

        readStream.pipe(res);

    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.updateById = async (req, res, next) => {
    try {
        const {sign_id} = req.params;
        if (!sign_id) {
            return next(createError(400, 'Incorrect sign id'));
        }
        const file = req.file;
        if (!file) {
            return next(createError(400, 'Incorrect input file'));
        }
        const [count, ...rest] = await Sign.update({
            filename: file.originalname,
            mimetype: file.mimetype,
            data: file.buffer
        },
        {
            where: {
                id: sign_id
            }
        });
        if (!count) {
            return next(createError(500, 'Failed to update a sign'));
        }
    } catch (err) {
        next(createError(500, err.message));
    }
};

module.exports.deleteById = async (req, res, next) => {
    try {
        const {sign_id} = req.params;
        if (!sign_id) {
            return next(createError(400, 'Incorrect sign id'));
        }
        const count = await Sign.destroy({where: {id: sign_id}});
        if (!count) {
            return next(createError(500, 'Failed to delete a sign'));
        }
        return res.json({done: true});
    } catch (err) {
        next(createError(500, err.message));
    }
};