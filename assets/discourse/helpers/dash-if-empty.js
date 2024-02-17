define("discourse/helpers/dash-if-empty", ["exports", "discourse-common/lib/helpers", "@ember/utils"], function (_exports, _helpers, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"@ember/utils"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)(str => (0, _utils.isEmpty)(str) ? "&mdash;" : str);
  _exports.default = _default;
});