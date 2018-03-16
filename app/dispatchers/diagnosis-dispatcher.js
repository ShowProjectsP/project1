import DiagnosisApi from '../api/diagnosis-api';
import DiagnosisStore from '../stores/admin/diagnosis-store';


export default Ember.Object.extend({

  fetchDiagnosis(diagnosisId) {
    DiagnosisStore.send('update', diagnosisId, { isLoading: true });

    DiagnosisApi.getDiagnosisDetails({ id: diagnosisId }, {
      done: (data) => {
        DiagnosisStore.send('handle', diagnosisId, data);
      },
      always: () => {
        DiagnosisStore.send('update', diagnosisId, { isLoading: false });
      }
    });
  },

  updateDiagnosis(field, value, diagnosisId) {
    DiagnosisStore.send('update', diagnosisId, { [`editable.${field}.isLoading`]: true });

    DiagnosisApi.updateDiagnosis(diagnosisId, { [`${field}`]: value }, {
      done: () => {
        DiagnosisStore.send('update', diagnosisId, { [`editable.${field}.editing`]: false });
        DiagnosisStore.send('update', diagnosisId, { [`${field}`]: value });
      },
      always: () => {
        DiagnosisStore.send('update', diagnosisId, { [`editable.${field}.isLoading`]: false });
      }
    });
  }

}).create();
