import Api from './api';


class SettingsApi extends Api {

  getSettings(params, methods) {
    return this.get('/api/v1/settings', {}, methods);
  }

  updateSettings(params, methods) {
    return this.put('/api/v1/settings', {
      data: params
    }, methods);
  }

}


export default new SettingsApi();
