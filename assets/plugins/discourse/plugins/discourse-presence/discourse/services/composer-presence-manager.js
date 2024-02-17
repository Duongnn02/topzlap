define("discourse/plugins/discourse-presence/discourse/services/composer-presence-manager", ["exports", "@ember/service", "@ember/runloop", "discourse-common/config/environment"], function (_exports, _service, _runloop, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@ember/runloop",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const PRESENCE_CHANNEL_PREFIX = "/discourse-presence";
  const KEEP_ALIVE_DURATION_SECONDS = 10;
  let ComposerPresenceManager = (_class = class ComposerPresenceManager extends _service.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "presence", _descriptor, this);
    }
    notifyState(intent, id) {
      if (this.siteSettings.allow_users_to_hide_profile && this.currentUser.user_option.hide_profile_and_presence) {
        return;
      }
      if (intent === undefined) {
        return this.leave();
      }
      if (!["reply", "whisper", "edit"].includes(intent)) {
        throw `Unknown intent ${intent}`;
      }
      const state = `${intent}/${id}`;
      if (this._state !== state) {
        this._enter(intent, id);
        this._state = state;
      }
      if (!(0, _environment.isTesting)()) {
        this._autoLeaveTimer = (0, _runloop.debounce)(this, this.leave, KEEP_ALIVE_DURATION_SECONDS * 1000);
      }
    }
    leave() {
      this._presentChannel?.leave();
      this._presentChannel = null;
      this._state = null;
      if (this._autoLeaveTimer) {
        (0, _runloop.cancel)(this._autoLeaveTimer);
        this._autoLeaveTimer = null;
      }
    }
    _enter(intent, id) {
      this.leave();
      let channelName = `${PRESENCE_CHANNEL_PREFIX}/${intent}/${id}`;
      this._presentChannel = this.presence.getChannel(channelName);
      this._presentChannel.enter();
    }
    willDestroy() {
      this.leave();
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "presence", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = ComposerPresenceManager;
});