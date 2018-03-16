import GroupStore from '../../../stores/admin/group-store';
import GroupDispatcher from '../../../dispatchers/group-dispatcher';
import UsersStore from '../../../stores/users-store';
import UsersDispatcher from '../../../dispatchers/users-dispatcher';


export default Ember.Route.extend({

  queryParams: {
    groupId: {
      refreshModel: true
    }
  },

  beforeModel() {
    GroupDispatcher.fetchGroupDetails(this.paramsFor(this.routeName).group_id);
    UsersDispatcher.fetchUsers({ search_field: 'role', search_value: 'trainer' }, 'trainer');
    UsersDispatcher.fetchUsers({ search_field: 'role', search_value: 'student', page_size: 10, page: 1 }, 'student');
  },

  model() {
    const groupId = this.paramsFor(this.routeName).group_id;

    GroupStore.getState(groupId).get('promise').done(() => {
      GroupStore.send('update', groupId, { isLoading: false });
    });

    return {
      group: GroupStore.getState(groupId),
      trainers: UsersStore.getState('trainer'),
      students: UsersStore.getState('student'),
      isMore: UsersStore.getState('isMore')
    }

  }

});
