let config = {
  apiHost: '',
  baseObj: {
    type: null,
    url: null,
    dataType: 'JSON'
  }
};


class Api {

  post(url, params, methods) {
    this.doRequest({
      type: 'POST',
      url: `${config.apiHost}${url}`,
      data: params.data,
      contentType: params.contentType
    }, methods);
  }

  get(url, params, methods) {
    this.doRequest({
      type: 'GET',
      url: `${config.apiHost}${url}`,
      data: params && params.data ? params.data : null
    }, methods);
  }

  put(url, params, methods) {
    this.doRequest({
      type: 'PUT',
      url: `${config.apiHost}${url}`,
      data: params && params.data ? params.data : null,
      contentType: params.contentType
    }, methods);
  }

  delete(url, params, methods) {
    this.doRequest({
      type: 'DELETE',
      url: `${config.apiHost}${url}`,
      data: params.data
    }, methods);
  }

  doRequest(newObj, methods) {
    let requestObject = config.baseObj;
    Object.assign(requestObject, newObj);
 
    let authToken = localStorage.getItem('authToken');
    let email = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).email : null;
    if (authToken && email) requestObject.headers = { 'Authorization':  `Token token=${authToken}`, 'Email': email };

    $.ajax(requestObject)
    .done((data) => { if (methods && methods.done) methods.done(data); })
    .fail((data) => {
      if (methods && methods.fail) methods.fail(data);
      if (data.status === 401) window.location.href = '/#/login'; return;
    })
    .always((data) => { if (methods && methods.always) methods.always(data); });
  }

}


export default Api;
