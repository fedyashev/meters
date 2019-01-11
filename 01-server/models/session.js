'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    userId: DataTypes.INTEGER
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};