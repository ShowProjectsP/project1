import UserStore from '../../../stores/user-store';
import SessionApi from '../../../api/session-api';


export default Ember.Controller.extend({

  i18n: Ember.inject.service(),
  cookieStorage:  Ember.inject.service(),
  localStorage: Ember.inject.service(),

  loginErrors: Ember.Object.extend({
    'email': false,
    'password': false,
    'login': false
  }).create(),

  checkFormValidation() {
    this.send('validateForm');
    return !_.includes(_.toArray(this.get('loginErrors')), true);
  },

  actions: {

    validateForm() {
      this.get('loginErrors').setProperties({
        email: _.isEmpty(this.get('email')) || this.get('email.length') < 3,
        password: _.isEmpty(this.get('model.password')),
        login: false
      });
    },

    login() {
      if (!this.checkFormValidation()) return;

      this.set('model.isLoading', true);

      SessionApi.login({
        email: this.get('email'),
        password: this.get('model.password')
      }, {
        done: (data) => {
          const userData = _.omit(data, ['auth_token', 'token_expire_time']);

          this.get('cookieStorage').set([
            `authToken=${data.auth_token}; expires=${new Date(data.token_expire_time).toGMTString()};`,
            `tokenExpires=${data.token_expire_time};`,
            `userId=${data.id};`,
            `userEmail=${data.email};`
          ]);

          this.get('localStorage').setItem('user', JSON.stringify(userData));
          this.get('localStorage').setItem('authToken', data.auth_token);

          this.get('i18n').set('locale', userData.language);

          UserStore.send('handle', data);
          UserStore.send('update', { loggedIn: true });

          setTimeout(() => {
            window.location = '/#/panel';
          }, 0);

        },
        fail: () => {
          this.set('loginErrors.login', true);
        },
        always: () => {
          this.set('model.isLoading', false);
        }
      });
    }

  }

})
