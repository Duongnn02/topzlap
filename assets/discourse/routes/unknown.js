define("discourse/routes/unknown", ["exports", "discourse/routes/discourse", "discourse/lib/url", "discourse/lib/ajax"], function (_exports, _discourse, _url, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/lib/url",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    model(_, transition) {
      const path = transition.intent.url;
      if (!this.currentUser && this.siteSettings.login_required) {
        return;
      }
      return (0, _ajax.ajax)("/permalink-check.json", {
        data: {
          path
        }
      }).then(results => {
        if (results.found) {
          // Avoid polluting the history stack for external links
          transition.abort();
          let url = results.target_url;
          if (transition._discourse_anchor) {
            // Remove the anchor from the permalink if present
            url = url.split("#")[0];

            // Add the anchor from the transition
            url += `#${transition._discourse_anchor}`;
          }
          _url.default.routeTo(url);
          return "";
        } else {
          // 404 body HTML
          return results.html;
        }
      });
    }
  });
  _exports.default = _default;
});