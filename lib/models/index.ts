import * as Sequelize from 'sequelize';
import * as sequelize from '../database';

const Game = require('./game')(sequelize, Sequelize);
const Bet = require('./bet')(sequelize, Sequelize);

export {
  Game,
  Bet
};

