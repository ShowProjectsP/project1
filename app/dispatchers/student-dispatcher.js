import UserApi from '../api/user-api';
import StudentStore from '../stores/admin/student-store';


export default Ember.Object.extend({

  fetchUserDetails(studentId) {
    StudentStore.send('update', studentId, { isLoading: true });

    UserApi.getUserDetails({ id: studentId }, {
      done: (data) => {
        StudentStore.send('handle', studentId, data);
      },
      always: () => {
        StudentStore.send('update', studentId, { isLoading: false });
      }
    });
  },

  fetchUserPhoto(studentId) {
    const fetchBlobFromServer = (studentId, callback) => {
      const authToken = localStorage.getItem('authToken');
      const email = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).email : null;

      var xhr = new XMLHttpRequest();
      xhr.open('GET', `/api/v1/users/${studentId}/photo`, true);
      xhr.setRequestHeader('Authorization', `Token token=${authToken}`);
      xhr.setRequestHeader('Email', email);
      xhr.responseType = 'blob';

      xhr.onload = function(e) {
        if (this.status == 200) {
          if (callback) {
            callback(this.response);
          }
        } else {
          StudentStore.send('update', studentId, { ['photo.isLoading']: false });
        }
      };

      xhr.send();
    };

    fetchBlobFromServer(studentId, (blob) => {
      let reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onload = () => {
        StudentStore.send('update', studentId, { ['photo.value']: reader.result });
        StudentStore.send('update', studentId, { ['photo.isLoading']: false });
      }
    });
  },

  updateUser(field, value, diagnosisId) {
    let payload = {};

    StudentStore.send('update', diagnosisId, { [`editable.${field}.isLoading`]: true });

    if (field.indexOf('.') > -1) {
      let temporaryField = `${field.substring(0, field.indexOf('.'))}_attributes${field.substring(field.indexOf('.'), field.length)}`;
      _.setWith(payload, temporaryField, value, Object);
    } else {
      payload = { [`${field}`]: value };
    }
 
    UserApi.updateUser(diagnosisId, payload, {
      done: () => {
        StudentStore.send('update', diagnosisId, { [`editable.${field}.editing`]: false });
        StudentStore.send('update', diagnosisId, { [`${field}`]: value });
      },
      always: () => {
       StudentStore.send('update', diagnosisId, { [`editable.${field}.isLoading`]: false });
      }
    });
  }

}).create();
