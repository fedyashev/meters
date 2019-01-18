const createError = require('http-errors');
const {UserRole} = require('../models');

module.exports.getAll = async (req, res, next) => {
  try {
    const roles = await UserRole.findAll()
      .map(({id, role}) => ({id, role}));
    return res.json(roles);
  } catch (err) {
    return next(createError(500, err.message));
  }
}