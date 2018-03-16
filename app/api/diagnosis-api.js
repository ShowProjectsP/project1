import Api from './api';


class DiagnosisApi extends Api {

  createDiagnosis(params, methods) {
    return this.post('/api/v1/diagnoses', {
      data: params
    }, methods);
  }

  getDiagnoses(params, methods) {
    return this.get('/api/v1/diagnoses', {
      data: params
    }, methods);
  }

  getDiagnosisDetails(params, methods) {
    return this.get(`/api/v1/diagnoses/${params.id}`, {}, methods);
  }

  updateDiagnosis(id, params, methods) {
    return this.put(`/api/v1/diagnoses/${id}`, {
      data: params
    }, methods);
  }

}


export default new DiagnosisApi();
