import UsersDispatcher from '../../../dispatchers/users-dispatcher';
import ReportsDispatcher from '../../../dispatchers/reports-dispatcher';
import ReportsStore from '../../../stores/admin/reports-store';
import { validateDate } from '../../../validation/input';


export default Ember.Controller.extend({

	topText: function() {
		return this.get('model.reports.report') ? 'Raport' : 'Raporty';
	}.property('model.reports.report'),

	secondText: function() {
		return this.get('model.reports.report') ? `${this.get('model.dateFrom')} - ${this.get('model.dateTo')}` : '';
	}.property('model.reports.report'),

	studentsSelectApi: function() {
		let values = [];
		_.forEach(this.get('model.students.collection'), (e) => {
			values.push(Ember.Object.create({ value: e.id, displayValue: `${e.first_name} ${e.last_name}`, selected: false }));
		});

  	return {
  		values: values,
  		placeholder: 'Wybierz kursantów',
      selected: [],
  		isMore: this.get('model.students.isMore')
  	};
  }.property('model.students.collection.length', 'model.students.isMore'),

  selectedStudents: function() {
    return _.filter(this.get('studentsSelectApi.values'), 'selected');
  }.property('studentsSelectApi.values.@each.selected'),

  createReportDisabled: function() {
    return !this.get('model.dateFrom') || !this.get('model.dateTo') || !_.filter(this.get('studentsSelectApi.values'), 'selected').length;
  }.property('model.dateFrom', 'model.dateTo', 'studentsSelectApi.values.@each.selected'),

  dateFromValidation: function() {
    if (this.get('model.createReportSumbitted')) return validateDate(this.get('model.dateFrom'));
  }.property('model.dateFrom', 'model.createReportSumbitted'),

  dateToValidation: function() {
    if (this.get('model.createReportSumbitted')) return validateDate(this.get('model.dateTo'));
  }.property('model.dateTo', 'model.createReportSumbitted'),

  prepareRaportPdf() {
  	const reportUsers = ReportsStore.getState().get('report');

  	let reportObj = [
      { text: 'Data', bold: true, color: '#fd9500', margin: [0, 0, 0, 10] },
      { text: `${this.get('model.dateFrom')} - ${this.get('model.dateTo')}` },
      { text: 'Kursanci', bold: true, color: '#fd9500', margin: [0, 20, 0, 0] }
    ];

    _.each(reportUsers, (user) => {
      reportObj.push({ text: `${user.name}`, bold: true, margin: [0, 10, 0, 5] });

      let table = {
        headerRows: 1,
        widths: [ '*', '*', '*', '*', '*', '*' ],
        body: [
          [ 
            { text: 'Miesiąc', alignment: 'center' }, 
            { text: 'Wszystkie dzienniki', alignment: 'center' }, 
            { text: 'Poprawne dzienniki', alignment: 'center' }, 
            { text: 'Wszystkie nagrania', alignment: 'center' }, 
            { text: 'Poprawne nagrania', alignment: 'center' }, 
            { text: 'Wymagane nagrania', alignment: 'center' } 
          ]
        ]
      };

      _.each(user.results_for_month, (result) => {
        let arr = [result.month, result.all_diaries, result.correct_diaries, result.all_records, result.correct_records, result.required_records];
        table.body.push(arr);
      });

      reportObj.push({table});
    });

    return { content: reportObj };
  },

	actions: {

		loadMoreStudents() {
			UsersDispatcher.fetchUsers({ search_field: 'role', search_value: 'student'}, true);
		},

		removeStudent(student) {
			student.toggleProperty('selected');
		},

		createReport() {
			const params = {
				date_from: this.get('model.dateFrom'),
				date_to: this.get('model.dateTo'),
				user_ids: _.map(_.filter(this.get('studentsSelectApi.values'), 'selected'), 'value')
			};

      this.set('model.createReportSumbitted', true);

			ReportsDispatcher.createReport(params);
		},

		downloadRaportPdf() {
			pdfMake.createPdf(this.prepareRaportPdf()).download(`raport_${this.get('model.dateFrom')}_${this.get('model.dateTo')}.pdf`);
		}

	}

});