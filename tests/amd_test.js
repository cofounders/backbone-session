'use strict';

var requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname + '/..'
});

exports['AMD compatibility'] = {

  default: function (test) {
    requirejs(['backbone-session'], function (Session) {
      test.ok(Session);
      test.done();
    });
  }

};
