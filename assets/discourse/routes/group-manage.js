define("discourse/routes/group-manage", ["exports", "discourse/routes/discourse", "I18n"], function (_exports, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    showFooter: true,
    titleToken() {
      return _I18n.default.t("groups.manage.title");
    },
    model() {
      return this.modelFor("group");
    },
    afterModel(group) {
      if (!this.currentUser || !(this.modelFor("group").can_admin_group && group.get("automatic")) && !this.currentUser.canManageGroup(group)) {
        this.transitionTo("group.members", group);
      }
    },
    setupController(controller, model) {
      this.controllerFor("group-manage").setProperties({
        model
      });
      this.controllerFor("group").set("showing", "manage");
    }
  });
  _exports.default = _default;
});