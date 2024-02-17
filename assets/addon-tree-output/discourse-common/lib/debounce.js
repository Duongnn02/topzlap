define("discourse-common/lib/debounce", ["exports", "@ember/runloop", "discourse-common/config/environment"], function (_exports, _runloop, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  /**
    Debounce a Javascript function. This means if it's called many times in a time limit it
    should only be executed once (at the end of the limit counted from the last call made).
    Original function will be called with the context and arguments from the last call made.
  **/

  function _default() {
    if ((0, _environment.isTesting)()) {
      const lastArgument = arguments[arguments.length - 1];
      const hasImmediateArgument = typeof lastArgument === "boolean";
      let args = [].slice.call(arguments, 0, hasImmediateArgument ? -2 : -1);

      // Replace the time argument with 10ms
      args.push(10);
      if (hasImmediateArgument) {
        args.push(lastArgument);
      }
      return _runloop.debounce.apply(undefined, args);
    } else {
      return (0, _runloop.debounce)(...arguments);
    }
  }
});