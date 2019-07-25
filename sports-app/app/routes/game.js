import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import config from 'ember-get-config';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Route.extend(AuthenticatedRouteMixin, {
  session: inject('session'),

  model: function(params) {

   return $.ajax({
      method: 'GET',
      url: `api/games/${params.id}`,
      headers: headers
    });
  },

  setupController(controller, model) {

    controller.set('game', model);

  }

});
