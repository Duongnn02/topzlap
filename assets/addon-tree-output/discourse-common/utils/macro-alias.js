define("discourse-common/utils/macro-alias", ["exports", "discourse-common/utils/is-descriptor", "discourse-common/lib/deprecated"], function (_exports, _isDescriptor, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = macroAlias;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/is-descriptor",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  function handleDescriptor(target, property, desc, fn) {
    let params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    return {
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      writable: desc.writable,
      initializer() {
        return fn(...params);
      }
    };
  }
  function macroAlias(fn) {
    return function () {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      if ((0, _isDescriptor.default)(params[params.length - 1])) {
        return handleDescriptor(...params, fn);
      } else {
        (0, _deprecated.default)(`Importing ${fn.name} from 'discourse-common/utils/decorators' is deprecated. You should instead import it from '@ember/object/computed' directly.`, {
          id: "discourse.utils-decorators-import"
        });
        return function (target, property, desc) {
          return handleDescriptor(target, property, desc, fn, params);
        };
      }
    };
  }
});