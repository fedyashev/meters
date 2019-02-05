'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table_prefix + 'SubAbonentSchemas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SubAbonentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        reference: {
          model: 'Places',
          key: 'id',
        },
      },
      RegisterId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Register',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table_prefix + 'SubAbonentSchemas');
  }
};