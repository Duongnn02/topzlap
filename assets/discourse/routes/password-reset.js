define("discourse/routes/password-reset", ["exports", "discourse/routes/discourse", "I18n", "discourse/lib/preload-store", "discourse/lib/ajax", "discourse-common/lib/object", "discourse/lib/url"], function (_exports, _discourse, _I18n, _preloadStore, _ajax, _object, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"discourse/lib/preload-store",0,"discourse/lib/ajax",0,"discourse-common/lib/object",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    titleToken() {
      return _I18n.default.t("login.reset_password");
    },
    model(params) {
      if (_preloadStore.default.get("password_reset")) {
        return _preloadStore.default.getAndRemove("password_reset").then(json => (0, _object.deepMerge)(params, json));
      }
    },
    afterModel(model) {
      // confirm token here so email clients who crawl URLs don't invalidate the link
      if (model) {
        return (0, _ajax.ajax)({
          url: (0, _url.userPath)(`confirm-email-token/${model.token}.json`),
          dataType: "json"
        });
      }
    }
  });
  _exports.default = _default;
});