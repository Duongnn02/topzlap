define("discourse/lib/settings", ["exports", "discourse-common/lib/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.emojiBasePath = emojiBasePath;
  _exports.prioritizeNameFallback = prioritizeNameFallback;
  _exports.prioritizeNameInUx = prioritizeNameInUx;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  function prioritizeNameInUx(name) {
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    return !siteSettings.prioritize_username_in_ux && name && name.trim().length > 0;
  }
  function prioritizeNameFallback(name, username) {
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    if (siteSettings.display_name_on_posts && !siteSettings.prioritize_username_in_ux) {
      return name || username;
    } else {
      return username;
    }
  }
  function emojiBasePath() {
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    return siteSettings.external_emoji_url === "" ? "/images/emoji" : siteSettings.external_emoji_url;
  }
});