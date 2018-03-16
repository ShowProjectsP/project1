import UserStore from '../../stores/user-store';


const state = Ember.Object.extend({

  init() {
    this._super();

    this.user = UserStore.getState();
  },

  "isLoading": false,

  "promise": (new jQuery.Deferred()),

  "editable": {
    "language": {
      "editing": false,
      "isLoading": false
    },
    "skype_diagnosis_price": {
      "editing": false,
      "isLoading": false
    },
    "stationary_diagnosis_price": {
      "editing": false,
      "isLoading": false
    }
  },

  "language": function() {
    return this.get('user.language');
  }.property('user.language'),

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
