'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const SubAbonentSchema = sequelize.define('SubAbonentSchema', {
    //
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'SubAbonentSchemas'
    });
  SubAbonentSchema.associate = function (models) {
    // associations can be defined here
    SubAbonentSchema.belongsTo(models.Place, { as: 'SubAbonent', foreignKey: 'SubAbonentId' });  // Register.PlaceId
    SubAbonentSchema.belongsTo(models.Register);
  };
  return SubAbonentSchema;
};