(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'));
  } else {
    root.urlbuilder = factory(root._, root.Backbone);
  }
}(this, function (_, Backbone) {
  return Backbone.Model.extend({
    url: function () {
      return 'Backbone.Session';
    },
    initialize: function (properties, options) {
      this.options = options || {};
    },
    destroy: function (options) {
      return this.sync('delete', this, options);
    },
    sync: function (method, model, options) {
      options = options || {};
      var url = model.options.url || model.url;
      var key = _.isFunction(url) ? url() : '' + url;
      var response;
      switch (method) {
      case 'create':
      case 'update':
        var data = model.toJSON();
        var text = JSON.stringify(data);
        response = localStorage.setItem(key, text);
        break;
      case 'delete':
        response = localStorage.removeItem(key);
        break;
      case 'read':
        response = JSON.parse(localStorage.getItem(key));
        break;
      }
      if (_.isFunction(options.success)) {
        options.success(response);
      }
      return Promise.resolve(response);
    },
    signIn: function (options) {
      return Promise.reject(Error(
        'Override the signIn method'
      ));
    },
    signOut: function (options) {
      options = options || {};
      this.destroy();
      this.clear();
      this.trigger('signOut');
      return Promise.resolve();
    },
    getAuthStatus: function (options) {
      return Promise.reject(Error(
        'Override the getAuthStatus method'
      ));
    }
  });
}));
