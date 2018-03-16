import UsersStore from '../../stores/users-store';

const GroupModel = Ember.Mixin.create({

  init() {
    this._super();

    this.trainers = UsersStore.getState('trainer');
    this.students = UsersStore.getState('students');
  },

  "editable": {
    "name": {
      "editing": false,
      "isLoading": false
    },
    "trainer_id": {
      "editing": false,
      "isLoading": false
    },
    "language": {
      "editing": false,
      "isLoading": false
    },
    "student_ids": {
      "editing": false,
      "isLoading": false
    }
  }

});

const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend(GroupModel, { "isLoading": true, "promise": (new jQuery.Deferred()) }).create();
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
