import TalkQuestionsApi from '../api/talk-questions-api';
import TalkQuestionsStore from '../stores/talk-questions-store';
import { displayDoneInfoMessage } from '../utils/info-messages';


export default Ember.Object.extend({

  fetchTalkFeelings() {
    TalkQuestionsStore.send('update', 'talk_feelings', { 'isLoading': true });    

    TalkQuestionsApi.getTalkFeelings({}, { 
      done: (data) => {
        TalkQuestionsStore.send('handle', 'talk_feelings', data);
      },
      always: () => {
        TalkQuestionsStore.send('update', 'talk_feelings', { 'isLoading': false });
      }
    });
  },

  fetchTalkParticipants() {
    TalkQuestionsStore.send('update', 'talk_participants', { 'isLoading': true });    

    TalkQuestionsApi.getTalkParticipants({}, { 
      done: (data) => {
        TalkQuestionsStore.send('handle', 'talk_participants', data);
      },
      always: () => {
        TalkQuestionsStore.send('update', 'talk_participants', { 'isLoading': false });
      }
    });
  },

  fetchDiarySuccessParticipants() {
    TalkQuestionsStore.send('update', 'diary_success_participants', { 'isLoading': true });    

    TalkQuestionsApi.getDiarySuccessParticipants({}, { 
      done: (data) => {
        TalkQuestionsStore.send('handle', 'diary_success_participants', data);
      },
      always: () => {
        TalkQuestionsStore.send('update', 'diary_success_participants', { 'isLoading': false });
      }
    });
  },

  fetchTalkQuestions() {
    this.fetchTalkFeelings();
    this.fetchTalkParticipants();
    this.fetchDiarySuccessParticipants();
  },

  /********************************************************* create *********************************************************/

  createNewTalkFeeling(value) {
    TalkQuestionsStore.send('updateField', 'talk_feelings', 'newItem.isLoading', true);
    
    TalkQuestionsApi.createTalkFeeling({ name: value }, {
      done: (data) => {
        TalkQuestionsStore.send('handleMore', 'talk_feelings', data);
        TalkQuestionsStore.send('updateField', 'talk_feelings', 'newItem.value', null);
        displayDoneInfoMessage(`Dodano nowe odczucie "${value}"`);
      },
      always: () => {
        TalkQuestionsStore.send('updateField', 'talk_feelings', 'newItem.isLoading', false);
      }
    });
  },

  createNewTalkParticipant(value) {
    TalkQuestionsStore.send('updateField', 'talk_participants', 'newItem.isLoading', true);
    
    TalkQuestionsApi.createTalkParticipant({ name: value }, {
      done: (data) => {
        TalkQuestionsStore.send('handleMore', 'talk_participants', data);
        TalkQuestionsStore.send('updateField', 'talk_participants', 'newItem.value', null);
        displayDoneInfoMessage(`Dodano nowego rozmówcę "${value}"`);
      },
      always: () => {
        TalkQuestionsStore.send('updateField', 'talk_participants', 'newItem.isLoading', false);
      }
    });
  },

  createNewDiarySuccessParticipant(value) {
    TalkQuestionsStore.send('updateField', 'diary_success_participants', 'newItem.isLoading', true);
    
    TalkQuestionsApi.createDiarySuccessParticipant({ name: value }, {
      done: (data) => {
        TalkQuestionsStore.send('handleMore', 'diary_success_participants', data);
        TalkQuestionsStore.send('updateField', 'diary_success_participants', 'newItem.value', null);
        displayDoneInfoMessage(`Dodano nowego rozmówcę z dziennika "${value}"`);
      },
      always: () => {
        TalkQuestionsStore.send('updateField', 'diary_success_participants', 'newItem.isLoading', false);
      }
    });
  },

  /********************************************************* update *********************************************************/

  updateTalkFeeling(params) {
    const requestParams = {
      id: params.id,
      name: params.name
    };

    const itemFromStore = _.find(TalkQuestionsStore.getState('talk_feelings').get('collection'), ['id', params.id]);

    itemFromStore.set('name', params.name);
    itemFromStore.set('isLoading', true);

    TalkQuestionsApi.updateTalkFeeling(requestParams, {
      done: (data) => {
        itemFromStore.setProperties(data);
        displayDoneInfoMessage(`Zaktualizowano odczucie "${params.name}"`);
      },
      always: () => {
        itemFromStore.set('isLoading', false);
      }
    });
  },

  updateTalkParticipant(params) {
    const requestParams = {
      id: params.id,
      name: params.name
    };

    const itemFromStore = _.find(TalkQuestionsStore.getState('talk_participants').get('collection'), ['id', params.id]);

    itemFromStore.set('name', params.name);
    itemFromStore.set('isLoading', true);

    TalkQuestionsApi.updateTalkParticipant(requestParams, {
      done: (data) => {
        itemFromStore.setProperties(data);
        displayDoneInfoMessage(`Zaktualizowano rozmówcę "${params.name}"`);
      },
      always: () => {
        itemFromStore.set('isLoading', false);
      }
    });
  },

  updateDiarySuccessParticipant(params) {
    const requestParams = {
      id: params.id,
      name: params.name
    };

    const itemFromStore = _.find(TalkQuestionsStore.getState('diary_success_participants').get('collection'), ['id', params.id]);

    itemFromStore.set('name', params.name);
    itemFromStore.set('isLoading', true);

    TalkQuestionsApi.updateDiarySuccessParticipant(requestParams, {
      done: (data) => {
        itemFromStore.setProperties(data);
        displayDoneInfoMessage(`Zaktualizowano rozmówcę z dziennika "${params.name}"`);
      },
      always: () => {
        itemFromStore.set('isLoading', false);
      }
    });
  },

  /********************************************************* delete *********************************************************/

  deleteTalkFeeling(object) {
    const itemFromStore = _.find(TalkQuestionsStore.getState('talk_feelings').get('collection'), ['id', object.id]);

    TalkQuestionsApi.deleteTalkFeeling({ id: object.id }, {
      done: () => {
        TalkQuestionsStore.getState('talk_feelings').get('collection').removeObject(itemFromStore);
        displayDoneInfoMessage(`Usunięto odczucie "${object.name}"`);
      },
    });
  },

  deleteTalkParticipant(object) {
    const itemFromStore = _.find(TalkQuestionsStore.getState('talk_participants').get('collection'), ['id', object.id]);

    TalkQuestionsApi.deleteTalkParticipant({ id: object.id }, {
      done: () => {
        TalkQuestionsStore.getState('talk_participants').get('collection').removeObject(itemFromStore);
        displayDoneInfoMessage(`Usunięto rozmówcę "${object.name}"`);
      },
    });
  },

  deleteDiarySuccessParticipant(object) {
    const itemFromStore = _.find(TalkQuestionsStore.getState('diary_success_participants').get('collection'), ['id', object.id]);

    TalkQuestionsApi.deleteDiarySuccessParticipant({ id: object.id }, {
      done: () => {
        TalkQuestionsStore.getState('diary_success_participants').get('collection').removeObject(itemFromStore);
        displayDoneInfoMessage(`Usunięto rozmówcę z dziennika "${object.name}"`);
      },
    });
  }

}).create();
