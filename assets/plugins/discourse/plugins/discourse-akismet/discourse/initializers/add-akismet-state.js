define("discourse/plugins/discourse-akismet/discourse/initializers/add-akismet-state", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  var _default = {
    name: "add-akismet-state",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.31", api => {
        api.includePostAttributes("akismet_state");
      });
    }
  };
  _exports.default = _default;
});