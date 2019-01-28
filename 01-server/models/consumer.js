'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consumer = sequelize.define('Consumer', {
    name: {
      type: DataTypes.STRING,
      alloNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      alloNull: true
    }
  }, {});
  Consumer.associate = function(models) {
    // associations can be defined here
    Consumer.belongsTo(models.User);  // Consumer.UserId
    Consumer.hasMany(models.Report);
    Consumer.hasMany(models.Place);
  };
  return Consumer;
};