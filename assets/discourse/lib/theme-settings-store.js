define("discourse/lib/theme-settings-store", ["exports", "@ember/object", "discourse-common/lib/object"], function (_exports, _object, _object2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getObjectForTheme = getObjectForTheme;
  _exports.getSetting = getSetting;
  _exports.registerSettings = registerSettings;
  _exports.resetSettings = resetSettings;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse-common/lib/object"eaimeta@70e063a35619d71f
  const originalSettings = {};
  const settings = {};
  function registerSettings(themeId, settingsObject) {
    let {
      force = false
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (settings[themeId] && !force) {
      return;
    }
    originalSettings[themeId] = (0, _object2.cloneJSON)(settingsObject);
    const s = {};
    Object.keys(settingsObject).forEach(key => {
      Object.defineProperty(s, key, {
        enumerable: true,
        get() {
          return settingsObject[key];
        },
        set(newVal) {
          settingsObject[key] = newVal;
        }
      });
    });
    settings[themeId] = s;
  }
  function getSetting(themeId, settingKey) {
    if (settings[themeId]) {
      return (0, _object.get)(settings[themeId], settingKey);
    }
    return null;
  }
  function getObjectForTheme(themeId) {
    return settings[themeId];
  }
  function resetSettings() {
    Object.keys(originalSettings).forEach(themeId => {
      Object.keys(originalSettings[themeId]).forEach(key => {
        const original = originalSettings[themeId][key];
        if (original && typeof original === "object") {
          // special handling for the theme_uploads and theme_uploads_local magic
          // objects in settings
          settings[themeId][key] = (0, _object2.cloneJSON)(original);
        } else {
          settings[themeId][key] = original;
        }
      });
    });
  }
});