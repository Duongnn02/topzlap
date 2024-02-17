define("discourse/lib/cached-topic-list", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.findOrResetCachedTopicList = findOrResetCachedTopicList;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function findOrResetCachedTopicList(session, filter) {
    const lastTopicList = session.get("topicList");
    if (lastTopicList && lastTopicList.filter === filter) {
      return lastTopicList;
    } else {
      session.setProperties({
        topicList: null,
        topicListScrollPosition: null
      });
      return false;
    }
  }
});