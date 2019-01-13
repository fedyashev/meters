'use strict';
const rack = require('hat').rack();

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
    Session.belongsTo(models.User);  // Session.UserId
  };
  return Session;
};