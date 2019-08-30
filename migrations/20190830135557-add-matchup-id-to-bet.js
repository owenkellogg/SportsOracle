'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('bets', 'matchupId', {
      type: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('bets', 'matchupId');
  }
}
