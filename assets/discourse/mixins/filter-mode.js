define("discourse/mixins/filter-mode", ["exports", "discourse/models/category", "@ember/object/mixin", "@ember/object"], function (_exports, _category, _mixin, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"@ember/object/mixin",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _mixin.default.create({
    filterModeInternal: (0, _object.computed)("rawFilterMode", "filterType", "category", "noSubcategories", function () {
      const rawFilterMode = this.rawFilterMode;
      if (rawFilterMode) {
        return rawFilterMode;
      } else {
        const category = this.category;
        const filterType = this.filterType;
        if (category) {
          const noSubcategories = this.noSubcategories;
          return `c/${_category.default.slugFor(category)}${noSubcategories ? "/none" : ""}/l/${filterType}`;
        } else {
          return filterType;
        }
      }
    }),
    filterMode: (0, _object.computed)("filterModeInternal", {
      get() {
        return this.filterModeInternal;
      },
      set(key, value) {
        this.set("rawFilterMode", value);
        this.set("filterType", value.split("/").pop());
        return value;
      }
    })
  });
  _exports.default = _default;
});