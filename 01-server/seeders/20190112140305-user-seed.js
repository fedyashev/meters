'use strict';

const { db: { table_prefix } } = require('../config/config.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table_prefix + 'Users', [
      {
        login: 'a1',  // cat
        passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
        UserRoleId: 2,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        login: 'c1',  // cat
        passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
        UserRoleId: 5,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        login: 'c2',  // cat
        passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
        UserRoleId: 5,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        login: 'c3',  // cat
        passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
        UserRoleId: 5,
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table_prefix + 'Users', null, {});
  }
};
