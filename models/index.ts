import * as Sequelize from 'sequelize';
import * as sequelize from '../lib/database';

const Game = require('./game')(sequelize, Sequelize);
const Bet = require('./bet')(sequelize, Sequelize);
const Proposal = require('./bet_proposal')(sequelize, Sequelize);
const Account = require('./account')(sequelize, Sequelize);
const FantasyTeam = require('./fantasyfootballteam')(sequelize, Sequelize);
const Matchup = require('./matchup')(sequelize, Sequelize);

export {
  Game,
  Bet,
  Proposal,
  Account,
  FantasyTeam,
  Matchup
};

