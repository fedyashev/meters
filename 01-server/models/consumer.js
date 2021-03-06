'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Consumer = sequelize.define('Consumer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9. '"]*([a-zA-Zа-яА-Я0-9"']+|\.)$/,
        len: [2, 256],
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Name must be a string');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [8, 256]
      }
    },
    phone: {
      type: DataTypes.STRING,
      alloNull: true,
    }
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Consumers'
    });
  Consumer.associate = function (models) {
    // associations can be defined here
    Consumer.belongsTo(models.User);  // Consumer.UserId
    Consumer.hasMany(models.Report);
    Consumer.hasMany(models.Place);
  };
  return Consumer;
};