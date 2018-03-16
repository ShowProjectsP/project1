import GroupsApi from '../api/groups-api';
import GroupsStore from '../stores/admin/groups-store';
import { displayDoneInfoMessage } from '../utils/info-messages';


export default Ember.Object.extend({

  fetchGroups(id, page) {
    GroupsStore.send('update', id, { isLoading: true });

    GroupsApi.getGroups({ page: page, page_size: 10 }, {
      done: (data) => {
      	GroupsStore.send('handle', id, data);
      },
      always: () => {
        GroupsStore.send('update', id, { isLoading: false });
      }
    });
  },

  createGroup(params, callback, pageId) {
    GroupsStore.send('update', { isCreatingGroupLoading: true });

    GroupsApi.createGroup(params, {
      done: (data) => {
        GroupsStore.getState(pageId).get('collection').pushObject(data);
        callback();
      },
      always: () => {
        GroupsStore.send('update', { isCreatingGroupLoading: false });
      }
    });
  },

  deleteGroup(group, pageId) {
    GroupsApi.deleteGroup({ id: group.id }, {
      done: () => {
        GroupsStore.getState(pageId).get('collection').removeObject(group);
        displayDoneInfoMessage(`Usunięto grupę ${group.name}`)
      }
    });
  }

}).create();
