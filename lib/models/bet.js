'use strict';
module.exports = (sequelize, DataTypes) => {
  const bet = sequelize.define('bet', {
    game_id: DataTypes.INTEGER,
    sports_feed_id: DataTypes.INTEGER,
    home_team_key: DataTypes.STRING,
    away_team_key: DataTypes.STRING,
    bet_amount: DataTypes.FLOAT,
    home_winning_message: DataTypes.STRING,
    away_winning_message: DataTypes.STRING,
    escrow_address: DataTypes.STRING,
    status: DataTypes.STRING,
    oracle_signed_message: DataTypes.STRING
  }, {});
  bet.associate = function(models) {
    // associations can be defined here
  };
  return bet;
};