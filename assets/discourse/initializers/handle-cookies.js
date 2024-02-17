define("discourse/initializers/handle-cookies", ["exports", "discourse/lib/theme-selector", "discourse/lib/color-scheme-picker", "discourse/models/user", "@ember/runloop", "discourse-common/config/environment"], function (_exports, _themeSelector, _colorSchemePicker, _user, _runloop, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/theme-selector",0,"discourse/lib/color-scheme-picker",0,"discourse/models/user",0,"@ember/runloop",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  const DELAY = (0, _environment.isTesting)() ? 0 : 5000;
  var _default = {
    name: "handle-cookies",
    initialize() {
      // No need to block boot for this housekeeping - we can defer it a few seconds
      (0, _runloop.later)(() => {
        (0, _themeSelector.extendThemeCookie)();
        (0, _colorSchemePicker.extendColorSchemeCookies)();
        (0, _user.extendTextSizeCookie)();
      }, DELAY);
    }
  };
  _exports.default = _default;
});