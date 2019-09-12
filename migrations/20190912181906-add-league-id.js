'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('matchups', 'leagueId', {
      type: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('matchups', 'leagueId');
  }
}
