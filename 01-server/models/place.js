'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSignNeed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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