define("discourse/initializers/strip-mobile-app-url-params", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    name: "strip-mobile-app-url-params",
    initialize() {
      let queryStrings = window.location.search;
      if (queryStrings.includes("user_api_public_key")) {
        let params = queryStrings.startsWith("?") ? queryStrings.slice(1).split("&") : [];
        params = params.filter(param => {
          return !param.startsWith("user_api_public_key=") && !param.startsWith("auth_redirect=");
        });
        queryStrings = params.length > 0 ? `?${params.join("&")}` : "";
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, null, `${location.pathname}${queryStrings}${location.hash}`);
        }
      }
    }
  };
  _exports.default = _default;
});