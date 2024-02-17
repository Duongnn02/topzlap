define("ember-tracked-storage-polyfill/index", ["exports", "@glimmer/tracking", "@ember/debug"], function (_exports, _tracking, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createStorage = createStorage;
  _exports.getValue = getValue;
  _exports.setValue = setValue;
  var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  class TrackedStorageImpl {
    constructor(initialValue, isEqual) {
      this._value = this._lastValue = initialValue;
      this._isEqual = isEqual;
    }
  }
  __decorate([_tracking.tracked], TrackedStorageImpl.prototype, "_value", void 0);
  function tripleEq(a, b) {
    return a === b;
  }
  function createStorage(initialValue) {
    let isEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tripleEq;
    (false && !(typeof isEqual === 'function') && (0, _debug.assert)('the second parameter to `createStorage` must be an equality function or undefined', typeof isEqual === 'function'));
    return new TrackedStorageImpl(initialValue, isEqual);
  }
  function getValue(storage) {
    (false && !(storage instanceof TrackedStorageImpl) && (0, _debug.assert)('getValue must be passed a tracked store created with `createStorage`.', storage instanceof TrackedStorageImpl));
    return storage._value;
  }
  function setValue(storage, value) {
    (false && !(storage instanceof TrackedStorageImpl) && (0, _debug.assert)('setValue must be passed a tracked store created with `createStorage`.', storage instanceof TrackedStorageImpl));
    const {
      _isEqual: isEqual,
      _lastValue: lastValue
    } = storage;
    if (!isEqual(value, lastValue)) {
      storage._value = storage._lastValue = value;
    }
  }
});