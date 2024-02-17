define("discourse/lib/dirty-keys", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class DirtyKeys {
    constructor(name) {
      this.name = name;
      this._keys = {};
    }
    keyDirty(key, options) {
      options = options || {};
      options.dirty = true;
      this._keys[key] = options;
    }
    forceAll() {
      this.keyDirty("*");
    }
    allDirty() {
      return !!this._keys["*"];
    }
    optionsFor(key) {
      return this._keys[key] || {
        dirty: false
      };
    }
    renderedKey(key) {
      if (key === "*") {
        this._keys = {};
      } else {
        delete this._keys[key];
      }
    }
  }
  _exports.default = DirtyKeys;
});