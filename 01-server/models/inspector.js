'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inspector = sequelize.define('Inspector', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Inspector.associate = function(models) {
    // associations can be defined here
    Inspector.belongsTo(models.User);  // Inspector.UserId
  };
  return Inspector;
};