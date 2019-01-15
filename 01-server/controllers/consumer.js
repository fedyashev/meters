const createError = require('http-errors');
const {Consumer, User, sequelize} = require('../models');
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
        validator.matches(name, pattern) && 
        validator.isAlphanumeric(login) &&
        validator.isAlphanumeric(password);

      if (!isValid) {
        console.log("OK");
        return next(createError(400, 'Incorrect input parameters'));
      }

      try {
        const passwordHash = await crypt.getPasswordHash(password);
        let result = await sequelize.transaction(async (t) => {
          const user = await User.create({login, passwordHash}, {transaction: t});
          const {id} = await Consumer.create({name, email, UserId: user.id}, {transaction: t});
          return res.json({id, name, email});
        });
      } catch (err) {
        return next(createError(500, err.message));
      }

    })
    .catch(err => next(createError(500, err.message)));
};

module.exports.getById = async (req, res, next) => {
  try {
    const {consumer_id} = req.params;
    
    if (!consumer_id) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const consumer = await Consumer.findOne({where: {id: consumer_id}});
    
    if (!consumer) {
      return next(createError(404, 'Consumer not found'));
    }

    return res.json({
      id: consumer.id,
      name: consumer.name,
      email: consumer.email
    });

  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports.updateById = async (req, res, next) => {
  try {
    const {consumer_id} = req.params;
    const {name, email} = req.body;

    if (!consumer_id || !name || !email) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const isValid = 
      validator.matches(name, pattern) &&
      validator.isEmail(email);

    if (!isValid) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const [count, ...rest] = await Consumer.update({name, email}, {where: {id: consumer_id}});

    if (count > 0) {
      return res.json({
        id: consumer_id,
        name,
        email
      });
    }

    return next(createError(400, 'Updating failed'));
   }
  catch(err) {
    return next(createError(500, err.errors[0].message || err.message));
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const {consumer_id} = req.params;
    
    if (!consumer_id) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const count = await Consumer.destroy({where: {id: consumer_id}});

    if (count > 0) {
      return res.json({done: true});
    }

    return next(createError(500, 'Deleting failed'));
  }
  catch (err) {
    return next(createError(500, err.errors[0].message || err.message));
  }
};