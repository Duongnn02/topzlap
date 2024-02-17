define("discourse/plugins/discourse-solved/discourse/pre-initializers/extend-category-for-solved", ["exports", "discourse/models/category", "@ember/object"], function (_exports, _category, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = {
    name: "extend-category-for-solved",
    before: "inject-discourse-objects",
    initialize() {
      _category.default.reopen({
        enable_accepted_answers: (0, _object.computed)("custom_fields.enable_accepted_answers", {
          get(fieldName) {
            return (0, _object.get)(this.custom_fields, fieldName) === "true";
          }
        })
      });
    }
  };
  _exports.default = _default;
});