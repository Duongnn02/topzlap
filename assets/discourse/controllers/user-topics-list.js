define("discourse/controllers/user-topics-list", ["exports", "@ember/controller", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/mixins/bulk-topic-selection", "@ember/object", "discourse/models/topic", "discourse/routes/build-private-messages-route"], function (_exports, _controller, _decorators, _computed, _bulkTopicSelection, _object, _topic, _buildPrivateMessagesRoute) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/mixins/bulk-topic-selection",0,"@ember/object",0,"discourse/models/topic",0,"discourse/routes/build-private-messages-route"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Lists of topics on a user's page.
  var _default = _controller.default.extend(_bulkTopicSelection.default, (_dec = (0, _decorators.default)("model.topics.length", "incomingCount"), _dec2 = (0, _decorators.observes)("model.canLoadMore"), _dec3 = (0, _decorators.default)("filter", "model.topics.length"), _dec4 = (0, _decorators.default)("filter", "model.topics.length"), (_obj = {
    application: (0, _controller.inject)(),
    hideCategory: false,
    showPosters: false,
    channel: null,
    tagsForUser: null,
    incomingCount: (0, _computed.reads)("pmTopicTrackingState.newIncoming.length"),
    noContent(topicsLength, incomingCount) {
      return topicsLength === 0 && incomingCount === 0;
    },
    saveScrollPosition() {
      this.session.set("topicListScrollPosition", $(window).scrollTop());
    },
    _showFooter() {
      this.set("application.showFooter", !this.get("model.canLoadMore"));
    },
    showResetNew(filter, hasTopics) {
      return filter === _buildPrivateMessagesRoute.NEW_FILTER && hasTopics;
    },
    showDismissRead(filter, hasTopics) {
      return filter === _buildPrivateMessagesRoute.UNREAD_FILTER && hasTopics;
    },
    subscribe() {
      this.pmTopicTrackingState.trackIncoming(this.inbox, this.filter);
    },
    unsubscribe() {
      this.pmTopicTrackingState.stopIncomingTracking();
    },
    resetNew() {
      const topicIds = this.selected ? this.selected.map(topic => topic.id) : null;
      const opts = {
        inbox: this.inbox,
        topicIds
      };
      if (this.group) {
        opts.groupName = this.group.name;
      }
      _topic.default.pmResetNew(opts).then(result => {
        if (result && result.topic_ids.length > 0) {
          this.pmTopicTrackingState.removeTopics(result.topic_ids);
          this.send("refresh");
        }
      });
    },
    loadMore() {
      this.model.loadMore();
    },
    showInserted(event) {
      event?.preventDefault();
      this.model.loadBefore(this.pmTopicTrackingState.newIncoming);
      this.pmTopicTrackingState.resetIncomingTracking();
    },
    refresh() {
      this.send("triggerRefresh");
    }
  }, (_applyDecoratedDescriptor(_obj, "noContent", [_dec], Object.getOwnPropertyDescriptor(_obj, "noContent"), _obj), _applyDecoratedDescriptor(_obj, "_showFooter", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj), _applyDecoratedDescriptor(_obj, "showResetNew", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showResetNew"), _obj), _applyDecoratedDescriptor(_obj, "showDismissRead", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showDismissRead"), _obj), _applyDecoratedDescriptor(_obj, "resetNew", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resetNew"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj), _applyDecoratedDescriptor(_obj, "showInserted", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showInserted"), _obj), _applyDecoratedDescriptor(_obj, "refresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "refresh"), _obj)), _obj)));
  _exports.default = _default;
});