import Api from './api';


class RecordsApi extends Api {

	getRecords(params, methods) {
		return this.get('/api/v1/records', {
      data: params
    }, methods);
	}

	createRecordCategory(params, methods) {
		return this.post('/api/v1/record_categories', {
			data: params
		}, methods);
	}

	getRecordsStats(methods) {
    return this.get('/api/v1/records/stats', {}, methods);
  }

}

export default new RecordsApi();