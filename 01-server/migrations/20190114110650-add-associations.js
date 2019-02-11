'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Users', 'UserRoleId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
          reference: {
            model: 'UserRole',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Inspectors', 'UserId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          reference: {
            model: 'User',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Consumers', 'UserId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          reference: {
            model: 'User',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Places', 'ConsumerId', {
          type: Sequelize.INTEGER,
          //allowNull: true,
          reference: {
            model: 'Consumer',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Places', 'MeterId', {
          type: Sequelize.INTEGER,
          //allowNull: true,
          unique: true,
          reference: {
            model: 'Meter',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Reports', 'ConsumerId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Consumer',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Reports', 'InspectorId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Inspector',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Reports', 'PlaceId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Place',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Reports', 'MeterId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Meter',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Reports', 'LastDataId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Data',
            key: 'id',
            as: 'LastData'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Reports', 'CurrentDataId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Data',
            key: 'id',
            as: 'CurrentData'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Reports', 'SignId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Sign',
            key: 'id',
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn(table_prefix + 'Data', 'MeterId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Meter',
            key: 'id',
          },
          onDetele: 'cascade',
          onUpdate: 'set null'
        });
      })
      .catch(err => console.log(err.message));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.removeColumn(table_prefix + 'Users', 'UserRoleId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Inspectors', 'UserId'))
      .then(() => queryInterface.removeColumn(table_prefix +'Consumers', 'UserId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Places', 'ConsumerId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Places', 'MeterId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Reports', 'ConsumerId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Reports', 'InspectorId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Reports', 'PlaceId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Reports', 'MeterId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Reports', 'LastDataId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Reports', 'CurrentDataId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Reports', 'SignId'))
      .then(() => queryInterface.removeColumn(table_prefix + 'Data', 'MeterId'))
      .catch(err => console.log(err.message));
  }
};