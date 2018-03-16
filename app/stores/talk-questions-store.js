const state = Ember.Object.extend({

  "promise": (new jQuery.Deferred()),

  "editable": {
    "talk_feelings": {
      "editing": false,
      "isLoading": false
    }
  }

}).create();

const getState = (id) => {
  if (state[id]) return state[id];
  else if (id === 'all') return state;
  else {
    state[id] = Ember.Object.extend({ 
      "isLoading": false, 
      "promise": (new jQuery.Deferred()), 
      "collection": Ember.A(),
      "editing": false,
      "isLoading": false,
      "newItem": {
        "value": null,
        "isLoading": false
      }
    }).create();
    return state[id];
  }
};

const processCollection = (payload) => {
  for (let i = 0; i < payload.collection.length; i++) {

    payload.collection[i] = Ember.Object.extend(payload.collection[i], {
      "isLoading": false
    }).create();

  }

  return payload;
};

const processOne = (payload) => {
  payload = Ember.Object.extend(payload, {
    "isLoading": false
  }).create();

  return payload;
};

const self = Ember.Object.extend(Ember.ActionHandler, {

  state: state,

  getState: getState,

  actions: {

    handle: (id, payload) => {
      getState(id).setProperties(processCollection(payload));
      getState(id).get('promise').resolve();
    },

    handleMore: (id, payload) => {
      getState(id).get('collection').pushObject(processOne(payload));
    },

    update: (id, payload) => getState(id).setProperties(payload),

    updateField: (id, field, payload) => {
      getState(id).set(field, payload);
    }

  }

});


export default self.create();

