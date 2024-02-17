define("select-kit/components/categories-admin-dropdown", ["exports", "select-kit/components/dropdown-select-box", "I18n", "@ember/object", "discourse/lib/computed"], function (_exports, _dropdownSelectBox, _I18n, _object, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/object",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    pluginApiIdentifiers: ["categories-admin-dropdown"],
    classNames: ["categories-admin-dropdown"],
    fixedCategoryPositions: (0, _computed.setting)("fixed_category_positions"),
    selectKitOptions: {
      icons: ["wrench", "caret-down"],
      showFullTitle: false,
      autoFilterable: false,
      filterable: false,
      none: "select_kit.components.categories_admin_dropdown.title"
    },
    content: (0, _object.computed)(function () {
      const items = [{
        id: "create",
        name: _I18n.default.t("category.create"),
        description: _I18n.default.t("category.create_long"),
        icon: "plus"
      }];
      if (this.fixedCategoryPositions) {
        items.push({
          id: "reorder",
          name: _I18n.default.t("categories.reorder.title"),
          description: _I18n.default.t("categories.reorder.title_long"),
          icon: "random"
        });
      }
      return items;
    }),
    _onChange(value, item) {
      if (item.onChange) {
        item.onChange(value, item);
      } else if (this.attrs.onChange) {
        this.attrs.onChange(value, item);
      }
    }
  });
  _exports.default = _default;
});