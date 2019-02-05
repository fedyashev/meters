'use strict';

const {db: {table_prefix}, db: {table_names}} = require('../config/config.json');
//const {table_prefix} = require('../config/db-names');

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
  }, {
    freezeTableName: true,
    tableName: table_prefix + 'Consumers'
  });
  Consumer.associate = function(models) {
    // associations can be defined here
    Consumer.belongsTo(models.User);  // Consumer.UserId
    Consumer.hasMany(models.Report);
    Consumer.hasMany(models.Place);
  };
  return Consumer;
};