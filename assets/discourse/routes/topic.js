define("discourse/routes/topic", ["exports", "@ember/runloop", "discourse-common/lib/later", "discourse/routes/discourse", "discourse/lib/url", "discourse/models/topic", "@ember/object", "@ember/utils", "@ember/service", "discourse/lib/topic-list-tracker", "discourse/lib/show-modal", "discourse/lib/flag-targets/topic-flag", "discourse/lib/flag-targets/post-flag"], function (_exports, _runloop, _later, _discourse, _url, _topic, _object, _utils, _service, _topicListTracker, _showModal, _topicFlag, _postFlag) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/routes/discourse",0,"discourse/lib/url",0,"discourse/models/topic",0,"@ember/object",0,"@ember/utils",0,"@ember/service",0,"discourse/lib/topic-list-tracker",0,"discourse/lib/show-modal",0,"discourse/lib/flag-targets/topic-flag",0,"discourse/lib/flag-targets/post-flag"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const SCROLL_DELAY = 500;
  const TopicRoute = _discourse.default.extend((_obj = {
    composer: (0, _service.inject)(),
    screenTrack: (0, _service.inject)(),
    scheduledReplace: null,
    lastScrollPos: null,
    isTransitioning: false,
    redirect() {
      return this.redirectIfLoginRequired();
    },
    queryParams: {
      filter: {
        replace: true
      },
      username_filters: {
        replace: true
      }
    },
    titleToken() {
      const model = this.modelFor("topic");
      if (model) {
        if (model.get("errorHtml")) {
          return model.get("errorTitle");
        }
        const result = model.get("unicode_title") || model.get("title"),
          cat = model.get("category");

        // Only display uncategorized in the title tag if it was renamed
        if (this.siteSettings.topic_page_title_includes_category && cat && !(cat.get("isUncategorizedCategory") && cat.get("name").toLowerCase() === "uncategorized")) {
          let catName = cat.get("name");
          const parentCategory = cat.get("parentCategory");
          if (parentCategory) {
            catName = parentCategory.get("name") + " / " + catName;
          }
          return [result, catName];
        }
        return result;
      }
    },
    showInvite() {
      let invitePanelTitle;
      if (this.isPM) {
        invitePanelTitle = "topic.invite_private.title";
      } else if (this.invitingToTopic) {
        invitePanelTitle = "topic.invite_reply.title";
      } else {
        invitePanelTitle = "user.invited.create";
      }
      (0, _showModal.default)("share-and-invite", {
        modalClass: "share-and-invite",
        panels: [{
          id: "invite",
          title: invitePanelTitle,
          model: {
            inviteModel: this.modelFor("topic")
          }
        }]
      });
    },
    showFlags(model) {
      let controller = (0, _showModal.default)("flag", {
        model
      });
      controller.setProperties({
        flagTarget: new _postFlag.default()
      });
    },
    showFlagTopic() {
      const model = this.modelFor("topic");
      let controller = (0, _showModal.default)("flag", {
        model
      });
      controller.setProperties({
        flagTarget: new _topicFlag.default()
      });
    },
    showPagePublish() {
      const model = this.modelFor("topic");
      (0, _showModal.default)("publish-page", {
        model,
        title: "topic.publish_page.title"
      });
    },
    showTopicTimerModal() {
      const model = this.modelFor("topic");
      if (!model.get("topic_timer")) {
        model.set("topic_timer", {});
      }
      (0, _showModal.default)("edit-topic-timer", {
        model
      });
    },
    showTopicSlowModeUpdate() {
      const model = this.modelFor("topic");
      (0, _showModal.default)("edit-slow-mode", {
        model
      });
    },
    showChangeTimestamp() {
      (0, _showModal.default)("change-timestamp", {
        model: this.modelFor("topic"),
        title: "topic.change_timestamp.title"
      });
    },
    showFeatureTopic() {
      (0, _showModal.default)("feature-topic", {
        model: this.modelFor("topic"),
        title: "topic.feature_topic.title"
      });
      this.controllerFor("feature_topic").reset();
    },
    showHistory(model, revision) {
      let historyController = (0, _showModal.default)("history", {
        model,
        modalClass: "history-modal"
      });
      historyController.refresh(model.get("id"), revision || "latest");
      historyController.set("post", model);
      historyController.set("topicController", this.controllerFor("topic"));
    },
    showGrantBadgeModal() {
      (0, _showModal.default)("grant-badge", {
        model: this.modelFor("topic"),
        title: "admin.badges.grant_badge"
      });
    },
    showRawEmail(model) {
      (0, _showModal.default)("raw-email", {
        model
      });
      this.controllerFor("raw_email").loadRawEmail(model.get("id"));
    },
    moveToTopic() {
      (0, _showModal.default)("move-to-topic", {
        model: this.modelFor("topic"),
        title: "topic.move_to.title"
      });
    },
    changeOwner() {
      (0, _showModal.default)("change-owner", {
        model: this.modelFor("topic"),
        title: "topic.change_owner.title"
      });
    },
    postChangedRoute(currentPost) {
      // do nothing if we are transitioning to another route
      if (this.isTransitioning || TopicRoute.disableReplaceState) {
        return;
      }
      const topic = this.modelFor("topic");
      if (topic && currentPost) {
        let postUrl;
        if (currentPost > 1) {
          postUrl = topic.urlForPostNumber(currentPost);
        } else {
          postUrl = topic.url;
        }
        if (this._router.currentRoute.queryParams) {
          let searchParams;
          Object.entries(this._router.currentRoute.queryParams).map(_ref => {
            let [key, value] = _ref;
            if (!searchParams) {
              searchParams = new URLSearchParams();
            }
            searchParams.append(key, value);
          });
          if (searchParams) {
            postUrl += `?${searchParams.toString()}`;
          }
        }
        (0, _runloop.cancel)(this.scheduledReplace);
        this.setProperties({
          lastScrollPos: parseInt($(document).scrollTop(), 10),
          scheduledReplace: (0, _later.default)(this, "_replaceUnlessScrolling", postUrl, SCROLL_DELAY)
        });
      }
    },
    didTransition() {
      const controller = this.controllerFor("topic");
      controller._showFooter();
      const topicId = controller.get("model.id");
      (0, _topicListTracker.setTopicId)(topicId);
      return true;
    },
    willTransition(transition) {
      this._super(...arguments);
      (0, _runloop.cancel)(this.scheduledReplace);
      this.set("isTransitioning", true);
      transition.catch(() => this.set("isTransitioning", false));
      return true;
    },
    // replaceState can be very slow on Android Chrome. This function debounces replaceState
    // within a topic until scrolling stops
    _replaceUnlessScrolling(url) {
      const currentPos = parseInt($(document).scrollTop(), 10);
      if (currentPos === this.lastScrollPos) {
        _url.default.replaceState(url);
        return;
      }
      this.setProperties({
        lastScrollPos: currentPos,
        scheduledReplace: (0, _later.default)(this, "_replaceUnlessScrolling", url, SCROLL_DELAY)
      });
    },
    setupParams(topic, params) {
      const postStream = topic.get("postStream");
      postStream.set("filter", (0, _object.get)(params, "filter"));
      const usernames = (0, _object.get)(params, "username_filters"),
        userFilters = postStream.get("userFilters");
      userFilters.clear();
      if (!(0, _utils.isEmpty)(usernames) && usernames !== "undefined") {
        userFilters.addObjects(usernames.split(","));
      }
      return topic;
    },
    model(params, transition) {
      if (params.slug.match(_topic.ID_CONSTRAINT)) {
        transition.abort();
        _url.default.routeTo(`/t/topic/${params.slug}/${params.id}`, {
          replaceURL: true
        });
        return;
      }
      const queryParams = transition.to.queryParams;
      let topic = this.modelFor("topic");
      if (topic && topic.get("id") === parseInt(params.id, 10)) {
        this.setupParams(topic, queryParams);
        return topic;
      } else {
        let props = Object.assign({}, params);
        delete props.username_filters;
        delete props.filter;
        topic = this.store.createRecord("topic", props);
        return this.setupParams(topic, queryParams);
      }
    },
    activate() {
      this._super(...arguments);
      this.set("isTransitioning", false);
      const topic = this.modelFor("topic");
      this.session.set("lastTopicIdViewed", parseInt(topic.get("id"), 10));
    },
    deactivate() {
      this._super(...arguments);
      this.searchService.set("searchContext", null);
      const topicController = this.controllerFor("topic");
      const postStream = topicController.get("model.postStream");
      postStream.cancelFilter();
      topicController.set("multiSelect", false);
      this.composer.set("topic", null);
      this.screenTrack.stop();
      this.appEvents.trigger("header:hide-topic");
      this.controllerFor("topic").set("model", null);
    },
    setupController(controller, model) {
      // In case we navigate from one topic directly to another
      this.set("isTransitioning", false);
      controller.setProperties({
        model,
        editingTopic: false,
        firstPostExpanded: false
      });
      this.searchService.set("searchContext", model.get("searchContext"));

      // close the multi select when switching topics
      controller.set("multiSelect", false);
      controller.get("quoteState").clear();
      this.composer.set("topic", model);
      this.topicTrackingState.trackIncoming("all");

      // We reset screen tracking every time a topic is entered
      this.screenTrack.start(model.get("id"), controller);
      (0, _runloop.schedule)("afterRender", () => this.appEvents.trigger("header:update-topic", model));
    }
  }, (_applyDecoratedDescriptor(_obj, "showInvite", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showInvite"), _obj), _applyDecoratedDescriptor(_obj, "showFlags", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showFlags"), _obj), _applyDecoratedDescriptor(_obj, "showFlagTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showFlagTopic"), _obj), _applyDecoratedDescriptor(_obj, "showPagePublish", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showPagePublish"), _obj), _applyDecoratedDescriptor(_obj, "showTopicTimerModal", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showTopicTimerModal"), _obj), _applyDecoratedDescriptor(_obj, "showTopicSlowModeUpdate", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showTopicSlowModeUpdate"), _obj), _applyDecoratedDescriptor(_obj, "showChangeTimestamp", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showChangeTimestamp"), _obj), _applyDecoratedDescriptor(_obj, "showFeatureTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showFeatureTopic"), _obj), _applyDecoratedDescriptor(_obj, "showHistory", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showHistory"), _obj), _applyDecoratedDescriptor(_obj, "showGrantBadgeModal", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showGrantBadgeModal"), _obj), _applyDecoratedDescriptor(_obj, "showRawEmail", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showRawEmail"), _obj), _applyDecoratedDescriptor(_obj, "moveToTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "moveToTopic"), _obj), _applyDecoratedDescriptor(_obj, "changeOwner", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changeOwner"), _obj), _applyDecoratedDescriptor(_obj, "postChangedRoute", [_object.action], Object.getOwnPropertyDescriptor(_obj, "postChangedRoute"), _obj), _applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj), _applyDecoratedDescriptor(_obj, "willTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "willTransition"), _obj)), _obj));
  var _default = TopicRoute;
  _exports.default = _default;
});