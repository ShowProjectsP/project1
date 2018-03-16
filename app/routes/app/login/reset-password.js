export default Ember.Route.extend({

  queryParams: {
    token: ''
  },

  model() {

    return {
      passwordOne: '',
      passwordTwo: '',
      resetPasswordDone: false,
      resetPasswordToken: this.paramsFor(this.routeName).token,
      isLoading: false
    }

  }

});
