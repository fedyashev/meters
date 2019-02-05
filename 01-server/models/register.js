'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define('Register', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
      freezeTableName: true,
      tableName: table_prefix + 'Registers'
    });
  Register.associate = function (models) {
    // associations can be defined here
    Register.belongsTo(models.Place, { as: 'GroupAbonent', foreignKey: 'GroupAbonentId' });  // Register.GroupPlaceId
    Register.hasMany(models.SubAbonentSchema, { as: 'SubAbonets', foreignKey: 'RegisterId' });
  };
  return Register;
};