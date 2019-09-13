import Ember from 'ember';

const { MoneyButtonClient } = require('@moneybutton/api-client')
const client = new MoneyButtonClient('8932bd0b986d8e8503e006eed6d54126')

export default Ember.Controller.extend({
  queryParams: ['code'],
  code: null,
  init: function() {
    this._super();
    Ember.run.next(this, function() {

      console.log(this.get('code'));
      client.requestAuthorization('auth.user_identity:read','http://0.0.0.0:3000')

    });

 }
});
