export default Ember.Component.extend({

  classNames: ['ui-select-menu'],

  _clickEventListener: null,

  willDestroyElement() {
    this.destroySelectMenu();
    this._super();
  },

  initSelectMenu() {
    if (this.get('isDestroying') || this.get('isDestroyed') || this.get('selectMenuInited')) return;

    this._clickEventListener = Ember.run.bind(this, this.clickEvent);
    Ember.$(document.body).on('click.ui-select-menu', this._clickEventListener);

    this.$('.select-menu_content').on('DOMMouseScroll mousewheel', function (ev) {
      Scrolling.stopScrollBubbling(ev, this);
    });

    this.set('selectMenuInited', true);
  },

  destroySelectMenu() {
    if (this.get('isDestroying') || this.get('isDestroyed')) return;

    this.$('.select-menu_content').off('DOMMouseScroll mousewheel');

    if (this._clickEventListener)
      Ember.$(document.body).off('click.ui-select-menu', this._clickEventListener);

    this.set('selectMenuInited', false);
  },

  clickEvent(event) {
    if (!this.element) return;

    let targetIsOutsideOfCurrentElem = !$(event.target).closest(this.$()).length,
      targetIsInMenuOpener = $(event.target).closest('.ui-select-menu_opener').length,
      isOpen = this.get('selectMenuOpened');

    if (targetIsOutsideOfCurrentElem || targetIsInMenuOpener) {
      if (isOpen) {
        this.send('close');
      }
    } else {
      this.send('open');
    }
  },

  selectedValue: function() {
    const selectedValue = _.find(this.get('selectMenuApi.values'), 'selected');
    const selectOutside = this.get('selectOutside'); // when selectOutside, show only placeholder as menu title;

    return selectedValue && !selectOutside ? selectedValue.displayValue : this.get('selectMenuApi.placeholder');
  }.property('selectMenuApi.values.@each.selected', 'selectMenuApi.placeholder'),

  actions: {

    open() {
      if (!this.get('selectMenuOpened')) {
        this.set('selectMenuOpened', true);
        this.initSelectMenu();
      }
    },

    close() {
      this.destroySelectMenu();
      this.set('selectMenuOpened', false);
    },

    selectOption(option, obj) {
      if (this.get('selectOutside')) {
        obj.toggleProperty('selected');
          
        if (obj.get('selected')) {
          this.get('selectMenuApi.selected').pushObject(obj);
        } else {
          this.get('selectMenuApi.selected').removeObject(obj);
        }

      } else {
        if (_.find(this.get('selectMenuApi.values'), 'selected')) _.find(this.get('selectMenuApi.values'), 'selected').set('selected', false);
        if (_.find(this.get('selectMenuApi.values'), ['value', option])) _.find(this.get('selectMenuApi.values'), ['value', option]).set('selected', true);

        this.send('close');
      }
    },

    loadMore() {
      this.sendAction('onLoadMore');
    }

  }

});
