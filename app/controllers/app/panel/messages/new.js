import UsersDispatcher from '../../../../dispatchers/users-dispatcher';
import UsersStore from '../../../../stores/users-store';


export default Ember.Controller.extend({

	routing: Ember.inject.service('-routing'),

	searchObserver: function() {
		const callback = (data) => {
			this.set('model.users', data);
		};
			
		if (this.get('model.searchUsersValue')) {
			UsersDispatcher.searchUsers({ value: this.get('model.searchUsersValue') }, callback);
		} else {

			if (this.get('model.searchUsersValue') === null) return;
			
			this.set('model.users', UsersStore.getState('all'));
		}

	}.observes('model.searchUsersValue'),

	isLoading: function() {
		return this.get('model.users.isLoading') || this.get('model.search.isLoading');
	}.property('model.users.isLoading', 'model.search.isLoading'),

	actions: {

		selectUser(user) {
			const callback = (threadId, userId) => {
				this.get('routing').transitionTo('app.panel.messages.message', [threadId], {
					queryParams: {
						userId: userId
					}
				})
			};

			MessagesDispatcher.createThread(user.id, callback);
		}
		
	}

});