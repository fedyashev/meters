'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table_prefix + 'act_01', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      inspector: {
        type: Sequelize.STRING,
        allowNull: false
      },
      consumer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      place: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meter: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_value: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      current_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      current_value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      ConsumerSignId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Sign',
          key: 'id',
          as: 'ConsumerSign'
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
    return queryInterface.dropTable(table_prefix + 'act_01');
  }
};