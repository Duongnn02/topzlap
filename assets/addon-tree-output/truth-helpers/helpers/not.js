define("truth-helpers/helpers/not", ["exports", "@ember/component/helper", "truth-helpers/utils/truth-convert"], function (_exports, _helper, _truthConvert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.not = not;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"truth-helpers/utils/truth-convert"eaimeta@70e063a35619d71f
  function not(params) {
    for (let i = 0, len = params.length; i < len; i++) {
      if ((0, _truthConvert.default)(params[i]) === true) {
        return false;
      }
    }
    return true;
  }
  var _default = _helper.default.helper(not);
  _exports.default = _default;
});