'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Places', [
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Places', null, {});
  }
};
