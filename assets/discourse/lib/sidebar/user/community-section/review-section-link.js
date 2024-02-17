define("discourse/lib/sidebar/user/community-section/review-section-link", ["exports", "I18n", "@glimmer/tracking", "discourse-common/utils/decorators", "discourse/lib/sidebar/base-community-section-link"], function (_exports, _I18n, _tracking, _decorators, _baseCommunitySectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@glimmer/tracking",0,"discourse-common/utils/decorators",0,"discourse/lib/sidebar/base-community-section-link"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let ReviewSectionLink = (_class = class ReviewSectionLink extends _baseCommunitySectionLink.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "canDisplay", _descriptor, this);
      this._refreshCanDisplay();
      this.appEvents.on("user-reviewable-count:changed", this._refreshCanDisplay);
    }
    teardown() {
      this.appEvents.off("user-reviewable-count:changed", this._refreshCanDisplay);
    }
    _refreshCanDisplay() {
      if (!this.currentUser.can_review) {
        this.canDisplay = false;
        return;
      }
      if (this.inMoreDrawer) {
        this.canDisplay = this.currentUser.reviewable_count < 1;
      } else {
        this.canDisplay = this.currentUser.reviewable_count > 0;
      }
    }
    get name() {
      return "review";
    }
    get route() {
      return "review";
    }
    get title() {
      return _I18n.default.t("sidebar.sections.community.links.review.title");
    }
    get text() {
      return _I18n.default.t("sidebar.sections.community.links.review.content");
    }
    get shouldDisplay() {
      return this.canDisplay;
    }
    get badgeText() {
      // force a tracker for reviewable_count by using .get to ensure badgeText
      // rerenders when reviewable_count changes
      if (this.currentUser.get("reviewable_count") > 0) {
        return _I18n.default.t("sidebar.sections.community.links.review.pending_count", {
          count: this.currentUser.reviewable_count
        });
      }
    }
    get prefixValue() {
      return "flag";
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "canDisplay", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "_refreshCanDisplay", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_refreshCanDisplay"), _class.prototype)), _class);
  _exports.default = ReviewSectionLink;
});