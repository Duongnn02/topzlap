define("discourse/helpers/theme-helpers", ["discourse-common/lib/helpers", "I18n", "discourse/lib/theme-settings-store"], function (_helpers, _I18n, _themeSettingsStore) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"I18n",0,"discourse/lib/theme-settings-store"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("theme-i18n", (themeId, key, params) => {
    return _I18n.default.t(`theme_translations.${themeId}.${key}`, params);
  });
  (0, _helpers.registerUnbound)("theme-prefix", (themeId, key) => `theme_translations.${themeId}.${key}`);
  (0, _helpers.registerUnbound)("theme-setting", (themeId, key) => {
    return (0, _themeSettingsStore.getSetting)(themeId, key);
  });
});