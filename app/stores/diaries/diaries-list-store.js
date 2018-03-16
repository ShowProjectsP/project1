import { processCalendarList } from '../../utils/calendar-list-utils';

const state = Ember.Object.extend({

  "promise": (new jQuery.Deferred()),

  "years": Ember.A(),

  "total_size": null,

  "selectedDiaryId": null, // diary selected from diaries list

  "lastDiaryId": function() { // last diary from diaries list
    if (this.get('years.length')) {
      return this.get('years')[0].get('months')[0].get('days')[0].get('id');
    }
  }.property('years'),

  "lastDiary": function() {
    if (this.get('years.length')) {
      return this.get('years')[0].get('months')[0].get('days')[0];
    }
  }.property('years'),

  activeDiary: function() {
    if (this.get('years.length')) return _.find(this.get('years')[0].get('months')[0].get('days'), ['id', this.get('selectedDiaryId')]);
  }.property('selectedDiaryId')

}).create();

const getState = () => {
  return state;
}

const self = Ember.Object.extend(Ember.ActionHandler, {

  state: state,

  getState: getState,

  actions: {

    handle: (payload) => {
      getState().set('years', processCalendarList(payload));
      getState().get('promise').resolve();
    },

    handleMore: (payload) => {
      getState().collection.pushObject(payload);
    },

    handleOther: (payload) => {
      getState().setProperties(payload);
    },

    update: (payload) => getState().setProperties(payload)

  }

});


export default self.create();

