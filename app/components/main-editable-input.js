export default Ember.Component.extend({

	classNames: ['main-editable-input'],
	classNameBindings: ['editing:main-editable-input--editing'],

	click() {
		if (!this.get('editing')) this.set('editing', true);
	},

	initialSelectedValueObserver: function() {
		this.set('initialSelectedValue', _.find(this.get('editableSelectApi.values'), 'selected'));
	}.observes('editableSelectApi.values').on('init'),

	initialValue: function() {
		const initialValue = this.get('editableInputApi.value');
    return initialValue ? initialValue : null;
  }.property('editableInputApi.value'),

  editableValue: function() {
  	return this.get('editableInputApi.value');
  }.property('editableInputApi.value'),

  inputError: function() {
  	const validationType = this.get('editableInputApi.validationType');
  	const value = _.trim(this.get('editableValue'));

  	if (validationType) {

  		if (validationType === 'input') {
  			return _.isEmpty(value);
  		}
  		else if (validationType === 'date') {
  			return !(/^\d{4}\-\d{2}\-\d{2}$/).test(value);
  		}

  	} else {
  		return false;
  	}
  }.property('editableValue.length', 'editableInputApi.validationType'),

	actions: {

		cancel() {
			this.set('editableValue', this.get('initialValue'));

			this.set('editing', false);
		},

		save() {
			const currentValue = this.get('editableValue');

			if (this.get('initialValue') === this.get('editableValue')) {
				this.send('cancel');
			} else {
				this.sendAction('onSave', currentValue);
			}
		}

	}

});