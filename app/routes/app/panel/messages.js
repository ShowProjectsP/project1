import MessagesThreadsStore from '../../../stores/messages-threads-store';
import MessagesDispatcher from '../../../dispatchers/messages-dispatcher';


export default Ember.Route.extend({

	queryParams: {
    page: {
      refreshModel: true
    }
  },

  page: 0,

  model() {
  	MessagesThreadsStore.getState('all').get('promise').done(() => {
      MessagesThreadsStore.send('update', 'all', { isLoading: false });
    });

  	return {
  		threads: MessagesThreadsStore.getState('all'),
      search: MessagesThreadsStore.getState('search'),
      searchThreadsValue: null
  	}

  }

});