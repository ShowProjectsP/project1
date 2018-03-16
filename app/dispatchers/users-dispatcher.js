import UserApi from '../api/user-api';
import UsersStore from '../stores/users-store';


export default Ember.Object.extend({

  fetchUsers(params, id, isMore) {
    UsersStore.send('update', id, { isLoading: true });

    if (isMore) {
      const storeParams = UsersStore.getState(id);
      params.page = storeParams.get('page') + 1;
      params.page_size = storeParams.get('page_size');
    }

    UserApi.getUsersList((params || null), {
      done: (data) => {
        if (isMore) {
          UsersStore.send('handleMore', id, data);
        } else {
          UsersStore.send('handle', id, data);
        }

        UsersStore.send('update', id, { isMore: (UsersStore.getState(id).get('collection.length') < data.total_size) });
      },
      always: () => {
        UsersStore.send('update', id, { isLoading: false });
      }
    });
  },

  searchUsers(params, callback) {
    UsersStore.send('update', 'search', { isLoading: true });

    let requestParams = {};
    _.assign(requestParams, params);

    UserApi.searchUsers(requestParams, {
      done: (data) => {
        UsersStore.send('handle', 'search', data);
        callback(UsersStore.getState('search'));
      },
      always: () => {
        UsersStore.send('update', 'search', { isLoading: false });
      }
    });
  }

}).create();
