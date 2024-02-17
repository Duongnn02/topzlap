define("discourse/lib/notification-types/liked", ["exports", "discourse/lib/notification-types/base", "discourse/lib/utilities", "I18n"], function (_exports, _base, _utilities, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"discourse/lib/utilities",0,"I18n"eaimeta@70e063a35619d71f
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  var _username = /*#__PURE__*/new WeakMap();
  class _default extends _base.default {
    constructor() {
      super(...arguments);
      _classPrivateFieldInitSpec(this, _username, {
        get: _get_username,
        set: void 0
      });
    }
    get label() {
      if (this.count === 2) {
        return _I18n.default.t("notifications.liked_by_2_users", {
          username: this.username,
          username2: _classPrivateFieldGet(this, _username)
        });
      } else if (this.count > 2) {
        return _I18n.default.t("notifications.liked_by_multiple_users", {
          username: this.username,
          username2: _classPrivateFieldGet(this, _username),
          count: this.count - 2
        });
      } else {
        return super.label;
      }
    }
    get labelClasses() {
      if (this.count === 2) {
        return ["double-user"];
      } else if (this.count > 2) {
        return ["multi-user"];
      }
    }
    get count() {
      return this.notification.data.count;
    }
  }
  _exports.default = _default;
  function _get_username() {
    return (0, _utilities.formatUsername)(this.notification.data.username2);
  }
});