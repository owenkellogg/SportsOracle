'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // temporary until we can use some real geographic types
    await queryInterface.addColumn('games', 'message', {
      type: Sequelize.STRING
    });


  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.removeColumn('games', 'message');

  }
}
