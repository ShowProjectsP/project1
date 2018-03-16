import DiagnosisStore from '../../../stores/admin/diagnosis-store';
import DiagnosisDispatcher from '../../../dispatchers/diagnosis-dispatcher';


export default Ember.Route.extend({

  queryParams: {
    diagnosisId: {
      refreshModel: true
    }
  },

  beforeModel() {
    DiagnosisDispatcher.fetchDiagnosis(this.paramsFor(this.routeName).diagnosis_id);
  },

  model() {
    const diagnosisId = this.paramsFor(this.routeName).diagnosis_id;

    DiagnosisStore.getState(diagnosisId).get('promise').done(() => {
      DiagnosisStore.send('update', diagnosisId, { isLoading: false });
    });

    return {
      diagnosis: DiagnosisStore.getState(diagnosisId)
    }

  }

});
