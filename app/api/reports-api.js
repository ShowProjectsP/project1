import Api from './api';


class ReportsApi extends Api {

  createReport(params, methods) {
    return this.post('/api/v1/reports', {
      data: JSON.stringify(params),
      contentType: 'application/json'
    }, methods);
  }

}


export default new ReportsApi();