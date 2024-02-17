define("@ember/-internals/console/index", ["exports", "@ember/debug", "@ember/deprecated-features"], function (_exports, _debug, _deprecatedFeatures) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // Deliver message that the function is deprecated

  var DEPRECATION_MESSAGE = 'Use of Ember.Logger is deprecated. Please use `console` for logging.';
  var DEPRECATION_ID = 'ember-console.deprecate-logger';
  var DEPRECATION_URL = 'https://deprecations.emberjs.com/v3.x#toc_use-console-rather-than-ember-logger';
  /**
     @module ember
  */

  /**
    Inside Ember-Metal, simply uses the methods from `imports.console`.
    Override this to provide more robust logging functionality.
  
    @class Logger
    @deprecated Use 'console' instead
  
    @namespace Ember
    @public
  */

  var DEPRECATED_LOGGER;
  if (_deprecatedFeatures.LOGGER) {
    DEPRECATED_LOGGER = {
      /**
      Logs the arguments to the console.
      You can pass as many arguments as you want and they will be joined together with a space.
       ```javascript
      var foo = 1;
      Ember.Logger.log('log value of foo:', foo);
      // "log value of foo: 1" will be printed to the console
      ```
      @method log
      @for Ember.Logger
      @param {*} arguments
      @public
      */
      log() {
        (true && !(false) && (0, _debug.deprecate)(DEPRECATION_MESSAGE, false, {
          id: DEPRECATION_ID,
          until: '4.0.0',
          url: DEPRECATION_URL,
          for: 'ember-source',
          since: {
            enabled: '3.2.0'
          }
        }));
        return console.log(...arguments); // eslint-disable-line no-console
      },

      /**
      Prints the arguments to the console with a warning icon.
      You can pass as many arguments as you want and they will be joined together with a space.
       ```javascript
      Ember.Logger.warn('Something happened!');
      // "Something happened!" will be printed to the console with a warning icon.
      ```
      @method warn
      @for Ember.Logger
      @param {*} arguments
      @public
      */
      warn() {
        (true && !(false) && (0, _debug.deprecate)(DEPRECATION_MESSAGE, false, {
          id: DEPRECATION_ID,
          until: '4.0.0',
          url: DEPRECATION_URL,
          for: 'ember-source',
          since: {
            enabled: '3.2.0'
          }
        }));
        return console.warn(...arguments); // eslint-disable-line no-console
      },

      /**
      Prints the arguments to the console with an error icon, red text and a stack trace.
      You can pass as many arguments as you want and they will be joined together with a space.
       ```javascript
      Ember.Logger.error('Danger! Danger!');
      // "Danger! Danger!" will be printed to the console in red text.
      ```
      @method error
      @for Ember.Logger
      @param {*} arguments
      @public
      */
      error() {
        (true && !(false) && (0, _debug.deprecate)(DEPRECATION_MESSAGE, false, {
          id: DEPRECATION_ID,
          until: '4.0.0',
          url: DEPRECATION_URL,
          for: 'ember-source',
          since: {
            enabled: '3.2.0'
          }
        }));
        return console.error(...arguments); // eslint-disable-line no-console
      },

      /**
      Logs the arguments to the console.
      You can pass as many arguments as you want and they will be joined together with a space.
       ```javascript
      var foo = 1;
      Ember.Logger.info('log value of foo:', foo);
      // "log value of foo: 1" will be printed to the console
      ```
      @method info
      @for Ember.Logger
      @param {*} arguments
      @public
      */
      info() {
        (true && !(false) && (0, _debug.deprecate)(DEPRECATION_MESSAGE, false, {
          id: DEPRECATION_ID,
          until: '4.0.0',
          url: DEPRECATION_URL,
          for: 'ember-source',
          since: {
            enabled: '3.2.0'
          }
        }));
        return console.info(...arguments); // eslint-disable-line no-console
      },

      /**
      Logs the arguments to the console in blue text.
      You can pass as many arguments as you want and they will be joined together with a space.
       ```javascript
      var foo = 1;
      Ember.Logger.debug('log value of foo:', foo);
      // "log value of foo: 1" will be printed to the console
      ```
      @method debug
      @for Ember.Logger
      @param {*} arguments
      @public
      */
      debug() {
        (true && !(false) && (0, _debug.deprecate)(DEPRECATION_MESSAGE, false, {
          id: DEPRECATION_ID,
          until: '4.0.0',
          url: DEPRECATION_URL,
          for: 'ember-source',
          since: {
            enabled: '3.2.0'
          }
        }));
        /* eslint-disable no-console */
        if (console.debug) {
          return console.debug(...arguments);
        }
        return console.info(...arguments);
        /* eslint-enable no-console */
      },

      /**
      If the value passed into `Ember.Logger.assert` is not truthy it will throw an error with a stack trace.
       ```javascript
      Ember.Logger.assert(true); // undefined
      Ember.Logger.assert(true === false); // Throws an Assertion failed error.
      Ember.Logger.assert(true === false, 'Something invalid'); // Throws an Assertion failed error with message.
      ```
      @method assert
      @for Ember.Logger
      @param {Boolean} bool Value to test
      @param {String} message Assertion message on failed
      @public
      */
      assert() {
        (true && !(false) && (0, _debug.deprecate)(DEPRECATION_MESSAGE, false, {
          id: DEPRECATION_ID,
          until: '4.0.0',
          url: DEPRECATION_URL,
          for: 'ember-source',
          since: {
            enabled: '3.2.0'
          }
        }));
        return console.assert(...arguments); // eslint-disable-line no-console
      }
    };
  }
  var _default = DEPRECATED_LOGGER;
  _exports.default = _default;
});