'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table_prefix + 'Meters', [
      {
        number: '001',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        number: '002',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        number: '003',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        number: '004',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        number: '005',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        number: '100',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table_prefix + 'Meters', null, {});
  }
};
