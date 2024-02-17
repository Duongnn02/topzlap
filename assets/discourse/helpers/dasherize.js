define("discourse/helpers/dasherize", ["exports", "@ember/component/helper", "@ember/string"], function (_exports, _helper, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"@ember/string"eaimeta@70e063a35619d71f
  function dasherize(_ref) {
    let [value] = _ref;
    return (0, _string.dasherize)((value || "").replace(".", "-"));
  }
  var _default = _helper.default.helper(dasherize);
  _exports.default = _default;
});