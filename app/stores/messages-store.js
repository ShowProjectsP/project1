import UsersStore from '../stores/user-store';

let userId;

UsersStore.getState().get('promise').done(() => {
  userId = UsersStore.getState().get('id');
});

const MessageModel = Ember.Mixin.create({

  "isLoading": false,

  "isSending": false,

  "newMessageValue": '',

  "isLoading": true, "promise": (new jQuery.Deferred())

});

const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend({ "newMessageValue": '', "isSending": false, "isLoading": true, "promise": (new jQuery.Deferred()) }).create();
    return state[id];
  }
};

const processCollection = (payload) => {
  for (let i = 0; i < payload.collection.length; i++) {
    let message = payload.collection[i];
    let nextMessage = payload.collection[i + 1];

    message.mineMessage = message.author_id === userId;

    if (!message.mineMessage) {

      if (nextMessage && (nextMessage.author_id !== userId)) {
        message.leftMargin = true;
        continue;
      }

      message.displayAvatar = true;
    }
  }

  return payload;
};

const processOne = (payload) => {
  payload.mineMessage = payload.author_id === userId;

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
      getState(id).collection.pushObject(processOne(payload));
    },

    update: (id, payload) => getState(id).setProperties(payload)

  }

});


export default self.create();
