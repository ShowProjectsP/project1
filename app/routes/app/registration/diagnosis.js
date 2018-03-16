export default Ember.Route.extend({

  queryParams: {
    userId: ''
  },

  model() {

    return {
      userId: this.paramsFor(this.routeName).userId,
      params: {
        diagnosis_type: null,
        notes_from_student: null
      }
    }

  }

});
