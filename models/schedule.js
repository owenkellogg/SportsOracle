'use strict';
module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define('schedule', {
    schedule_id: DataTypes.INTEGER,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    awayTeam: DataTypes.STRING,
    homeTeam: DataTypes.STRING,
    venue: DataTypes.STRING,
    venueAllegiance: DataTypes.STRING,
    scheduleStatus: DataTypes.STRING,
    originalStartTime: DataTypes.STRING,
    delayedOrPostponedReason: DataTypes.STRING,
    playedStatus: DataTypes.STRING
  }, {});
  schedule.associate = function(models) {
    // associations can be defined here
  };
  return schedule;
};