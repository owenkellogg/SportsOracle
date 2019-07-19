'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schedule_id: {
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.STRING
      },
      endTime: {
        type: Sequelize.STRING
      },
      awayTeam: {
        type: Sequelize.STRING
      },
      homeTeam: {
        type: Sequelize.STRING
      },
      venue: {
        type: Sequelize.STRING
      },
      venueAllegiance: {
        type: Sequelize.STRING
      },
      scheduleStatus: {
        type: Sequelize.STRING
      },
      originalStartTime: {
        type: Sequelize.STRING
      },
      delayedOrPostponedReason: {
        type: Sequelize.STRING
      },
      playedStatus: {
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
    return queryInterface.dropTable('schedules');
  }
};