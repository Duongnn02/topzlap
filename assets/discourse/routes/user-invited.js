define("discourse/routes/user-invited", ["exports", "discourse/routes/discourse", "I18n"], function (_exports, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    setupController(controller) {
      const can_see_invite_details = this.currentUser.staff || this.controllerFor("user").id === this.currentUser?.id;
      controller.setProperties({
        can_see_invite_details
      });
    },
    titleToken() {
      return _I18n.default.t("user.invited.title");
    }
  });
  _exports.default = _default;
});