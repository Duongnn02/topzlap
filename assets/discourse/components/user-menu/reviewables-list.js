define("discourse/components/user-menu/reviewables-list", ["exports", "discourse/components/user-menu/items-list", "discourse/lib/ajax", "discourse/models/user-menu-reviewable", "I18n", "discourse-common/lib/get-url", "discourse/lib/user-menu/reviewable-item", "@ember/service"], function (_exports, _itemsList, _ajax, _userMenuReviewable, _I18n, _getUrl, _reviewableItem, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/user-menu/items-list",0,"discourse/lib/ajax",0,"discourse/models/user-menu-reviewable",0,"I18n",0,"discourse-common/lib/get-url",0,"discourse/lib/user-menu/reviewable-item",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let UserMenuReviewablesList = (_class = class UserMenuReviewablesList extends _itemsList.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor2, this);
      _initializerDefineProperty(this, "site", _descriptor3, this);
    }
    get showAllHref() {
      return (0, _getUrl.default)("/review");
    }
    get showAllTitle() {
      return _I18n.default.t("user_menu.reviewable.view_all");
    }
    get itemsCacheKey() {
      return "pending-reviewables";
    }
    fetchItems() {
      return (0, _ajax.ajax)("/review/user-menu-list").then(data => {
        this.currentUser.updateReviewableCount(data.reviewable_count);
        return data.reviewables.map(item => {
          return new _reviewableItem.default({
            reviewable: _userMenuReviewable.default.create(item),
            currentUser: this.currentUser,
            siteSettings: this.siteSettings,
            site: this.site
          });
        });
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = UserMenuReviewablesList;
});