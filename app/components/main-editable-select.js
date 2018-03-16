export default Ember.Component.extend({

	classNames: ['main-editable-select'],
	classNameBindings: ['editing:main-editable-select--editing'],

	click() {
		if (!this.get('editing')) this.set('editing', true);
	},

	initialSelectedValueObserver: function() {
		this.set('initialSelectedValue', _.find(this.get('editableSelectApi.values'), 'selected'));
	}.observes('editableSelectApi.values').on('init'),

	selectedValue: function() {
		const selectedValue = _.find(this.get('editableSelectApi.values'), 'selected');
    return selectedValue ? selectedValue.displayValue : null;
  }.property('editableSelectApi.values.@each.selected'),

	actions: {

		cancel() {
			_.find(this.get('editableSelectApi.values'), 'selected').set('selected', false);
			this.get('initialSelectedValue').set('selected', true);

			this.set('editing', false);
		},

		save() {
			const currentSelectedValue = _.find(this.get('editableSelectApi.values'), 'selected');

			if (this.get('initialSelectedValue').value === currentSelectedValue.value) {
				this.send('cancel');
			} else {
				this.sendAction('onSave', currentSelectedValue);
			}
		}

	}

});