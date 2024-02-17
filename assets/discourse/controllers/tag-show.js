define("discourse/controllers/tag-show", ["exports", "discourse/controllers/discovery-sortable", "@ember/controller", "discourse-common/utils/decorators", "discourse/mixins/bulk-topic-selection", "discourse/mixins/filter-mode", "I18n", "discourse/models/nav-item", "discourse/models/topic", "@ember/object/computed", "discourse/lib/computed", "@ember/object", "@ember/service"], function (_exports, _discoverySortable, _controller, _decorators, _bulkTopicSelection, _filterMode, _I18n, _navItem, _topic, _computed, _computed2, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/controllers/discovery-sortable",0,"@ember/controller",0,"discourse-common/utils/decorators",0,"discourse/mixins/bulk-topic-selection",0,"discourse/mixins/filter-mode",0,"I18n",0,"discourse/models/nav-item",0,"discourse/models/topic",0,"@ember/object/computed",0,"discourse/lib/computed",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discoverySortable.default.extend(_bulkTopicSelection.default, _filterMode.default, (_dec = (0, _decorators.default)("canCreateTopic", "category", "canCreateTopicOnCategory", "tag", "canCreateTopicOnTag"), _dec2 = (0, _decorators.default)("category", "tag.id", "filterType", "noSubcategories"), _dec3 = (0, _decorators.observes)("list.canLoadMore"), _dec4 = (0, _decorators.default)("navMode", "list.topics.length", "loading"), _dec5 = (0, _decorators.default)("list.filter", "list.topics.length"), _dec6 = (0, _decorators.default)("list.filter", "list.topics.length"), (_obj = {
    application: (0, _controller.inject)(),
    dialog: (0, _service.inject)(),
    tag: null,
    additionalTags: null,
    list: null,
    canAdminTag: (0, _computed.readOnly)("currentUser.staff"),
    navMode: "latest",
    loading: false,
    canCreateTopic: false,
    showInfo: false,
    top: (0, _computed2.endWith)("list.filter", "top"),
    createTopicDisabled(canCreateTopic, category, canCreateTopicOnCategory, tag, canCreateTopicOnTag) {
      return !canCreateTopic || category && !canCreateTopicOnCategory || tag && !canCreateTopicOnTag;
    },
    navItems(category, tagId, filterType, noSubcategories) {
      return _navItem.default.buildList(category, {
        tagId,
        filterType,
        noSubcategories,
        siteSettings: this.siteSettings
      });
    },
    _showFooter() {
      this.set("application.showFooter", !this.list?.canLoadMore);
    },
    footerMessage(navMode, listTopicsLength, loading) {
      if (loading) {
        return;
      }
      if (listTopicsLength === 0) {
        return _I18n.default.t(`tagging.topics.none.${navMode}`, {
          tag: this.tag?.id
        });
      } else {
        return _I18n.default.t("topics.bottom.tag", {
          tag: this.tag?.id
        });
      }
    },
    showDismissRead(filter, topicsLength) {
      return this._isFilterPage(filter, "unread") && topicsLength > 0;
    },
    showResetNew(filter, topicsLength) {
      return this._isFilterPage(filter, "new") && topicsLength > 0;
    },
    resetNew() {
      const tracked = (this.router.currentRoute.queryParams["f"] || this.router.currentRoute.queryParams["filter"]) === "tracked";
      let topicIds = this.selected ? this.selected.mapBy("id") : null;
      _topic.default.resetNew(this.category, !this.noSubcategories, {
        tracked,
        tag: this.tag,
        topicIds
      }).then(() => this.refresh(tracked ? {
        skipResettingParams: ["filter", "f"]
      } : {}));
    },
    showInserted(event) {
      event?.preventDefault();
      const tracker = this.topicTrackingState;
      this.list.loadBefore(tracker.newIncoming, true);
      tracker.resetTracking();
      return false;
    },
    changeSort(order) {
      if (order === this.order) {
        this.toggleProperty("ascending");
      } else {
        this.setProperties({
          order,
          ascending: false
        });
      }
    },
    changePeriod(p) {
      this.set("period", p);
    },
    toggleInfo() {
      this.toggleProperty("showInfo");
    },
    refresh() {
      return this.store.findFiltered("topicList", {
        filter: this.list?.filter
      }).then(list => {
        this.set("list", list);
        this.resetSelected();
      });
    },
    deleteTag(tagInfo) {
      const numTopics = this.get("list.topic_list.tags.firstObject.topic_count") || 0;
      let confirmText = numTopics === 0 ? _I18n.default.t("tagging.delete_confirm_no_topics") : _I18n.default.t("tagging.delete_confirm", {
        count: numTopics
      });
      if (tagInfo.synonyms.length > 0) {
        confirmText += " " + _I18n.default.t("tagging.delete_confirm_synonyms", {
          count: tagInfo.synonyms.length
        });
      }
      this.dialog.deleteConfirm({
        message: confirmText,
        didConfirm: () => {
          return this.tag.destroyRecord().then(() => this.transitionToRoute("tags.index")).catch(() => this.dialog.alert(_I18n.default.t("generic_error")));
        }
      });
    },
    changeTagNotificationLevel(notificationLevel) {
      this.tagNotification.update({
        notification_level: notificationLevel
      }).then(response => {
        const payload = response.responseJson;
        this.tagNotification.set("notification_level", notificationLevel);
        this.currentUser.setProperties({
          watched_tags: payload.watched_tags,
          watching_first_post_tags: payload.watching_first_post_tags,
          tracked_tags: payload.tracked_tags,
          muted_tags: payload.muted_tags,
          regular_tags: payload.regular_tags
        });
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "createTopicDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "createTopicDisabled"), _obj), _applyDecoratedDescriptor(_obj, "navItems", [_dec2], Object.getOwnPropertyDescriptor(_obj, "navItems"), _obj), _applyDecoratedDescriptor(_obj, "_showFooter", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj), _applyDecoratedDescriptor(_obj, "footerMessage", [_dec4], Object.getOwnPropertyDescriptor(_obj, "footerMessage"), _obj), _applyDecoratedDescriptor(_obj, "showDismissRead", [_dec5], Object.getOwnPropertyDescriptor(_obj, "showDismissRead"), _obj), _applyDecoratedDescriptor(_obj, "showResetNew", [_dec6], Object.getOwnPropertyDescriptor(_obj, "showResetNew"), _obj), _applyDecoratedDescriptor(_obj, "resetNew", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resetNew"), _obj), _applyDecoratedDescriptor(_obj, "showInserted", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showInserted"), _obj), _applyDecoratedDescriptor(_obj, "changeSort", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changeSort"), _obj), _applyDecoratedDescriptor(_obj, "changePeriod", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changePeriod"), _obj), _applyDecoratedDescriptor(_obj, "toggleInfo", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleInfo"), _obj), _applyDecoratedDescriptor(_obj, "refresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "refresh"), _obj), _applyDecoratedDescriptor(_obj, "deleteTag", [_object.action], Object.getOwnPropertyDescriptor(_obj, "deleteTag"), _obj), _applyDecoratedDescriptor(_obj, "changeTagNotificationLevel", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changeTagNotificationLevel"), _obj)), _obj)));
  _exports.default = _default;
});