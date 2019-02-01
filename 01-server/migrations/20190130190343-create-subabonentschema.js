'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubAbonentSchemas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SubAbonentId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Place',
          key: 'id',
          as: 'SubAbonent'
        }
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
    return queryInterface.dropTable('SubAbonentSchemas');
  }
};