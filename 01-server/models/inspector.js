'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Inspector = sequelize.define('Inspector', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я. ]*([a-zA-Zа-яА-Я]+|\.)$/,
        notEmpty: true,
        len: [2, 256],
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Name must be a string');
          }
        }
      }
    }
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Inspectors'
    });
  Inspector.associate = function (models) {
    // associations can be defined here
    Inspector.belongsTo(models.User, {
      foreignKey: {
        attribute: 'UserId',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1
        }
      }
    });  // Inspector.UserId
  };
  return Inspector;
};