define("discourse/controllers/navigation/category", ["exports", "@ember/object/computed", "discourse/mixins/filter-mode", "discourse/controllers/navigation/default"], function (_exports, _computed, _filterMode, _default2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse/mixins/filter-mode",0,"discourse/controllers/navigation/default"eaimeta@70e063a35619d71f
  var _default = _default2.default.extend(_filterMode.default, {
    showingParentCategory: (0, _computed.none)("category.parentCategory"),
    showingSubcategoryList: (0, _computed.and)("category.show_subcategory_list", "showingParentCategory")
  });
  _exports.default = _default;
});