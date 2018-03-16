import UserApi from '../../../api/user-api';


export default Ember.Controller.extend({

  routing: Ember.inject.service('-routing'),

  emailError: false,

  actions: {

    validateEmail() {
      this.set('emailError', _.isEmpty(this.get('model.email')) || this.get('model.email.length') < 3);
    },

    sendResetPasswordToken() {
      this.send('validateEmail');

      if (this.get('emailError')) return;

      this.set('model.isLoading', true);

      UserApi.sendResetPasswordToken({
        email: this.get('model.email')
      }, {
        done: () => {
          this.set('model.emailSent', true);
        },
        always: () => {
          this.set('model.isLoading', false);
        }
      });
    },

    goBack() {
      this.get('routing').transitionTo('app.login');
    }

  }

});
