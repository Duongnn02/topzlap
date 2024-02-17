define("discourse/lib/debounce", ["exports", "@ember/runloop"], function (_exports, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop"eaimeta@70e063a35619d71f
  /**
    Debounce a Javascript function. This means if it's called many times in a time limit it
    should only be executed once (at the end of the limit counted from the last call made).
    Original function will be called with the context and arguments from the last call made.
  **/
  function _default(func, wait) {
    let args;
    const later = () => {
      func.apply(this, args);
    };
    return function () {
      args = arguments;
      (0, _runloop.debounce)(null, later, wait);
    };
  }
});