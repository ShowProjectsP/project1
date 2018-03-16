import SettingsDispatcher from '../../../dispatchers/settings-dispatcher';
import TalkQuestionsDispatcher from '../../../dispatchers/talk-questions-dispatcher';


export default Ember.Controller.extend({

  i18n: Ember.inject.service(),
  localStorage: Ember.inject.service(),

  editableSelectLanguageApi: function() {
    let values = [
      Ember.Object.create({ value: "pl", displayValue: "Polski" }),
      Ember.Object.create({ value: "cz", displayValue: "Czeski" }),
      Ember.Object.create({ value: "en", displayValue: "Angielski" })
    ];

    _.find(values, ['value', this.get('model.settings.language')]).set('selected', true);

    return {
      name: "Język",
      values: values
    }
  }.property('model.settings.language'),

  editableInputSkypeDiagnosisPriceApi: function() {
    return {
      name: 'Diagnoza Skype',
      placeholder: 'Nazwisko',
      value: this.get('model.settings.skype_diagnosis_price'),
      validationType: 'input'
    }
  }.property('model.settings.skype_diagnosis_price'),

  editableInputStationaryDiagnosisPriceApi: function() {
    return {
      name: 'Diagnoza Stacjonarna',
      placeholder: 'Nazwisko',
      value: this.get('model.settings.stationary_diagnosis_price'),
      validationType: 'input'
    }
  }.property('model.settings.stationary_diagnosis_price'),

  editableTalkFeelingsApi: function() {
    let values = Ember.A();

    _.forEach(this.get('model.talkFeelings.collection'), (el) => {
      values.pushObject(Ember.Object.create({ id: el.get('id'), name: el.get('name'), isLoading: el.get('isLoading') }));
    });

    return {
      name: 'Odczucia',
      values: values,
      newItem: this.get('model.talkFeelings.newItem'),
      newItemPlaceholder: 'Dodaj nowe odczucie',
      onSaveItem: (params) => TalkQuestionsDispatcher.updateTalkFeeling(params),
      onDeleteItem: (params) => TalkQuestionsDispatcher.deleteTalkFeeling(params),
      onAddNewItem: (value) => TalkQuestionsDispatcher.createNewTalkFeeling(value)
    }
  }.property('model.talkFeelings.collection.length', 'model.talkFeelings.newItem.isLoading', 'model.talkFeelings.newItem.value', 'model.talkFeelings.collection.@each.isLoading'),

  editableTalkParticipantsApi: function() {
    let values = Ember.A();

    _.forEach(this.get('model.talkParticipants.collection'), (el) => {
      values.pushObject(Ember.Object.create({ id: el.get('id'), name: el.get('name'), isLoading: el.get('isLoading') }));
    });
    
    return {
      name: 'Rozmówcy',
      values: values,
      newItem: this.get('model.talkParticipants.newItem'),
      newItemPlaceholder: 'Dodaj nowego rozmwówcę',
      onSaveItem: (params) => TalkQuestionsDispatcher.updateTalkParticipant(params),
      onDeleteItem: (params) => TalkQuestionsDispatcher.deleteTalkParticipant(params),
      onAddNewItem: (value) => TalkQuestionsDispatcher.createNewTalkParticipant(value)
    }
  }.property('model.talkParticipants.collection.length', 'model.talkParticipants.newItem.isLoading', 'model.talkParticipants.newItem.value', 'model.talkParticipants.collection.@each.isLoading'),

  editableDiarySuccessParticipantsApi: function() {
    let values = Ember.A();

    _.forEach(this.get('model.diarySuccessParticipants.collection'), (el) => {
      values.pushObject(Ember.Object.create({ id: el.get('id'), name: el.get('name'), isLoading: el.get('isLoading') }));
    });
    
    return {
      name: 'Rozmówca z dziennika',
      values: values,
      newItem: this.get('model.diarySuccessParticipants.newItem'),
      newItemPlaceholder: 'Dodaj nowego rozmwówcę',
      onSaveItem: (params) => TalkQuestionsDispatcher.updateDiarySuccessParticipant(params),
      onDeleteItem: (params) => TalkQuestionsDispatcher.deleteDiarySuccessParticipant(params),
      onAddNewItem: (value) => TalkQuestionsDispatcher.createNewDiarySuccessParticipant(value)
    }
  }.property('model.diarySuccessParticipants.collection.length', 'model.diarySuccessParticipants.newItem.isLoading', 'model.diarySuccessParticipants.newItem.value', 'model.diarySuccessParticipants.collection.@each.isLoading'),

  recordCategoriesApi: function() {
    return {
      name: 'Kategorie rozmów'

    }
  }.property(''),

  actions: {

    onSaveLanguage(...args) {
      const callback = (data) => {
        this.get('localStorage').setItem('user', JSON.stringify(data));
        this.get('i18n').set('locale', data.language);
      };

      SettingsDispatcher.updateLanguage(args[0], args[1].value, callback);
    },

    onSaveSettings(...args) {
      SettingsDispatcher.updateSettings(args[0], args[1]);
    },

    setEditMode(field) {
      this.set(`model.${field}.editing`, true);
    }

  }

});
