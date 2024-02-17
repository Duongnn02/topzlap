define("discourse/services/pm-topic-tracking-state", ["exports", "rsvp", "@ember/service", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse-common/lib/object", "discourse/routes/build-private-messages-route", "discourse/lib/notification-levels"], function (_exports, _rsvp, _service, _ajax, _decorators, _ajaxError, _object, _buildPrivateMessagesRoute, _notificationLevels) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"rsvp",0,"@ember/service",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse-common/lib/object",0,"discourse/routes/build-private-messages-route",0,"discourse/lib/notification-levels"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // See private_message_topic_tracking_state.rb for documentation
  const PrivateMessageTopicTrackingState = _service.default.extend((_obj = {
    CHANNEL_PREFIX: "/private-message-topic-tracking-state",
    inbox: null,
    filter: null,
    activeGroup: null,
    init() {
      this._super(...arguments);
      this.states = new Map();
      this.statesModificationCounter = 0;
      this.isTracking = false;
      this.newIncoming = [];
      this.stateChangeCallbacks = new Map();
    },
    willDestroy() {
      this._super(...arguments);
      if (this.currentUser) {
        this.messageBus.unsubscribe(this.userChannel(), this._processMessage);
      }
      this.messageBus.unsubscribe(this.groupChannel("*"), this._processMessage);
    },
    onStateChange(key, callback) {
      this.stateChangeCallbacks.set(key, callback);
    },
    offStateChange(key) {
      this.stateChangeCallbacks.delete(key);
    },
    startTracking() {
      if (this.isTracking) {
        return _rsvp.Promise.resolve();
      }
      this.messageBus.subscribe(this.userChannel(), this._processMessage);
      this.currentUser.groupsWithMessages?.forEach(group => {
        this.messageBus.subscribe(this.groupChannel(group.id), this._processMessage);
      });
      return this._loadInitialState().finally(() => {
        this.set("isTracking", true);
      });
    },
    lookupCount(type) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const typeFilterFn = type === "new" ? this._isNew : this._isUnread;
      const inbox = opts.inboxFilter || this.inbox;
      let filterFn;
      if (inbox === "user") {
        filterFn = this._isPersonal;
      } else if (inbox === "group") {
        filterFn = this._isGroup;
      }
      return Array.from(this.states.values()).filter(topic => {
        return typeFilterFn(topic) && filterFn?.(topic, opts.groupName);
      }).length;
    },
    trackIncoming(inbox, filter, group) {
      this.setProperties({
        inbox,
        filter,
        activeGroup: group,
        isTrackingIncoming: true
      });
    },
    resetIncomingTracking() {
      if (this.isTrackingIncoming) {
        this.set("newIncoming", []);
      }
    },
    stopIncomingTracking() {
      if (this.isTrackingIncoming) {
        this.setProperties({
          isTrackingIncoming: false,
          newIncoming: []
        });
      }
    },
    removeTopics(topicIds) {
      if (!this.isTracking) {
        return;
      }
      topicIds.forEach(topicId => this.states.delete(topicId));
      this._afterStateChange();
    },
    findState(topicId) {
      return this.states.get(topicId);
    },
    userChannel() {
      return `${this.CHANNEL_PREFIX}/user/${this.currentUser.id}`;
    },
    groupChannel(groupId) {
      return `${this.CHANNEL_PREFIX}/group/${groupId}`;
    },
    _isNew(topic) {
      return !topic.last_read_post_number && (topic.notification_level !== 0 && !topic.notification_level || topic.notification_level >= _notificationLevels.NotificationLevels.TRACKING) && !topic.is_seen;
    },
    _isUnread(topic) {
      return topic.last_read_post_number && topic.last_read_post_number < topic.highest_post_number && topic.notification_level >= _notificationLevels.NotificationLevels.TRACKING;
    },
    _isPersonal(topic) {
      const groups = this.currentUser?.groups;
      if (!groups || groups.length === 0) {
        return true;
      }
      return !groups.some(group => {
        return topic.group_ids?.includes(group.id);
      });
    },
    _isGroup(topic, activeGroupName) {
      return this.currentUser.groups.some(group => {
        return group.name === (activeGroupName || this.activeGroup.name) && topic.group_ids?.includes(group.id);
      });
    },
    _processMessage(message) {
      switch (message.message_type) {
        case "new_topic":
          if (message.payload.created_by_user_id !== this.currentUser.id) {
            this._modifyState(message.topic_id, message.payload);
            if ([_buildPrivateMessagesRoute.NEW_FILTER, _buildPrivateMessagesRoute.INBOX_FILTER].includes(this.filter) && this._shouldDisplayMessageForInbox(message)) {
              this._notifyIncoming(message.topic_id);
            }
          }
          break;
        case "read":
          this._modifyState(message.topic_id, message.payload);
          break;
        case "unread":
          // Note: At some point we may want to make the same performance optimisation
          // here as we did with the other topic tracking state, where we only send
          // one 'unread' update to all users, not a more accurate unread update to
          // each individual user with their own read state. In this case, we need to
          // ignore unread updates which are triggered by the current user.
          //
          // cf. f6c852bf8e7f4dea519425ba87a114f22f52a8f4
          this._modifyState(message.topic_id, message.payload);
          if ([_buildPrivateMessagesRoute.UNREAD_FILTER, _buildPrivateMessagesRoute.INBOX_FILTER].includes(this.filter) && this._shouldDisplayMessageForInbox(message)) {
            this._notifyIncoming(message.topic_id);
          }
          break;
        case "group_archive":
          if ([_buildPrivateMessagesRoute.INBOX_FILTER, _buildPrivateMessagesRoute.ARCHIVE_FILTER].includes(this.filter) && (!message.payload.acting_user_id || message.payload.acting_user_id !== this.currentUser.id) && this._displayMessageForGroupInbox(message)) {
            this._notifyIncoming(message.topic_id);
          }
          break;
      }
    },
    _displayMessageForGroupInbox(message) {
      return this.inbox === "group" && message.payload.group_ids.includes(this.activeGroup.id);
    },
    _shouldDisplayMessageForInbox(message) {
      return this._displayMessageForGroupInbox(message) || this.inbox === "user" && (message.payload.group_ids.length === 0 || this.currentUser.groups.filter(group => {
        return message.payload.group_ids.includes(group.id);
      }).length === 0);
    },
    _notifyIncoming(topicId) {
      if (this.isTrackingIncoming && !this.newIncoming.includes(topicId)) {
        this.newIncoming.pushObject(topicId);
      }
    },
    _loadInitialState() {
      return (0, _ajax.ajax)(`/u/${this.currentUser.username}/private-message-topic-tracking-state`).then(pmTopicTrackingStateData => {
        pmTopicTrackingStateData.forEach(topic => {
          this._modifyState(topic.topic_id, topic, {
            skipIncrement: true
          });
        });
      }).catch(_ajaxError.popupAjaxError);
    },
    _modifyState(topicId, data) {
      let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      const oldState = this.findState(topicId);
      let newState = data;
      if (oldState && !(0, _object.deepEqual)(oldState, newState)) {
        newState = (0, _object.deepMerge)(oldState, newState);
      }
      this.states.set(topicId, newState);
      if (!opts.skipIncrement) {
        this._afterStateChange();
      }
    },
    _afterStateChange() {
      this.incrementProperty("statesModificationCounter");
      this.stateChangeCallbacks.forEach(callback => callback());
    }
  }, (_applyDecoratedDescriptor(_obj, "_isPersonal", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_isPersonal"), _obj), _applyDecoratedDescriptor(_obj, "_isGroup", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_isGroup"), _obj), _applyDecoratedDescriptor(_obj, "_processMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_processMessage"), _obj)), _obj));
  var _default = PrivateMessageTopicTrackingState;
  _exports.default = _default;
});