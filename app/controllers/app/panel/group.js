import GroupDispatcher from '../../../dispatchers/group-dispatcher';
import UsersDispatcher from '../../../dispatchers/users-dispatcher';


export default Ember.Controller.extend({

	secondText: function() {
    if (this.get('model.group.name')) return this.get('model.group.name');
  }.property('model.group.name', 'model.group.name'),

  editableInputGroupNameApi: function() {
    return {
      name: 'Nazwa',
      placeholder: 'Nazwa',
      value: this.get('model.group.name'),
      validationType: 'input'
    }
  }.property('model.group.name'),

  editableSelectLanguageApi: function() {
    const modelValue = this.get('model.group.language');

    if (!modelValue) return;

    let values = [
      Ember.Object.create({ value: "pl", displayValue: "Polski" }),
      Ember.Object.create({ value: "cz", displayValue: "Czeski" }),
      Ember.Object.create({ value: "en", displayValue: "Angielski" })
    ];

    _.find(values, ['value', modelValue]).set('selected', true);

    return {
      name: "Język",
      values: values
    }
  }.property('model.group.language'),

  editableSelectTrainerApi: function() {
    let values = [];
    console.log(this.get('model.trainers.collection'));
    _.forEach(this.get('model.trainers.collection'), (e) => {
      values.push(Ember.Object.create({ value: e.id, displayValue: `${e.first_name} ${e.last_name}` }));
    });

    const selectedValue = _.find(values, ['value', this.get('model.group.trainer_id')]);
    if (selectedValue) selectedValue.set('selected', true);

    return {
      name: "Trener",
      values: values
    }
  }.property('model.trainers.collection.length', 'model.group.trainer_id'),

  editableCustomStudentsApi: function() {
    const values = this.getStudentsValues(this.get('model.students.collection'), this.get('model.group.students'));

    return {
      name: 'Dodaj kursantów',
      value: 'Wybierz kursantów',
      values: values,
      placeholder: 'Wybierz kursantów',
      selected: [],
      isMore: this.get('model.students.isMore')
    };
  }.property('model.students.collection.length', 'model.students.isMore', 'model.group.students'),

  getStudentsValues(students, groupStudents) {
    let values = [];

    _.forEach(students, (e) => {
      const isSelected = _.find(groupStudents, ['id', e.id]) ? true : false;
      values.push(Ember.Object.create({ value: e.id, displayValue: `${e.first_name} ${e.last_name}`, selected: isSelected }));
    });

    return values;
  },

  actions: {

  	onSave(...args) {
      const value = _.isObject(args[1]) ? args[1].value : args[1];
      GroupDispatcher.updateGroup(args[0], value, this.get('model.group.id'));
    },

    onSaveEditableCustomStudents() {
      const existingStudents = _.map(this.get('model.group.students'), 'id');
      const selectedStudents = _.map(this.get('editableCustomStudentsApi.selected'), 'value');

      GroupDispatcher.updateGroup('student_ids', _.concat(existingStudents, selectedStudents), this.get('model.group.id'));
    },

    onCancelEditableCustomStudents() {
      this.set('editableCustomStudentsApi.values', this.getStudentsValues(this.get('model.students.collection'), this.get('model.group.students')));
      this.set('editableCustomStudentsApi.selected', []);
    },

    loadMoreStudents() {
      UsersDispatcher.fetchUsers({ search_field: 'role', search_value: 'student'}, true);
    },

    removeStudent(student) {
      this.get('editableCustomStudentsApi.selected').removeObject(student);
      student.toggleProperty('selected');
    },

    removeStudentFromGroup(studentId) {
      GroupDispatcher.updateGroup('student_ids', _.map(_.reject(this.get('model.group.students'), ['id', studentId]), 'id'), this.get('model.group.id'));
    }

  }

});