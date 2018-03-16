import UserApi from '../api/user-api';
import UserStore from '../stores/user-store';
import MessagesDispatcher from '../dispatchers/messages-dispatcher';
import MessagesThreadsStore from '../stores/messages-threads-store';


export default Ember.Route.extend({

  cookieStorage: Ember.inject.service(),
  localStorage: Ember.inject.service(),

  redirect(model, transition) {
    const authToken = this.get('cookieStorage').get('authToken');
    this.isLoggedIn = !_.isUndefined(authToken) && _.isString(authToken);

    if (!this.isLoggedIn) {
      this.get('cookieStorage').remove('authToken');
    }
  },

  activate() {
    if (this.isLoggedIn) {
      UserStore.send('handle', this.get('localStorage').getItem('user'));
      UserStore.send('update', { loggedIn: true });
    }
  },

  model() {

    return {
      user: UserStore.getState()
    }

  }

});
