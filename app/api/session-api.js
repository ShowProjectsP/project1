import Api from './api';


class SessionApi extends Api {

  login(params, methods) {
    return this.post('/api/v1/session', {
      data: params,
    }, methods);
  }

  logout(params, methods) {
    return this.delete('/api/v1/session', {
      data: params
    }, methods);
  }

}


export default new SessionApi();
