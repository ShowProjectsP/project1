export default Ember.Helper.helper(function(value) {
  return Ember.String.htmlSafe(moment(value[0]).format(value[1]));
});
