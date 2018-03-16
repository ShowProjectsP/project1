export default Ember.Component.extend({

  classNames: ['panel-pagination'],

  currentIndex: function() {
    return this.get('currentPage')
  }.property('currentPage'),

  lastIndex: function() {
    return this.get('pagesCount') - 1;
  }.property('pagesCount'),

  displayValue: function() {
    return this.get('currentIndex');
  }.property('currentPage'),

  nextPage: function() {
    return this.get('currentIndex') + 1;
  }.property('currentIndex'),

  previousPage: function() {
    return this.get('currentIndex') - 1;
  }.property('currentIndex')

});
