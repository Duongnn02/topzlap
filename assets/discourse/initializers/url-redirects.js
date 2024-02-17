define("discourse/initializers/url-redirects", ["exports", "discourse/lib/url", "discourse/lib/utilities", "discourse-common/utils/escape-regexp"], function (_exports, _url, _utilities, _escapeRegexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse/lib/utilities",0,"discourse-common/utils/escape-regexp"eaimeta@70e063a35619d71f
  var _default = {
    name: "url-redirects",
    after: "inject-objects",
    initialize(container) {
      const currentUser = container.lookup("service:current-user");
      if (currentUser) {
        const username = currentUser.get("username");
        const escapedUsername = (0, _escapeRegexp.default)(username);
        _url.default.rewrite(new RegExp(`^/u/${escapedUsername}/?$`, "i"), `/u/${username}/activity`);
      }

      // We are still using these for now
      _url.default.rewrite(/^\/group\//, "/groups/");
      _url.default.rewrite(/^\/groups$/, "/g");
      _url.default.rewrite(/^\/groups\//, "/g/");

      // Initialize default homepage
      let siteSettings = container.lookup("service:site-settings");
      (0, _utilities.initializeDefaultHomepage)(siteSettings);
      let defaultUserRoute = siteSettings.view_user_route || "summary";
      if (!container.lookup(`route:user.${defaultUserRoute}`)) {
        defaultUserRoute = "summary";
      }
      _url.default.rewrite(/^\/u\/([^\/]+)\/?$/, `/u/$1/${defaultUserRoute}`, {
        exceptions: ["/u/account-created", "/users/account-created", "/u/password-reset", "/users/password-reset"]
      });
    }
  };
  _exports.default = _default;
});