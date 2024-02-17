define("select-kit/components/category-drop", ["exports", "discourse/models/category", "select-kit/components/combo-box", "discourse/lib/url", "I18n", "discourse/helpers/category-link", "@ember/object", "@ember/object/computed", "@ember/template"], function (_exports, _category, _comboBox, _url, _I18n, _categoryLink, _object, _computed, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.NO_CATEGORIES_ID = _exports.ALL_CATEGORIES_ID = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"select-kit/components/combo-box",0,"discourse/lib/url",0,"I18n",0,"discourse/helpers/category-link",0,"@ember/object",0,"@ember/object/computed",0,"@ember/template"eaimeta@70e063a35619d71f
  const NO_CATEGORIES_ID = "no-categories";
  _exports.NO_CATEGORIES_ID = NO_CATEGORIES_ID;
  const ALL_CATEGORIES_ID = "all-categories";
  _exports.ALL_CATEGORIES_ID = ALL_CATEGORIES_ID;
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["category-drop"],
    classNameBindings: ["categoryStyle"],
    classNames: ["category-drop"],
    value: (0, _computed.readOnly)("category.id"),
    content: (0, _computed.readOnly)("categoriesWithShortcuts.[]"),
    categoryStyle: (0, _computed.readOnly)("siteSettings.category_style"),
    noCategoriesLabel: _I18n.default.t("categories.no_subcategory"),
    navigateToEdit: false,
    editingCategory: false,
    editingCategoryTab: null,
    selectKitOptions: {
      filterable: true,
      none: "category.all",
      caretDownIcon: "caret-right",
      caretUpIcon: "caret-down",
      fullWidthOnMobile: true,
      noSubcategories: false,
      subCategory: false,
      clearable: false,
      hideParentCategory: "hideParentCategory",
      countSubcategories: false,
      autoInsertNoneItem: false,
      displayCategoryDescription: "displayCategoryDescription",
      headerComponent: "category-drop/category-drop-header",
      parentCategory: false
    },
    modifyComponentForRow() {
      return "category-row";
    },
    displayCategoryDescription: (0, _object.computed)(function () {
      return !(this.get("currentUser.staff") || this.get("currentUser.trust_level") > 0);
    }),
    hideParentCategory: (0, _object.computed)(function () {
      return this.options.subCategory || false;
    }),
    categoriesWithShortcuts: (0, _object.computed)("categories.[]", "value", "selectKit.options.{subCategory,noSubcategories}", function () {
      const shortcuts = [];
      if (this.value && !this.editingCategory || this.selectKit.options.noSubcategories && this.selectKit.options.subCategory) {
        shortcuts.push({
          id: ALL_CATEGORIES_ID,
          name: this.allCategoriesLabel
        });
      }
      if (this.selectKit.options.subCategory && (this.value || !this.selectKit.options.noSubcategories)) {
        shortcuts.push({
          id: NO_CATEGORIES_ID,
          name: this.noCategoriesLabel
        });
      }
      const results = this._filterUncategorized(this.categories || []);
      return shortcuts.concat(results);
    }),
    modifyNoSelection() {
      if (this.selectKit.options.noSubcategories) {
        return this.defaultItem(NO_CATEGORIES_ID, this.noCategoriesLabel);
      } else {
        return this.defaultItem(ALL_CATEGORIES_ID, this.allCategoriesLabel);
      }
    },
    modifySelection(content) {
      if (this.value) {
        const category = _category.default.findById(this.value);
        content.title = category.title;
        content.label = (0, _template.htmlSafe)((0, _categoryLink.categoryBadgeHTML)(category, {
          link: false,
          allowUncategorized: true,
          hideParent: true
        }));
      }
      return content;
    },
    parentCategoryName: (0, _computed.readOnly)("selectKit.options.parentCategory.name"),
    allCategoriesLabel: (0, _object.computed)("parentCategoryName", "selectKit.options.subCategory", function () {
      if (this.editingCategory) {
        return this.noCategoriesLabel;
      }
      if (this.selectKit.options.subCategory) {
        return _I18n.default.t("categories.all_subcategories", {
          categoryName: this.parentCategoryName
        });
      }
      return _I18n.default.t("categories.all");
    }),
    search(filter) {
      if (filter) {
        let opts = {
          parentCategoryId: this.options.parentCategory?.id
        };
        let results = _category.default.search(filter, opts);
        results = this._filterUncategorized(results).sort((a, b) => {
          if (a.parent_category_id && !b.parent_category_id) {
            return 1;
          } else if (!a.parent_category_id && b.parent_category_id) {
            return -1;
          } else {
            return 0;
          }
        });
        return results;
      } else {
        return this._filterUncategorized(this.content);
      }
    },
    actions: {
      onChange(categoryId) {
        const category = categoryId === ALL_CATEGORIES_ID || categoryId === NO_CATEGORIES_ID ? this.selectKit.options.parentCategory : _category.default.findById(parseInt(categoryId, 10));
        const route = this.editingCategory ? (0, _url.getEditCategoryUrl)(category, categoryId !== NO_CATEGORIES_ID, this.editingCategoryTab) : (0, _url.getCategoryAndTagUrl)(category, categoryId !== NO_CATEGORIES_ID, this.tagId);
        _url.default.routeToUrl(route);
      }
    },
    _filterUncategorized(content) {
      if (!this.siteSettings.allow_uncategorized_topics) {
        content = content.filter(c => c.id !== this.site.uncategorized_category_id);
      }
      return content;
    }
  });
  _exports.default = _default;
});