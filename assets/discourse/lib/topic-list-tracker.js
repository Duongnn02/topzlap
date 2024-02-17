define("discourse/lib/topic-list-tracker", ["exports", "rsvp", "discourse/lib/notification-levels"], function (_exports, _rsvp, _notificationLevels) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getHighestReadCache = getHighestReadCache;
  _exports.nextTopicUrl = nextTopicUrl;
  _exports.previousTopicUrl = previousTopicUrl;
  _exports.resetHighestReadCache = resetHighestReadCache;
  _exports.setHighestReadCache = setHighestReadCache;
  _exports.setTopicId = setTopicId;
  _exports.setTopicList = setTopicList;
  0; //eaimeta@70e063a35619d71f0,"rsvp",0,"discourse/lib/notification-levels"eaimeta@70e063a35619d71f
  let model, currentTopicId;
  let lastTopicId, lastHighestRead;
  function setTopicList(incomingModel) {
    model = incomingModel;
    model?.topics?.forEach(topic => {
      // Only update unread counts for tracked topics

      if (topic.notification_level >= _notificationLevels.NotificationLevels.TRACKING) {
        const highestRead = getHighestReadCache(topic.id);
        if (highestRead && highestRead >= topic.last_read_post_number) {
          const count = Math.max(topic.highest_post_number - highestRead, 0);
          topic.setProperties({
            unread_posts: count,
            new_posts: count
          });
          resetHighestReadCache();
        }
      }
    });
    currentTopicId = null;
  }
  function nextTopicUrl() {
    return urlAt(1);
  }
  function previousTopicUrl() {
    return urlAt(-1);
  }
  function setHighestReadCache(topicId, postNumber) {
    lastTopicId = topicId;
    lastHighestRead = postNumber;
  }
  function getHighestReadCache(topicId) {
    if (topicId === lastTopicId) {
      return lastHighestRead;
    }
  }
  function resetHighestReadCache() {
    lastTopicId = undefined;
    lastHighestRead = undefined;
  }
  function urlAt(delta) {
    if (!model || !model.topics) {
      return _rsvp.Promise.resolve(null);
    }
    let index = currentIndex();
    if (index === -1) {
      index = 0;
    } else {
      index += delta;
    }
    const topic = model.topics[index];
    if (!topic && index > 0 && model.more_topics_url && model.loadMore) {
      return model.loadMore().then(() => urlAt(delta));
    }
    if (topic) {
      currentTopicId = topic.id;
      return _rsvp.Promise.resolve(topic.lastUnreadUrl);
    }
    return _rsvp.Promise.resolve(null);
  }
  function setTopicId(topicId) {
    currentTopicId = topicId;
  }
  function currentIndex() {
    if (currentTopicId && model && model.topics) {
      const idx = model.topics.findIndex(t => t.id === currentTopicId);
      if (idx > -1) {
        return idx;
      }
    }
    return -1;
  }
});