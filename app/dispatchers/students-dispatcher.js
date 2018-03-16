import UserApi from '../api/user-api';
import StudentsStore from '../stores/admin/students-store';


export default Ember.Object.extend({

  fetchUsersList(id, page) {
    StudentsStore.send('update', id, { isLoading: true });

    UserApi.getUsersList({ page: page, page_size: 10 }, {
      done: (data) => {
        StudentsStore.send('handle', id, data);
      },
      always: () => {
        StudentsStore.send('update', id, { isLoading: false });
      }
    });
  },

  fetchAllUsersList(id) {
    StudentsStore.send('update', id, { isLoading: true });

    UserApi.getUsersList(null, {
      done: (data) => {
        StudentsStore.send('handle', id, data);
      },
      always: () => {
        StudentsStore.send('update', id, { isLoading: false });
      }
    });
  }

}).create();
