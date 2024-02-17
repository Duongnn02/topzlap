define("discourse/mixins/bulk-topic-selection", ["exports", "@ember/object/mixin", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/notification-levels", "discourse/models/topic", "@ember/service"], function (_exports, _mixin, _computed, _decorators, _notificationLevels, _topic, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/notification-levels",0,"discourse/models/topic",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _mixin.default.create((_dec = (0, _decorators.on)("init"), (_obj = {
    router: (0, _service.inject)(),
    bulkSelectEnabled: false,
    autoAddTopicsToBulkSelect: false,
    selected: null,
    lastChecked: null,
    canBulkSelect: (0, _computed.or)("currentUser.canManageTopic", "showDismissRead", "showResetNew"),
    resetSelected() {
      this.set("selected", []);
    },
    _isFilterPage(filter, filterType) {
      if (!filter) {
        return false;
      }
      return new RegExp(filterType + "$", "gi").test(filter);
    },
    actions: {
      toggleBulkSelect() {
        this.toggleProperty("bulkSelectEnabled");
        this.selected.clear();
      },
      dismissRead(operationType, options) {
        const operation = operationType === "posts" ? {
          type: "dismiss_posts"
        } : {
          type: "change_notification_level",
          notification_level_id: _notificationLevels.NotificationLevels.REGULAR
        };
        const tracked = (this.router.currentRoute.queryParams["f"] || this.router.currentRoute.queryParams["filter"]) === "tracked";
        const promise = this.selected.length ? _topic.default.bulkOperation(this.selected, operation, tracked) : _topic.default.bulkOperationByFilter("unread", operation, options, tracked);
        promise.then(result => {
          if (result && result.topic_ids) {
            if (options.private_message_inbox) {
              this.pmTopicTrackingState.removeTopics(result.topic_ids);
            } else {
              this.topicTrackingState.removeTopics(result.topic_ids);
            }
          }
          this.send("closeModal");
          this.send("refresh", tracked ? {
            skipResettingParams: ["filter", "f"]
          } : {});
        });
      },
      updateAutoAddTopicsToBulkSelect(newVal) {
        this.set("autoAddTopicsToBulkSelect", newVal);
      },
      addTopicsToBulkSelect(topics) {
        this.selected.pushObjects(topics);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "resetSelected", [_dec], Object.getOwnPropertyDescriptor(_obj, "resetSelected"), _obj)), _obj)));
  _exports.default = _default;
});