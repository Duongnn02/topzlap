define("@ember-decorators/utils/decorator", ["exports", "@ember/debug", "@ember-decorators/utils/-private/class-field-descriptor"], function (_exports, _debug, _classFieldDescriptor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.decoratorWithParams = decoratorWithParams;
  _exports.decoratorWithRequiredParams = decoratorWithRequiredParams;
  /**
   * A macro that takes a decorator function and allows it to optionally
   * receive parameters
   *
   * ```js
   * let foo = decoratorWithParams((target, desc, key, params) => {
   *   console.log(params);
   * });
   *
   * class {
   *   @foo bar; // undefined
   *   @foo('bar') baz; // ['bar']
   * }
   * ```
   *
   * @param {Function} fn - decorator function
   */
  function decoratorWithParams(fn) {
    return function () {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      // determine if user called as @computed('blah', 'blah') or @computed
      if ((0, _classFieldDescriptor.isDescriptor)(params)) {
        return fn(...params);
      } else {
        return function () {
          for (var _len2 = arguments.length, desc = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            desc[_key2] = arguments[_key2];
          }
          return fn(...desc, params);
        };
      }
    };
  }

  /**
   * A macro that takes a decorator function and requires it to receive
   * parameters:
   *
   * ```js
   * let foo = decoratorWithRequiredParams((target, desc, key, params) => {
   *   console.log(params);
   * });
   *
   * class {
   *   @foo('bar') baz; // ['bar']
   *   @foo bar; // Error
   * }
   * ```
   *
   * @param {Function} fn - decorator function
   */
  function decoratorWithRequiredParams(fn, name) {
    return function () {
      for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }
      (false && !(!(0, _classFieldDescriptor.isDescriptor)(params) && params.length > 0) && (0, _debug.assert)(`The @${name || fn.name} decorator requires parameters`, !(0, _classFieldDescriptor.isDescriptor)(params) && params.length > 0));
      return function () {
        for (var _len4 = arguments.length, desc = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          desc[_key4] = arguments[_key4];
        }
        return fn(...desc, params);
      };
    };
  }
});