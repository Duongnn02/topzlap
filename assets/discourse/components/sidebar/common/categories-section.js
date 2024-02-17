define("discourse/components/sidebar/common/categories-section", ["exports", "@embroider/macros/es-compat", "@glimmer/component", "@glimmer/tracking", "@ember/service", "discourse/models/category", "discourse/lib/sidebar/user/categories-section/category-section-link", "discourse/lib/sidebar/helpers"], function (_exports, _esCompat, _component, _tracking, _service, _category, _categorySectionLink, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/service",0,"discourse/models/category",0,"discourse/lib/sidebar/user/categories-section/category-section-link",0,"discourse/lib/sidebar/helpers",0,"ember-cached-decorator-polyfill"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let cached = (0, _esCompat.default)(require("ember-cached-decorator-polyfill")).cached;
  let SidebarCommonCategoriesSection = (_class = class SidebarCommonCategoriesSection extends _component.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "topicTrackingState", _descriptor, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor2, this);
      _initializerDefineProperty(this, "site", _descriptor3, this);
      _defineProperty(this, "shouldSortCategoriesByDefault", true);
    }
    /**
     * Override in child
     *
     * @returns {Object[]} An array of Category objects
     */
    get categories() {}
    get sortedCategories() {
      if (!this.shouldSortCategoriesByDefault) {
        return this.categories;
      }
      let categories = this.site.categories;
      if (!this.siteSettings.fixed_category_positions) {
        categories = categories.sort((a, b) => a.name.localeCompare(b.name));
      }
      const categoryIds = this.categories.map(category => category.id);
      return _category.default.sortCategories(categories).reduce((filteredCategories, category) => {
        if (categoryIds.includes(category.id) && (0, _helpers.canDisplayCategory)(category.id, this.siteSettings)) {
          filteredCategories.push(category);
        }
        return filteredCategories;
      }, []);
    }
    get sectionLinks() {
      return this.sortedCategories.map(category => {
        return new _categorySectionLink.default({
          category,
          topicTrackingState: this.topicTrackingState,
          currentUser: this.currentUser
        });
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "topicTrackingState", [_service.inject], {
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
  }), _applyDecoratedDescriptor(_class.prototype, "sectionLinks", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "sectionLinks"), _class.prototype)), _class);
  _exports.default = SidebarCommonCategoriesSection;
});