'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meter = sequelize.define('Meter', {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Meter.associate = function(models) {
    // associations can be defined here
    Meter.hasOne(models.Place);
    Meter.hasMany(models.Data);
  };
  return Meter;
};