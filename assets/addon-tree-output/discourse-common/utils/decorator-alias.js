define("discourse-common/utils/decorator-alias", ["exports", "discourse-common/utils/extract-value"], function (_exports, _extractValue) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = decoratorAlias;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/extract-value"eaimeta@70e063a35619d71f
  function decoratorAlias(fn, errorMessage) {
    return function () {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      // determine if user called as @discourseComputed('blah', 'blah') or @discourseComputed
      if (params.length === 0) {
        throw new Error(errorMessage);
      } else {
        return function (target, key, desc) {
          return {
            enumerable: desc.enumerable,
            configurable: desc.configurable,
            writable: desc.writable,
            initializer() {
              let value = (0, _extractValue.default)(desc);
              return fn.apply(null, params.concat(value));
            }
          };
        };
      }
    };
  }
});