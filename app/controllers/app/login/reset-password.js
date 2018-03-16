import UserApi from '../../../api/user-api';


export default Ember.Controller.extend({

  routing: Ember.inject.service('-routing'),

  passwordOneError: false,
  passwordTwoError: false,

  actions: {

    validatePasswordOne() {
      this.set('passwordOneError', _.isEmpty(this.get('model.passwordOne')) || this.get('model.passwordOne.length') < 3);
    },

    validatePasswordTwo() {
      this.set('passwordTwoError', this.get('model.passwordOne') !== this.get('model.passwordTwo') || _.isEmpty(this.get('model.passwordOne')));
    },

    resetPassword() {
      this.send('validatePasswordOne');
      this.send('validatePasswordTwo');

      if (this.get('passwordOneError') || this.get('passwordTwoError')) return;

      this.set('model.isLoading', true);

      UserApi.resetPassword({
        reset_password_token: this.get('model.resetPasswordToken'),
        password: this.get('model.passwordOne'),
        password_confirmation: this.get('model.passwordTwo')
      }, {
        done: () => {
          this.set('model.resetPasswordDone', true);
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
