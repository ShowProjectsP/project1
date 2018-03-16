import UserApi from '../../../api/user-api';


export default Ember.Controller.extend({

  cookieStorage:  Ember.inject.service(),
  localStorage: Ember.inject.service(),

  checkFormValidation() {
    this.send('validateForm');
    return !_.includes(_.toArray(this.get('model.errors')), true);
  },

  actions: {

    validateForm() {
      this.set('model.errors', {
        firstName: _.isEmpty(this.get('model.params.first_name')) || this.get('model.params.first_name') < 3,
        lastName: _.isEmpty(this.get('model.params.last_name')) || this.get('model.params.last_name') < 3,
        email: _.isEmpty(this.get('model.params.email')) || this.get('model.params.email.length') < 3,
        phone: _.isEmpty(this.get('model.params.phone')),
        password: _.isEmpty(this.get('model.params.password')) || this.get('model.params.password.length') < 3,
        passwordConfirmation: _.isEmpty(this.get('model.params.password_confirmation')) || this.get('model.params.password') !== this.get('model.params.password_confirmation'),
        birthday: _.isEmpty(this.get('model.params.birthday'))
      });
    },

    register() {
      if (!this.checkFormValidation()) return;

      this.set('model.isLoading', true);

      UserApi.register(
        this.get('model.params')
      , {
        done: (data) => {
          this.get('cookieStorage').set([
            `authToken=${data.auth_token}; expires=${new Date(data.token_expire_time).toGMTString()};`,
            `tokenExpires=${data.token_expire_time};`,
            `userId=${data.id};`,
            `userEmail=${data.email};`
          ]);

          this.get('localStorage').setItem('user', JSON.stringify(_.omit(data, ['auth_token', 'token_expire_time'])));
          this.get('localStorage').setItem('authToken', data.auth_token);

          window.location.href = `/#/registration/diagnosis?userId=${data.id}`;
        },
        always: () => {
          this.set('model.isLoading', false);
        }
      });

    }

  }

});
