'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.addColumn('Users', 'UserRoleId', {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       defaultValue: 1,
//       reference: {
//         model: 'UserRole',
//         key: 'id'
//       },
//       onUpdate: 'cascade',
//       onDelete: 'set null'
//     })
//     .then(() => {
//       return queryInterface.addColumn('Sessions', 'UserId', {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         reference: {
//           model: 'User',
//           key: 'id'
//         },
//         onUpdate: 'cascade',
//         onDelete: 'set null'
//       });
//     });
//   },

//   down: (queryInterface, Sequelize) => {
//     return queryInterface.removeColumn('Users', 'UserRoleId')
//       .then(() => queryInterface.removeColumn('Sessions', 'UserId'));
//   }
// };

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => {
        return queryInterface.addColumn('Sessions', 'UserId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          reference: {
            model: 'User',
            key: 'id'
          },
        });
      })
      .then(() => {
        return queryInterface.addColumn('Users', 'UserRoleId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
          reference: {
            model: 'UserRole',
            key: 'id'
          },
        });
      })
      .then(() => {
        return queryInterface.addColumn('Inspectors', 'UserId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          reference: {
            model: 'User',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Consumers', 'UserId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          reference: {
            model: 'User',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Places', 'ConsumerId', {
          type: Sequelize.INTEGER,
          //allowNull: true,
          reference: {
            model: 'Consumer',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Places', 'MeterId', {
          type: Sequelize.INTEGER,
          //allowNull: true,
          //unique: true,
          reference: {
            model: 'Meter',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Reports', 'ConsumerId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Consumer',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Reports', 'InspectorId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Inspector',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Reports', 'PlaceId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Place',
            key: 'id'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Reports', 'LastDataId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Data',
            key: 'id',
            as: 'LastData'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Reports', 'CurrentDataId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Data',
            key: 'id',
            as: 'CurrentData'
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Reports', 'SignId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Sign',
            key: 'id',
          }
        });
      })
      .then(() => {
        return queryInterface.addColumn('Data', 'MeterId', {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Meter',
            key: 'id',
          },
          onDetele: 'cascade',
          onUpdate: 'set null'
        });
      })
      .catch(err => console.log(err.message));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.removeColumn('Sessions', 'UserId'))
      .then(() => queryInterface.removeColumn('Users', 'UserRoleId'))
      .then(() => queryInterface.removeColumn('Inspectors', 'UserId'))
      .then(() => queryInterface.removeColumn('Consumers', 'UserId'))
      .then(() => queryInterface.removeColumn('Places', 'ConsumerId'))
      .then(() => queryInterface.removeColumn('Places', 'MeterId'))
      .then(() => queryInterface.removeColumn('Reports', 'ConsumerId'))
      .then(() => queryInterface.removeColumn('Reports', 'InspectorId'))
      .then(() => queryInterface.removeColumn('Reports', 'PlaceId'))
      .then(() => queryInterface.removeColumn('Reports', 'LastDataId'))
      .then(() => queryInterface.removeColumn('Reports', 'CurrentDataId'))
      .then(() => queryInterface.removeColumn('Reports', 'SignId'))
      .then(() => queryInterface.removeColumn('Data', 'MeterId'))
      .catch(err => console.log(err.message));
  }
};