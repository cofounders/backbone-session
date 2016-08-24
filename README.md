# backbone-session [![Build Status](https://secure.travis-ci.org/cofounders/backbone-session.png?branch=master)](https://travis-ci.org/cofounders/backbone-session)

Flexible and simple session management for Backbone apps

## Usage

```javascript
// Using CommonJS
var Session = require('backbone-session');

// or AMD
define(['backbone-session'], function (Session) {
  // ...
})

// Extend from Session to implement your API's behaviour
var Account = Session.extend({
  signIn: function () {},
  signOut: function () {},
  getAuthStatus: function () {}
});

// Using the custom Account implementation
var session = new Account();
session.fetch()
  .then(session.getAuthStatus)
  .then(function () {
    console.log('Logged in as %s', session.get('name'));
  })
  .fail(function () {
    console.log('Not yet logged in!');
  });
```

## Why?

Using a simple facade that feels more *Backboney* helps avoid third party SDKs and APIs leaking into your app code. Your app will be less locked-in to your authentication provider.

Backbone Session uses the `localStorage` API to cache tokens and user profile information.

## How do I use Backbone Session?

Backbone Session is merely a facade, or interface. It's up to you to implement its methods to do what your API requires.

Many Backbone apps will have a singleton `app` object that tracks state. That's a good place to keep your Backbone Session instance.

Backbone Session implementations can be synchronous or asynchronous. For the sake of consistency, it is recommended to use Promises even with a syncronous implementation.

## API

Backbone Session inherits all of [Backbone Models](http://backbonejs.org/#Model)'s methods and properties.

It overrides and extends the following interfaces:

### url

Default: `Backbone.Session`

Either a Function or a String that represents the key used to access `localStorage`. If a Function, its return value will be the key.

### signIn([options])

Returns: [jQuery Promise](https://api.jquery.com/promise/)

Example:
```js
session.signIn({
  username: 'alice@example.com',
  password: 'hunter2'
}).then(function () {
  // Do stuff after logging in ...
}).fail(function () {
  // Handle the failed log in attempt ...
});
```

### signOut([options])

Returns: [jQuery Promise](https://api.jquery.com/promise/)

Example:
```js
session.signOut().then(function () {
  // Now the user is logged out ...
});
```

### getAuthStatus([options])

Returns: [jQuery Promise](https://api.jquery.com/promise/)

Example:
```js
session.getAuthStatus()
.then(function () {
  // The user is already logged in ...
})
.fail(function () {
  // The user is not yet logged in ...
});
```

### Model & Collection

A basic Backbone Model and Collection to extend and inherit from. Session implementations can replace them with a patched Model or Collection to seamlessly handle network authentication, error handling, logging, etc. Session consumers should extend their models from this base.

Example:
```js
// Session implementation
var MyAPI = Backbone.Session.extend({
  Model: Backbone.Model.extend({
    sync: function () {
      console.log('Syncing...');
      return Backbone.Model.sync.apply(this, arguments);
    }
  })
});

// Session consumer
var session = new MyAPI();
var MyModel = session.prototype.Model.extend({
  url: '/foo/bar'
});

var item = new MyModel();
item.fetch(); // prints: Syncing...
```

## Installation

### Bower

`bower install backbone-session`

### NPM

`npm install backbone-session`

or

`package.json`

```json
"dependencies": {
  "backbone-session": ""
}
```

### HTML

```html
<script src="backbone-session.js"></script>
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
