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
    return queryInterface.bulkInsert('Consumers', [
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Consumers', null, {});
  }
};
