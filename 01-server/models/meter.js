'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Meter = sequelize.define('Meter', {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Number must be a string');
          }
        },
        notEmpty: true,
        is: /^[a-zA-Zа-яА-Я0-9-]+$/,
        len: [1, 256]
      }
    }
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Meters'
    });
  Meter.associate = function (models) {
    // associations can be defined here
    Meter.hasOne(models.Place);
    Meter.hasMany(models.Data);
    Meter.hasMany(models.Report);
  };
  return Meter;
};