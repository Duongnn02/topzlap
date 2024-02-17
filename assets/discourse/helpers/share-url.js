define("discourse/helpers/share-url", ["exports", "discourse-common/lib/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.resolveShareUrl = resolveShareUrl;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  function resolveShareUrl(url, user) {
    const siteSettings = (0, _helpers.helperContext)().siteSettings;
    const badgesEnabled = siteSettings.enable_badges;
    const allowUsername = siteSettings.allow_username_in_share_links;
    const userSuffix = user && badgesEnabled && allowUsername ? `?u=${user.username_lower}` : "";
    return url + userSuffix;
  }
});