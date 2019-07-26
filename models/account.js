'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    address: DataTypes.STRING,
    public_key: DataTypes.STRING,
    email: DataTypes.STRING, 
    private_key: DataTypes.STRING,
    access_token: DataTypes.STRING
  }, {});
  account.associate = function(models) {
    // associations can be defined here
  };
  return account;
};
