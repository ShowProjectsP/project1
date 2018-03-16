import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import _ from 'lodash';

let App;

window._ = _;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  i18n: Ember.inject.service()
});

loadInitializers(App, config.modulePrefix);

$.ajax({
  url: 'assets/svg/svg-icons.svg',
  dataType: 'text'
}).done((data) => {
  document.body.insertAdjacentHTML('afterbegin', data);
});

if (config.environment === 'development') {
	window.log = (args) => console.log(args);
}

export default App;
