const DiagnosisModel = Ember.Mixin.create({

  "editable": {
    "diagnosis_type": {
      "editing": false,
      "isLoading": false
    },
    "notes_from_trainer": {
      "editing": false,
      "isLoading": false
    },
    "is_paid": {
      "editing": false,
      "isLoading": false
    },
    "is_done": {
      "editing": false,
      "isLoading": false
    }
  },

  "params": {
    "notes_from_trainer": null
  }

});

const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend(DiagnosisModel, { "isLoading": true, "promise": (new jQuery.Deferred()) }).create();
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
