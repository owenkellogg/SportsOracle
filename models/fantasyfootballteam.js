'use strict';
module.exports = (sequelize, DataTypes) => {
  const FantasyFootballTeam = sequelize.define('FantasyFootballTeam', {
    leagueId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    seasonId: DataTypes.INTEGER,
    abbreviation: DataTypes.STRING,
    name: DataTypes.STRING,
    logoURL: DataTypes.STRING,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    ties: DataTypes.INTEGER,
    divisionWins: DataTypes.INTEGER,
    divisionLosses: DataTypes.INTEGER,
    divisionTies: DataTypes.INTEGER,
    totalPointsScored: DataTypes.FLOAT,
    regularSeasonPointsFor: DataTypes.FLOAT,
    regularSeasonPointsAgainst: DataTypes.FLOAT,
    winningPercentage: DataTypes.FLOAT,
    playoffSeed: DataTypes.INTEGER,
    finalStandingsPosition: DataTypes.INTEGER
  }, {});
  FantasyFootballTeam.associate = function(models) {
    // associations can be defined here
  };
  return FantasyFootballTeam;
};
