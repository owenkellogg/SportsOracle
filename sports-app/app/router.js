import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' } );
  this.route('new-proposal', {path: 'new-proposal/:id'});
  this.route('accept-proposal', {path: 'accept-proposal/:id'});
  this.route('claim-winnings', {path: 'claim-winnings/:id'});
  this.route('bet', {path: 'bet/:id'});
});

export default Router;
