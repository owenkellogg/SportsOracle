import Ember from 'ember';
import $ from 'jquery';
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
    
     $.getJSON('/api/games/today').then((resp)=>{
	     
       controller.set('games', resp);
	     
     });

     $.getJSON('/api/games/yesterday').then((resp)=>{
	     
       controller.set('gamesYesterday', resp);
	     
     });
  }
})
