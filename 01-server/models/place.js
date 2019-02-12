'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Name must be a string');
          }
        },
        notEmpty: true,
        is: /^\S.*\S$/,
        len: [2, 256]
      }
    },
    isSignNeed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isBoolean(value) {
          if (typeof value !== 'boolean') {
            throw new Error('IsSignNeed must be a boolean');
          }
        }
      }
    }
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Places'
    });
  Place.associate = function (models) {
    // associations can be defined here
    Place.belongsTo(models.Consumer);  // Place.ConsumerId
    Place.belongsTo(models.Meter);  // Place.MeterId
    Place.hasMany(models.Report);
    Place.hasMany(models.SubAbonentSchema, { foreignKey: 'SubAbonentId' });
  };
  return Place;
};