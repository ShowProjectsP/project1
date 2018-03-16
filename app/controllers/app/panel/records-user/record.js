// import RecordsDispatcher from '../../../../dispatchers/records-dispatcher';


export default Ember.Controller.extend({

	init() {
		this._super();
		//"58c2042d-b605-4794-ab97-053f5b2ccc80"

	},

	fileUploadApi: function() {
    return {
      params: {
        url: `/api/v1/records`,
        method: 'POST',
        paramName: 'record_file',
        extras: { "date": "2018-03-10", "record_category_id": "58c2042d-b605-4794-ab97-053f5b2ccc80" }
      },
      beforeUpload: () => {
        //StudentStore.send('update', this.get('model.student.id'), { ['photo.isLoading']: true });
      },
      didUpload: () => {
        //StudentDispatcher.fetchUserPhoto(this.get('model.student.id'))
      }
    }
  }.property(),

});