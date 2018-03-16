import DiariesApi from '../../../api/diaries-api';
import DiariesDispacher from '../../../dispatchers/diaries-dispatcher';
import DiariesListStore from '../../../stores/diaries/diaries-list-store';
import TalkQuestionsDispatcher from '../../../dispatchers/talk-questions-dispatcher';


export default Ember.Route.extend({

  beforeModel() {
    TalkQuestionsDispatcher.fetchTalkQuestions();
  },

  model() {
    let lastSelectedDay = Ember.Object.create({ day: null });

    DiariesListStore.getState().get('promise').done(() => {
      DiariesListStore.send('update', { isLoading: false });

      const diaryIdFromUrl = this.router.currentURL.substring(_.lastIndexOf(this.router.currentURL, '/') + 1, this.router.currentURL.length);
      const lastDiaryId = DiariesListStore.getState().get('lastDiaryId');
      const diaryIdToUse = this.router.currentURL.indexOf('diaries') !== -1 ? diaryIdFromUrl : lastDiaryId;

      DiariesListStore.getState().set('selectedDiaryId', diaryIdToUse);
    });

    return {
      diaries: DiariesListStore.getState()
    };

  }

});
