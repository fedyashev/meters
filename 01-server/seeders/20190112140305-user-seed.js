'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          login: 'redcat',  // woodseed
          passwordHash: '$2a$10$3Ei9DJ/ULqQ7ixw44UETse53ZBPmFgNiNpIPKy0gF/un.kAMRO/li',
          UserRoleId: 2
        },
        {
          login: 'owner',  // qwer1234
          passwordHash: '$2a$10$0LuIoP68ldUaU.JEShHTeeCeY/4lkbx13siIpedyduXSds7FqR8hC',
          UserRoleId: 3
        },
        {
          login: 'inspector',  //starfrog
          passwordHash: '$2a$10$QX6wVHaWFVWDkVMnKeWAOeyNoOYDTYNsUu2FzlwJVMerO/YFLLxmu',
          UserRoleId: 4
        },
        {
          login: 'consumer',  //goldcoin
          passwordHash: '$2a$10$pjmu.hx0dXt0VcZVpkKcFuFqOAwlMTboYsIqLpSfqyXpevUSgauUe',
          UserRoleId: 5
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('users', null, {});
  }
};
