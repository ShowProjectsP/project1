import Api from './api';


class TalkQuestionsApi extends Api {

  getTalkFeelings(params, methods) {
    return this.get('/api/v1/talk_feelings', {}, methods);
  }

  getTalkParticipants(params, methods) {
    return this.get('/api/v1/talk_participants', {}, methods);
  }

  getDiarySuccessParticipants(params, methods) {
    return this.get('/api/v1/diary_success_participants', {}, methods);
  }

  createTalkFeeling(params, methods) {
    return this.post('/api/v1/talk_feelings', {
      data: params
    }, methods);
  }

  createTalkParticipant(params, methods) {
    return this.post('/api/v1/talk_participants', {
      data: params
    }, methods);
  }

  createDiarySuccessParticipant(params, methods) {
    return this.post('/api/v1/diary_success_participants', {
      data: params
    }, methods);
  }

  updateTalkFeeling(params, methods) {
     return this.put(`/api/v1/talk_feelings/${params.id}`, {
      data: params
    }, methods);
  }

  updateTalkParticipant(params, methods) {
     return this.put(`/api/v1/talk_participants/${params.id}`, {
      data: params
    }, methods);
  }

  updateDiarySuccessParticipant(params, methods) {
     return this.put(`/api/v1/diary_success_participants/${params.id}`, {
      data: params
    }, methods);
  }

  deleteTalkFeeling(params, methods) {
    return this.delete(`/api/v1/talk_feelings/${params.id}`, {
      data: params
    }, methods);
  }

  deleteTalkParticipant(params, methods) {
    return this.delete(`/api/v1/talk_participants/${params.id}`, {
      data: params
    }, methods);
  }

  deleteDiarySuccessParticipant(params, methods) {
    return this.delete(`/api/v1/diary_success_participants/${params.id}`, {
      data: params
    }, methods);
  }

}


export default new TalkQuestionsApi();
