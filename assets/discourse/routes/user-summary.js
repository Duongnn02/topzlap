define("discourse/routes/user-summary", ["exports", "discourse/routes/discourse", "I18n"], function (_exports, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    showFooter: true,
    model() {
      const user = this.modelFor("user");
      if (user.get("profile_hidden")) {
        return this.replaceWith("user.profile-hidden");
      }
      return user.summary();
    },
    titleToken() {
      return _I18n.default.t("user.summary.title");
    }
  });
  _exports.default = _default;
});