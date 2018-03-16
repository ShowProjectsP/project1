import Api from './api';


class UserApi extends Api {

  register(params, methods) {
    return this.post('/api/v1/users', {
      data: params
    }, methods);
  }

  getUserDetails(params, methods) {
    return this.get(`/api/v1/users/${params.id}`, {}, methods);
  }

  getUsersList(params, methods) {
    return this.get(`/api/v1/users`, {
      data: params
    }, methods);
  }

  sendResetPasswordToken(params, methods) {
    return this.post('/api/v1/users/forget_password', {
      data: params
    }, methods);
  }

  resetPassword(params, methods) {
    return this.post('/api/v1/users/reset_password', {
      data: params
    }, methods);
  }

  updateUser(id, params, methods) {
    return this.put(`/api/v1/users/${id}`, {
      data: params
    }, methods);
  }

  getUserPhoto(params, methods) {
    return this.get(`/api/v1/users/${params.id}/photo`, {}, methods);
  }

  searchUsers(params, methods) {
    return this.get('/api/v1/users/search', {
      data: params
    }, methods);
  }

}


export default new UserApi();
