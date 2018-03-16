export default Ember.Component.extend({

	classNames: ['ui-checkbox'],

	classNameBindings: ['displayOnly:ui-checkbox--display-only'],

	tagName: 'label',

	click(e) {
		e.preventDefault();

		if (this.get('displayOnly')) return;

		if (this.get('oneSelection')) {
			this.sendAction('deselect');
		}

		this.toggleProperty('checked');
	}

});