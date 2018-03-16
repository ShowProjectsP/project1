import { yearMonths, weekDays } from '../../utils/date-utils';

const DiaryModel = Ember.Mixin.create({

  "isUpdating": false,

  "isLoading": false,

  "isLoadingReviewCorrect": false,

  "isLoadingReviewNotCorrect": false,

  "isReviewing": false,

  "isPending": function() {
    return this.get('reviewed_at') === null;
  }.property('reviewed_at'),

  "isCorrect": function() {
    return this.get('is_correct') === true;
  }.property('is_correct'),

  "notCorrect": function() {
    return this.get('is_correct') === false && !this.get('isPending');
  }.property('is_correct', 'isPending'),

  "canEdit": function() {
    return this.get('isPending') || this.get('notCorrect') && !this.get('reviewed_at');
  }.property('isPending', 'notCorrect', 'reviewed_at'),

  editedText: function() {
    return `Edytowano: ${moment(this.get('updated_at')).format('LLLL')}`;
  }.property('updated_at'),

  "titleText": function() {
    if (this.get('created_at')) return moment(this.get('created_at')).format('LLLL');
  }.property('created_at'),

  "editable": {
    "meditation_count": {
      "editable": false
    },
    "visualisation_count": {
      "editable": false
    },
    "anchor_count": {
      "editable": false
    },
    "notes": {
      "editing": false
    },
    "old_speech_usage": {
      "editing": false
    },
    "talk_feeling_id": {
      "editing": false
    },
    "diary_success_participant_ids": {
      "editing": false
    },
    "talk_participants_without_record_ids": {
      "editing": false
    },
    "phone_call_participants_without_record_ids": {
      "editing": false
    }
  }

});

const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend(DiaryModel, { "isLoading": true, "promise": (new jQuery.Deferred()) }).create();
    return state[id];
  }
};

const self = Ember.Object.extend(Ember.ActionHandler, {

  state: state,

  getState: getState,

  actions: {

    handle: (id, payload) => {
      getState(id).setProperties(payload);
      getState(id).get('promise').resolve();
    },

    update: (id, payload) => getState(id).setProperties(payload)

  }

});


export default self.create();
