import MessagesDispatcher from '../../../dispatchers/messages-dispatcher';
import MessagesThreadsStore from '../../../stores/messages-threads-store';


export default Ember.Controller.extend({

	routing: Ember.inject.service('-routing'),

	secondText: function() {
		if (this.get('model.threads.collection')) {
			const selectedThread = _.find(this.get('model.threads.collection'), 'selected');

			if (this.get('model.searchThreadsValue')) {
				return `Wyniki dla "${this.get('model.searchThreadsValue')}"`;
			} 

			if (selectedThread) {
				return selectedThread.get('threadName');
			}
			else {
				return "Nowa Wiadomość";
			}
		}
	}.property('model.threads.collection.@each.selected', 'model.searchThreadsValue'),

	searchObserver: function() {
		const callback = (data) => {
			this.set('model.threads', data);
		};
			
		if (this.get('model.searchThreadsValue')) {
			MessagesDispatcher.searchMessagesThreads({ value: this.get('model.searchThreadsValue') }, callback);
		} else {

			if (this.get('model.searchThreadsValue') === null) return;
			
			this.set('model.threads', MessagesThreadsStore.getState('all'));
		}

	}.observes('model.searchThreadsValue'),

	isLoading: function() {
		return this.get('model.threads.isLoading') || this.get('model.search.isLoading');
	}.property('model.threads.isLoading', 'model.search.isLoading'),

	actions: {

		setThread(threads, thread) {
			if (this.get('model.searchThreadsValue')) {
				this.set('model.threads', MessagesThreadsStore.getState('all'));
			}

			this.set('model.searchThreadsValue', null);

			_.each(threads, (t) => { t.set('selected', false); });
			thread.set('selected', true);
		}

	}

});