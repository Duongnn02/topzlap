define("discourse/helpers/editable-value", ["exports", "@ember/component/helper", "@ember/object"], function (_exports, _helper, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.formatCurrency = formatCurrency;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"@ember/object"eaimeta@70e063a35619d71f
  function formatCurrency(_ref) {
    let [reviewable, fieldId] = _ref;
    // The field `category_id` corresponds to `category`
    if (fieldId === "category_id") {
      fieldId = "category.id";
    }
    let value = (0, _object.get)(reviewable, fieldId);

    // If it's an array, say tags, make a copy so we aren't mutating the original
    if (Array.isArray(value)) {
      value = value.slice(0);
    }
    return value;
  }
  var _default = _helper.default.helper(formatCurrency);
  _exports.default = _default;
});