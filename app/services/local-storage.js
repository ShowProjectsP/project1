export default Ember.Service.extend({

  setItem(key, value) {
    localStorage.setItem(key, value);
  },

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

});
