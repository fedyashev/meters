'use strict';
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
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.UserRole);  // User.UserRoleId
    User.hasOne(models.Consumer);
    User.hasOne(models.Inspector);
  };
  return User;
};