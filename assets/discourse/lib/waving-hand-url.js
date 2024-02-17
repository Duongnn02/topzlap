define("discourse/lib/waving-hand-url", ["exports", "discourse-common/lib/helpers", "discourse/lib/settings", "discourse-common/lib/get-url"], function (_exports, _helpers, _settings, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.wavingHandURL = wavingHandURL;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"discourse/lib/settings",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function wavingHandURL() {
    const emojiSet = (0, _helpers.helperContext)().siteSettings.emoji_set;

    // random number between 2 -6 to render multiple skin tone waving hands
    const random = Math.floor(Math.random() * (7 - 2) + 2);
    return (0, _getUrl.default)(`${(0, _settings.emojiBasePath)()}/${emojiSet}/wave/${random}.png`);
  }
});