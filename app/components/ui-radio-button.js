export default Ember.Component.extend({

  classNames: ['ui-radio-button'],
  attributeBindings: 'for:for',
  tagName: 'label',

  didInsertElement() {
    if (this.get('checked')) this.set('uiRadioButtonValue', this.get('for'));
  },

  actions: {

    bindValue() {
      this.set('uiRadioButtonValue', this.get('for'));
    }

  }

});
