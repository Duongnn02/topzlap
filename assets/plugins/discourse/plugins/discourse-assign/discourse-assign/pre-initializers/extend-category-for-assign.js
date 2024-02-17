define("discourse/plugins/discourse-assign/discourse-assign/pre-initializers/extend-category-for-assign", ["exports", "discourse/models/category", "@ember/object"], function (_exports, _category, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = {
    name: "extend-category-for-assign",
    before: "inject-discourse-objects",
    initialize() {
      _category.default.reopen({
        enable_unassigned_filter: (0, _object.computed)("custom_fields.enable_unassigned_filter", {
          get() {
            return this?.custom_fields?.enable_unassigned_filter === "true";
          }
        })
      });
    }
  };
  _exports.default = _default;
});