import UserStore from '../../../stores/user-store';
import SettingsStore from '../../../stores/admin/settings-store';
import SettingsDispatcher from '../../../dispatchers/settings-dispatcher';
import TalkQuestionsDispatcher from '../../../dispatchers/talk-questions-dispatcher';
import TalkQuestionsStore from '../../../stores/talk-questions-store';
import RecordRatesDispatcher from '../../../dispatchers/record-rates-dispatcher';
import RecordRatesStore from '../../../stores/admin/settings-store';


export default Ember.Route.extend({

  beforeModel() {
    UserStore.getState().get('promise').done(() => {
      if (UserStore.getState().get('isAdmin')) {
        SettingsDispatcher.fetchSettings();
        TalkQuestionsDispatcher.fetchTalkQuestions();

        RecordRatesDispatcher.fetchRecordCategories();
        RecordRatesDispatcher.fetchRecordRateCategories();
        RecordRatesDispatcher.fetchRecordRateUnits();
      }
    });
  },

  deactivate() {
    this.refresh();
  },

  model() {

    SettingsStore.getState().get('promise').done(() => {
      SettingsStore.send('update', { isLoading: false });
    });

    return {
      settings: SettingsStore.getState(),

      user: UserStore.getState(),

      talkFeelings: TalkQuestionsStore.getState('talk_feelings'),
      talkParticipants: TalkQuestionsStore.getState('talk_participants'),
      diarySuccessParticipants: TalkQuestionsStore.getState('diary_success_participants'),
      talkQuestions: TalkQuestionsStore.getState(),

      recordCategories: RecordRatesStore.getState('categories'),
      recordRateCategories: RecordRatesStore.getState('rateCategories'),
      recordRateUnits: RecordRatesStore.getState('rateUnits')
    }

  }

});
