'use strict';
module.exports = (sequelize, DataTypes) => {
  const bet_proposal = sequelize.define('bet_proposal', {
    account_id: DataTypes.STRING,
    public_key: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN,
    sports_feed_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    winning_message: DataTypes.STRING
  }, {});
  bet_proposal.associate = function(models) {
    // associations can be defined here
  };
  return bet_proposal;
};
