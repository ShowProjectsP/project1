const state = Ember.Object.extend({

  "promise": (new jQuery.Deferred()),

  "blocked_at": null,
  "created_at": null,
  "deleted_at": null,
  "email": null,
  "first_name": null,
  "id": null,
  "language": null,
  "last_name": null,
  "phone": null,
  "role": null,
  "updated_at": null,

  "loggedIn": false,

  "isAdmin": function() {
    return this.get('role') === 'admin';
  }.property('role'),

  "isStudent": function() {
    return this.get('role') === 'student';
  }.property('role')

}).create();

const getState = () => { return state; };

const self = Ember.Object.extend(Ember.ActionHandler, {

  state: state,

  getState: getState,

  actions: {

    handle: (payload) => {
      getState().setProperties(payload);
      getState().get('promise').resolve();
    },

    update: (payload) => getState().setProperties(payload),

    getByKey: (key) => { return Ember.get(state, key) } 

  }

});


export default self.create();
