const StudentModel = Ember.Mixin.create({

  "editable": {
    "first_name": {
      "editing": false,
      "isLoading": false
    },
    "last_name": {
      "editing": false,
      "isLoading": false
    },
    "email": {
      "editing": false,
      "isLoading": false
    },
    "birthdate": {
      "editing": false,
      "isLoading": false
    },
    "phone": {
      "editing": false,
      "isLoading": false
    },
    "facebook_profile": {
      "editing": false,
      "isLoading": false
    },
    "language": {
      "editing": false,
      "isLoading": false
    },
    "role": {
      "editing": false,
      "isLoading": false
    },
    "trainer_notes": {
      "editing": false,
      "isLoading": false
    },
    "therapy_beginning": {
      "editing": false,
      "isLoading": false
    },
    "therapy_end": {
      "editing": false,
      "isLoading": false
    },
    "password": {
      "editing": false,
      "isLoading": false
    },
    "my_history": {
      "editing": false,
      "isLoading": false
    },
    "my_history_public": {
      "editing": false,
      "isLoading": false
    },
    "my_nowamowa": {
      "editing": false,
      "isLoading": false
    },
    "my_nowamowa_public": {
      "editing": false,
      "isLoading": false
    },
    "user_permission": {
      "diary_permission": {
        "editing": false,
        "isLoading": false
      },
      "records_permission": {
        "editing": false,
        "isLoading": false
      }
    }
  }

});

const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend(StudentModel, 
      { 
        "isLoading": true, 
        "promise": (new jQuery.Deferred()),
        "photo": {
          "value": null,
          "isLoading": true
        }
      }).create();
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
