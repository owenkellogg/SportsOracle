'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FantasyFootballTeams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER
      },
      leagueId: {
        type: Sequelize.INTEGER
      },
      seasonId: {
        type: Sequelize.INTEGER
      },
      abbreviation: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      logoURL: {
        type: Sequelize.STRING
      },
      wins: {
        type: Sequelize.INTEGER
      },
      losses: {
        type: Sequelize.INTEGER
      },
      ties: {
        type: Sequelize.INTEGER
      },
      divisionWins: {
        type: Sequelize.INTEGER
      },
      divisionLosses: {
        type: Sequelize.INTEGER
      },
      divisionTies: {
        type: Sequelize.INTEGER
      },
      totalPointsScored: {
        type: Sequelize.FLOAT
      },
      regularSeasonPointsFor: {
        type: Sequelize.FLOAT
      },
      regularSeasonPointsAgainst: {
        type: Sequelize.FLOAT
      },
      winningPercentage: {
        type: Sequelize.FLOAT
      },
      playoffSeed: {
        type: Sequelize.INTEGER
      },
      finalStandingsPosition: {
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
    return queryInterface.dropTable('FantasyFootballTeams');
  }
};

