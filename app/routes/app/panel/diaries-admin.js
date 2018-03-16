import DiariesDispacher from '../../../dispatchers/diaries-dispatcher';
import DiariesAdminStore from '../../../stores/diaries/diaries-admin-store';


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

		DiariesDispacher.fetchDiariesAdmin(pageId, page, { 'search_value': false, 'search_field': 'is_correct', 'sort_by': 'date', 'sort_order': 'desc' });
	},

	model() {
		const pageId = parseInt(this.paramsFor(this.routeName).page, 10);

		DiariesAdminStore.getState(pageId).get('promise').done(() => {
			DiariesAdminStore.send('update', pageId, { isLoading: false });
		});

		return {
			diaries: DiariesAdminStore.getState(pageId)
		};

	}

});