define("discourse/routes/user-activity-index", ["exports", "discourse/routes/user-activity-stream", "discourse-common/lib/icon-library", "discourse-common/lib/get-url", "I18n", "@ember/template"], function (_exports, _userActivityStream, _iconLibrary, _getUrl, _I18n, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/user-activity-stream",0,"discourse-common/lib/icon-library",0,"discourse-common/lib/get-url",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  var _default = _userActivityStream.default.extend({
    userActionType: null,
    emptyState() {
      const user = this.modelFor("user");
      const title = _I18n.default.t("user_activity.no_activity_title");
      let body = "";
      if (this.isCurrentUser(user)) {
        body = (0, _template.htmlSafe)(_I18n.default.t("user_activity.no_activity_body", {
          topUrl: (0, _getUrl.default)("/top"),
          categoriesUrl: (0, _getUrl.default)("/categories"),
          preferencesUrl: (0, _getUrl.default)("/my/preferences"),
          heartIcon: (0, _iconLibrary.iconHTML)("heart")
        }));
      }
      return {
        title,
        body
      };
    },
    titleToken() {
      return _I18n.default.t("user.filters.all");
    }
  });
  _exports.default = _default;
});