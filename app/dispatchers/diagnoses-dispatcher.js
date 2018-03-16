import DiagnosisApi from '../api/diagnosis-api';
import DiagnosesStore from '../stores/admin/diagnoses-store';


export default Ember.Object.extend({

  fetchDiagnoses(id, page) {
    DiagnosesStore.send('update', id, { isLoading: true });

    DiagnosisApi.getDiagnoses({ page: page, page_size: 10 }, {
      done: (data) => {
        DiagnosesStore.send('handle', id, data);
      },
      always: () => {
        DiagnosesStore.send('update', id, { isLoading: false });
      }
    });
  }

}).create();
