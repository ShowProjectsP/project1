import DiariesApi from '../../../api/diaries-api';
import TalkQuestionsDispatcher from '../../../dispatchers/talk-questions-dispatcher';
import TalkQuestionsStore from '../../../stores/talk-questions-store';


export default Ember.Route.extend({

  beforeModel() {
 
  },

  model() {

    return {
      talkQuestions: TalkQuestionsStore.getState()
    };

  }

});
