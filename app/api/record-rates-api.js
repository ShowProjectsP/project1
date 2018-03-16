import Api from './api';


class RecordsRatesApi extends Api {

	getRecordCategories(methods) {
    return this.get('/api/v1/record_categories', {}, methods);
  }

  getRecordRateCategories(methods) {
    return this.get('/api/v1/record_rate_categories', {}, methods);
  }

  getRecordRateUnits(methods) {
    return this.get('/api/v1/record_rate_units', {}, methods);
  }

}

export default new RecordsRatesApi();