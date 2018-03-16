import ReportsApi from '../api/reports-api';
import ReportsStore from '../stores/admin/reports-store';
import { displayErrorInfoMessage } from '../utils/info-messages';


export default Ember.Object.extend({

  createReport(params) {
    ReportsStore.send('update', { isLoading: true });

    ReportsApi.createReport(params, {
      done: (data) => {
        if (data.users.length) {
          ReportsStore.send('handle', { report: data.users });
        } else {
          displayErrorInfoMessage('Nie udało się pobrać informacji o kursantach.');
        }
      },
      fail: () => {
        displayErrorInfoMessage('Nie udało się pobrać informacji o kursantach.');
      },
      always: () => {
        ReportsStore.send('update', { isLoading: false });
      }
    });
  }

}).create();
