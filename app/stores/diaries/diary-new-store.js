const state = Ember.Object.extend({

  "promise": (new jQuery.Deferred()),

  "isLoading": false,

  "editable": {
    "meditation_count": {
      "editable": false,
      "value": null
    },
    "visualisation_count": {
      "editable": false,
      "value": null
    },
    "anchor_count": {
      "editable": false,
      "value": null
    },
    "notes": {
      "editing": false,
      "value": null
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

}).create();

const getState = () => { return state; };

const self = Ember.Object.extend(Ember.ActionHandler, {

  state: state,

  getState: getState,

  actions: {

    handle: (payload) => {
      getState().setProperties(payload);
      getState().get('promise').resolve();
    },

    update: (payload) => getState().setProperties(payload)

  }

});


export default self.create();