import MainDialogMixin from '../mixins/main-dialog-mixin';
import StudentsDispatcher from '../dispatchers/students-dispatcher';
import StudentsStore from '../stores/admin/students-store';


export default Ember.Component.extend(MainDialogMixin, {

	classNames: ['main-dialog', 'settings-record-categories-dialog'],

	init() {
		this._super();

		StudentsDispatcher.fetchAllUsersList('all');

		this.students = Ember.Object.create({ 'collection': null, 'isLoading':  StudentsStore.getState('all').get('isLoading') });

		StudentsStore.getState('all').get('promise').done(() => {
			this.students.setProperties({
				'collection': _.cloneDeep(StudentsStore.getState('all').get('collection')),
				'isLoading': false
			});
		});
	},

	selectedUsersIds: Ember.A(),

	actions: {

		toggleSelect(id) {
			
		}

	}

});