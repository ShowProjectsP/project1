export default Ember.Helper.helper(function(value) {
	return _.split(value, ' ');
});
