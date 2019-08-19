'use strict';
module.exports = (sequelize, DataTypes) => {
  const score = sequelize.define('score', {
    game_id: DataTypes.INTEGER,
    schedule_id: DataTypes.INTEGER,
    awayScoreTotal: DataTypes.INTEGER,
    awayHitsTotal: DataTypes.INTEGER,
    awayErrorsTotal: DataTypes.INTEGER,
    homeScoreTotal: DataTypes.INTEGER,
    homeHitsTotal: DataTypes.INTEGER
  }, {});
  score.associate = function(models) {
    // associations can be defined here
  };
  return score;
};