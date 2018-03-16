import DiagnosesStore from '../../../stores/admin/diagnoses-store';
import DiagnosesDispatcher from '../../../dispatchers/diagnoses-dispatcher';


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

    DiagnosesDispatcher.fetchDiagnoses(pageId, page);
  },

  model() {
  	const pageId = parseInt(this.paramsFor(this.routeName).page, 10);

    DiagnosesStore.getState(pageId).get('promise').done(() => {
      DiagnosesStore.send('update', pageId, { isLoading: false });
    });

    return DiagnosesStore.getState(pageId);

  }

});
