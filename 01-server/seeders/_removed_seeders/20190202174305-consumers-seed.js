'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table_prefix + 'Consumers', [
      {
        UserId: '2',
        name: 'ИП Васильев',
        email: 'c1.test.meters@gmail.com',
        phone: '80291001010',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        UserId: '3',
        name: 'ИП Андреев',
        email: 'c2.test.meters@gmail.com',
        phone: '80291001010',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        UserId: '4',
        name: 'Северный рынок',
        email: 'c3.test.meters@yandex.by',
        phone: '80291001010',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table_prefix + 'Consumers', null, {});
  }
};
