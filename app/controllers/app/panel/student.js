import StudentDispatcher from '../../../dispatchers/student-dispatcher';
import StudentStore from '../../../stores/admin/student-store';


export default Ember.Controller.extend({
  
  secondText: function() {
    if (this.get('model.student.first_name') && this.get('model.student.last_name'))
      return `${this.get('model.student.first_name')} ${this.get('model.student.last_name')}`;
  }.property('model.student.first_name', 'model.student.last_name'),

  editableInputFirstNameApi: function() {
    return {
      name: 'Imie',
      placeholder: 'Imie',
      value: this.get('model.student.first_name'),
      validationType: 'input'
    }
  }.property('model.student.first_name'),

  editableInputLastNameApi: function() {
    return {
      name: 'Nazwisko',
      placeholder: 'Nazwisko',
      value: this.get('model.student.last_name'),
      validationType: 'input'
    }
  }.property('model.student.last_name'),

  editableInputBirthdateApi: function() {
    return {
      name: 'Data urodzenia',
      placeholder: 'RR-MM-DDDD',
      value: this.get('model.student.birthdate'),
      validationType: 'date'
    }
  }.property('model.student.birthdate'),

  editableInputEmailApi: function() {
    return {
      name: 'Email',
      placeholder: 'Email',
      value: this.get('model.student.email'),
      validationType: 'input'
    }
  }.property('model.student.email'),

  editableInputPhoneApi: function() {
    return {
      name: 'Telefon',
      placeholder: 'Telefon',
      value: this.get('model.student.phone'),
      validationType: 'input'
    }
  }.property('model.student.phone'),

  editableInputFacebookProfileApi: function() {
    return {
      name: 'Profil na facebooku',
      placeholder: 'Profil na facebooku',
      value: this.get('model.student.facebook_profile')
    }
  }.property('model.student.facebook_profile'),

  editableSelectLanguageApi: function() {
    const modelValue = this.get('model.student.language');

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
  }.property('model.student.language'),


  editableSelectRoleApi: function() {
    const modelValue = this.get('model.student.role');

    if (!modelValue) return;

    let values = [
      Ember.Object.create({ value: "student", displayValue: "Kursant" }),
      Ember.Object.create({ value: "trainer", displayValue: "Trener" }),
      Ember.Object.create({ value: "admin", displayValue: "Administrator" })
    ];

    _.find(values, ['value', modelValue]).set('selected', true);

    return {
      name: "Rola",
      values: values
    }
  }.property('model.student.role'),

  editableInputTherapyBeginningApi: function() {
    return {
      name: 'Rozpoczęcie terapii',
      placeholder: 'RR-MM-DDDD',
      value: this.get('model.student.therapy_beginning')
    }
  }.property('model.student.therapy_beginning'),

  editableInputTherapyEndApi: function() {
    return {
      name: 'Zakończenie terapii',
      placeholder: 'RR-MM-DDDD',
      value: this.get('model.student.therapy_end')
    }
  }.property('model.student.therapy_end'),

  editableInputPasswordApi: function() {
    return {
      name: 'Hasło',
      placeholder: 'Hasło',
      value: ''
    }
  }.property(),

  editableSelectUserPermissionDiariesApi: function() {
    const modelValue = this.get('model.student.user_permission.diary_permission');

    if (modelValue === undefined) return;

    let values = [
      Ember.Object.create({ value: true, displayValue: "Tak" }),
      Ember.Object.create({ value: false, displayValue: "Nie" })
    ];

    _.find(values, ['value', modelValue]).set('selected', true);

    return {
      name: "Wysyłanie dzienników",
      values: values
    }
  }.property('model.student.user_permission.diary_permission'),

  editableSelectUserPermissionRecordsApi: function() {
    const modelValue = this.get('model.student.user_permission.records_permission');

    if (modelValue === undefined) return;

    let values = [
      Ember.Object.create({ value: true, displayValue: "Tak" }),
      Ember.Object.create({ value: false, displayValue: "Nie" })
    ];

    _.find(values, ['value', modelValue]).set('selected', true);

    return {
      name: "Wysyłanie nagrań",
      values: values
    }
  }.property('model.student.user_permission.records_permission'),

  editableInputMyHistoryApi: function() {
    return {
      name: 'Moja historia',
      placeholder: 'Moja historia',
      value: this.get('model.student.my_history'),
      textareaInput: true
    }
  }.property('model.student.my_history'),

  editableInputMyNowamowaApi: function() {
    return {
      name: 'Moja nowamowa',
      placeholder: 'Moja nowamowa',
      value: this.get('model.student.my_nowamowa'),
      textareaInput: true
    }
  }.property('model.student.my_nowamowa'),

  editableInputTrainerNotesApi: function() {
    return {
      name: 'Notatki trenera',
      placeholder: 'Notatki trenera',
      value: this.get('model.student.trainer_notes'),
      textareaInput: true
    }
  }.property('model.student.trainer_notes'),

  editableSelectMyHistoryPublicApi: function() {
    const modelValue = this.get('model.student.my_history_public');

    if (modelValue === undefined) return;

    let values = [
      Ember.Object.create({ value: true, displayValue: "Tak" }),
      Ember.Object.create({ value: false, displayValue: "Nie" })
    ];

    _.find(values, ['value', modelValue]).set('selected', true);

    return {
      name: "Moja historia dostępna publicznie",
      values: values
    }
  }.property('model.student.my_history_public'),

  editableSelectMyNowamowaPublicApi: function() {
    const modelValue = this.get('model.student.my_nowamowa_public');

    if (modelValue === undefined) return;

    let values = [
      Ember.Object.create({ value: true, displayValue: "Tak" }),
      Ember.Object.create({ value: false, displayValue: "Nie" })
    ];

    _.find(values, ['value', modelValue]).set('selected', true);

    return {
      name: "Moja nowamowa dostępna publicznie",
      values: values
    }
  }.property('model.student.my_nowamowa_public'),

  editableDisplayGroupApi: function() {
    if (this.get('model.student.students_group.id')) {
      return {
        link: {
          href: 'app.panel.group',
          id: this.get('model.student.students_group.id'),
          name: this.get('model.student.students_group.name')
        }
      }
    } else {
      return {
        link: {
          href: '/#/panel/groups?page=1',
          name: 'Dodaj do grupy',
          isItalic: true
        }
      }
    }
  }.property('model.student.students_group.id'),

  fileUploadApi: function() {
    return {
      params: {
        url: `/api/v1/users/${this.get('model.student.id')}`,
        method: 'PUT',
        paramName: 'photo'
      },
      beforeUpload: () => {
        StudentStore.send('update', this.get('model.student.id'), { ['photo.isLoading']: true });
      },
      didUpload: () => {
        StudentDispatcher.fetchUserPhoto(this.get('model.student.id'))
      }
    }
  }.property('model.student'),
 

  actions: {

    onSave(...args) {
      const value = _.isObject(args[1]) ? args[1].value : args[1];
      StudentDispatcher.updateUser(args[0], value, this.get('model.student.id'));
    }

  }

});
