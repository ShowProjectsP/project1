export default Ember.Component.extend({

  classNames: ['ui-dropdown-menu'],

  dropdownMenuOpenerClassName: 'ui-dropdown-menu_opener',
  dropdownMenuOpenerArrowClassName: 'ui-dropdown-menu_opener_arrow',

  closeDropdownOnClickAt: ['a', 'button'],

  _clickEventListener: null,
  _mouseMoveEventListener: null,

  onMouseEnter: function() {
    return this.get('on') === 'mouseEnter';
  }.property('on'),

  didInsertElement() {
    this._clickEventListener = Ember.run.bind(this, this.clickEvent);
    Ember.$(document.body).on('click.dropdown-menu', this._clickEventListener);

    if (this.get('onMouseEnter')) {
      this._mouseMoveEventListener = Ember.run.bind(this, this.mouseMoveEvent);
      Ember.$(document.body).on('mousemove.dropdown-menu', this._mouseMoveEventListener);
    }
  },

  willDestroyElement() {
    if (this._clickEventListener)
      Ember.$(document.body).off('click.dropdown-menu', this._clickEventListener);

    if (this._mouseMoveEventListener)
      Ember.$(document.body).off('mousemove.dropdown-menu', this._mouseMoveEventListener);
  },

  checkTargetCollision(target, elem) {
    return target !== elem
      && !$.contains(elem, target)
      && !$(target).hasClass(this.dropdownMenuOpenerClassName)
      && !$(target).hasClass(this.dropdownMenuOpenerArrowClassName);
  },

  mouseLeave(event) {
    if (this.get('onMouseEnter') && this.checkTargetCollision(event.target, this.$()[0]))
      this.set('dropdownMenuOpened', false);
  },

  clickEvent(event) {
    const target = event.target;
    const elem = this.$() && this.$()[0];

    if (!this.get('dropdownMenuOpened') || !elem) return;

    if ($.contains(elem, target)) {
      const clickedInside = (this.$(target).is(this.closeDropdownOnClickAt) || this.$(target).closest(this.closeDropdownOnClickAt)) && !this.get('dontCloseAtClickInside');
      if (!clickedInside) return;
    }

    this.set('dropdownMenuOpened', false);
  },

  mouseMoveEvent(event) {
    const target = event.target;
    const $target = $(target);
    const elem = this.$()[0];

    if ($target.hasClass(this.dropdownMenuOpenerClassName) && ($target.next()[0] !== elem)) {
      this.set('dropdownMenuOpened', false);
      return false;
    }

    if (this.checkTargetCollision(target, elem))
      this.set('dropdownMenuOpened', false);
  }

});
