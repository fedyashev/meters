'use strict';
const {SubAbonentSchema} = require('./index');
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSignNeed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
      // hooks: {
      //   // afterBulkDestroy: (name, options) => {
      //   //   console.log(name);
      //   //   //return SubAbonents.destroy({ where: { SubAbonentId: place.id } });
      //   // },
      //   beforeBulkDestroy: (options) => {
      //     options.individualHooks = true;
      //     return options;
      //     //return SubAbonents.destroy({ where: { SubAbonentId: place.id } });
      //   },
      //   afterDestroy: async (place, options) => {
      //     //console.log(name);
      //     try {
      //       console.log('======\n', SubAbonentSchema);
      //       const countSubabonents = await SubAbonentSchema.destroy({ where: { SubAbonentId: place.id } });
      //       console.log(countSubabonents);
      //     } catch (err) {
      //       console.log(err);
      //     }
      //   }
      // }
    });
  // Place.hook('afterDestroy', async (place, options) => {
  //   console.log(place);
  //   const countSubabonents = await SubAbonents.destroy({ where: { SubAbonentId: place.id } });
  // });
  Place.associate = function (models) {
    // associations can be defined here
    Place.belongsTo(models.Consumer);  // Place.ConsumerId
    Place.belongsTo(models.Meter);  // Place.MeterId
    Place.hasMany(models.Report);
    Place.hasMany(models.SubAbonentSchema, { foreignKey: 'SubAbonentId' });
  };
  return Place;
};