import MessagesDispatcher from '../../dispatchers/messages-dispatcher';
import MessagesThreadsStore from '../../stores/messages-threads-store';
import UserStore from '../../stores/user-store';
import DiariesDispatcher from '../../dispatchers/diaries-dispatcher';
import DiariesListStore from '../../stores/diaries/diaries-list-store';
import RecordsDispatcher from '../../dispatchers/records-dispatcher';


export default Ember.Route.extend({

	cookieStorage: Ember.inject.service(),

	beforeModel() {
    const authToken = this.get('cookieStorage').get('authToken');
    const isLoggedIn = !_.isUndefined(authToken) && _.isString(authToken);

    if (isLoggedIn) {
      MessagesDispatcher.fetchMessagesThreads(0);

      UserStore.getState().get('promise').done(() => {
        if (UserStore.getState().get('isStudent')) {
          DiariesDispatcher.fetchDiaries(0, { sort_by: 'date', sort_order: 'desc' });
          DiariesDispatcher.fetchDiariesStats();
          RecordsDispatcher.fetchRecords(0);
          RecordsDispatcher.fetchRecordsStats();
        }
      });
    }
  },

  model() {
  	let messages = Ember.Object.create();

  	MessagesThreadsStore.getState('all').get('promise').done(() => {
      const lastThread = MessagesThreadsStore.getState('all').get('collection')[0];

      messages.setProperties({
        "lastThreadId": lastThread.get('id'),
        "userId": lastThread.get('recipient.id')
      });
    });

    return {
      messages: messages
    }

  }

});
