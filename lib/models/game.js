'use strict';
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    date: DataTypes.DATE,
    venue: DataTypes.STRING,
    home_team: DataTypes.STRING,
    away_team: DataTypes.STRING,
    home_score: DataTypes.STRING,
    away_score: DataTypes.STRING,
    away_hit_total: DataTypes.STRING,
    home_hit_total: DataTypes.STRING,
    away_error_total: DataTypes.STRING,
    home_error_total: DataTypes.STRING,
    signature: DataTypes.STRING,
    signature_id: DataTypes.INTEGER,
    sports_feed_id: DataTypes.INTEGER,
    message:  DataTypes.STRING,
  }, {});
  game.associate = function(models) {
    // associations can be defined here
  };
  return game;
};
