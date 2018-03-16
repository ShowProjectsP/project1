export default Ember.Component.extend({

  i18n: Ember.inject.service(),
  localStorage: Ember.inject.service(),

  classNames: ['main-locales'],

  actions: {

    changeLocale(locale) {
      this.get('localStorage').setItem('locale', locale);
      this.get('i18n').set('locale', locale);
    }

  }

});
