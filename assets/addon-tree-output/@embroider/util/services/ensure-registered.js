define("@embroider/util/services/ensure-registered", ["exports", "@ember/service", "@ember/application"], function (_exports, _service, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  class EnsureRegisteredService extends _service.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "classNonces", new WeakMap());
      _defineProperty(this, "nonceCounter", 0);
    }
    register(klass) {
      let owner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _application.getOwner)(this);
      let nonce = this.classNonces.get(klass);
      if (nonce == null) {
        nonce = `-ensure${this.nonceCounter++}`;
        this.classNonces.set(klass, nonce);
        owner.register(`component:${nonce}`, klass);
      }
      return nonce;
    }
  }
  _exports.default = EnsureRegisteredService;
});