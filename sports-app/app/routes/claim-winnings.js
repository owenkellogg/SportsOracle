
import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({

  model: function(params) {

    return params.id 

  },
  setupController(controller, model) {

    controller.set('id', model);
    controller.set('address',"")
    controller.set('private_key', "")
         
  }

});
