define("discourse-common/helpers/i18n", ["I18n", "discourse-common/lib/helpers"], function (_I18n, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("i18n", (key, params) => _I18n.default.t(key, params));
  (0, _helpers.registerUnbound)("i18n-yes-no", (value, params) => _I18n.default.t(value ? "yes_value" : "no_value", params));
});