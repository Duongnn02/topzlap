define("discourse/plugins/discourse-topic-voting/discourse/routes/user-activity-votes", ["exports", "discourse/routes/user-topic-list", "discourse/models/user-action", "I18n"], function (_exports, _userTopicList, _userAction, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/user-topic-list",0,"discourse/models/user-action",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _userTopicList.default.extend({
    userActionType: _userAction.default.TYPES.topics,
    model() {
      return this.store.findFiltered("topicList", {
        filter: "topics/voted-by/" + this.modelFor("user").get("username_lower")
      }).then(model => {
        model.set("emptyState", this.emptyState());
        return model;
      });
    },
    emptyState() {
      const user = this.modelFor("user");
      const title = this.isCurrentUser(user) ? _I18n.default.t("topic_voting.no_votes_title_self") : _I18n.default.t("topic_voting.no_votes_title_others", {
        username: user.username
      });
      return {
        title,
        body: ""
      };
    }
  });
  _exports.default = _default;
});