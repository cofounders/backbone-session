'use strict';

exports['CommonJS compatibility'] = {

  default: function (test) {
    test.ok(require('../backbone-session'));
    test.done();
  }

};
