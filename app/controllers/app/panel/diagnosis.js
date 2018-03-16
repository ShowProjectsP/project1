import DiagnosisStore from '../../../stores/admin/diagnosis-store';
import DiagnosisDispatcher from '../../../dispatchers/diagnosis-dispatcher';


export default Ember.Controller.extend({

  secondText: function() {
    if (this.get('model.diagnosis.user.first_name') && this.get('model.diagnosis.user.last_name'))
      return `${this.get('model.diagnosis.user.first_name')} ${this.get('model.diagnosis.user.last_name')}`;
  }.property('model.diagnosis.user.first_name', 'model.diagnosis.user.last_name'),

  editableSelectDiagnosisTypeApi: function() {
    let values = [
      Ember.Object.create({ value: "skype", displayValue: "Skype" }),
      Ember.Object.create({ value: "stationary", displayValue: "Stacjonarnie" })
    ];

    const selectedValue = _.find(values, ['value', this.get('model.diagnosis.diagnosis_type')]);
    if (selectedValue) selectedValue.set('selected', true);

    return {
      name: "Typ diagnozy",
      values: values
    }
  }.property('model.diagnosis.diagnosis_type'),

  editableSelectIsPaidApi: function() {
    let values = [
      Ember.Object.create({ value: true, displayValue: "Tak" }),
      Ember.Object.create({ value: false, displayValue: "Nie" })
    ];

    const selectedValue = _.find(values, ['value', this.get('model.diagnosis.is_paid')]);
    if (selectedValue) selectedValue.set('selected', true);

    return {
      name: "Opłacono",
      values: values
    }
  }.property('model.diagnosis.is_paid'),

  editableSelectIsDoneApi: function() {
    let values = [
      Ember.Object.create({ value: true, displayValue: "Tak" }),
      Ember.Object.create({ value: false, displayValue: "Nie" })
    ];

    const selectedValue = _.find(values, ['value', this.get('model.diagnosis.is_done')]);
    if (selectedValue) selectedValue.set('selected', true);

    return {
      name: "Zakończono",
      values: values
    }
  }.property('model.diagnosis.is_done'),

  editableInputNotesFromTrainerApi: function() {
    return {
      name: 'Notatki trenera',
      placeholder: 'Notatki trenera',
      value: this.get('model.diagnosis.notes_from_trainer'),
      textareaInput: true
    }
  }.property('model.diagnosis.notes_from_trainer'),

  actions: {

    onSave(...args) {
      const value = _.isObject(args[1]) ? args[1].value : args[1];
      DiagnosisDispatcher.updateDiagnosis(args[0], value, this.get('model.diagnosis.id'));
    }

  }

});
