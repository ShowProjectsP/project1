import UserStore from '../../stores/user-store';


export default Ember.Route.extend({

  cookieStorage: Ember.inject.service(),

  redirect(model, transition) {
    const authToken = this.get('cookieStorage').get('authToken');
    const isLoggedIn = !_.isUndefined(authToken) && _.isString(authToken);
  },

  activate() {
    UserStore.send('update', { loggedIn: false });
  },

  model() {

    return {
      password: '',
      isLoading: false
    }

  }

});
