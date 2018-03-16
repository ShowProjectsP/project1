import RecordRatesApi from '../api/record-rates-api';
import RecordRatesStore from '../stores/admin/record-rates-store';


export default Ember.Object.extend({

	fetchRecordCategories() {
		RecordRatesStore.send('update', 'categories', { isLoading: true });

		RecordRatesApi.getRecordCategories({
			done: (data) => {
				RecordRatesStore.getState('categories').set('collection', data.collection);
			},
			always: () => {
				RecordRatesStore.send('update', 'categories', { isLoading: false });
			}
		});
	},

	fetchRecordRateCategories() {
		RecordRatesStore.send('update', 'rateCategories', { isLoading: true });

		RecordRatesApi.getRecordRateCategories({
			done: (data) => {
				RecordRatesStore.getState('rateCategories').set('collection', data.collection);
			},
			always: () => {
				RecordRatesStore.send('update', 'rateCategories', { isLoading: false });
			}
		});
	},

	fetchRecordRateUnits() {
		RecordRatesStore.send('update', 'rateUnits', { isLoading: true });

		RecordRatesApi.getRecordRateUnits({
			done: (data) => {
				RecordRatesStore.getState('rateUnits').set('collection', data.collection);
			},
			always: () => {
				RecordRatesStore.send('update', 'rateUnits', { isLoading: false });
			}
		});
	},

}).create();