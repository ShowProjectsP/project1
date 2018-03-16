export default Ember.Component.extend({

	classNames: ['panel-diary-user-select'],
	classNameBindings: ['editing:panel-diary-user-select--editing'],

	click() {
		if (!this.get('editing')) this.set('editing', true);
	},

	isAnyValueSelected: function() {
		return _.some(this.get('api.values'), 'checked');
	}.property('api.values.@each.checked'),

	actions: {

		cancel() {
			this.set('editing', false);
		},

		deselect() {
			_.each(this.get('api.values'), (v) => {
				v.set('checked', false);
			});
		}

	}

})