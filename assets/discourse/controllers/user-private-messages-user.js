define("discourse/controllers/user-private-messages-user", ["exports", "I18n", "@ember/controller", "@ember/object", "@ember/service"], function (_exports, _I18n, _controller, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _class2, _descriptor, _descriptor2, _linkText;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@ember/controller",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let _class = (_dec = (0, _object.computed)("viewingSelf", "router.currentRoute.name", "currentUser.admin"), _dec2 = (0, _object.computed)("pmTopicTrackingState.newIncoming.[]", "pmTopicTrackingState.statesModificationCounter"), _dec3 = (0, _object.computed)("pmTopicTrackingState.newIncoming.[]", "pmTopicTrackingState.statesModificationCounter"), (_class2 = (_linkText = /*#__PURE__*/new WeakSet(), class _class2 extends _controller.default {
    constructor() {
      super(...arguments);
      _classPrivateMethodInitSpec(this, _linkText);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "user", _descriptor2, this);
    }
    get viewingSelf() {
      return this.user.viewingSelf;
    }
    get showWarningsWarning() {
      return this.router.currentRoute.name === "userPrivateMessages.user.warnings" && !this.viewingSelf && !this.currentUser.isAdmin;
    }
    get newLinkText() {
      return _classPrivateMethodGet(this, _linkText, _linkText2).call(this, "new");
    }
    get unreadLinkText() {
      return _classPrivateMethodGet(this, _linkText, _linkText2).call(this, "unread");
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "user", [_controller.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "showWarningsWarning", [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, "showWarningsWarning"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "newLinkText", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "newLinkText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unreadLinkText", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "unreadLinkText"), _class2.prototype)), _class2));
  _exports.default = _class;
  function _linkText2(type) {
    const count = this.pmTopicTrackingState?.lookupCount(type, {
      inboxFilter: "user"
    });
    if (count === 0) {
      return _I18n.default.t(`user.messages.${type}`);
    } else {
      return _I18n.default.t(`user.messages.${type}_with_count`, {
        count
      });
    }
  }
});