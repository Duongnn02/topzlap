define("discourse/routes/user-notifications-index", ["exports", "discourse/routes/discourse", "I18n"], function (_exports, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    controllerName: "user-notifications",
    renderTemplate() {
      this.render("user/notifications-index");
    },
    titleToken() {
      return _I18n.default.t("user.filters.all");
    },
    afterModel(model) {
      if (!model) {
        this.transitionTo("userNotifications.responses");
      }
    }
  });
  _exports.default = _default;
});