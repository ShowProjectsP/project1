import SettingsApi from '../api/settings-api';
import SettingsStore from '../stores/admin/settings-store';
import UserApi from '../api/user-api';
import UserStore from '../stores/user-store';


export default Ember.Object.extend({

  fetchSettings() {
    SettingsStore.send('update', { isLoading: true });

    SettingsApi.getSettings(null, {
      done: (data) => {
        SettingsStore.send('handle', data);
      },
      always: () => {
        SettingsStore.send('update', { isLoading: false });
      }
    });
  },

  updateSettings(field, value) {
    SettingsStore.send('update', { [`editable.${field}.loading`]: true });

    SettingsApi.updateSettings({ [`${field}`]: value }, {
      done: () => {
        SettingsStore.send('update', { [`editable.${field}.editing`]: false });
        SettingsStore.send('update', { [`${field}`]: value });
      },
      always: () => {
        SettingsStore.send('update', { [`editable.${field}.loading`]: false });
      }
    });
  },

  updateLanguage(field, value, callback) {
    const userId = UserStore.getState().get('id');

    SettingsStore.send('update', { [`editable.${field}.loading`]: true });

    UserApi.updateUser(userId, { [`${field}`]: value }, {
      done: (data) => {
        SettingsStore.send('update', { [`editable.${field}.editing`]: false });
        SettingsStore.send('update', { [`${field}`]: value });

        callback(data);
      },
      always: () => {
        SettingsStore.send('update', { [`editable.${field}.loading`]: false });
      }
    });
  }

}).create();
