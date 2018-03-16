export const PubSub = {

  subscribers: {},

  Subscribe: function(name, func) {
    if (this.subscribers[name])
      return;

    this.subscribers[name] = func;
  },

  Publish: function(name, ...args) {
    if (this.subscribers[name]) {
      this.subscribers[name](args);
    }
  },

  UnSubscribe: function(name) {
    if (this.subscribers[name])
      delete this.subscribers[name];
  }

}
