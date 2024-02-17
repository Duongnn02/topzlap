define("discourse/lib/sidebar/user/messages-section/message-section-link", ["exports", "@glimmer/tracking", "discourse/components/sidebar/user/messages-section"], function (_exports, _tracking, _messagesSection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/tracking",0,"discourse/components/sidebar/user/messages-section"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let MessageSectionLink = (_class = class MessageSectionLink {
    constructor(_ref) {
      let {
        group,
        currentUser,
        type,
        pmTopicTrackingState
      } = _ref;
      _initializerDefineProperty(this, "shouldDisplay", _descriptor, this);
      _initializerDefineProperty(this, "count", _descriptor2, this);
      this.group = group;
      this.currentUser = currentUser;
      this.type = type;
      this.pmTopicTrackingState = pmTopicTrackingState;
    }
    refreshCount() {
      this._refreshCount();
    }
    _refreshCount() {
      if (this.shouldDisplay && this._shouldTrack) {
        this.count = this.pmTopicTrackingState.lookupCount(this.type, {
          inboxFilter: this.group ? "group" : "user",
          groupName: this.group?.name
        });
      }
    }
    set setDisplayState(value) {
      const changed = this.shouldDisplay !== value;
      this.shouldDisplay = value;
      if (changed) {
        this._refreshCount();
      }
    }
    get inboxFilter() {
      throw "not implemented";
    }
    expand() {
      if (this._isInbox) {
        return;
      }
      this.setDisplayState = true;
    }
    collapse() {
      if (this._isInbox) {
        return;
      }
      this.setDisplayState = false;
    }

    // eslint-disable-next-line no-unused-vars
    pageChanged(_ref2) {
      let {
        currentRouteName,
        currentRouteParams,
        privateMessageTopic
      } = _ref2;
      throw "not implemented";
    }
    get _isInbox() {
      return this.type === _messagesSection.INBOX;
    }
    get _shouldTrack() {
      return this.type === _messagesSection.NEW || this.type === _messagesSection.UNREAD;
    }
    get prefixType() {
      if (this._isInbox) {
        return "icon";
      }
    }
    get prefixValue() {
      if (this._isInbox) {
        return "inbox";
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "shouldDisplay", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this._isInbox;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "count", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  })), _class);
  _exports.default = MessageSectionLink;
});