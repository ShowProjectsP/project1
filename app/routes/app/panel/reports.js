import ReportsStore from '../../../stores/admin/reports-store';
import UsersStore from '../../../stores/users-store';
import UsersDispatcher from '../../../dispatchers/users-dispatcher';


export default Ember.Route.extend({

  beforeModel() {
  	UsersDispatcher.fetchUsers({ search_field: 'role', search_value: 'student', page_size: 10, page: 1 });
  },

  deactivate() {
    ReportsStore.send('clear');
    this.set('createReportSumbitted', false);
  },

  createReportSumbitted: false,

  model() {
  	
    return {
      dateFrom: '',
      dateTo: '',
      createReportSumbitted: this.get('createReportSumbitted'),
    	reports: ReportsStore.getState(),
    	students: UsersStore.getState('student'),
    };

  }

});
