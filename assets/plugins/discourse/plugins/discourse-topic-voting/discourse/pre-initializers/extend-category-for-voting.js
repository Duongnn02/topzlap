define("discourse/plugins/discourse-topic-voting/discourse/pre-initializers/extend-category-for-voting", ["exports", "I18n", "discourse/lib/plugin-api"], function (_exports, _I18n, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  function initialize(api) {
    api.addPostClassesCallback(post => {
      if (post.post_number === 1 && post.can_vote) {
        return ["voting-post"];
      }
    });
    api.includePostAttributes("can_vote");
    api.addTagsHtmlCallback(topic => {
      if (!topic.can_vote) {
        return;
      }
      let buffer = [];
      let title = "";
      if (topic.user_voted) {
        title = ` title='${_I18n.default.t("topic_voting.voted")}'`;
      }
      let userVotedClass = topic.user_voted ? " voted" : "";
      buffer.push(`<a href='${topic.url}' class='list-vote-count vote-count-${topic.vote_count} discourse-tag simple${userVotedClass}'${title}>`);
      buffer.push(_I18n.default.t("topic_voting.votes", {
        count: topic.vote_count
      }));
      buffer.push("</a>");
      if (buffer.length > 0) {
        return buffer.join("");
      }
    }, {
      priority: -100
    });
  }
  var _default = {
    name: "extend-category-for-voting",
    before: "inject-discourse-objects",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.4", api => initialize(api));
      (0, _pluginApi.withPluginApi)("0.8.30", api => api.addCategorySortCriteria("votes"));
    }
  };
  _exports.default = _default;
});