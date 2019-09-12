import Ember from 'ember';
import $ from 'jquery';
export default Ember.Route.extend({

   setupController(controller) {

    /* 
     *
     * Here use jquery to download the data from the charts API.
     *
     */

     //Need a way of determining which week it is in the football season
     $.getJSON('/api/matchups/1/272466').then((resp)=>{
	     
       console.log('matchups', resp);
       controller.set('matchups', resp);
	     
     });
   
           
     //Need a an endpoint to return all leauges. It is fine for now because we are dealing with one league
     $.getJSON('/api/teams/272466').then((resp)=>{
	     
       console.log('teams', resp);
       controller.set('teams', resp);
	     
     });

     $.getJSON('/api/proposals').then((resp)=>{
	     
       console.log('proposals', resp);
       controller.set('proposals', resp);
	     
     });
     
     $.getJSON('/api/accepted').then((resp)=>{
	     
       console.log('accepted', resp)
       controller.set('accepted', resp);
	     
     });
  }
})
