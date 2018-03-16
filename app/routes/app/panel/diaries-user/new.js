import DiaryNewStore from '../../../../stores/diaries/diary-new-store';
import TalkQuestionsStore from '../../../../stores/talk-questions-store';

export default Ember.Route.extend({

	model() {

		DiaryNewStore.getState().get('promise').done(() => {
			DiaryNewStore.send('update', { isLoading: false });
		});

		return {
			diary: DiaryNewStore.getState(),
			isNewDiary: true,
			talkFeelings: TalkQuestionsStore.getState('talk_feelings'),
			diarySuccessParticipants: TalkQuestionsStore.getState('diary_success_participants'),
			talkParticipants: TalkQuestionsStore.getState('talk_participants')
		};

	}

});