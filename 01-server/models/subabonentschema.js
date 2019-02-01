'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubAbonentSchema = sequelize.define('SubAbonentSchema', {
    // 
  }, {});
  SubAbonentSchema.associate = function(models) {
    // associations can be defined here
    SubAbonentSchema.belongsTo(models.Place, {as: 'SubAbonent', foreignKey: 'SubAbonentId'});  // Register.PlaceId
    SubAbonentSchema.belongsTo(models.Register);
  };
  return SubAbonentSchema;
};