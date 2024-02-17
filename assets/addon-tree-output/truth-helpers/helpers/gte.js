define("truth-helpers/helpers/gte", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.gte = gte;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  function gte(_ref, hash) {
    let [left, right] = _ref;
    if (hash.forceNumber) {
      if (typeof left !== "number") {
        left = Number(left);
      }
      if (typeof right !== "number") {
        right = Number(right);
      }
    }
    return left >= right;
  }
  var _default = _helper.default.helper(gte);
  _exports.default = _default;
});