'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table_prefix + 'Registers', [
      {
        name: 'Реестр 01',
        GroupAbonentId: '6',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table_prefix + 'Registers', null, {});
  }
};
