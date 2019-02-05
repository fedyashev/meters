'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    date: DataTypes.DATE
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Reports'
    });
  Report.associate = function (models) {
    // associations can be defined here
    Report.belongsTo(models.Inspector);  // Report.InspectorId
    Report.belongsTo(models.Consumer);  // Report.ConsumerId
    Report.belongsTo(models.Place);  // Report.PlaceId
    Report.belongsTo(models.Meter);  // Report.MeterId
    Report.belongsTo(models.Data, { as: 'LastData', foreignKey: 'LastDataId' });  // Report.LastDataId
    Report.belongsTo(models.Data, { as: 'CurrentData', foreignKey: 'CurrentDataId' });  // Report.CurrentDataId
    Report.belongsTo(models.Sign);  // Report.SignId
  };
  return Report;
};