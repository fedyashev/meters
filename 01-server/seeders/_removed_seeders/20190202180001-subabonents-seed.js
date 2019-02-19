'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table_prefix + 'SubAbonentSchemas', [
      {
        RegisterId: '1',
        SubAbonentId: '1',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        RegisterId: '1',
        SubAbonentId: '3',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        RegisterId: '1',
        SubAbonentId: '5',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table_prefix + 'SubAbonentSchemas', null, {});
  }
};
