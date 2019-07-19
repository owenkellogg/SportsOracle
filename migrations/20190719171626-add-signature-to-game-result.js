'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // temporary until we can use some real geographic types
    await queryInterface.addColumn('games', 'signature', {
      type: Sequelize.STRING
    });

    // temporary until we can use some real geographic types
    await queryInterface.addColumn('games', 'signature_id', {
      type: Sequelize.INTEGER
    });

    await queryInterface.addColumn('games', 'sports_feed_id', {
      type: Sequelize.INTEGER,
      unique: true
    });



  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.removeColumn('games', 'signature');

     await queryInterface.removeColumn('games', 'sports_feed_id');

     await queryInterface.removeColumn('games', 'signature_id');

  }
}
