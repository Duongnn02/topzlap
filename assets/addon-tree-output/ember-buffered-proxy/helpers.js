define("ember-buffered-proxy/helpers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.aliasMethod = aliasMethod;
  _exports.empty = empty;
  const hasOwnProp = Object.prototype.hasOwnProperty;
  function aliasMethod(methodName) {
    return function () {
      return this[methodName].apply(this, arguments);
    };
  }
  function empty(obj) {
    let key;
    for (key in obj) {
      if (!hasOwnProp.call(obj, key)) {
        continue;
      }
      return false;
    }
    return true;
  }
});