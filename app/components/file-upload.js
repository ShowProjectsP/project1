import EmberUploader from 'ember-uploader';
import StudentDispatcher from '../dispatchers/student-dispatcher';
import StudentStore from '../stores/admin/student-store';


export default EmberUploader.FileField.extend({

  filesDidChange: function(files) {
    const authToken = localStorage.getItem('authToken');
    const email = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).email : null;

    let uploader = EmberUploader.Uploader.create({
      url: this.get('fileUploadApi.params.url'),
      method: this.get('fileUploadApi.params.method'),
      paramName: this.get('fileUploadApi.params.paramName'),
      ajaxSettings: {
        headers: {
          'Authorization': `Token token=${authToken}`,
          'Email': email
        }
      }
    });

    if (this.get('fileUploadApi.beforeUpload') && typeof this.get('fileUploadApi.beforeUpload') === 'function') {
      this.get('fileUploadApi.beforeUpload')();
    }

    if (this.get('fileUploadApi.didUpload') && typeof this.get('fileUploadApi.didUpload') === 'function') {
      uploader.on('didUpload', () => this.get('fileUploadApi.didUpload')());
    }

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0], this.get('fileUploadApi.params.extras'));
    }
  }

});
