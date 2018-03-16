import DiariesDispacher from '../../../dispatchers/diaries-dispatcher';
import StudentStore from '../../../stores/admin/student-store';
import StudentDispatcher from '../../../dispatchers/student-dispatcher';
import DiaryUserStore from '../../../stores/diaries/diary-user-store';



export default Ember.Route.extend({

  queryParams: {
    diaryId: {
      refreshModel: true
    },
    studentId: {
    	refreshModel: true
    }
  },

  beforeModel() {
  	const studentId = this.paramsFor(this.routeName).studentId;

    StudentDispatcher.fetchUserPhoto(studentId);
 
		DiariesDispacher.fetchDiaryDetails(this.paramsFor(this.routeName).diary_id);
	},

  model() {
  	const studentId = this.paramsFor(this.routeName).studentId;
  	const diaryId = this.paramsFor(this.routeName).diary_id;

    DiaryUserStore.getState(diaryId).get('promise').done(() => {
			DiaryUserStore.send('update', diaryId, { isLoading: false });
		});

  	return {
  		diary: DiaryUserStore.getState(diaryId),
      photo: StudentStore.getState(studentId).get('photo')
  	};

  }

});