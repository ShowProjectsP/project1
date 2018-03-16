import DiariesDispatcher from '../../../dispatchers/diaries-dispatcher';


export default Ember.Controller.extend({

	secondText: function() {
		if (this.get('model.diary.titleText') && this.get('model.diary.user.first_name') && this.get('model.diary.user.last_name')) 
			return `${this.get('model.diary.user.first_name')} ${this.get('model.diary.user.last_name')}, ${this.get('model.diary.titleText')}`;
	}.property('model.diary.titleText', 'model.diary.user.first_name', 'model.diary.user.last_name'),

	oldSpeechUsageApi: function() {
		return {
			values: [
			 { name: (this.get('model.diary.old_speech_usage') ? 'Tak' : 'Nie') }
			],
			comment: this.get('model.diary.old_speech_usage_comment')
		}
	}.property('model.diary.old_speech_usage', 'model.diary.old_speech_usage_comment'),


	talkFeelingsApi: function() {
		return {
			values: [
				{ name: this.get('model.diary.talk_feeling.name') }
			],
			comment: this.get('model.diary.talk_feelings_substantiation')
		};
	}.property('model.diary.talk_feeling', 'model.diary.talk_feelings_substantiation'),

	diarySuccessParticipantsApi: function() {
		let values = [];

		_.each(_.map(this.get('model.diary.diary_success_participants'), 'name'), (el) => {
			values.push({ name: el })
		});
		
		return {
			values: values
		};
	}.property('model.diary.diary_success_participants'),

	talkParticipantsWithoutRecordApi: function() {
		let values = [];

		_.each(_.map(this.get('model.diary.talk_participants_without_record'), 'name'), (el) => {
			values.push({ name: el })
		});
		
		return {
			values: values
		};
	}.property('model.diary.talk_participants_without_record'),

	phoneCallParticipantsWithoutRecordApi: function() {
		let values = [];

		_.each(_.map(this.get('model.diary.phone_call_participants_without_record'), 'name'), (el) => {
			values.push({ name: el })
		});
		
		return {
			values: values
		};
	}.property('model.diary.phone_call_participants_without_record'),

	reviewDetails: function() {
		return this.get('model.diary.review_details') ? this.get('model.diary.review_details') : null;
	}.property('model.diary.review_details'),

	actions: {

		openReviewMode() {
			if (this.get('model.diary.is_correct')) return;

			this.set('model.diary.isReviewing', true);
		},

		review(isCorrect) {
			const params = {
				id: this.get('model.diary.id'),
				is_correct: isCorrect,
				review_details: this.get('reviewDetails')
			};

			DiariesDispatcher.reviewDiary(this.get('model.diary.id'), params);
		}

	}

});