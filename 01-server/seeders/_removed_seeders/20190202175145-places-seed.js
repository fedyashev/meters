'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table_prefix + 'Places', [
      {
        name: 'Ролет А1',
        MeterId: '1',
        ConsumerId: '1',
        isSignNeed: true,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        name: 'Ролет А2',
        MeterId: '2',
        ConsumerId: '1',
        isSignNeed: true,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        name: 'Ролет А3',
        MeterId: '3',
        ConsumerId: '1',
        isSignNeed: true,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        name: 'Ролет А4',
        MeterId: '4',
        ConsumerId: '2',
        isSignNeed: true,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        name: 'Ролет А5',
        MeterId: '5',
        ConsumerId: '2',
        isSignNeed: true,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        name: 'Групповой счетчик А1-А5',
        MeterId: '6',
        ConsumerId: '3',
        isSignNeed: false,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table_prefix + 'Places', null, {});
  }
};
