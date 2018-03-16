export default Ember.Helper.helper(function(value) {
  return Ember.String.htmlSafe(_.toString(value[0]));
});
