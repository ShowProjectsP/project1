export default Ember.Component.extend({

	classNames: ['settings-record-categories'],
	classNameBindings: ['editing:settings-record-categories--editing'],


	click() {
		if (!this.get('editing')) this.set('editing', true);
	},

	actions: {

		open() {
			this.set('dialogOpened', true);
		}

	}

});