export default Ember.Route.extend({

  model() {

    return {
      params: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        birthday: ''
      },
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        password: false,
        passwordConfirmation: false,
        birthday: false
      },
      isLoading: false
    }

  }

});
