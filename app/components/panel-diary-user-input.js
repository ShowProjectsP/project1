export default Ember.Component.extend({

	classNames: ['panel-diary-user-input'],
	classNameBindings: ['typeNumber:panel-diary-user-input--type-number', 'editing:panel-diary-user-input--editing', 'large:panel-diary-user-input--large'],

	click() {
		if (!this.get('editing')) {
			this.set('editing', true);
			if (this.get('large')) this.$('textarea').focus(); else this.$('input').focus();
		}
	},
	
	typeNumber: function() {
		return this.get('type') === 'number';
	}.property('type'),

	setTextAreaScrollHeight: function() {
		if (!this.get('editing')) {
			const textarea = this.$('textarea')[0];

			if (textarea) this.$('textarea').css('height', textarea.scrollHeight + 2);
		}
	}.observes('editing', 'value'),

	actions: {

		focusOut() {
			this.set('editing', false);
		}

	}

});