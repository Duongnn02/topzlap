define("discourse/plugins/discourse-solved/discourse/routes/user-activity-solved", ["exports", "discourse/routes/user-activity-stream", "I18n"], function (_exports, _userActivityStream, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/user-activity-stream",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _userActivityStream.default.extend({
    userActionType: 15,
    noContentHelpKey: "solved.no_solutions",
    emptyState() {
      const user = this.modelFor("user");
      let title, body;
      if (this.isCurrentUser(user)) {
        title = _I18n.default.t("solved.no_solved_topics_title");
        body = _I18n.default.t("solved.no_solved_topics_body");
      } else {
        title = _I18n.default.t("solved.no_solved_topics_title_others", {
          username: user.username
        });
        body = "";
      }
      return {
        title,
        body
      };
    }
  });
  _exports.default = _default;
});