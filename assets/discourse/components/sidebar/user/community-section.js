define("discourse/components/sidebar/user/community-section", ["exports", "I18n", "discourse/models/composer", "discourse-common/lib/get-owner", "discourse/models/permission-type", "discourse/lib/sidebar/common/community-section/everything-section-link", "discourse/lib/sidebar/user/community-section/my-posts-section-link", "discourse/lib/sidebar/common/community-section/groups-section-link", "discourse/lib/sidebar/common/community-section/users-section-link", "discourse/lib/sidebar/common/community-section/about-section-link", "discourse/lib/sidebar/common/community-section/faq-section-link", "discourse/lib/sidebar/user/community-section/admin-section-link", "discourse/lib/sidebar/common/community-section/badges-section-link", "discourse/lib/sidebar/user/community-section/review-section-link", "discourse/components/sidebar/common/community-section", "@ember/object", "@ember/runloop", "@ember/service"], function (_exports, _I18n, _composer, _getOwner, _permissionType, _everythingSectionLink, _myPostsSectionLink, _groupsSectionLink, _usersSectionLink, _aboutSectionLink, _faqSectionLink, _adminSectionLink, _badgesSectionLink, _reviewSectionLink, _communitySection, _object, _runloop, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/models/composer",0,"discourse-common/lib/get-owner",0,"discourse/models/permission-type",0,"discourse/lib/sidebar/common/community-section/everything-section-link",0,"discourse/lib/sidebar/user/community-section/my-posts-section-link",0,"discourse/lib/sidebar/common/community-section/groups-section-link",0,"discourse/lib/sidebar/common/community-section/users-section-link",0,"discourse/lib/sidebar/common/community-section/about-section-link",0,"discourse/lib/sidebar/common/community-section/faq-section-link",0,"discourse/lib/sidebar/user/community-section/admin-section-link",0,"discourse/lib/sidebar/common/community-section/badges-section-link",0,"discourse/lib/sidebar/user/community-section/review-section-link",0,"discourse/components/sidebar/common/community-section",0,"@ember/object",0,"@ember/runloop",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let SidebarUserCommunitySection = (_class = class SidebarUserCommunitySection extends _communitySection.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "composer", _descriptor, this);
      this.headerActionsIcon = "plus";
      this.headerActions = [{
        action: this.composeTopic,
        title: _I18n.default.t("sidebar.sections.community.header_action_title")
      }];
    }
    get defaultMainSectionLinks() {
      return [_everythingSectionLink.default, _myPostsSectionLink.default, _adminSectionLink.default, _reviewSectionLink.default];
    }
    get defaultMoreSectionLinks() {
      return [_groupsSectionLink.default, _usersSectionLink.default, _badgesSectionLink.default, _reviewSectionLink.default];
    }
    get defaultMoreSecondarySectionLinks() {
      return [_aboutSectionLink.default, _faqSectionLink.default];
    }
    composeTopic() {
      const composerArgs = {
        action: _composer.default.CREATE_TOPIC,
        draftKey: _composer.default.NEW_TOPIC_KEY
      };
      const controller = (0, _getOwner.getOwner)(this).lookup("controller:navigation/category");
      const category = controller.category;
      if (category && category.permission === _permissionType.default.FULL) {
        composerArgs.categoryId = category.id;
      }
      (0, _runloop.next)(() => {
        this.composer.open(composerArgs);
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "composer", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "composeTopic", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "composeTopic"), _class.prototype)), _class);
  _exports.default = SidebarUserCommunitySection;
});