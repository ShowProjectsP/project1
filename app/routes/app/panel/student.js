import StudentStore from '../../../stores/admin/student-store';
import StudentDispatcher from '../../../dispatchers/student-dispatcher';


export default Ember.Route.extend({

  queryParams: {
    studentId: {
      refreshModel: true
    }
  },

  beforeModel() {
    const studentId = this.paramsFor(this.routeName).student_id;

    StudentDispatcher.fetchUserDetails(studentId);
    StudentDispatcher.fetchUserPhoto(studentId);
  },

  model() {
    const studentId = this.paramsFor(this.routeName).student_id;

    StudentStore.getState(studentId).get('promise').done(() => {
      StudentStore.send('update', studentId, { isLoading: false });
    });

    return {
      student: StudentStore.getState(studentId),
      photo: StudentStore.getState(studentId).get('photo')
    }

  }

});
