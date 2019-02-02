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
    return queryInterface.bulkInsert('SubAbonentSchemas', [
      {
        RegisterId: '1',
        SubAbonentId: '1',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        RegisterId: '1',
        SubAbonentId: '3',
        createdAt: '0000-00-00',
        updatedAt: '0000-00-00'
      },
      {
        RegisterId: '1',
        SubAbonentId: '5',
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
    return queryInterface.bulkDelete('SubAbonentSchemas', null, {});
  }
};
