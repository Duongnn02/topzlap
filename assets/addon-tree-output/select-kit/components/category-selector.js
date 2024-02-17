define("select-kit/components/category-selector", ["exports", "@ember/object", "discourse/models/category", "I18n", "select-kit/components/multi-select", "discourse/helpers/category-link", "discourse-common/lib/helpers", "@ember/object/computed", "@ember/template"], function (_exports, _object, _category, _I18n, _multiSelect, _categoryLink, _helpers, _computed, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/models/category",0,"I18n",0,"select-kit/components/multi-select",0,"discourse/helpers/category-link",0,"discourse-common/lib/helpers",0,"@ember/object/computed",0,"@ember/template"eaimeta@70e063a35619d71f
  var _default = _multiSelect.default.extend({
    pluginApiIdentifiers: ["category-selector"],
    classNames: ["category-selector"],
    categories: null,
    blockedCategories: null,
    selectKitOptions: {
      filterable: true,
      allowAny: false,
      allowUncategorized: true,
      displayCategoryDescription: false,
      selectedChoiceComponent: "selected-choice-category"
    },
    init() {
      this._super(...arguments);
      if (!this.categories) {
        this.set("categories", []);
      }
      if (!this.blockedCategories) {
        this.set("blockedCategories", []);
      }
    },
    content: (0, _object.computed)("categories.[]", "blockedCategories.[]", function () {
      const blockedCategories = (0, _helpers.makeArray)(this.blockedCategories);
      return _category.default.list().filter(category => {
        if (category.isUncategorizedCategory) {
          if (this.attrs.options?.allowUncategorized !== undefined) {
            return this.attrs.options.allowUncategorized;
          }
          return this.selectKit.options.allowUncategorized;
        }
        return this.categories.includes(category) || !blockedCategories.includes(category);
      });
    }),
    value: (0, _computed.mapBy)("categories", "id"),
    modifyComponentForRow() {
      return "category-row";
    },
    search(filter) {
      const result = this._super(filter);
      if (result.length === 1) {
        const subcategoryIds = new Set([result[0].id]);
        for (let i = 0; i < this.siteSettings.max_category_nesting; ++i) {
          subcategoryIds.forEach(categoryId => {
            this.content.forEach(category => {
              if (category.parent_category_id === categoryId) {
                subcategoryIds.add(category.id);
              }
            });
          });
        }
        if (subcategoryIds.size > 1) {
          result.push(_object.default.create({
            multiCategory: [...subcategoryIds],
            category: result[0],
            title: _I18n.default.t("category_row.plus_subcategories_title", {
              name: result[0].name,
              count: subcategoryIds.size - 1
            }),
            label: (0, _template.htmlSafe)((0, _categoryLink.categoryBadgeHTML)(result[0], {
              link: false,
              recursive: true,
              plusSubcategories: subcategoryIds.size - 1
            }))
          }));
        }
      }
      return result;
    },
    select(value, item) {
      if (item.multiCategory) {
        const items = item.multiCategory.map(id => _category.default.findById(parseInt(id, 10)));
        const newValues = (0, _helpers.makeArray)(this.value).concat(items.map(i => i.id));
        const newContent = (0, _helpers.makeArray)(this.selectedContent).concat(items);
        this.selectKit.change(newValues, newContent);
      } else {
        this._super(value, item);
      }
    },
    actions: {
      onChange(values) {
        this.attrs.onChange(values.map(v => _category.default.findById(v)).filter(Boolean));
        return false;
      }
    }
  });
  _exports.default = _default;
});