'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Inspector = sequelize.define('Inspector', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Inspectors'
    });
  Inspector.associate = function (models) {
    // associations can be defined here
    Inspector.belongsTo(models.User);  // Inspector.UserId
  };
  return Inspector;
};