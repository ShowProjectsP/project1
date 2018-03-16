import UsersStore from '../../../../stores/users-store';
import UsersDispatcher from '../../../../dispatchers/users-dispatcher';


export default Ember.Route.extend({

	queryParams: {
    search: {
    	refreshModel: true
    },
    page: {
      refreshModel: true,
      as: 'search-page'
    }
  },

  search: null,
  page: 0,

  beforeModel() {
    let page = parseInt(this.paramsFor(this.routeName).page, 10);

    if (!page) {
      page = 0
    }

    let pageId = page;

    UsersDispatcher.fetchUsers(null, 'all');
  },

  model() {
  	const pageId = parseInt(this.paramsFor(this.routeName).page, 10);

    UsersStore.getState('all').get('promise').done(() => {
      UsersStore.send('update', 'all', { isLoading: false });
    });

    return {
    	users: UsersStore.getState('all'),
      search: UsersStore.getState('search'),
      searchUsersValue: null
    }

  }

});