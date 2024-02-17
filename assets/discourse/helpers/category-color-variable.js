define("discourse/helpers/category-color-variable", ["exports", "discourse-common/lib/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)(color => `--category-color: #${color};`);
  _exports.default = _default;
});