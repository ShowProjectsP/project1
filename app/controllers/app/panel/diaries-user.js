import DiariesListStore from '../../../stores/diaries/diaries-list-store';


export default Ember.Controller.extend({

	bottomText: function() {
		const totalSize = this.get('model.diaries.total_size') !== undefined ? this.get('model.diaries.total_size') : '';
		const correctSize = this.get('model.diaries.correct_size') !== undefined ? this.get('model.diaries.correct_size') : '';
		return `Twój dziennik zawiera ${totalSize} wpisów, w tym ${correctSize} poprawnych`;
	}.property('model.diaries.total_size', 'model.diaries.correct_size'),

	secondText: function() {
		return `${this.get('model.diaries.lastDiary.id') === 'new' ? this.get('model.diaries.lastDiary.date') : (this.get('model.diaries.activeDiary.date') ? this.get('model.diaries.activeDiary.date') : '')}`;
	}.property('model.diaries.activeDiary.date', 'model.diaries.lastDiary.id', 'model.diaries.lastDiary.diaryName'),

	actions: {

		toggleExpandedYear(year) {
			year.toggleProperty('expanded');
		},

		selectDay(day) {
			DiariesListStore.getState().set('selectedDiaryId', day.get('id'));
		}

	}

});