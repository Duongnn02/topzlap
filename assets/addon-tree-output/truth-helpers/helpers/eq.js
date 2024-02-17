define("truth-helpers/helpers/eq", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.eq = eq;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  function eq(params) {
    return params[0] === params[1];
  }
  var _default = _helper.default.helper(eq);
  _exports.default = _default;
});