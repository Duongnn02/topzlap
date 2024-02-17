define("select-kit/components/category-chooser", ["exports", "@ember/object", "discourse/models/category", "select-kit/components/combo-box", "I18n", "discourse/models/permission-type", "discourse/helpers/category-link", "@ember/utils", "discourse/lib/computed", "@ember/template"], function (_exports, _object, _category, _comboBox, _I18n, _permissionType, _categoryLink, _utils, _computed, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/models/category",0,"select-kit/components/combo-box",0,"I18n",0,"discourse/models/permission-type",0,"discourse/helpers/category-link",0,"@ember/utils",0,"discourse/lib/computed",0,"@ember/template"eaimeta@70e063a35619d71f
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["category-chooser"],
    classNames: ["category-chooser"],
    allowUncategorizedTopics: (0, _computed.setting)("allow_uncategorized_topics"),
    fixedCategoryPositionsOnCreate: (0, _computed.setting)("fixed_category_positions_on_create"),
    selectKitOptions: {
      filterable: true,
      allowUncategorized: false,
      allowSubCategories: true,
      permissionType: _permissionType.default.FULL,
      excludeCategoryId: null,
      scopedCategoryId: null,
      prioritizedCategoryId: null
    },
    modifyComponentForRow() {
      return "category-row";
    },
    modifyNoSelection() {
      if (!(0, _utils.isNone)(this.selectKit.options.none)) {
        const none = this.selectKit.options.none;
        const isString = typeof none === "string";
        return this.defaultItem(null, (0, _template.htmlSafe)(_I18n.default.t(isString ? this.selectKit.options.none : "category.none")));
      } else if (this.allowUncategorizedTopics || this.selectKit.options.allowUncategorized) {
        return _category.default.findUncategorized();
      } else {
        const defaultCategoryId = parseInt(this.siteSettings.default_composer_category, 10);
        if (!defaultCategoryId || defaultCategoryId < 0) {
          return this.defaultItem(null, (0, _template.htmlSafe)(_I18n.default.t("category.choose")));
        }
      }
    },
    modifySelection(content) {
      if (this.selectKit.hasSelection) {
        const category = _category.default.findById(this.value);
        (0, _object.set)(content, "label", (0, _template.htmlSafe)((0, _categoryLink.categoryBadgeHTML)(category, {
          link: false,
          hideParent: category ? !!category.parent_category_id : true,
          allowUncategorized: true,
          recursive: true
        })));
      }
      return content;
    },
    search(filter) {
      if (filter) {
        filter = this._normalize(filter);
        return this.content.filter(item => {
          const category = _category.default.findById(this.getValue(item));
          const categoryName = this.getName(item);
          if (category && category.parentCategory) {
            const parentCategoryName = this.getName(category.parentCategory);
            return this._matchCategory(filter, categoryName) || this._matchCategory(filter, parentCategoryName);
          } else {
            return this._matchCategory(filter, categoryName);
          }
        });
      } else {
        return this.content;
      }
    },
    content: (0, _object.computed)("selectKit.filter", "selectKit.options.scopedCategoryId", "selectKit.options.prioritizedCategoryId", function () {
      if (!this.selectKit.filter) {
        let {
          scopedCategoryId,
          prioritizedCategoryId
        } = this.selectKit.options;
        if (scopedCategoryId) {
          return this.categoriesByScope({
            scopedCategoryId
          });
        }
        if (prioritizedCategoryId) {
          return this.categoriesByScope({
            prioritizedCategoryId
          });
        }
      }
      return this.categoriesByScope();
    }),
    categoriesByScope() {
      let {
        scopedCategoryId = null,
        prioritizedCategoryId = null
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const categories = this.fixedCategoryPositionsOnCreate ? _category.default.list() : _category.default.listByActivity();
      if (scopedCategoryId) {
        const scopedCat = _category.default.findById(scopedCategoryId);
        scopedCategoryId = scopedCat.parent_category_id || scopedCat.id;
      }
      if (prioritizedCategoryId) {
        const category = _category.default.findById(prioritizedCategoryId);
        prioritizedCategoryId = category.parent_category_id || category.id;
      }
      const excludeCategoryId = this.selectKit.options.excludeCategoryId;
      let scopedCategories = categories.filter(category => {
        const categoryId = this.getValue(category);
        if (scopedCategoryId && categoryId !== scopedCategoryId && category.parent_category_id !== scopedCategoryId) {
          return false;
        }
        if (this.selectKit.options.allowSubCategories === false && category.parentCategory) {
          return false;
        }
        if (this.selectKit.options.allowUncategorized === false && category.isUncategorizedCategory || excludeCategoryId === categoryId) {
          return false;
        }
        const permissionType = this.selectKit.options.permissionType;
        if (permissionType && !this.allowRestrictedCategories) {
          return permissionType === category.permission;
        }
        return true;
      });
      if (prioritizedCategoryId) {
        let prioritized = [];
        let other = [];
        for (let category of scopedCategories) {
          const categoryId = this.getValue(category);
          if (categoryId === prioritizedCategoryId || category.parent_category_id === prioritizedCategoryId) {
            prioritized.push(category);
          } else {
            other.push(category);
          }
        }
        return prioritized.concat(other);
      } else {
        return scopedCategories;
      }
    },
    _matchCategory(filter, categoryName) {
      return this._normalize(categoryName).includes(filter);
    }
  });
  _exports.default = _default;
});