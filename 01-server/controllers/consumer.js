const createError = require('http-errors');
const { Consumer, User, UserRole, sequelize } = require('../models');
const validator = require('validator');
const crypt = require('../lib/crypt');
const { Role } = require('../lib/roles');

const pattern = /^[a-zA-Zа-яА-Я0-9\s\.\"\'-]{2,}$/;

module.exports.count = async (req, res, next) => {
  try {
    const count = await Consumer.count();
    return res.json({ count });
  } catch (err) {
    return next(createError(500, err.message));
  }
}

module.exports.getAll = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const lim = Number(limit);
    const off = Number(offset);
    let consumers = null;
    if (!isNaN(lim) && !isNaN(off) && off >= 0 && lim > 0) {
      consumers = await Consumer
        .findAll({
          offset: off,
          limit: lim,
          include: [{ model: User }]
        })
        .map(({ id, name, email, phone, User: { login } }) => ({ id, name, email, phone, login }));
    }
    else {
      consumers = await Consumer
        .findAll({ include: [{ model: User }] })
        .map(({ id, name, email, phone, User: { login } }) => ({ id, name, email, phone, login }));
    }
    return res.json(consumers);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { email, name, phone, login, password } = req.body;

    if (!login) return next(createError(400, 'Login is required'));
    if (!password) return next(createError(400, 'Password is required'));
    if (!name) return next(createError(400, 'Name is required'));
    if (!email) return next(createError(400, 'Email is required'));

    if (!(validator.isAlphanumeric(login) && login.length >= 2)) return next(createError(400, 'Login must contain letters, numbers and length min 2 chars'));
    if (!(validator.isAlphanumeric(password) && password.length >= 2)) return next(createError(400, 'Password must contain letters, numbers and length min 2 chars'));
    if (!(validator.matches(name, pattern) && name.length >= 2)) return next(createError(400, 'Name must contain letters, numbers and length min 2 chars'));
    if (!validator.isEmail(email)) return next(createError(400, 'Invalid email'));
    if (phone && !validator.isNumeric(phone)) return next(createError(400, 'Phone must contain from numbers'));

    const role = await UserRole.findOne({ where: { role: Role.CONSUMER } });
    if (!role) {
      return next(createError(404, 'User role not found'));
    }

    let user = null;
    let consumer = null;
    try {
      let result = await sequelize.transaction(async (t) => {
        const passwordHash = await crypt.getPasswordHash(password);
        user = await User.create({ login, passwordHash, UserRoleId: role.id }, { transaction: t });
        consumer = await Consumer.create({ name, email, phone, UserId: user.id }, { transaction: t });
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
    const { consumer_id } = req.params;

    if (!consumer_id) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    const consumer = await Consumer.findOne({
      where: { id: consumer_id },
      include: [
        { model: User }
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
    const { consumer_id } = req.params;
    const { name, email, phone } = req.body;

    if (!consumer_id) return next(createError(400, 'Consumer id is required'));
    if (!name) return next(createError(400, 'Name is required'));
    if (!email) return next(createError(400, 'Email is required'));

    if (!(validator.matches(name, pattern) && name.length >= 2)) return next(createError(400, 'Name must contain letters, numbers and length min 2 chars'));
    if (!validator.isEmail(email)) return next(createError(400, 'Invalid email'));
    if (phone && !validator.isNumeric(phone)) return next(createError(400, 'Phone must contain from numbers'));

    const [count, ...rest] = await Consumer.update({ name, email, phone: phone }, { where: { id: consumer_id } });

    if (!count) {
      return next(createError(500, 'Failed to update a consumer'));
    }

    return res.json({
      id: consumer_id,
      name,
      email,
      phone: phone
    });
  }
  catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const { consumer_id } = req.params;

    if (!consumer_id) {
      return next(createError(400, 'Incorrect input parameters'));
    }

    let count = null;
    try {
      let result = await sequelize.transaction(async (t) => {
        const consumer = await Consumer.findOne({ where: { id: consumer_id } });
        count = await Consumer.destroy({ where: { id: consumer_id } }, { transaction: t });
        const userCount = await User.destroy({ where: { id: consumer.UserId } }, { transaction: t });
      });
    } catch (err) {
      return next(createError(500, err.message));
    }

    if (!count) {
      return next(createError(500, 'Failed to delete an inspector'));
    }

    return res.json({ done: true });
  }
  catch (err) {
    return next(createError(500, err.message));
  }
};