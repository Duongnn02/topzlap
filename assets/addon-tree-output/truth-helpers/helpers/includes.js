define("truth-helpers/helpers/includes", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.includes = includes;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  function includes(params) {
    return params[0].includes(params[1]);
  }
  var _default = _helper.default.helper(includes);
  _exports.default = _default;
});