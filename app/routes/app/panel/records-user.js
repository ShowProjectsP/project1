import RecordsUserStore from '../../../stores/records/records-user-store';


export default Ember.Route.extend({

	model() {

		RecordsUserStore.getState().get('promise').done(() => {
			RecordsUserStore.send('update', { isLoading: false });

      const recordIdFromUrl = this.router.currentURL.substring(_.lastIndexOf(this.router.currentURL, '/') + 1, this.router.currentURL.length);
      const lastRecordId = RecordsUserStore.getState().get('lastRecordId');
      const recordIdToUse = this.router.currentURL.indexOf('diaries') !== -1 ? recordIdFromUrl : lastRecordId;

      RecordsUserStore.getState().set('selectedRecordId', recordIdToUse);
		});

		return {
			records: RecordsUserStore.getState()
		}

	}

});