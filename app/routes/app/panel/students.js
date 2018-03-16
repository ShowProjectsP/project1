import StudentsStore from '../../../stores/admin/students-store';
import StudentsDispatcher from '../../../dispatchers/students-dispatcher';


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

    StudentsDispatcher.fetchUsersList(pageId, page);
  },

  model() {
    const pageId = parseInt(this.paramsFor(this.routeName).page, 10);

    StudentsStore.getState(pageId).get('promise').done(() => {
      StudentsStore.send('update', pageId, { isLoading: false });
    });

    return StudentsStore.getState(pageId);

  }

});
