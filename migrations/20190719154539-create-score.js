'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_id: {
        type: Sequelize.INTEGER
      },
      schedule_id: {
        type: Sequelize.INTEGER
      },
      awayScoreTotal: {
        type: Sequelize.INTEGER
      },
      awayHitsTotal: {
        type: Sequelize.INTEGER
      },
      awayErrorsTotal: {
        type: Sequelize.INTEGER
      },
      homeScoreTotal: {
        type: Sequelize.INTEGER
      },
      homeHitsTotal: {
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
    return queryInterface.dropTable('scores');
  }
};