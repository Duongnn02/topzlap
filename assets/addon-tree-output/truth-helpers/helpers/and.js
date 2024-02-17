define("truth-helpers/helpers/and", ["exports", "@ember/component/helper", "truth-helpers/utils/truth-convert"], function (_exports, _helper, _truthConvert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.and = and;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"truth-helpers/utils/truth-convert"eaimeta@70e063a35619d71f
  function and(params) {
    for (let i = 0, len = params.length; i < len; i++) {
      if ((0, _truthConvert.default)(params[i]) === false) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
  var _default = _helper.default.helper(and);
  _exports.default = _default;
});