import Api from './api';


class DiagnosisApi extends Api {

  createDiary(params, methods) {
    return this.post('/api/v1/diaries', {
      data: JSON.stringify(params),
      contentType: 'application/json'
    }, methods);
  }

  updateDiary(params, methods) {
    return this.put(`/api/v1/diaries/${params.id}`, {
      data: params,
      contentType: 'application/x-www-form-urlencoded'
    }, methods);
  }

  getDiaries(params, methods) {
    return this.get('/api/v1/diaries', {
      data: params
    }, methods);
  }

  getDiaryDetails(params, methods) {
    return this.get(`/api/v1/diaries/${params.id}`, {
      data: params
    }, methods);
  }

  reviewDiary(params, methods) {
    return this.put(`/api/v1/diaries/${params.id}/review`, {
      data: params
    }, methods);
  }

  getDiariesStats(methods) {
    return this.get('/api/v1/diaries/stats', {}, methods);
  }

}


export default new DiagnosisApi();