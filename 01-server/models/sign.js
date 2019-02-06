'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Sign = sequelize.define('Sign', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.BLOB('long'),
      allowNull: false
    }
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