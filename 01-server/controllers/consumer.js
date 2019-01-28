const createError = require('http-errors');
const {Consumer, User, UserRole, sequelize} = require('../models');
const validator = require('validator');
const crypt = require('../lib/crypt');
const {Role} = require('../lib/roles');

const pattern = '[a-zA-Zа-яА-Я0-9.]';

module.exports.getAll = async (req, res, next) => {
  try {
    const consumers = await Consumer
      .findAll({
        include: [
          {model: User}
        ]
      })
      .map(({id, name, email, phone, User: {login}}) => ({id, name, email, phone, login}));
    return res.json(consumers);    
  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const {email, name, phone, login, password} = req.body;

    if (!email || !name || !login || !password) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const isValid = 
      validator.isEmail(email) &&
      validator.matches(name, pattern) && 
      validator.isAlphanumeric(login) &&
      validator.isAlphanumeric(password);

    if (!isValid) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const role = await UserRole.findOne({where: {role: Role.CONSUMER}});
    if (!role) {
      return next(createError(404, 'User role not found'));
    }

    let user = null;
    let consumer = null;
    try {
      let result = await sequelize.transaction(async (t) => {
        const passwordHash = await crypt.getPasswordHash(password);
        user = await User.create({login, passwordHash, UserRoleId: role.id}, {transaction: t});
        consumer = await Consumer.create({name, email, phone, UserId: user.id}, {transaction: t});
      });
    } catch (err) {
      return next(createError(500, err.message));
    }

    return res.json({
      id: consumer.id,
      name: consumer.name,
      email: consumer.email,
      phone: consumer.phone,
      user: {
        id: user.id,
        login: user.login,
        role: Role.CONSUMER
      }
    });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    const {consumer_id} = req.params;
    
    if (!consumer_id) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const consumer = await Consumer.findOne({
      where: {id: consumer_id},
      include: [
        {model: User}
      ]
    });
    
    if (!consumer) {
      return next(createError(404, 'Consumer not found'));
    }

    return res.json({
      id: consumer.id,
      name: consumer.name,
      email: consumer.email,
      phone: consumer.phone,
      login: consumer.User.login
    });

  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports.updateById = async (req, res, next) => {
  try {
    const {consumer_id} = req.params;
    const {name, email, phone} = req.body;

    if (!consumer_id || !name || !email) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const isValid = 
      validator.matches(name, pattern) &&
      validator.isEmail(email);

    if (!isValid) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const [count, ...rest] = await Consumer.update({name, email, phone: phone}, {where: {id: consumer_id}});

    if (!count) {
      return next(createError(400, 'Updating failed'));  
    }

    return res.json({
      id: consumer_id,
      name,
      email,
      phone: phone
    });    
   }
  catch(err) {
    return next(createError(500, err.message));
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const {consumer_id} = req.params;
    
    if (!consumer_id) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const count = await Consumer.destroy({where: {id: consumer_id}});

    if (!count) {
      return next(createError(500, 'Deleting failed'));  
    }

    return res.json({done: true});
  }
  catch (err) {
    return next(createError(500, err.message));
  }
};