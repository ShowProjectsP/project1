export default Ember.Route.extend({

  model() {

    return {
      email: '',
      emailSent: false,
      isLoading: false
    }

  }

});
