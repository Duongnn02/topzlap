define("discourse/plugins/discourse-cakeday/discourse/routes/cakeday-anniversaries", ["exports", "I18n", "discourse/routes/discourse"], function (_exports, _I18n, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    beforeModel() {
      if (!this.siteSettings.cakeday_enabled) {
        this.transitionTo("unknown", window.location.pathname.replace(/^\//, ""));
      }
    },
    titleToken() {
      return _I18n.default.t("anniversaries.title");
    }
  });
  _exports.default = _default;
});