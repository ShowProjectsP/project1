import DiariesDispatcher from '../../../../dispatchers/diaries-dispatcher';


export default Ember.Controller.extend({

	oldSpeechUsageApi: function() {
		let values = Ember.A();

		values.pushObject(Ember.Object.create({ "name": "Tak", "id": true, "checked": false }));
		values.pushObject(Ember.Object.create({ "name": "Nie", "id": false, "checked": false }));

		let value = _.find(values, ['id', this.get('model.diary.old_speech_usage')]);
		if (value) value.set('checked', true);

		return {
			values: values,
			oneSelection: true,
			comment: {
				value: this.get('model.diary.old_speech_usage_comment'),
				placeholder: "Komentarz"
			}
		};
	}.property('model.diary.old_speech_usage', 'model.diary.old_speech_usage_comment'),

	talkFeelingsApi: function() {
		let values = _.cloneDeep(this.get('model.talkFeelings.collection'));

		let value = _.find(values, ['id', this.get('model.diary.talk_feeling_id')]);
		if (value) value.set('checked', true);

		return {
			values: values,
			oneSelection: true,
			comment: {
				value: this.get('model.diary.talk_feelings_substantiation'),
				placeholder: "Uzasadnienie"
			}
		};
	}.property('model.diary.talk_feeling_id', 'model.diary.talk_feelings_substantiation', 'model.talkFeelings.collection'),

	diarySuccessParticipantsApi: function() {
		let values = _.cloneDeep(this.get('model.diarySuccessParticipants.collection'));

		_.each(values, (t) => {
			_.each(this.get('model.diary.diary_success_participant_ids'), (v) => {
				if (t.id === v) t.set('checked', true);
			});
		});

		return {
			values: values
		};
	}.property('model.diary.diary_success_participant_ids', 'model.diarySuccessParticipants.collection'),

	talkParticipantsWithoutRecordApi: function() {
		let values = _.cloneDeep(this.get('model.talkParticipants.collection'));

		_.each(values, (t) => {
			_.each(this.get('model.diary.talk_participants_without_record_ids'), (v) => {
				if (t.id === v) t.set('checked', true);
			});
		});

		return {
			values: values
		};
	}.property('model.diary.talk_participants_without_record_ids', 'model.talkParticipants.collection'),

	phoneCallParticipantsWithoutRecordApi: function() {
		let values = _.cloneDeep(this.get('model.talkParticipants.collection'));

		_.each(values, (t) => {
			_.each(this.get('model.diary.phone_call_participants_without_record_ids'), (v) => {
				if (t.id === v) t.set('checked', true);
			});
		});

		return {
			values: values
		};
	}.property('model.diary.phone_call_participants_without_record_ids', 'model.talkParticipants.collection'), 

	showReviewBox: function() {
		return this.get('model.diary.isCorrect') || this.get('model.diary.notCorrect');
	}.property('model.diary.isCorrect', 'model.diary.notCorrect'),

	actions: {

		update() {
			const diarySuccessParticipantIdsFiltered = _.filter(this.get('diarySuccessParticipantsApi.values'), ['checked', true]);

			// TODO exception below

			const params = {
				id: this.get('model.diary.id'),
				meditation_count: parseInt(this.get('model.diary.meditation_count'), 10),
				visualisation_count: this.get('model.diary.visualisation_count'),
				anchor_count: this.get('model.diary.anchor_count'),
				old_speech_usage: _.find(this.get('oldSpeechUsageApi.values'), ['checked', true]).get('id'),
				old_speech_usage_comment: this.get('oldSpeechUsageApi.comment.value'),
				notes: this.get('model.diary.notes'),
				talk_feeling_id: _.find(this.get('talkFeelingsApi.values'), ['checked', true]).get('id'),
				talk_feelings_substantiation: this.get('talkFeelingsApi.comment.value'),
				diary_success_participant_ids: _.map(diarySuccessParticipantIdsFiltered, 'id'),
				talk_participants_without_record_ids: _.map(_.filter(this.get('talkParticipantsWithoutRecordApi.values'), ['checked', true]), 'id'),
				phone_call_participants_without_record_ids: _.map(_.filter(this.get('phoneCallParticipantsWithoutRecordApi.values'), ['checked', true]), 'id')
			};

			DiariesDispatcher.updateDiary(this.get('model.diary.id'), params);
		}

	}

});