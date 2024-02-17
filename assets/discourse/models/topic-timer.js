define("discourse/models/topic-timer", ["exports", "discourse/models/rest", "discourse/lib/ajax"], function (_exports, _rest, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/rest",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  const TopicTimer = _rest.default.extend({});
  TopicTimer.reopenClass({
    update(topicId, time, basedOnLastPost, statusType, categoryId, durationMinutes) {
      let data = {
        time,
        status_type: statusType
      };
      if (basedOnLastPost) {
        data.based_on_last_post = basedOnLastPost;
      }
      if (categoryId) {
        data.category_id = categoryId;
      }
      if (durationMinutes) {
        data.duration_minutes = durationMinutes;
      }
      return (0, _ajax.ajax)({
        url: `/t/${topicId}/timer`,
        type: "POST",
        data
      });
    }
  });
  var _default = TopicTimer;
  _exports.default = _default;
});