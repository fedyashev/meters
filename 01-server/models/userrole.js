'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true,
    tableName: table_prefix + 'UserRoles'
  });
  UserRole.associate = function(models) {
    // associations can be defined here
    UserRole.hasMany(models.User);  // User.UserRoleId
  };
  return UserRole;
};