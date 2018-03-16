export default Ember.Mixin.create({

	actions: {

		close() {
			this.set('dialogOpened', false);
		}

	}

});