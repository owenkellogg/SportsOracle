'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      venue: {
        type: Sequelize.STRING
      },
      home_team: {
        type: Sequelize.STRING
      },
      away_team: {
        type: Sequelize.STRING
      },
      home_score: {
        type: Sequelize.STRING
      },
      away_score: {
        type: Sequelize.STRING
      },
      away_hit_total: {
        type: Sequelize.STRING
      },
      home_hit_total: {
        type: Sequelize.STRING
      },
      away_error_total: {
        type: Sequelize.STRING
      },
      home_error_total: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('games');
  }
};
