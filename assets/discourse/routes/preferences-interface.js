define("discourse/routes/preferences-interface", ["exports", "discourse/routes/restricted-user", "discourse/lib/theme-selector"], function (_exports, _restrictedUser, _themeSelector) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/restricted-user",0,"discourse/lib/theme-selector"eaimeta@70e063a35619d71f
  var _default = _restrictedUser.default.extend({
    showFooter: true,
    setupController(controller, user) {
      controller.setProperties({
        model: user,
        textSize: user.get("currentTextSize"),
        themeId: (0, _themeSelector.currentThemeId)(),
        makeThemeDefault: !user.get("user_option.theme_ids") || (0, _themeSelector.currentThemeId)() === user.get("user_option.theme_ids")[0],
        makeTextSizeDefault: user.get("currentTextSize") === user.get("user_option.text_size")
      });
    }
  });
  _exports.default = _default;
});