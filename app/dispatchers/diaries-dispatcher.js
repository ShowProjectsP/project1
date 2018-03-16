import DiariesApi from '../api/diaries-api';
import DiariesListStore from '../stores/diaries/diaries-list-store';
import DiaryUserStore from '../stores/diaries/diary-user-store';
import DiaryNewStore from '../stores/diaries/diary-new-store';
import DiariesAdminStore from '../stores/diaries/diaries-admin-store';
import { displayDoneInfoMessage } from '../utils/info-messages';
import { getDay } from '../utils/date-utils';


export default Ember.Object.extend({

  fetchDiaries(id, params) {
    DiariesListStore.send('update', { isLoading: true });

    DiariesApi.getDiaries(params, {
      done: (data) => {
      	DiariesListStore.send('handle', data);
      },
      always: (data) => {
      	DiariesListStore.send('update', { isLoading: false });
      }
    });
  },

  fetchDiariesAdmin(id, page, params) {
    DiariesAdminStore.send('update', id, { isLoading: true });

    Object.assign(params, {
      page: page,
      page_size: 10,
    });

    DiariesApi.getDiaries(params, {
      done: (data) => {
        DiariesAdminStore.send('handle', id, data);
      },
      always: (data) => {
        DiariesAdminStore.send('update', id, { isLoading: false });
      }
    });
  },

  fetchDiaryDetails(id) {
    DiaryUserStore.send('update', id, { 
      isLoading: true,
      isReviewing: false,
    });

    DiariesApi.getDiaryDetails({ id: id }, {
      done: (data) => {
        DiaryUserStore.send('handle', id, data);
      },
      always: () => {
        DiaryUserStore.send('update', id, { isLoading: false });
      }
    });
  },

  fetchDiariesStats() {
    DiariesApi.getDiariesStats({
      done: (data) => {
        DiariesListStore.send('handleOther', data);
      }
    });
  },

  updateDiary(id, params) {
    DiaryUserStore.send('update', id, { isUpdating: true });

    // params = {
    //   id: id,
    //   date: '2016-04-14'
    // };
    console.log(params)
    DiariesApi.updateDiary(params, {
      done: (data) => {
        DiaryUserStore.send('update', id, data);

        DiaryUserStore.send('update', id, { 
          [`editable.meditation_count.editing`]: false,
          [`editable.visualisation_count.editing`]: false,
          [`editable.anchor_count.editing`]: false,
          [`editable.notes.editing`]: false,
          [`editable.old_speech_usage.editing`]: false,
          [`editable.talk_feeling_id.editing`]: false,
          [`editable.diary_success_participant_ids.editing`]: false,
          [`editable.talk_participants_without_record_ids.editing`]: false,
          [`editable.phone_call_participants_without_record_ids.editing`]: false,
        });
      },
      always: () => {
        DiaryUserStore.send('update', id, { isUpdating: false });
      }
    });
  },

  createDiary(params, callback) {
    DiaryNewStore.send('update', { isLoading: true });

    DiariesApi.createDiary(params, {
      done: (data) => {
        DiariesListStore.getState().get('lastDiary').setProperties({
          "id": data.id,
          "date": data.date,
          "diaryName": moment(data.created_at).format('YYYY-MM-DD'),
          "diaryNameInDiariesList": getDay(data.date)
        });

        DiariesListStore.getState().set('selectedDiaryId', data.id);
        DiariesListStore.getState().set('lastDiaryId', data.id);
        DiariesListStore.getState().set('total_size', DiariesListStore.getState().get('total_size') + 1);

        callback(data.id);
        displayDoneInfoMessage('Uzupełniono dziennik');
      },
      always: () => {
        DiaryNewStore.send('update', { isLoading: false });
      }
    });
  },

  reviewDiary(id, params) {
    const loadingAttr = params.is_correct ? "isLoadingReviewCorrect" : "isLoadingReviewNotCorrect";

    DiaryUserStore.send('update', id, { [loadingAttr]: true });

    DiariesApi.reviewDiary(params, {
      done: (data) => {
        DiaryUserStore.send('update', id, { [loadingAttr]: false });
        DiaryUserStore.send('update', id, data);
      },
      always: () => {
        DiaryUserStore.send('update', id, { 
          [loadingAttr]: false,
          isReviewing: false
        });
      }
    });
  }

}).create();
