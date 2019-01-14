'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sign = sequelize.define('Sign', {
    data: DataTypes.BLOB
  }, {});
  Sign.associate = function(models) {
    // associations can be defined here
    Sign.hasOne(models.Report);
  };
  return Sign;
};