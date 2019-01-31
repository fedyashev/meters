'use strict';
module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define('Register', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Register.associate = function(models) {
    // associations can be defined here
    Register.belongsTo(models.Place, {as: 'GroupAbonent', foreignKey: 'GroupAbonentId'});  // Register.GroupPlaceId
    Register.hasMany(models.SubAbonent, {as: 'SubAbonets', foreignKey: 'RegisterId'});
  };
  return Register;
};