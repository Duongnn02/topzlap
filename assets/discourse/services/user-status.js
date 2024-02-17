define("discourse/services/user-status", ["exports", "@ember/service", "discourse/lib/ajax", "discourse/lib/do-not-disturb"], function (_exports, _service, _ajax, _doNotDisturb) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _enterDoNotDisturb, _leaveDoNotDisturb, _duration;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"discourse/lib/ajax",0,"discourse/lib/do-not-disturb"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let UserStatusService = (_class = (_enterDoNotDisturb = /*#__PURE__*/new WeakSet(), _leaveDoNotDisturb = /*#__PURE__*/new WeakSet(), _duration = /*#__PURE__*/new WeakSet(), class UserStatusService extends _service.default {
    constructor() {
      super(...arguments);
      _classPrivateMethodInitSpec(this, _duration);
      _classPrivateMethodInitSpec(this, _leaveDoNotDisturb);
      _classPrivateMethodInitSpec(this, _enterDoNotDisturb);
      _initializerDefineProperty(this, "appEvents", _descriptor, this);
    }
    async set(status, pauseNotifications) {
      await (0, _ajax.ajax)({
        url: "/user-status.json",
        type: "PUT",
        data: status
      });
      this.currentUser.set("status", status);
      if (pauseNotifications) {
        _classPrivateMethodGet(this, _enterDoNotDisturb, _enterDoNotDisturb2).call(this, status.ends_at);
      } else {
        _classPrivateMethodGet(this, _leaveDoNotDisturb, _leaveDoNotDisturb2).call(this);
      }
    }
    async clear() {
      await (0, _ajax.ajax)({
        url: "/user-status.json",
        type: "DELETE"
      });
      this.currentUser.set("status", null);
      _classPrivateMethodGet(this, _leaveDoNotDisturb, _leaveDoNotDisturb2).call(this);
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = UserStatusService;
  function _enterDoNotDisturb2(endsAt) {
    const duration = _classPrivateMethodGet(this, _duration, _duration2).call(this, endsAt ?? _doNotDisturb.default.forever);
    this.currentUser.enterDoNotDisturbFor(duration);
  }
  function _leaveDoNotDisturb2() {
    if (!this.currentUser.isInDoNotDisturb()) {
      return;
    }
    this.currentUser.leaveDoNotDisturb();
  }
  function _duration2(endsAt) {
    return moment.utc(endsAt).diff(moment.utc(), "minutes");
  }
});