import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('game');
  this.route('test-route');
  this.route('mlb-game', {path: 'mlb-game/:id'});
  this.route('login');
});

export default Router;
