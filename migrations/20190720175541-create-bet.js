'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_id: {
        type: Sequelize.INTEGER
      },
      sports_feed_id: {
        type: Sequelize.INTEGER
      },
      home_team_key: {
        type: Sequelize.STRING
      },
      away_team_key: {
        type: Sequelize.STRING
      },
      bet_amount_usd: {
        type: Sequelize.FLOAT
      },
      bet_amount_bch: {
        type: Sequelize.FLOAT
      },
      home_winning_message: {
        type: Sequelize.STRING
      },
      away_winning_message: {
        type: Sequelize.STRING
      },
      escrow_address: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      home_funding_address: {
        type: Sequelize.STRING
      },
      away_funding_address: {
        type: Sequelize.STRING
      },
      away_funded: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      home_funded: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      oracle_signed_message: {
        type: Sequelize.STRING
      },
      home_funding_invoice_uid: {
        type: Sequelize.STRING
      },
      away_funding_invoice_uid: {
        type: Sequelize.STRING
      },
      oracle_public_key: {
        type: Sequelize.STRING
      },
      outScript: {
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
    return queryInterface.dropTable('bets');
  }
};
