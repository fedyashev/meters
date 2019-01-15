const createError = require('http-errors');
const {Consumer, User} = require('../models');
const validator = require('validator');
const crypt = require('../lib/crypt');

const pattern = '[a-zA-Zа-яА-Я0-9.]';

module.exports.getAll = (req, res, next) => {
  return Promise.resolve()
    .then(async () => {
      const rawConsumers = await Consumer.findAll();
      const consumers = rawConsumers.map(({id, name, email}) => ({id, name, email}));
      return res.json(consumers);
    })
    .catch(err => next(createError(500, err.message)));
};

module.exports.create = (req, res, next) => {
  return Promise.resolve()
    .then(async () => {
      const {email, name, login, password} = req.body;

      if (!email || !name || !login || !password) {
        return next(createError(400, 'Incorrect input parameters'));
      }

      const isValid = 
        validator.isEmail(email) &&
        validator.matches(name, password) && 
        validator.isAlphanumeric(login) &&
        validator.isAlphanumeric(password);

      if (!isValid) {
        return next(createError(400, 'Incorrect input parameters'));
      }


      const passwordHash = await crypt.getPasswordHash(password);
      const user = await User.create({login, passwordHash});
      const consumer = await Consumer.create({name, email, UserId: user.id});

      return res.json({
        id: consumer.id,
        name: consumer.name,
        email: consumer.email
      });
    })
    .catch(err => next(createError(500, err.message)));
};

module.exports.getById = (req, res, next) => {
  return Promise.resolve()
    .then(async () => {
      
    })
    .catch(err => next(createError(500, err.message)));
};

module.exports.updateById = (req, res, next) => {
  return Promise.resolve()
    .then(async () => {
      
    })
    .catch(err => next(createError(500, err.message)));
};

module.exports.deleteById = (req, res, next) => {
  return Promise.resolve()
    .then(async () => {
      
    })
    .catch(err => next(createError(500, err.message)));
};