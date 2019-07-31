import Ember from 'ember';

async function acceptProposal(id, pubkey){
  
  let data = {}

  data['public_key'] = pubkey

  let resp = await $.ajax({
      method: 'POST',
      data: data,
      url: `/api/proposals/${id}`,
  });

  return resp


}



export default Ember.Controller.extend({

  actions: {

    submit: async function() {

      let key = this.get('public_key')

      let id = this.get('proposal').id
    
      console.log(id, key)
    
      let resp = await acceptProposal(id, key)

      console.log(resp)

      this.transitionToRoute('/')

    }

  }

});



