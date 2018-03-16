export default Ember.Component.extend({

	classNames: ['main-editable-custom'],
	classNameBindings: ['editing:main-editable-custom--editing'],

	click() {
		if (!this.get('editing')) this.set('editing', true);
	},

	initialValue: function() {
		const initialValue = this.get('editableInputApi.value');
    return initialValue ? initialValue : null;
  }.property('editableInputApi.value'),

  editableValue: function() {
  	return this.get('editableInputApi.value');
  }.property('editableInputApi.value'),

	actions: {

		cancel() {
			this.sendAction('onCancel');
			
			this.set('editing', false);
		},

		save() {
			this.sendAction('onSave');

			this.send('cancel');
		}

	}

});