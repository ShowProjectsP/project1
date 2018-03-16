const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend({}, 
      { 
        "isLoading": false, 
        "promise": (new jQuery.Deferred()),
        "isMore": false
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

    handleMore: (id, payload) => {
      getState(id).setProperties({ page: payload.page });
      getState(id).get('collection').pushObjects(payload.collection);
    },

    update: (id, payload) => getState(id).setProperties(payload)

  }

});


export default self.create();
