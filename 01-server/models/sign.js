'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sign = sequelize.define('Sign', {
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    mimetype: DataTypes.STRING,
    filename: DataTypes.STRING,
    data: DataTypes.BLOB('long')
  }, {});
  Sign.associate = function(models) {
    // associations can be defined here
    Sign.hasOne(models.Report);
  };
  return Sign;
};