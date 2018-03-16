const state = Ember.Object.extend({

  "isLoading": true,

  "promise": (new jQuery.Deferred()),

  "page": 0

}).create();

const getState = () => {
 return state;
};

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
