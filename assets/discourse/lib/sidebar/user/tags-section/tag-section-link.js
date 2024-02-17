define("discourse/lib/sidebar/user/tags-section/tag-section-link", ["exports", "I18n", "@glimmer/tracking", "discourse-common/utils/decorators", "discourse/lib/sidebar/user/tags-section/base-tag-section-link", "discourse/controllers/preferences/sidebar"], function (_exports, _I18n, _tracking, _decorators, _baseTagSectionLink, _sidebar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _unreadAndNewCount, _linkToNew;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@glimmer/tracking",0,"discourse-common/utils/decorators",0,"discourse/lib/sidebar/user/tags-section/base-tag-section-link",0,"discourse/controllers/preferences/sidebar"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let TagSectionLink = (_class = (_unreadAndNewCount = /*#__PURE__*/new WeakMap(), _linkToNew = /*#__PURE__*/new WeakMap(), class TagSectionLink extends _baseTagSectionLink.default {
    constructor(_ref) {
      let {
        topicTrackingState,
        currentUser
      } = _ref;
      super(...arguments);
      _classPrivateFieldInitSpec(this, _linkToNew, {
        get: _get_linkToNew,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _unreadAndNewCount, {
        get: _get_unreadAndNewCount,
        set: void 0
      });
      _initializerDefineProperty(this, "totalUnread", _descriptor, this);
      _initializerDefineProperty(this, "totalNew", _descriptor2, this);
      _initializerDefineProperty(this, "hideCount", _descriptor3, this);
      this.topicTrackingState = topicTrackingState;
      this.currentUser = currentUser;
      this.refreshCounts();
    }
    refreshCounts() {
      this.totalUnread = this.topicTrackingState.countUnread({
        tagId: this.tagName
      });
      if (this.totalUnread === 0 || _classPrivateFieldGet(this, _linkToNew)) {
        this.totalNew = this.topicTrackingState.countNew({
          tagId: this.tagName
        });
      }
    }
    get models() {
      return [this.tagName];
    }
    get route() {
      if (_classPrivateFieldGet(this, _linkToNew)) {
        if (_classPrivateFieldGet(this, _unreadAndNewCount) > 0) {
          return "tag.showNew";
        } else {
          return "tag.show";
        }
      }
      if (this.currentUser?.sidebarListDestination === _sidebar.UNREAD_LIST_DESTINATION) {
        if (this.totalUnread > 0) {
          return "tag.showUnread";
        }
        if (this.totalNew > 0) {
          return "tag.showNew";
        }
      }
      return "tag.show";
    }
    get currentWhen() {
      return "tag.show tag.showNew tag.showUnread tag.showTop";
    }
    get badgeText() {
      if (_classPrivateFieldGet(this, _linkToNew)) {
        if (_classPrivateFieldGet(this, _unreadAndNewCount) > 0) {
          return _classPrivateFieldGet(this, _unreadAndNewCount).toString();
        }
        return;
      }
      if (this.hideCount) {
        return;
      }
      if (this.totalUnread > 0) {
        return _I18n.default.t("sidebar.unread_count", {
          count: this.totalUnread
        });
      } else if (this.totalNew > 0) {
        return _I18n.default.t("sidebar.new_count", {
          count: this.totalNew
        });
      }
    }
    get suffixCSSClass() {
      return "unread";
    }
    get suffixType() {
      return "icon";
    }
    get suffixValue() {
      if (this.hideCount && (this.totalUnread || this.totalNew) && !_classPrivateFieldGet(this, _linkToNew)) {
        return "circle";
      }
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "totalUnread", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "totalNew", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "hideCount", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.currentUser?.sidebarListDestination !== _sidebar.UNREAD_LIST_DESTINATION;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "refreshCounts", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "refreshCounts"), _class.prototype)), _class);
  _exports.default = TagSectionLink;
  function _get_unreadAndNewCount() {
    return this.totalUnread + this.totalNew;
  }
  function _get_linkToNew() {
    return !!this.currentUser?.new_new_view_enabled;
  }
});