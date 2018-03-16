import UserStore from '../stores/user-store';


export default {

  name: 'i18n',

  after: 'ember-i18n',

  initialize: function(App) {
    let locale;

    UserStore.getState().get('promise').done(() => {
      locale = UserStore.getState().get('language');

      moment.locale(locale);

      App.__container__.lookup('service:i18n').set('locale', locale);
    });

  }

}
