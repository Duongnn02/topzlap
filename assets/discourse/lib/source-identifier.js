define("discourse/lib/source-identifier", ["exports", "discourse-common/lib/get-url", "discourse/lib/preload-store", "discourse-common/config/environment"], function (_exports, _getUrl, _preloadStore, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.consolePrefix = consolePrefix;
  _exports.default = identifySource;
  _exports.getThemeInfo = getThemeInfo;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/get-url",0,"discourse/lib/preload-store",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function identifySource(error) {
    if (!error || !error.stack) {
      try {
        throw new Error("Source identification error");
      } catch (e) {
        error = e;
      }
    }
    if (!error.stack) {
      return;
    }
    const themeMatches = error.stack.match(/\/theme-javascripts\/[\w-]+\.js/g) || [];
    for (const match of themeMatches) {
      const scriptElement = document.querySelector(`script[src*="${match}"`);
      if (scriptElement?.dataset.themeId) {
        return {
          type: "theme",
          ...getThemeInfo(scriptElement.dataset.themeId)
        };
      }
    }
    let plugin;

    // Source-mapped:
    plugin = plugin || error.stack.match(/plugins\/([\w-]+)\//)?.[1];
    if ((0, _environment.isDevelopment)()) {
      // Un-source-mapped:
      plugin = plugin || error.stack.match(/assets\/plugins\/([\w-]+)\.js/)?.[1];
    }

    // Production mode
    plugin = plugin || error.stack.match(/assets\/plugins\/_?([\w-]+)-[0-9a-f]+(?:\.br)?\.js/)?.[1];
    if (plugin) {
      return {
        type: "plugin",
        name: plugin
      };
    }
  }
  function getThemeInfo(id) {
    const name = _preloadStore.default.get("activatedThemes")?.[id] || `(theme-id: ${id})`;
    return {
      id,
      name,
      path: (0, _getUrl.default)(`/admin/customize/themes/${id}?safe_mode=no_themes`)
    };
  }
  function consolePrefix(error, source) {
    source = source || identifySource(error);
    if (source && source.type === "theme") {
      return `[THEME ${source.id} '${source.name}']`;
    } else if (source && source.type === "plugin") {
      return `[PLUGIN ${source.name}]`;
    }
    return "";
  }
});