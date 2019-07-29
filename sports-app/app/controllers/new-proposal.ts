import Ember from 'ember';

async function newProposal(sports_feed_id, proposal){

  console.log('new Proposal', sports_feed_id, proposal)
  let data = {}

  data['public_key'] = proposal.public_key;

  data['sports_feed_id'] = sports_feed_id

  data['message'] = proposal.pick
  
  data['amount'] = proposal.amount

  let resp = await $.ajax({
      method: 'POST',
      data: data,
      url: `/api/proposals`,
  });



}



export default Ember.Controller.extend({

  actions: {
    submit() {
        console.log("SUBMIT")
    }

  }

});

