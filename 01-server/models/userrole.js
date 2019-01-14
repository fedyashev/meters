'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here
    UserRole.hasMany(models.User);  // User.UserRoleId
  };
  return UserRole;
};