define("discourse/lib/sidebar/user/community-section/my-posts-section-link", ["exports", "I18n", "@glimmer/tracking", "discourse/lib/sidebar/base-community-section-link", "discourse/controllers/preferences/sidebar"], function (_exports, _I18n, _tracking, _baseCommunitySectionLink, _sidebar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@glimmer/tracking",0,"discourse/lib/sidebar/base-community-section-link",0,"discourse/controllers/preferences/sidebar"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const USER_DRAFTS_CHANGED_EVENT = "user-drafts:changed";
  let MyPostsSectionLink = (_class = class MyPostsSectionLink extends _baseCommunitySectionLink.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "draftCount", _descriptor, this);
      _initializerDefineProperty(this, "hideCount", _descriptor2, this);
      this.appEvents.on(USER_DRAFTS_CHANGED_EVENT, this, this._updateDraftCount);
    }
    teardown() {
      this.appEvents.off(USER_DRAFTS_CHANGED_EVENT, this, this._updateDraftCount);
    }
    _updateDraftCount() {
      this.draftCount = this.currentUser.draft_count;
    }
    get name() {
      return "my-posts";
    }
    get route() {
      if (this._hasDraft) {
        return "userActivity.drafts";
      } else {
        return "userActivity.index";
      }
    }
    get currentWhen() {
      if (this._hasDraft) {
        return "userActivity.index userActivity.drafts";
      }
    }
    get model() {
      return this.currentUser;
    }
    get title() {
      if (this._hasDraft) {
        return _I18n.default.t("sidebar.sections.community.links.my_posts.title_drafts");
      } else {
        return _I18n.default.t("sidebar.sections.community.links.my_posts.title");
      }
    }
    get text() {
      if (this._hasDraft && this.currentUser?.new_new_view_enabled) {
        return _I18n.default.t("sidebar.sections.community.links.my_posts.content_drafts");
      } else {
        return _I18n.default.t("sidebar.sections.community.links.my_posts.content");
      }
    }
    get badgeText() {
      if (this._hasDraft && this.currentUser?.new_new_view_enabled) {
        return this.draftCount.toString();
      }
      if (this._hasDraft && !this.hideCount) {
        return _I18n.default.t("sidebar.sections.community.links.my_posts.draft_count", {
          count: this.draftCount
        });
      }
    }
    get _hasDraft() {
      return this.draftCount > 0;
    }
    get prefixValue() {
      if (this._hasDraft && this.currentUser?.new_new_view_enabled) {
        return "pencil-alt";
      }
      return "user";
    }
    get suffixCSSClass() {
      return "unread";
    }
    get suffixType() {
      return "icon";
    }
    get suffixValue() {
      if (this._hasDraft && this.hideCount) {
        return "circle";
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "draftCount", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.currentUser.draft_count;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "hideCount", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.currentUser?.sidebarListDestination !== _sidebar.UNREAD_LIST_DESTINATION;
    }
  })), _class);
  _exports.default = MyPostsSectionLink;
});