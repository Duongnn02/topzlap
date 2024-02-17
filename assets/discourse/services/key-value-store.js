define("discourse/services/key-value-store", ["exports", "@ember/service", "discourse/lib/key-value-store"], function (_exports, _service, _keyValueStore) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"discourse/lib/key-value-store"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  const PROXIED_METHODS = Object.getOwnPropertyNames(_keyValueStore.default.prototype).reject(p => p === "constructor");

  /**
   * This is the global key-value-store which is injectable as a service.
   * Alternatively, consumers can use `discourse/lib/key-value-store` directly
   * to create their own namespaced store.
   * */
  class KeyValueStoreService extends _service.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "_keyValueStore", new _keyValueStore.default("discourse_"));
      for (const name of PROXIED_METHODS) {
        this[name] = this._keyValueStore[name].bind(this._keyValueStore);
      }
    }
  }
  _exports.default = KeyValueStoreService;
});