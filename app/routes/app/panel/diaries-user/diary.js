import DiariesDispatcher from '../../../../dispatchers/diaries-dispatcher';
import DiariesListStore from '../../../../stores/diaries/diaries-list-store';
import DiaryUserStore from '../../../../stores/diaries/diary-user-store';
import TalkQuestionsStore from '../../../../stores/talk-questions-store';


export default Ember.Route.extend({

	beforeModel() {
		const diaryId = this.paramsFor(this.routeName).diary_id;

		DiariesListStore.getState().get('promise').done(() => {
			DiariesDispatcher.fetchDiaryDetails(diaryId);
		});
	},

	model() {
		const diaryId = this.paramsFor(this.routeName).diary_id;

		DiaryUserStore.getState(diaryId).get('promise').done(() => {
			DiaryUserStore.send('update', diaryId, { isLoading: false });
		});

		return {
			diary: DiaryUserStore.getState(diaryId),
			talkFeelings: TalkQuestionsStore.getState('talk_feelings'),
			diarySuccessParticipants: TalkQuestionsStore.getState('diary_success_participants'),
			talkParticipants: TalkQuestionsStore.getState('talk_participants')
		};

	}

});