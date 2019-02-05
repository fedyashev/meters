'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table_prefix + 'Registers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      GroupAbonentId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Place',
          key: 'id',
          as: 'GroupAbonent'
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
    return queryInterface.dropTable(table_prefix + 'Registers');
  }
};