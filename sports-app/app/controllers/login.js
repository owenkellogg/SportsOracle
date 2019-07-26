import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  actions: {
    authenticate() {

      let { identification } = this.getProperties('identification');

      this.get('session').authenticate('authenticator:password', identification)
          .then(() => {
            console.log('logged in successfully');
          })
          .catch((reason) => {

          this.set('errorMessage', reason.error || reason);
        });
    }
  }
});~                                                                                                                                                                                  
