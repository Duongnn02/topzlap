define("discourse-common/helpers/bound-i18n", ["exports", "I18n", "discourse-common/lib/helpers"], function (_exports, _I18n, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)((key, params) => _I18n.default.t(key, params.hash));
  _exports.default = _default;
});