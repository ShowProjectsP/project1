import Ember from 'ember';
import config from './config/environment';
import UserStore from './stores/user-store';


const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('app', { path: '/' }, function() {

    this.route('login', function() {
      this.route('forgot-password');
      this.route('reset-password');
    });

    this.route('registration', function() {
      this.route('diagnosis');
    });

    this.route('panel', function() {
      // student
      this.route('diaries-user', { path: '/diaries-user' }, function() {
        this.route('diary', { path: ':diary_id' });
        this.route('new');
      });

      this.route('records-admin', { path: '/records' });
      this.route('records-user', { path: '/records' }, function() {
        this.route('record', { path: ':record_id' });
        this.route('new');
      });

      this.route('my-history');
      this.route('my-newspeech');

      // admin
      this.route('diagnoses');
      this.route('diagnosis', { path: '/diagnoses/:diagnosis_id' });
      this.route('reports');
      this.route('students');
      this.route('groups');
      this.route('group', { path: '/groups/:group_id' });
      this.route('student', { path: '/students/:student_id' });
      this.route('settings');

      this.route('diaries-admin', { path: '/diaries-admin' });
      this.route('diary-admin', { path: '/diaries-admin/:diary_id' })

      // student + admin
      this.route('messages', function() {
        this.route('message', { path: ':thread_id' });
        this.route('new');
      });

    });

  });

});

export default Router;
