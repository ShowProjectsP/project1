import MessagesThreadsStore from '../../../../stores/messages-threads-store';
import MessagesStore from '../../../../stores/messages-store';
import UserStore from '../../../../stores/user-store';
import StudentStore from '../../../../stores/admin/student-store';
import MessagesDispatcher from '../../../../dispatchers/messages-dispatcher';
import StudentDispatcher from '../../../../dispatchers/student-dispatcher';


export default Ember.Route.extend({

	queryParams: {
    threadId: {
    	refreshModel: true
    },
    userId: {
      refreshModel: true
    }
  },

  threadId: null,

  activate() {
    MessagesThreadsStore.getState('all').get('promise').done(() => {
      const tenMinutes = 1000 * 60 * 2;

      this.refreshMessagesInterval = setInterval(() => {
        MessagesDispatcher.fetchMessagesFromThread(this.currentModel.thread.id, true);
      }, tenMinutes);
    });
  },

  deactivate() {
    _.each(MessagesThreadsStore.getState('all').get('collection'), (t) => { t.set('selected', false); });
    clearInterval(this.refreshMessagesInterval);
  },

  beforeModel() {
  	let threadId = this.paramsFor(this.routeName).thread_id;
    let userId = this.paramsFor(this.routeName).userId;
  	
  	MessagesDispatcher.fetchMessagesFromThread(threadId);
    StudentDispatcher.fetchUserPhoto(userId);
  },

  model() {
  	const threadId = this.paramsFor(this.routeName).thread_id;
    const userId = this.paramsFor(this.routeName).userId;
  	let thread = Ember.Object.create();

  	MessagesStore.getState(threadId).get('promise').done(() => {
      MessagesStore.send('update', threadId, { isLoading: false });
    });

    MessagesThreadsStore.getState('all').get('promise').done(() => {
    	const threadFromStore = _.find(MessagesThreadsStore.getState('all').get('collection'), ['id', threadId]);
  
      _.each(MessagesThreadsStore.getState('all').get('collection'), (t) => { t.set('selected', false); });
      threadFromStore.set('selected', true);

    	thread.setProperties({
    		id: threadFromStore.id,
        threadName: threadFromStore.get('threadName'),
        recipient: threadFromStore.get('recipient'),
        selected: true
    	});
    });

  	return {
  		messages: MessagesStore.getState(threadId),
  		thread: thread,
      student: StudentStore.getState(userId)
  	};

  }

});