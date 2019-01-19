'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          login: 'n1',  //cat
          passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
          UserRoleId: 1,
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        },
        {
          login: 'a1',  // cat
          passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
          UserRoleId: 2,
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        },
        {
          login: 'o1',  // cat
          passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
          UserRoleId: 3,
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        },
        {
          login: 'i1',  //cat
          passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
          UserRoleId: 4,
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        },
        {
          login: 'c1',  //cat
          passwordHash: '$2a$10$Of7OQc.8oLdRYAGkcH6O8O69C0d6Boup7jySovoiJbkCAVsk6HBKC',
          UserRoleId: 5,
          createdAt: '0000-00-00',
          updatedAt: '0000-00-00'
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('users', null, {});
  }
};
