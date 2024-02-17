define("discourse/controllers/preferences/sidebar", ["exports", "@ember/controller", "@ember/object", "@glimmer/tracking", "I18n", "discourse/lib/ajax-error"], function (_exports, _controller, _object, _tracking, _I18n, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.UNREAD_LIST_DESTINATION = _exports.DEFAULT_LIST_DESTINATION = void 0;
  var _class2, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@glimmer/tracking",0,"I18n",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const DEFAULT_LIST_DESTINATION = "default";
  _exports.DEFAULT_LIST_DESTINATION = DEFAULT_LIST_DESTINATION;
  const UNREAD_LIST_DESTINATION = "unread_new";
  _exports.UNREAD_LIST_DESTINATION = UNREAD_LIST_DESTINATION;
  let _class = (_class2 = class _class2 extends _controller.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "saved", _descriptor, this);
      _initializerDefineProperty(this, "selectedSidebarCategories", _descriptor2, this);
      _initializerDefineProperty(this, "selectedSidebarTagNames", _descriptor3, this);
      _defineProperty(this, "subpageTitle", _I18n.default.t("user.preferences_nav.sidebar"));
      _defineProperty(this, "saveAttrNames", ["sidebar_category_ids", "sidebar_tag_names", "sidebar_list_destination"]);
      _defineProperty(this, "sidebarListDestinations", [{
        name: _I18n.default.t("user.experimental_sidebar.list_destination_default"),
        value: DEFAULT_LIST_DESTINATION
      }, {
        name: _I18n.default.t("user.experimental_sidebar.list_destination_unread_new"),
        value: UNREAD_LIST_DESTINATION
      }]);
    }
    save() {
      const initialSidebarCategoryIds = this.model.sidebarCategoryIds;
      const initialSidebarListDestination = this.model.sidebar_list_destination;
      this.model.set("sidebarCategoryIds", this.selectedSidebarCategories.mapBy("id"));
      this.model.set("sidebar_tag_names", this.selectedSidebarTagNames);
      this.model.set("user_option.sidebar_list_destination", this.newSidebarListDestination);
      this.model.save(this.saveAttrNames).then(result => {
        if (result.user.sidebar_tags) {
          this.model.set("sidebar_tags", result.user.sidebar_tags);
        }
        this.model.set("sidebar_list_destination", this.newSidebarListDestination);
        this.saved = true;
      }).catch(error => {
        this.model.set("sidebarCategoryIds", initialSidebarCategoryIds);
        (0, _ajaxError.popupAjaxError)(error);
      }).finally(() => {
        this.model.set("sidebar_tag_names", []);
        if (initialSidebarListDestination !== this.newSidebarListDestination) {
          window.location.reload();
        }
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "saved", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "selectedSidebarCategories", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "selectedSidebarTagNames", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "save", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "save"), _class2.prototype)), _class2);
  _exports.default = _class;
});