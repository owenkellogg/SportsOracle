'use strict';
module.exports = (sequelize, DataTypes) => {
  const bet = sequelize.define('bet', {
    game_id: DataTypes.INTEGER,
    sports_feed_id: DataTypes.INTEGER,
    home_team_key: DataTypes.STRING,
    away_team_key: DataTypes.STRING,
    bet_amount_usd: DataTypes.FLOAT,
    bet_amount_bch: DataTypes.FLOAT,
    home_winning_message: DataTypes.STRING,
    away_winning_message: DataTypes.STRING,
    escrow_address: DataTypes.STRING,
    message: DataTypes.STRING,
    home_funding_address: DataTypes.STRING,
    home_funded: DataTypes.BOOLEAN,
    away_funded: DataTypes.BOOLEAN,
    oracle_public_key: DataTypes.BOOLEAN,
    away_funding_address: DataTypes.STRING,
    away_funding_invoice_uid: DataTypes.STRING,
    home_funding_invoice_uid: DataTypes.STRING,
    state: DataTypes.STRING,
    outScript: DataTypes.STRING,
    oracle_signed_message: DataTypes.STRING
  }, {});
  bet.associate = function(models) {
    // associations can be defined here
  };
  return bet;
};
