export default Ember.Component.extend({

  classNames: ['panel-box-editable-small'],
  classNameBindings: ['editableType:panel-box-editable-small--editable', 'editing:panel-box-editable-small--editing'],

  click() {
    if (this.get('editableType') && !this.get('editing')) this.set('editing', true);
  },

  editedObservable: function() {
    if (this.get('editing')) {
      this.set('newEditableListItem', '');
    }
  }.observes('editing'),

  editValue: function() {
    return this.get('value');
  }.property('value'),

  editListValue: function() {
    return this.get('value');
  }.property('value'),

  editableButtonsClass: function() {
    return `panel-box-editable-small_inner--${this.get('editableType')}`;
  }.property('editableType'),

  displayValueText: function() {
    return this.get('displayValue') ? this.get('displayValue') : this.get('value');
  }.property('value', 'displayValue'),

  inputValidation: function() {
    const validationType = this.get('validation');

    if (validationType === 'simple-input') {
      return this.get('editValue.length') < 3; // minimum 3 characters
    } else if (validationType === 'date') {
      return !(/^\d{4}\-\d{2}\-\d{2}$/).test(this.get('editValue'));
    }
  }.property('editValue.length'),

  checkEditableListValues(editValue, displayValues) {
    const editValueArr = _.map(editValue, 'name'),
      displayValuesArr = _.map(displayValues, 'name');

    return _.difference(editValueArr, displayValuesArr).length;
  },

  actions: {

    save() {
      const editValue = this.get('editValue');
 
      if ((this.get('editableType') !== 'select') && this.get('inputValidation')) return;

      if (this.get('editableType') === 'editable-list') {

        //if (this.checkEditableListValues(this.get('editValue'), this.get('displayValues'))) {
          this.sendAction('onSave', this.get('editListValue'));
        //} else {
          //this.send('cancel');
        //}

      }
      else {

        if (editValue === this.get('value')) {
          this.send('cancel');
        } else {
          this.sendAction('onSave', this.get('editValue'));
        }

      }
    },

    cancel() {
      if (this.get('editableType') === 'editable-list') {
        this.set('editListValue', this.get('displayValues'));
      } else {
        this.set('editValue', this.get('value'));
      }

      this.set('editing', false);
    },

    deleteEditableListItem(id) {
      this.sendAction('onDeleteEditableListItem', id);
    },

    createEditableListItem(value) {
      this.sendAction('onCreateEditableListItem', value);
      this.set('newEditableListItem', '');
    }

  }

});
