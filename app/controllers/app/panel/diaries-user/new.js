import DiariesDispatcher from '../../../../dispatchers/diaries-dispatcher';


export default Ember.Controller.extend({

	routing: Ember.inject.service('-routing'),

	oldSpeechUsageApi: function() {
		let values = Ember.A();

		values.pushObject(Ember.Object.create({ "name": "Tak", "id": true, "checked": false }));
		values.pushObject(Ember.Object.create({ "name": "Nie", "id": false, "checked": false }));

		return {
			values: values,
			oneSelection: true,
			comment: {
				value: null,
				placeholder: "Komentarz"
			}
		};
	}.property(),

	talkFeelingsApi: function() {
		return {
			values: _.cloneDeep(this.get('model.talkFeelings.collection')),
			oneSelection: true,
			comment: {
				value: null,
				placeholder: "Uzasadnienie"
			}
		};
	}.property('model.talkFeelings.collection'),

	diarySuccessParticipantsApi: function() {
		return {
			values: _.cloneDeep(this.get('model.diarySuccessParticipants.collection'))
		};
	}.property('model.diarySuccessParticipants.collection'),

	talkParticipantsWithoutRecordApi: function() {
		return {
			values: _.cloneDeep(this.get('model.talkParticipants.collection'))
		};
	}.property('model.talkParticipants.collection'),

	phoneCallParticipantsWithoutRecordApi: function() {
		return {
			values: _.cloneDeep(this.get('model.talkParticipants.collection'))
		};
	}.property('model.talkParticipants.collection'),

	createButtonDisabled: function() {
		const meditationCount = this.get('model.diary.editable.meditation_count.value');
		const visualisationCount = this.get('model.diary.editable.visualisation_count.value');
		const anchorCount = this.get('model.diary.editable.anchor_count.value');
		const oldSpeechUsage = _.find(this.get('oldSpeechUsageApi.values'), ['checked', true]);
		const talkFeelingId = _.find(this.get('talkFeelingsApi.values'), ['checked', true]);
		const diarySuccessParticipantIds = _.map(_.filter(this.get('diarySuccessParticipantsApi.values'), ['checked', true]), 'id').length;
		const talkParticipantsWithoutRecordIds = _.map(_.filter(this.get('talkParticipantsWithoutRecordApi.values'), ['checked', true]), 'id').length;
		const phoneCallParticipantsWithoutRecordIds = _.map(_.filter(this.get('phoneCallParticipantsWithoutRecordApi.values'), ['checked', true]), 'id').length;

		return !meditationCount || !visualisationCount || !anchorCount || !oldSpeechUsage || !talkFeelingId || !diarySuccessParticipantIds || !talkParticipantsWithoutRecordIds || !phoneCallParticipantsWithoutRecordIds;
	}.property('model.diary.editable.meditation_count.value', 'model.diary.editable.visualisation_count.value', 'model.diary.editable.anchor_count.value', 
		'oldSpeechUsageApi.values.@each.checked', 'talkFeelingsApi.values.@each.checked', 'diarySuccessParticipantsApi.values.@each.checked', 
		'talkParticipantsWithoutRecordApi.values.@each.checked', 'phoneCallParticipantsWithoutRecordApi.values.@each.checked'),

	actions: {

		create() {
			const oldSpeechUsage = _.find(this.get('oldSpeechUsageApi.values'), ['checked', true]) ? _.find(this.get('oldSpeechUsageApi.values'), ['checked', true]).get('id') : null;
			const talkFeelingId = _.find(this.get('talkFeelingsApi.values'), ['checked', true]) ? _.find(this.get('talkFeelingsApi.values'), ['checked', true]).get('id') : null;

			const params = {
				date: moment().format('l'),
				meditation_count: this.get('model.diary.editable.meditation_count.value'),
				visualisation_count: this.get('model.diary.editable.visualisation_count.value'),
				anchor_count: this.get('model.diary.editable.anchor_count.value'),
				old_speech_usage: oldSpeechUsage,
				old_speech_usage_comment: this.get('oldSpeechUsageApi.comment.value'),
				notes: this.get('model.diary.editable.notes.value'),
				talk_feeling_id: talkFeelingId,
				talk_feelings_substantiation: this.get('talkFeelingsApi.comment.value'),
				diary_success_participant_ids: _.map(_.filter(this.get('diarySuccessParticipantsApi.values'), ['checked', true]), 'id'),
				talk_participants_without_record_ids: _.map(_.filter(this.get('talkParticipantsWithoutRecordApi.values'), ['checked', true]), 'id'),
				phone_call_participants_without_record_ids: _.map(_.filter(this.get('phoneCallParticipantsWithoutRecordApi.values'), ['checked', true]), 'id')
			};

			const callback = (id) => {
				this.get('routing').transitionTo('app.panel.diaries-user.diary', [id]);
			};

			DiariesDispatcher.createDiary(params, callback);
		}

	}

});