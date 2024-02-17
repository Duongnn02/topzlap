define("discourse/routes/preferences-email", ["exports", "discourse/routes/restricted-user"], function (_exports, _restrictedUser) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/restricted-user"eaimeta@70e063a35619d71f
  var _default = _restrictedUser.default.extend({
    showFooter: true,
    model() {
      return this.modelFor("user");
    },
    renderTemplate() {
      this.render({
        into: "user"
      });
    },
    setupController(controller, model) {
      controller.reset();
      controller.setProperties({
        model,
        oldEmail: controller.new ? "" : model.get("email"),
        newEmail: controller.new ? "" : model.get("email")
      });
    },
    resetController(controller, isExiting) {
      if (isExiting) {
        controller.set("new", undefined);
      }
    },
    // A bit odd, but if we leave to /preferences we need to re-render that outlet
    deactivate() {
      this._super(...arguments);
      this.render("preferences", {
        into: "user",
        controller: "preferences"
      });
    }
  });
  _exports.default = _default;
});