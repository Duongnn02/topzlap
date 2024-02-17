define("discourse/initializers/localization", ["exports", "I18n", "bootbox"], function (_exports, _I18n, _bootbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"bootbox"eaimeta@70e063a35619d71f
  var _default = {
    name: "localization",
    after: "inject-objects",
    isVerboseLocalizationEnabled(container) {
      const siteSettings = container.lookup("service:site-settings");
      if (siteSettings.verbose_localization) {
        return true;
      }
      try {
        return sessionStorage && sessionStorage.getItem("verbose_localization");
      } catch (e) {
        return false;
      }
    },
    initialize(container) {
      if (this.isVerboseLocalizationEnabled(container)) {
        _I18n.default.enableVerboseLocalization();
      }

      // Merge any overrides into our object
      for (const [locale, overrides] of Object.entries(_I18n.default._overrides || {})) {
        for (const [key, value] of Object.entries(overrides)) {
          const segs = key.replace(/^admin_js\./, "js.").split(".");
          let node = _I18n.default.translations[locale] || {};
          for (let i = 0; i < segs.length - 1; i++) {
            if (!(segs[i] in node)) {
              node[segs[i]] = {};
            }
            node = node[segs[i]];
          }
          if (typeof node === "object") {
            node[segs[segs.length - 1]] = value;
          }
        }
      }
      for (let [key, value] of Object.entries(_I18n.default._mfOverrides || {})) {
        key = key.replace(/^[a-z_]*js\./, "");
        _I18n.default._compiledMFs[key] = value;
      }
      _bootbox.default.addLocale(_I18n.default.currentLocale(), {
        OK: _I18n.default.t("composer.modal_ok"),
        CANCEL: _I18n.default.t("composer.modal_cancel"),
        CONFIRM: _I18n.default.t("composer.modal_ok")
      });
      _bootbox.default.setLocale(_I18n.default.currentLocale());
    }
  };
  _exports.default = _default;
});