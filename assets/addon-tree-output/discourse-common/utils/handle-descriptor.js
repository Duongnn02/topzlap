define("discourse-common/utils/handle-descriptor", ["exports", "@ember/object/core", "@ember/object", "discourse-common/utils/extract-value"], function (_exports, _core, _object, _extractValue) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = handleDescriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/core",0,"@ember/object",0,"discourse-common/utils/extract-value"eaimeta@70e063a35619d71f
  function handleDescriptor(target, key, desc) {
    let params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    const val = (0, _extractValue.default)(desc);
    if (typeof val === "function" && target instanceof _core.default) {
      // We're in a native class, so convert the method to a getter first
      desc.writable = false;
      desc.initializer = undefined;
      desc.value = undefined;
      desc.get = callUserSuppliedGet(params, val);
      return (0, _object.computed)(...params)(target, key, desc);
    } else {
      return {
        enumerable: desc.enumerable,
        configurable: desc.configurable,
        writable: desc.writable,
        initializer() {
          let computedDescriptor;
          if (desc.writable) {
            if (typeof val === "object") {
              let value = {};
              if (val.get) {
                value.get = callUserSuppliedGet(params, val.get);
              }
              if (val.set) {
                value.set = callUserSuppliedSet(params, val.set);
              }
              computedDescriptor = value;
            } else {
              computedDescriptor = callUserSuppliedGet(params, val);
            }
          } else {
            throw new Error("ember-computed-decorators does not support using getters and setters");
          }
          return _object.computed.apply(null, params.concat(computedDescriptor));
        }
      };
    }
  }
  function niceAttr(attr) {
    const parts = attr.split(".");
    let i;
    for (i = 0; i < parts.length; i++) {
      if (parts[i] === "@each" || parts[i] === "[]" || parts[i].includes("{")) {
        break;
      }
    }
    return parts.slice(0, i).join(".");
  }
  function callUserSuppliedGet(params, func) {
    params = params.map(niceAttr);
    return function () {
      let paramValues = params.map(p => (0, _object.get)(this, p));
      return func.apply(this, paramValues);
    };
  }
  function callUserSuppliedSet(params, func) {
    params = params.map(niceAttr);
    return function (key, value) {
      let paramValues = params.map(p => (0, _object.get)(this, p));
      paramValues.unshift(value);
      return func.apply(this, paramValues);
    };
  }
});