define("discourse/plugins/discourse-details/initializers/apply-details", ["exports", "I18n", "discourse/lib/plugin-api"], function (_exports, _I18n, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  function initializeDetails(api) {
    api.decorateCooked($elem => $("details", $elem), {
      id: "discourse-details"
    });
    api.addToolbarPopupMenuOptionsCallback(() => {
      return {
        action: "insertDetails",
        icon: "caret-right",
        label: "details.title"
      };
    });
    api.modifyClass("controller:composer", {
      pluginId: "discourse-details",
      actions: {
        insertDetails() {
          this.toolbarEvent.applySurround("\n" + `[details="${_I18n.default.t("composer.details_title")}"]` + "\n", "\n[/details]\n", "details_text", {
            multiline: false
          });
        }
      }
    });
  }
  var _default = {
    name: "apply-details",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.7", initializeDetails);
    }
  };
  _exports.default = _default;
});