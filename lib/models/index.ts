import * as Sequelize from 'sequelize';
import * as sequelize from '../database';

const Game = require('./game')(sequelize, Sequelize);

export {
  Game
};

