'use strict';
module.exports = (sequelize, DataTypes) => {
  const matchup = sequelize.define('matchup', {
    homeScore: DataTypes.FLOAT,
    awayScore: DataTypes.FLOAT,
    homeTeamId: DataTypes.INTEGER,
    awayTeamId: DataTypes.INTEGER,
    homeRosterId: DataTypes.INTEGER,
    awayRosterId: DataTypes.INTEGER,
    seasonId: DataTypes.INTEGER,
    scoringPeriod: DataTypes.INTEGER,
    leagueId: DataTypes.INTEGER,
  }, {});
  matchup.associate = function(models) {
    // associations can be defined here
  };
  return matchup;
};
