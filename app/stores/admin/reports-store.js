const state = Ember.Object.extend({

  "isLoading": false,

  "report": null

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
    },

    update: (payload) => getState().setProperties(payload),

    clear: () => getState().set('report', null)

  }

});


export default self.create();
