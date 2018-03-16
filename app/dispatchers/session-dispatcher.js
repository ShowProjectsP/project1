import SessionApi from '../api/session-api';
import UserStore from '../stores/user-store';
import { removeFromCookieStorage } from '../utils/cookie-storage-utils';
import { removeFromLocalStorage } from '../utils/local-storage-utils';


export default Ember.Object.extend({

	logout() {
		SessionApi.logout({}, {});

		removeFromCookieStorage(['authToken', 'refreshToken', 'tokenExpires', 'userEmail', 'userId', 'email']);
		removeFromLocalStorage('authToken');

    UserStore.send('update', { loggedIn: false });

    setTimeout(() => {
      window.location.href = '/#/login';
    }, 0);
	}

}).create();