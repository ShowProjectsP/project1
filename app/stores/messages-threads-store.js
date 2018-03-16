import UsersStore from '../stores/user-store';

let userId;

UsersStore.getState().get('promise').done(() => {
  userId = UsersStore.getState().get('id');
});

const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend({ "isLoading": false, "promise": (new jQuery.Deferred()) }).create();
    return state[id];
  }
};

const process = (payload) => {
  let newCollection = [];

  _.each(payload.collection, (c) => {
    newCollection.push(Ember.Object.extend(c, { 
      
      recipient: function() {
        return _.reject(this.get('users'), ['id', userId])[0];
      }.property('users', 'userId'),

      threadName: function() { 
        return `${this.get('recipient.first_name')} ${this.get('recipient.last_name')}`; 
      }.property('recipient'),

      "selected": false

    }).create());
  });

  payload.collection = newCollection;

  return payload;
};

const processOne = (payload) => {
  return Ember.Object.extend(payload, {

    recipient: function() {
      return _.reject(this.get('users'), ['id', userId])[0];
    }.property('users', 'userId'),

    threadName: function() { 
      return `${this.get('recipient.first_name')} ${this.get('recipient.last_name')}`; 
    }.property('recipient'),

    "selected": false

  }).create();
};

const self = Ember.Object.extend(Ember.ActionHandler, {

  state: state,

  getState: getState,

  actions: {

    handle: (id, payload) => {
      getState(id).setProperties(process(payload));
      getState(id).get('promise').resolve();
    },

    handleMore: (id, payload) => {
      getState(id).collection.unshiftObject(processOne(payload));
    },

    update: (id, payload) => getState(id).setProperties(payload)

  }

});


export default self.create();

