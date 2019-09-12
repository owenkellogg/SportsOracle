'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('matchups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeScore: {
        type: Sequelize.FLOAT
      },
      awayScore: {
        type: Sequelize.FLOAT
      },
      homeTeamId: {
        type: Sequelize.INTEGER
      },
      awayTeamId: {
        type: Sequelize.INTEGER
      },
      homeRosterId: {
        type: Sequelize.INTEGER
      },
      awayRosterId: {
        type: Sequelize.INTEGER
      },
      seasonId:{
        type: Sequelize.INTEGER
      },
      scoringPeriod:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('matchups');
  }
};
