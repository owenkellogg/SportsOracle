import Ember from 'ember';

async function claim(id, address, key){

  let data = {}

  data['private_key'] = key;

  data['id'] = id

  data['address'] = address

  let resp = await $.ajax({
      method: 'POST',
      data: data,
      url: `/api/claim-winnings`,
  });


 return resp

}



export default Ember.Controller.extend({

  actions: {

    submit: async function() {

        let id = this.get('id')

        let address = this.get('address')

        let key = this.get('private_key')

        console.log('id', id)

        console.log('address', address)

        console.log('key', key)

        let resp = await claim(id, address, key)

        console.log(resp)

        this.transitionToRoute('/')


    }

  }

});

