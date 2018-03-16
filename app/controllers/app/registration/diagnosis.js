import DiagnosisApi from '../../../api/diagnosis-api';


export default Ember.Controller.extend({

  diagnosisTypeObserver: function() {
    this.set('model.params.diagnosis_type', this.get('uiRadioButtonValue'));
  }.observes('uiRadioButtonValue'),

  actions: {

    pay() {
      this.set('model.isLoading', true);

      DiagnosisApi.createDiagnosis(this.get('model.params'), {
        done: (data) => {

        },
        always: () => {
          this.set('model.isLoading', false);
        }
      });
    }

  }

});
