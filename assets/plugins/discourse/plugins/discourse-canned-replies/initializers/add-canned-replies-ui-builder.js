define("discourse/plugins/discourse-canned-replies/initializers/add-canned-replies-ui-builder", ["exports", "discourse/lib/plugin-api", "discourse/lib/show-modal"], function (_exports, _pluginApi, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function initializeCannedRepliesUIBuilder(api) {
    api.modifyClass("controller:composer", {
      pluginId: "discourse-canned-replies",
      actions: {
        showCannedRepliesButton() {
          if (this.site.mobileView) {
            (0, _showModal.default)("canned-replies").set("composerModel", this.model);
          } else {
            this.appEvents.trigger("composer:show-preview");
            this.appEvents.trigger("canned-replies:show");
          }
        }
      }
    });
    api.addToolbarPopupMenuOptionsCallback(() => {
      return {
        id: "canned_replies_button",
        icon: "far-clipboard",
        action: "showCannedRepliesButton",
        label: "canned_replies.composer_button_text"
      };
    });
  }
  var _default = {
    name: "add-canned-replies-ui-builder",
    initialize(container) {
      const siteSettings = container.lookup("site-settings:main");
      const currentUser = container.lookup("current-user:main");
      if (siteSettings.canned_replies_enabled && currentUser && currentUser.can_use_canned_replies) {
        (0, _pluginApi.withPluginApi)("0.5", initializeCannedRepliesUIBuilder);
      }
    }
  };
  _exports.default = _default;
});