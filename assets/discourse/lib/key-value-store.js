define("discourse/lib/key-value-store", ["exports", "discourse-common/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  const TEST_KEY_PREFIX = "__test_";

  // A simple key value store that uses LocalStorage
  let safeLocalStorage;
  try {
    safeLocalStorage = localStorage;
    if (localStorage["disableLocalStorage"] === "true") {
      safeLocalStorage = null;
    } else {
      // makes sure we can write to the local storage
      safeLocalStorage["safeLocalStorage"] = true;
    }
  } catch (e) {
    // local storage disabled
    safeLocalStorage = null;
  }
  class KeyValueStore {
    constructor(ctx) {
      _defineProperty(this, "context", null);
      this.context = (0, _environment.isTesting)() ? `${TEST_KEY_PREFIX}${ctx}` : ctx;
    }
    abandonLocal() {
      return this.removeKeys();
    }
    removeKeys() {
      let predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => true;
      if (!safeLocalStorage) {
        return;
      }
      let i = safeLocalStorage.length - 1;
      while (i >= 0) {
        let k = safeLocalStorage.key(i);
        let v = safeLocalStorage[k];
        try {
          v = JSON.parse(v);
        } catch (e) {}
        if (k.substring(0, this.context.length) === this.context && predicate(k, v)) {
          safeLocalStorage.removeItem(k);
        }
        i--;
      }
      return true;
    }
    remove(key) {
      if (!safeLocalStorage) {
        return;
      }
      return safeLocalStorage.removeItem(this.context + key);
    }
    set(opts) {
      if (!safeLocalStorage) {
        return false;
      }
      safeLocalStorage[this.context + opts.key] = opts.value;
    }
    setObject(opts) {
      this.set({
        key: opts.key,
        value: JSON.stringify(opts.value)
      });
    }
    get(key) {
      if (!safeLocalStorage) {
        return null;
      }
      return safeLocalStorage[this.context + key];
    }
    getInt(key, def) {
      if (!def) {
        def = 0;
      }
      if (!safeLocalStorage) {
        return def;
      }
      const result = parseInt(this.get(key), 10);
      if (!isFinite(result)) {
        return def;
      }
      return result;
    }
    getObject(key) {
      if (!safeLocalStorage) {
        return null;
      }
      try {
        return JSON.parse(safeLocalStorage[this.context + key]);
      } catch (e) {}
    }
  }

  // API compatibility with `localStorage`
  _exports.default = KeyValueStore;
  KeyValueStore.prototype.getItem = KeyValueStore.prototype.get;
  KeyValueStore.prototype.removeItem = KeyValueStore.prototype.remove;
  KeyValueStore.prototype.setItem = function (key, value) {
    this.set({
      key,
      value
    });
  };
});