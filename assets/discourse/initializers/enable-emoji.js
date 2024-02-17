define("discourse/initializers/enable-emoji", ["exports", "discourse/lib/preload-store", "pretty-text/emoji", "discourse/lib/plugin-api"], function (_exports, _preloadStore, _emoji, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/preload-store",0,"pretty-text/emoji",0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  var _default = {
    name: "enable-emoji",
    initialize(container) {
      const siteSettings = container.lookup("service:site-settings");
      if (!siteSettings.enable_emoji) {
        return;
      }
      (0, _pluginApi.withPluginApi)("0.1", api => {
        api.onToolbarCreate(toolbar => {
          toolbar.addButton({
            id: "emoji",
            group: "extras",
            icon: "far-smile",
            action: () => toolbar.context.send("emoji"),
            title: "composer.emoji",
            className: "emoji insert-emoji"
          });
        });
      });
      (_preloadStore.default.get("customEmoji") || []).forEach(emoji => (0, _emoji.registerEmoji)(emoji.name, emoji.url, emoji.group));
    }
  };
  _exports.default = _default;
});