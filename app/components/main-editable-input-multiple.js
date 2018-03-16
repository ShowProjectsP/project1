export default Ember.Component.extend({

	classNames: ['main-editable-input-multiple'],
	classNameBindings: ['editing:main-editable-input-multiple--editing'],

	click() {
		if (!this.get('editing')) this.set('editing', true);
	},

	initialValues: function() {
		const initialValue = this.get('editableInputMultipleApi.values');
  	return initialValue ? initialValue : null;
  }.property('editableInputMultipleApi'),

	editableValues: function() {
		let editableValues = Ember.A();

		_.forEach(this.get('editableInputMultipleApi.values'), (el) => {
      editableValues.pushObject(Ember.Object.create({ id: el.get('id'), name: el.get('name'), isLoading: el.get('isLoading') }));
    });

		return editableValues;
	}.property('editableInputMultipleApi.values'),

	editableNewItemValueObserver: function() {
		this.set('editableNewItemValue', this.get('editableInputMultipleApi.newItem.value'));
	}.observes('editableInputMultipleApi.newItem.value'),

	actions: {

		cancel() {
			const isDifference = _.differenceBy(this.get('editableValues'),this.get('initialValues'), 'name');
			
			if (isDifference && isDifference.length) {
				this.set('editableValues', this.get('initialValues'));
			}

			this.set('editing', false);
		},

		save(value) {
			this.editableInputMultipleApi.onSaveItem(value)
		},

		delete(value) {
			this.editableInputMultipleApi.onDeleteItem(value);
		},

		addNewItem(value) {
			this.editableInputMultipleApi.onAddNewItem(value);
		}

	}

});