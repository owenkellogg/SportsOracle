import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({

  model: function(params) {

  return $.ajax({
      method: 'GET',
      url: `/api/games/${params.id}`,
    });
  },


  setupController(controller, model) {

    controller.set('game', model);

  }

})
