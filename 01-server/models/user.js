'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: table_prefix + 'Users'
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.UserRole);  // User.UserRoleId
    User.hasOne(models.Consumer);
    User.hasOne(models.Inspector);
  };
  return User;
};