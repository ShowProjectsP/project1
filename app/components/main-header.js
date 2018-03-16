import SessionDispatcher from '../dispatchers/session-dispatcher';
import MessagesThreadsStore from '../stores/messages-threads-store';
import DiariesListStore from '../stores/diaries/diaries-list-store';
import RecordsUserStore from '../stores/records/records-user-store';


export default Ember.Component.extend({

  tagName: 'header',
  classNames: ['main-header'],

  routing: Ember.inject.service('-routing'),

  init() {
    this._super();

    this.messages = Ember.Object.create();
    this.diaries = Ember.Object.create();
    this.records = Ember.Object.create();

    this.set('router', this.get('routing.router'))

    MessagesThreadsStore.getState('all').get('promise').done(() => {
      const lastThread = MessagesThreadsStore.getState('all').get('collection')[0];

      this.messages.setProperties({
        "lastThreadId": lastThread.get('id'),
        "userId": lastThread.get('recipient.id')
      });
    });

    DiariesListStore.getState().get('promise').done(() => {
      const lastDiaryId = DiariesListStore.getState().get('lastDiaryId');

      this.diaries.setProperties({
        "queryParam": lastDiaryId,
        "path": lastDiaryId === 'new' ? "new" : null
      });
    });

    RecordsUserStore.getState().get('promise').done(() => {
      const lastRecordId = RecordsUserStore.getState().get('lastRecordId');

      this.records.setProperties({
        "queryParam": lastRecordId,
        "path": lastRecordId === 'new' ? "new" : null
      });
    });
  },

  actions: {

    logout() {
      SessionDispatcher.logout();
    },

    openUserDropdown() {
      console.log(this.get('router'));
      this.set('userDropdownOpened', true);
    }

  }

});
