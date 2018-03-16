const StudentModel = Ember.Mixin.create({

  "pagesCount": function() {
   return Math.ceil(this.get('total_size') / 10);
 }.property('total_size')

});

const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend(StudentModel, { "isLoading": true, "promise": (new jQuery.Deferred()) }).create();
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
