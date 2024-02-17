define("@ember/string/cache", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  class Cache {
    constructor(limit, func, store) {
      _defineProperty(this, "size", 0);
      _defineProperty(this, "misses", 0);
      _defineProperty(this, "hits", 0);
      this.limit = limit;
      this.func = func;
      this.store = store;
      this.store = store || new Map();
    }
    get(key) {
      let value = this.store.get(key);
      if (this.store.has(key)) {
        this.hits++;
        return this.store.get(key);
      } else {
        this.misses++;
        value = this.set(key, this.func(key));
      }
      return value;
    }
    set(key, value) {
      if (this.limit > this.size) {
        this.size++;
        this.store.set(key, value);
      }
      return value;
    }
    purge() {
      this.store.clear();
      this.size = 0;
      this.hits = 0;
      this.misses = 0;
    }
  }
  _exports.default = Cache;
});