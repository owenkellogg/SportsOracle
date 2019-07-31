import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({

  model: function(params) {

  return $.ajax({
      method: 'GET',
      url: `/api/proposals/${params.id}`,
    });
  },


  setupController(controller, model) {

    console.log("proposal", model)
    controller.set('proposal', model);
    controller.set("public_key", "");

  }

})
