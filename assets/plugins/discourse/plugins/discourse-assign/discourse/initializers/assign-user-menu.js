define("discourse/plugins/discourse-assign/discourse/initializers/assign-user-menu", ["exports", "discourse/lib/plugin-api", "discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list"], function (_exports, _pluginApi, _assignsList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api",0,"discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  var _default = {
    name: "assign-user-menu",
    initialize(container) {
      (0, _pluginApi.withPluginApi)("1.2.0", api => {
        if (api.registerUserMenuTab) {
          const siteSettings = container.lookup("service:site-settings");
          if (!siteSettings.assign_enabled) {
            return;
          }
          const currentUser = api.getCurrentUser();
          if (!currentUser?.can_assign) {
            return;
          }
          api.registerUserMenuTab(UserMenuTab => {
            return class extends UserMenuTab {
              constructor() {
                super(...arguments);
                _defineProperty(this, "id", "assign-list");
                _defineProperty(this, "panelComponent", _assignsList.default);
                _defineProperty(this, "icon", "user-plus");
                _defineProperty(this, "notificationTypes", ["assigned"]);
              }
              get count() {
                return this.getUnreadCountForType("assigned");
              }
              get linkWhenActive() {
                return `${this.currentUser.path}/activity/assigned`;
              }
            };
          });
        }
      });
    }
  };
  _exports.default = _default;
});