'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubAbonent = sequelize.define('SubAbonent', {
    // 
  }, {});
  SubAbonent.associate = function(models) {
    // associations can be defined here
    SubAbonent.belongsTo(models.Place, {as: 'SubAbonent', foreignKey: 'SubAbonentId'});  // Register.PlaceId
    SubAbonent.belongsTo(models.Register);
  };
  return SubAbonent;
};