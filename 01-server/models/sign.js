'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Sign = sequelize.define('Sign', {
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    mimetype: DataTypes.STRING,
    filename: DataTypes.STRING,
    data: DataTypes.BLOB('long')
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Signs'
    });
  Sign.associate = function (models) {
    // associations can be defined here
    Sign.hasOne(models.Report);
  };
  return Sign;
};