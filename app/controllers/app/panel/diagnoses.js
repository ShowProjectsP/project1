import DiagnosesDispatcher from '../../../dispatchers/diagnoses-dispatcher';


export default Ember.Controller.extend({

  routing: Ember.inject.service('-routing'),

  actions: {

    openSortingDropdown(name) {
      this.set(name, true);
    },

    sortDiagnoses(sortBy, sortOrder) {
      DiagnosesDispatcher.fetchDiagnoses({ sort_by: sortBy, sort_order: sortOrder });
    },

    onSelect(page) {
      this.get('routing').transitionTo('app.panel.diagnoses', null, { page: page });
    }

  }

});
