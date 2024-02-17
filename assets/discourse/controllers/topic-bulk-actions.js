define("discourse/controllers/topic-bulk-actions", ["exports", "@ember/object/computed", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "rsvp", "discourse/models/topic", "@ember/service"], function (_exports, _computed, _controller, _I18n, _modalFunctionality, _rsvp, _topic, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addBulkButton = addBulkButton;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"rsvp",0,"discourse/models/topic",0,"@ember/service"eaimeta@70e063a35619d71f
  const _buttons = [];
  const alwaysTrue = () => true;
  function identity() {}
  function addBulkButton(action, key, opts) {
    opts = opts || {};
    const btn = {
      action,
      label: `topics.bulk.${key}`,
      icon: opts.icon,
      buttonVisible: opts.buttonVisible || alwaysTrue,
      enabledSetting: opts.enabledSetting,
      class: opts.class
    };
    _buttons.push(btn);
  }

  // Default buttons
  addBulkButton("showChangeCategory", "change_category", {
    icon: "pencil-alt",
    class: "btn-default",
    buttonVisible: topics => !topics.some(t => t.isPrivateMessage)
  });
  addBulkButton("closeTopics", "close_topics", {
    icon: "lock",
    class: "btn-default",
    buttonVisible: topics => !topics.some(t => t.isPrivateMessage)
  });
  addBulkButton("archiveTopics", "archive_topics", {
    icon: "folder",
    class: "btn-default",
    buttonVisible: topics => !topics.some(t => t.isPrivateMessage)
  });
  addBulkButton("archiveMessages", "archive_topics", {
    icon: "folder",
    class: "btn-default",
    buttonVisible: topics => topics.some(t => t.isPrivateMessage)
  });
  addBulkButton("moveMessagesToInbox", "move_messages_to_inbox", {
    icon: "folder",
    class: "btn-default",
    buttonVisible: topics => topics.some(t => t.isPrivateMessage)
  });
  addBulkButton("showNotificationLevel", "notification_level", {
    icon: "d-regular",
    class: "btn-default"
  });
  addBulkButton("deletePostTiming", "defer", {
    icon: "circle",
    class: "btn-default",
    buttonVisible() {
      return this.currentUser.user_option.enable_defer;
    }
  });
  addBulkButton("unlistTopics", "unlist_topics", {
    icon: "far-eye-slash",
    class: "btn-default",
    buttonVisible: topics => topics.some(t => t.visible) && !topics.some(t => t.isPrivateMessage)
  });
  addBulkButton("relistTopics", "relist_topics", {
    icon: "far-eye",
    class: "btn-default",
    buttonVisible: topics => topics.some(t => !t.visible) && !topics.some(t => t.isPrivateMessage)
  });
  addBulkButton("resetBumpDateTopics", "reset_bump_dates", {
    icon: "anchor",
    class: "btn-default",
    buttonVisible() {
      return this.currentUser.canManageTopic;
    }
  });
  addBulkButton("showTagTopics", "change_tags", {
    icon: "tag",
    class: "btn-default",
    enabledSetting: "tagging_enabled",
    buttonVisible() {
      return this.currentUser.canManageTopic;
    }
  });
  addBulkButton("showAppendTagTopics", "append_tags", {
    icon: "tag",
    class: "btn-default",
    enabledSetting: "tagging_enabled",
    buttonVisible() {
      return this.currentUser.canManageTopic;
    }
  });
  addBulkButton("removeTags", "remove_tags", {
    icon: "tag",
    class: "btn-default",
    enabledSetting: "tagging_enabled",
    buttonVisible() {
      return this.currentUser.canManageTopic;
    }
  });
  addBulkButton("deleteTopics", "delete", {
    icon: "trash-alt",
    class: "btn-danger delete-topics",
    buttonVisible() {
      return this.currentUser.staff;
    }
  });

  // Modal for performing bulk actions on topics
  var _default = _controller.default.extend(_modalFunctionality.default, {
    userPrivateMessages: (0, _controller.inject)("user-private-messages"),
    dialog: (0, _service.inject)(),
    tags: null,
    emptyTags: (0, _computed.empty)("tags"),
    categoryId: (0, _computed.alias)("model.category.id"),
    processedTopicCount: 0,
    isGroup: (0, _computed.alias)("userPrivateMessages.isGroup"),
    groupFilter: (0, _computed.alias)("userPrivateMessages.groupFilter"),
    onShow() {
      const topics = this.get("model.topics");
      this.set("buttons", _buttons.filter(b => {
        if (b.enabledSetting && !this.siteSettings[b.enabledSetting]) {
          return false;
        }
        return b.buttonVisible.call(this, topics);
      }));
      this.set("modal.modalClass", "topic-bulk-actions-modal small");
      this.send("changeBulkTemplate", "modal/bulk-actions-buttons");
    },
    perform(operation) {
      this.set("processedTopicCount", 0);
      if (this.get("model.topics").length > 20) {
        this.send("changeBulkTemplate", "modal/bulk-progress");
      }
      this.set("loading", true);
      return this._processChunks(operation).catch(() => {
        this.dialog.alert(_I18n.default.t("generic_error"));
      }).finally(() => {
        this.set("loading", false);
      });
    },
    _generateTopicChunks(allTopics) {
      let startIndex = 0;
      const chunkSize = 30;
      const chunks = [];
      while (startIndex < allTopics.length) {
        let topics = allTopics.slice(startIndex, startIndex + chunkSize);
        chunks.push(topics);
        startIndex += chunkSize;
      }
      return chunks;
    },
    _processChunks(operation) {
      const allTopics = this.get("model.topics");
      const topicChunks = this._generateTopicChunks(allTopics);
      const topicIds = [];
      const tasks = topicChunks.map(topics => () => {
        return _topic.default.bulkOperation(topics, operation).then(result => {
          this.set("processedTopicCount", this.get("processedTopicCount") + topics.length);
          return result;
        });
      });
      return new _rsvp.Promise((resolve, reject) => {
        const resolveNextTask = () => {
          if (tasks.length === 0) {
            const topics = topicIds.map(id => allTopics.findBy("id", id));
            return resolve(topics);
          }
          tasks.shift()().then(result => {
            if (result && result.topic_ids) {
              topicIds.push(...result.topic_ids);
            }
            resolveNextTask();
          }).catch(reject);
        };
        resolveNextTask();
      });
    },
    forEachPerformed(operation, cb) {
      this.perform(operation).then(topics => {
        if (topics) {
          topics.forEach(cb);
          (this.refreshClosure || identity)();
          this.send("closeModal");
        }
      });
    },
    performAndRefresh(operation) {
      return this.perform(operation).then(() => {
        (this.refreshClosure || identity)();
        this.send("closeModal");
      });
    },
    actions: {
      showTagTopics() {
        this.set("tags", "");
        this.set("action", "changeTags");
        this.set("label", "change_tags");
        this.set("title", "choose_new_tags");
        this.send("changeBulkTemplate", "bulk-tag");
      },
      changeTags() {
        this.performAndRefresh({
          type: "change_tags",
          tags: this.tags
        });
      },
      showAppendTagTopics() {
        this.set("tags", null);
        this.set("action", "appendTags");
        this.set("label", "append_tags");
        this.set("title", "choose_append_tags");
        this.send("changeBulkTemplate", "bulk-tag");
      },
      appendTags() {
        this.performAndRefresh({
          type: "append_tags",
          tags: this.tags
        });
      },
      showChangeCategory() {
        this.send("changeBulkTemplate", "modal/bulk-change-category");
      },
      showNotificationLevel() {
        this.send("changeBulkTemplate", "modal/bulk-notification-level");
      },
      deleteTopics() {
        this.performAndRefresh({
          type: "delete"
        });
      },
      closeTopics() {
        this.forEachPerformed({
          type: "close"
        }, t => t.set("closed", true));
      },
      archiveTopics() {
        this.forEachPerformed({
          type: "archive"
        }, t => t.set("archived", true));
      },
      archiveMessages() {
        let params = {
          type: "archive_messages"
        };
        if (this.isGroup) {
          params.group = this.groupFilter;
        }
        this.performAndRefresh(params);
      },
      moveMessagesToInbox() {
        let params = {
          type: "move_messages_to_inbox"
        };
        if (this.isGroup) {
          params.group = this.groupFilter;
        }
        this.performAndRefresh(params);
      },
      unlistTopics() {
        this.forEachPerformed({
          type: "unlist"
        }, t => t.set("visible", false));
      },
      relistTopics() {
        this.forEachPerformed({
          type: "relist"
        }, t => t.set("visible", true));
      },
      resetBumpDateTopics() {
        this.performAndRefresh({
          type: "reset_bump_dates"
        });
      },
      changeCategory() {
        const categoryId = parseInt(this.newCategoryId, 10) || 0;
        this.perform({
          type: "change_category",
          category_id: categoryId
        }).then(topics => {
          topics.forEach(t => t.set("category_id", categoryId));
          (this.refreshClosure || identity)();
          this.send("closeModal");
        });
      },
      deletePostTiming() {
        this.performAndRefresh({
          type: "destroy_post_timing"
        });
      },
      removeTags() {
        this.dialog.deleteConfirm({
          message: _I18n.default.t("topics.bulk.confirm_remove_tags", {
            count: this.get("model.topics").length
          }),
          didConfirm: () => this.performAndRefresh({
            type: "remove_tags"
          })
        });
      }
    }
  });
  _exports.default = _default;
});