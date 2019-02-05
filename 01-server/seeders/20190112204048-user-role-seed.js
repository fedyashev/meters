'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(table_prefix + 'UserRoles', [
        {
          role: 'NONE',
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        },
        {
          role: 'ADMIN',
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        },
        {
          role: 'OWNER',
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        },
        {
          role: 'INSPECTOR',
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        },
        {
          role: 'CONSUMER',
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete(table_prefix + 'UserRoles', null, {});
  }
};
