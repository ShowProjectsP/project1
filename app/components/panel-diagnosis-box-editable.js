export default Ember.Component.extend({

  classNames: ['panel-diagnosis-box-editable'],
  classNameBindings: ['editing::panel-diagnosis-box-editable--editing', 'modelLoading:a-container-loading'],

  click() {
    if (!this.get('editing')) this.sendAction('onOpen');
  },

  actions: {

    onOpen(...args) {
      this.sendAction('onOpen', args);
    },

    onSave(...args) {
      this.sendAction('onSave', args);
    },

    onClose(...args) {
      this.sendAction('onClose', args);
    }

  }

});
