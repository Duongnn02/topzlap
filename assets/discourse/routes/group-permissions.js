define("discourse/routes/group-permissions", ["exports", "discourse/routes/discourse", "I18n", "discourse/lib/ajax", "discourse/models/permission-type"], function (_exports, _discourse, _I18n, _ajax, _permissionType) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"discourse/lib/ajax",0,"discourse/models/permission-type"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    showFooter: true,
    titleToken() {
      return _I18n.default.t("groups.permissions.title");
    },
    model() {
      let group = this.modelFor("group");
      return (0, _ajax.ajax)(`/g/${group.name}/permissions`).then(permissions => {
        permissions.forEach(permission => {
          permission.description = (0, _permissionType.buildPermissionDescription)(permission.permission_type);
        });
        return {
          permissions
        };
      }).catch(() => {
        this.transitionTo("group.members", group);
      });
    },
    setupController(controller, model) {
      this.controllerFor("group-permissions").setProperties({
        model
      });
      this.controllerFor("group").set("showing", "permissions");
    }
  });
  _exports.default = _default;
});