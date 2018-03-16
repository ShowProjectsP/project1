export default Ember.Controller.extend({

	routing: Ember.inject.service('-routing'),

	scrollDownToLastMessage: function() {
		const element = $('.page-panel_messages_list ul');

		Ember.run.scheduleOnce('afterRender', this, () => {
			if (element && element[0]) {
				element.animate({ scrollTop: element[0].scrollHeight }, 0); 
			}
		});
	}.observes('model.messages.collection.length'),

	actions: {

		goToUserProfile(userId) {
			this.get('routing').transitionTo('app.panel.student', [userId]);
		}

	}

});