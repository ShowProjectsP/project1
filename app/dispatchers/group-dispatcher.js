import GroupsApi from '../api/groups-api';
import GroupStore from '../stores/admin/group-store';


export default Ember.Object.extend({

  fetchGroupDetails(groupId) {
    GroupStore.send('update', groupId, { isLoading: true });

    GroupsApi.getGroupDetails({ id: groupId }, {
      done: (data) => {
      	GroupStore.send('handle', groupId, data);
      },
      always: () => {
      	GroupStore.send('update', groupId, { isLoading: false });
      }
    });
  },

  updateGroup(field, value, groupId) {
    GroupStore.send('update', groupId, { [`editable.${field}.loading`]: true });
 
    GroupsApi.updateGroup(groupId, { [`${field}`]: value }, {
      done: (data) => {
        GroupStore.send('update', groupId, { [`editable.${field}.editing`]: false });
        GroupStore.send('update', groupId, { [`${field}`]: value });

        if (field === 'student_ids') {
          GroupStore.send('update', groupId, { [`students`]: data.students });
        }
      },
      always: () => {
        GroupStore.send('update', groupId, { [`editable.${field}.loading`]: false });
      }
    })
  }

}).create();
