import GroupsStore from '../../../stores/admin/groups-store';
import GroupsDispatcher from '../../../dispatchers/groups-dispatcher';
import UsersStore from '../../../stores/users-store';
import UsersDispatcher from '../../../dispatchers/users-dispatcher';


export default Ember.Route.extend({

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  page: 0,

  beforeModel() {
    let page = parseInt(this.paramsFor(this.routeName).page, 10);

    if (!page) {
      page = 0
    }

    let pageId = page;

  	GroupsDispatcher.fetchGroups(pageId, page);

  	UsersDispatcher.fetchUsers({ search_field: 'role', search_value: 'trainer' });
  	UsersDispatcher.fetchUsers({ search_field: 'role', search_value: 'student', page_size: 100, page: 1 });
  },

  model() {
    const pageId = parseInt(this.paramsFor(this.routeName).page, 10);

    GroupsStore.getState(pageId).get('promise').done(() => {
      GroupsStore.send('update', pageId, { isLoading: false });
    });

    return {
      pageId: pageId,
    	groups: GroupsStore.getState(pageId),
    	trainers: UsersStore.getState('trainer'),
    	students: UsersStore.getState('student'),
    	isMore: UsersStore.getState('isMore')
    }

  }

});