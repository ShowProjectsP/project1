import MessagesApi from '../api/messages-api';
import MessagesThreadsStore from '../stores/messages-threads-store';
import MessagesStore from '../stores/messages-store';


export default Ember.Object.extend({

  fetchMessagesThreads(page, params) {
    MessagesThreadsStore.send('update', 'all', { isLoading: true });

    let requestParams = {
      page: page, 
      page_size: 100
    };

    if (params) {
      _.assign(requestParams, params);
    }

    MessagesApi.getMessagesThreads(requestParams, {
      done: (data) => {
        MessagesThreadsStore.send('handle', 'all', data);
      },
      always: () => {
        MessagesThreadsStore.send('update', 'all', { isLoading: false });
      }
    });
  },

  searchMessagesThreads(params, callback) {
    MessagesThreadsStore.send('update', 'search', { isLoading: true });

    let requestParams = {};
    _.assign(requestParams, params);

    MessagesApi.searchMessagesThreads(requestParams, {
      done: (data) => {
        MessagesThreadsStore.send('handle', 'search', data);
        callback(MessagesThreadsStore.getState('search'));
      },
      always: () => {
        MessagesThreadsStore.send('update', 'search', { isLoading: false });
      }
    });
  },

  fetchMessagesFromThread(threadId, noLoading) {
    if (!noLoading) MessagesStore.send('update', threadId, { isLoading: true });

    MessagesApi.getMessagesFromThread({ id: threadId, page: 0, page_size: 100 }, {
      done: (data) => {
        MessagesStore.send('handle', threadId, data);

        MessagesThreadsStore.getState('all').get('promise').done(() => {
          const thread = _.find(MessagesThreadsStore.getState('all').get('collection'), ['id', threadId]);

          if (thread.get('unread_count')) {

            const recipientMessages = _.filter(data.collection, ['mineMessage', false]);
            
            if (recipientMessages.length) {
              this.setMessageAsRead(thread, _.last(recipientMessages).id);
            }
          }
        });
      },
      always: () => {
       MessagesStore.send('update', threadId, { isLoading: false });
      }
    });
  },

  createMessage(threadId, recipientId, message) {
    MessagesStore.send('update', threadId, { isSending: true });

    MessagesApi.createMessage({ message_thread_id: threadId, message: message }, {
      done: (data) => {
        MessagesStore.getState(threadId).set('newMessageValue', '');
        MessagesStore.send('handleMore', threadId, data);
      }, always: () => {
        MessagesStore.send('update', threadId, { isSending: false });
      }
    });
  },

  createThread(userId, callback) {

    MessagesApi.createThread({ recipient_id: userId }, {
      done: (data) => {
        let threadFromStore = _.find(MessagesThreadsStore.getState('all').get('collection'), ['id', data.id]);
        
        if (threadFromStore) {
          callback(threadFromStore.get('id'), threadFromStore.get('recipient.id'));
        } else {
          MessagesThreadsStore.send('handleMore', 'all', data);
          threadFromStore = _.find(MessagesThreadsStore.getState('all').get('collection'), ['id', data.id]);
          callback(threadFromStore.get('id'), threadFromStore.get('recipient.id'));
        }
      },
      always: () => {
        // MessagesThreadsStore.send('update', { isLoading: false });
      }
    });

  },

  setMessageAsRead(thread, messageId) {
    MessagesApi.setMessageAsRead({ id: messageId }, {
      done: () => {
        thread.set('unread_count', 0);
      }
    });
  }

}).create();
