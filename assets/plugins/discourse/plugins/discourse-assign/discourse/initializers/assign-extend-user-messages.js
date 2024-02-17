define("discourse/plugins/discourse-assign/discourse/initializers/assign-extend-user-messages", ["exports", "I18n", "discourse/lib/plugin-api"], function (_exports, _I18n, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  var _default = {
    name: "assign-extend-user-messages",
    initialize(container) {
      (0, _pluginApi.withPluginApi)("1.5.0", api => {
        const currentUser = container.lookup("service:current-user");
        if (currentUser?.can_assign && api.addUserMessagesNavigationDropdownRow) {
          api.addUserMessagesNavigationDropdownRow("userPrivateMessages.assigned", _I18n.default.t("discourse_assign.assigned"), "user-plus");
        }
      });
    }
  };
  _exports.default = _default;
});