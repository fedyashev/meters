'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.createTable('SubAbonentSchemas', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        SubAbonentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          reference: {
            model: 'Places',
            key: 'id',
          },
        },
        RegisterId: {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Register',
            key: 'id',
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }))
      // .then(() => queryInterface.sequelize.query(
      //   `ALTER TABLE SubAbonentSchemas
      //   ADD CONSTRAINT SubAbonentSchemas_SubAbonentId_fkey FOREIGN KEY (SubAbonentId)
      //   REFERENCES Places (id)
      //   ON DELETE CASCADE`
      // ));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubAbonentSchemas');
  }
};