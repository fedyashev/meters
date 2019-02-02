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
    return queryInterface.bulkInsert('Meters', [
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Meters', null, {});
  }
};
