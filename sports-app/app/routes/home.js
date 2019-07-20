import Ember from 'ember';
import $ from 'jquery';
const { inject } = Ember;
export default Ember.Route.extend({

   setupController(controller) {

    /* 
     *
     * Here use jquery to download the data from the charts API.
     *
     */

     $.getJSON('/api/oracle-key/1').then((resp)=>{
	     
       controller.set('oracleKey', resp);
	     
     });
    
     $.getJSON('/api/games').then((resp)=>{
	     
       controller.set('games', resp);
	     
     });
  }
})
