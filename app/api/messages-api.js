import Api from './api';


class MessagesApi extends Api {

  getMessagesThreads(params, methods) {
    return this.get('/api/v1/message_threads', {
      data: params
    }, methods);
  }

  searchMessagesThreads(params, methods) {
    return this.get('/api/v1/message_threads/search', {
      data: params
    }, methods);
  }

  getMessagesFromThread(params, methods) {
  	return this.get(`/api/v1/message_threads/${params.id}/messages`, {
      data: params
    }, methods);
  }

  createMessage(params, methods) {
  	return this.post('/api/v1/messages', {
      data: JSON.stringify(params),
      contentType: 'application/json'
    }, methods);
  }

  createThread(params, methods) {
    return this.post('/api/v1/message_threads', {
      data: params
    }, methods);
  }

  setMessageAsRead(params, methods) {
    return this.put(`/api/v1/messages/${params.id}/set_read`, {}, methods);
  }

}


export default new MessagesApi();
