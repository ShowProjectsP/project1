import UsersDispatcher from '../../../dispatchers/users-dispatcher';
import GroupsDispatcher from '../../../dispatchers/groups-dispatcher';


export default Ember.Controller.extend({

	newGroupMode: false,
	newGroupLoading: false,

	groupName: null,
	editValueLanguage: null,
	editValueTrainer: null,

	trainersSelectApi: function() {
		let values = [];
		_.forEach(this.get('model.trainers.collection'), (e) => {
			values.push(Ember.Object.create({ value: e.id, displayValue: `${e.first_name} ${e.last_name}`, selected: false }));
		});
	
  	return {
  		name: 'trainer',
  		values: values,
  		placeholder: 'Trener'
  	};
  }.property('model.trainers.collection.length'),

  languageSelectApi: function() {
    return {
      name: "language",
      values: [
	      Ember.Object.create({ value: "pl", displayValue: "Polski", selected: false }),
	      Ember.Object.create({ value: "cz", displayValue: "Czeski", selected: false }),
	      Ember.Object.create({ value: "en", displayValue: "Angielski", selected: false })
	    ],
      placeholder: 'Język'
    };
  }.property(),

  studentsSelectApi: function() {
		let values = [];
		_.forEach(this.get('model.students.collection'), (e) => {
			values.push(Ember.Object.create({ value: e.id, displayValue: `${e.first_name} ${e.last_name}`, selected: false }));
		});

  	return {
  		name: 'trainer',
  		values: values,
  		placeholder: 'Wybierz kursantów',
  		selected: [],
  		isMore: this.get('model.students.isMore')
  	};
  }.property('model.students.collection.length', 'model.students.isMore'),

  createButtonEnabledObserver: function() {
  	this.set('createButtonEnabled', ( this.get('groupName') && _.find(this.get('trainersSelectApi.values'), 'selected') && _.find(this.get('languageSelectApi.values'), 'selected') && this.get('studentsSelectApi.selected.length') ));
  }.observes('groupName', 'trainersSelectApi.values.@each.selected', 'languageSelectApi.values.@each.selected', 'studentsSelectApi.selected.length'),

	resetNewGroupFields() {
		this.set('groupName', null);
		this.set('studentsSelectApi.selected', []);
		_.each(this.get('trainersSelectApi.values'), (v) => v.set('selected'));
		_.each(this.get('languageSelectApi.values'), (v) => v.set('selected'));
	},

	actions: {

		toggleNewGroupMode() {
			this.toggleProperty('newGroupMode');
		},

		loadMoreStudents() {
			UsersDispatcher.fetchUsers({ search_field: 'role', search_value: 'student'}, true);
		},

		removeStudent(student) {
			this.get('studentsSelectApi.selected').removeObject(student);
      student.toggleProperty('selected');
    },

		createGroup() {
			this.set('newGroupLoading', true);

			const params = {
				trainer_id: _.find(this.get('trainersSelectApi.values'), 'selected').get('value'),
				language: _.find(this.get('languageSelectApi.values'), 'selected').get('value'),
				name: this.get('groupName'),
				student_ids: _.map(this.get('studentsSelectApi.selected'), 'value')
			};

			const callback = () => {
				this.set('newGroupMode', false);
				this.set('newGroupLoading', false);

				this.resetNewGroupFields();
			};

			GroupsDispatcher.createGroup(params, callback, this.get('model.pageId'));
		},

		closeNewGroupMode() {
			this.set('newGroupMode', false);
			this.resetNewGroupFields();
		},

		deleteGroup(group) {
			GroupsDispatcher.deleteGroup(group, this.get('model.pageId'));
		}

	}

});
