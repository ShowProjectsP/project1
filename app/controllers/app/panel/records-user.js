export default Ember.Controller.extend({

	lastSelectedDay: Ember.Object.create(),

	bottomText: function() {
		const totalSize = this.get('model.records.total_size') !== undefined ? this.get('model.records.total_size') : '';
		const correctSize = this.get('model.records.correct_size') !== undefined ? this.get('model.records.correct_size') : '';
		return `Wysłałeś ${totalSize} nagrań, w tym ${correctSize} poprawnych`;
	}.property('model.records.total_size', 'model.records.correct_size'),

	secondText: function() {
		return `${this.get('model.records.lastRecord.id') === 'new' ? this.get('model.records.lastRecord.date') : this.get('model.records.lastRecord.diaryName')}`;
	}.property('model.records.lastRecord.id', 'model.records.lastRecord.recordName'),

	actions: {

		toggleExpandedYear(year) {
			year.toggleProperty('expanded');
		},

		selectDay(day) {
			this.get('lastSelectedDay').set('selected', false);
			this.set('lastSelectedDay', day);
			day.set('selected', true);
			this.set('model.records.lastDiary', day);
		}

	}

});