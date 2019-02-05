'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Data'
    });
  Data.associate = function (models) {
    // associations can be defined here
    Data.belongsTo(models.Meter);  // Data.MeterId
    Data.hasOne(models.Report, { as: 'LastData', foreignKey: 'LastDataId' });
    Data.hasOne(models.Report, { as: 'CurrentData', foreignKey: 'CurrentDataId' });
  };
  return Data;
};