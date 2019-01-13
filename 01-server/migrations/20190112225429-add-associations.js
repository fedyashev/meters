'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'UserRoleId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      reference: {
        model: 'UserRole',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    })
    .then(() => {
      return queryInterface.addColumn('Sessions', 'UserId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'UserRoleId')
      .then(() => {
        return queryInterface.removeColumn('Sessions', 'UserId');
      });
  }
};
