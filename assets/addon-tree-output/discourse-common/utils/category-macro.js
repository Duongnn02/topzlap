define("discourse-common/utils/category-macro", ["exports", "discourse/models/category", "@ember/object"], function (_exports, _category, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = categoryFromId;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"@ember/object"eaimeta@70e063a35619d71f
  function categoryFromId(property) {
    return (0, _object.computed)(property, function () {
      return _category.default.findById((0, _object.get)(this, property));
    });
  }
});