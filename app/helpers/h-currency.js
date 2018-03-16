export default Ember.Helper.helper(function(value) {
  return Ember.String.htmlSafe(`${value[0]} zł`);
});
