define("discourse/routes/groups-new", ["exports", "discourse/routes/discourse", "discourse/models/group", "I18n"], function (_exports, _discourse, _group, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/models/group",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    showFooter: true,
    titleToken() {
      return _I18n.default.t("admin.groups.new.title");
    },
    model() {
      return _group.default.create({
        automatic: false,
        visibility_level: 0,
        can_admin_group: true
      });
    },
    setupController(controller, model) {
      controller.set("model", model);
    },
    afterModel() {
      if (!this.get("currentUser.can_create_group")) {
        this.transitionTo("groups");
      }
    }
  });
  _exports.default = _default;
});