export default Ember.Helper.helper(function(value) {
  return Ember.String.htmlSafe(_.isBoolean(value[0]));
});
