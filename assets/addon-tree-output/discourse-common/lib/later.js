define("discourse-common/lib/later", ["exports", "@ember/runloop", "discourse-common/config/environment"], function (_exports, _runloop, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _default() {
    if ((0, _environment.isTesting)() && typeof [...arguments].at(-1) === "number") {
      // Replace the `wait` argument with 10ms
      let args = [].slice.call(arguments, 0, -1);
      args.push(10);
      return _runloop.later.apply(undefined, args);
    } else {
      return (0, _runloop.later)(...arguments);
    }
  }
});