'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z][a-zA-Z0-9]+$/,
        notEmpty: true,
        len: [2, 16],
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\S*$/,
        notEmpty: true,
        len: [2, 256],
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Hash must be a string');
          }
        },
      }
    }
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Users'
    });
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.UserRole, {foreignKey: {
      attribute: 'UserRoleId',
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    }});  // User.UserRoleId
    User.hasOne(models.Consumer);
    User.hasOne(models.Inspector);
  };
  return User;
};