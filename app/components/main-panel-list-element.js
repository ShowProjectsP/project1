export default Ember.Component.extend({

  classNames: ['main-panel-list-element'],

  click() {
    this.sendAction('action');
  }

});
