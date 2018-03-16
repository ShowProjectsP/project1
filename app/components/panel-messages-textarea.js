import MessagesDispatcher from '../dispatchers/messages-dispatcher';
import MessagesStore from '../stores/messages-store';
import { PubSub } from '../utils/publish-subscribe';

import MessagesApi from '../api/messages-api';


export default Ember.Component.extend({

	classNames: ['panel-messages-textarea'],

	init() {
		this._super();

		PubSub.Subscribe('messages.send-message', () => {
			this.send('sendMessage');
		});
	},

	didInsertElement() {
		this.$('textarea').on('keydown.send-message', (event) => {
			if (event.keyCode !== 13) {
				return;
			} else {
				if (this.get('sendButtonDisabled')) {
					event.preventDefault();
					return;
				};
			}

			event.preventDefault();

      PubSub.Publish('messages.send-message');
    });

	},

	willDestroyElement() {
		this.$('textarea').off('keydown.send-message');
    PubSub.UnSubscribe('messages.send-message');
	},

	sendButtonDisabled: function() {
		return !_.trim(this.get('model.messages.newMessageValue')).length;
	}.property('model.messages.newMessageValue.length'),

	fileUploadApi: function() {
    return {
      params: {
        url: `/api/v1/messages?recipient_id=${this.get('model.thread.user.id')}&message=${this.get('model.messages.newMessageValue')}&attachment_type=media`,
        method: 'POST',
        paramName: 'attachment'
      }
    }
  }.property('model.messages.newMessageValue', 'model.thread.user.id'),

	actions: {

		sendMessage() {
			if (MessagesStore.getState(this.get('model.thread.id')).get('isSending')) return;
			console.log(this.get('model'))
			MessagesDispatcher.createMessage(this.get('model.thread.id'), this.get('model.thread.user.id'), this.get('model.messages.newMessageValue'));
		},

		test(e) {
			console.log('d');
		}

	}

});