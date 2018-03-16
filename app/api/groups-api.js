import Api from './api';


class GroupsApi extends Api {

  getGroups(params, methods) {
    return this.get('/api/v1/students_groups', {
      data: params
    }, methods);
  }

  getGroupDetails(params, methods) {
  	return this.get(`/api/v1/students_groups/${params.id}`, {
      data: params
    }, methods);
  }

  createGroup(params, methods) {
  	return this.post('/api/v1/students_groups', {
      data: params
    }, methods);
  }

  deleteGroup(params, methods) {
  	return this.delete(`/api/v1/students_groups/${params.id}`, {
      data: params
    }, methods);
  }

  updateGroup(id, params, methods) {
  	return this.put(`/api/v1/students_groups/${id}`, {
      data: params
    }, methods);
  }

}


export default new GroupsApi();
