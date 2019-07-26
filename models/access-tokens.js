'use strict';
module.exports = (sequelize, DataTypes) => {
  const access - tokens = sequelize.define('access-tokens', {
    uid: DataTypes.STRING,
    account_id: DataTypes.STRING
  }, {});
  access - tokens.associate = function(models) {
    // associations can be defined here
  };
  return access - tokens;
};