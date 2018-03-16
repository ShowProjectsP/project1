import RecordsApi from '../api/records-api';
import RecordsUserStore from '../stores/records/records-user-store';
//import RecordUserStore from '../stores/diaries/diary-user-store';


export default Ember.Object.extend({

  fetchRecords(id) {
    RecordsUserStore.send('update', { isLoading: true });

    RecordsApi.getRecords({}, {
      done: (data) => {
      	RecordsUserStore.send('handle', data);
      },
      always: (data) => {
      	RecordsUserStore.send('update', { isLoading: false });
      }
    });
  },

  // createRecordCategory() {

  //   RecordsApi.createRecordCategory({ 
  //     name: "test 1",
  //     description: "test 1 description",
  //     is_public: false
  //   });

  // },

  fetchRecordsStats() {
    RecordsApi.getRecordsStats({
      done: (data) => {
        RecordsUserStore.send('handleOther', data);
      }
    });
  }

}).create();