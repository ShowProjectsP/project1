import UserApi from '../../api/user-api';


export default Ember.Route.extend({

  cookieStorage: Ember.inject.service(),

  redirect(model, transition) {
    if (!this.get('isLoggedIn'))
      this.transitionTo('app.login');
    else if (transition.targetName === 'app.login' || transition.targetName === 'app.index')
      this.transitionTo('app.panel');
  }

});
