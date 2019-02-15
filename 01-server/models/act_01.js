'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const act_01 = sequelize.define('act_01', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    inspector: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Inspector must be a string');
          }
        },
        notEmpty: true,
        len: [2, 256]
      }
    },
    consumer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Consumer must be a string');
          }
        },
        notEmpty: true,
        len: [2, 256]
      }
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Place must be a string');
          }
        },
        notEmpty: true,
        len: [2, 256]
      }
    },
    meter: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Meter must be a string');
          }
        },
        notEmpty: true,
        len: [1, 256]
      }
    },
    last_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_value: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    current_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    current_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
  }, {
    freezeTableName: true,
    tableName: table_prefix + 'act_01'
  });
  act_01.associate = function(models) {
    act_01.belongsTo(models.Sign, { as: 'ConsumerSign', foreignKey: 'ConsumerSignId' });
  };
  return act_01;
};