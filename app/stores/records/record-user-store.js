import { yearMonths, weekDays } from '../../utils/date-utils';

const DiaryModel = Ember.Mixin.create({

  "recordName": function() {
    if (this.get('date')) {
      return `${weekDays[new Date(this.get('date')).getDay()]}, ${_.trim(this.get('date').substring(8, 10), '0')} ${yearMonths[this.get('date').substring(5, 7)]} ${this.get('date').substring(0, 4)}`;
    }
  }.property('date')

});

const state = Ember.Object.create();

const getState = (id) => {
  if (state[id]) return state[id];
  else {
    state[id] = Ember.Object.extend(DiaryModel, { "isLoading": true, "promise": (new jQuery.Deferred()) }).create();
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
