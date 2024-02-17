define("discourse/routes/topic-from-params", ["exports", "discourse/routes/discourse", "discourse/lib/url", "discourse/models/draft", "@ember/utils", "discourse-common/config/environment", "@ember/runloop", "@ember/object", "@ember/service"], function (_exports, _discourse, _url, _draft, _utils, _environment, _runloop, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/lib/url",0,"discourse/models/draft",0,"@ember/utils",0,"discourse-common/config/environment",0,"@ember/runloop",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // This route is used for retrieving a topic based on params
  var _default = _discourse.default.extend((_obj = {
    composer: (0, _service.inject)(),
    // Avoid default model hook
    model(params) {
      params = params || {};
      params.track_visit = true;
      const topic = this.modelFor("topic");
      const postStream = topic.postStream;

      // I sincerely hope no topic gets this many posts
      if (params.nearPost === "last") {
        params.nearPost = 999999999;
      }
      params.forceLoad = true;
      return postStream.refresh(params).then(() => params).catch(e => {
        if (!(0, _environment.isTesting)()) {
          // eslint-disable-next-line no-console
          console.log("Could not view topic", e);
        }
        params._loading_error = true;
        return params;
      });
    },
    afterModel() {
      const topic = this.modelFor("topic");
      if (topic.isPrivateMessage && topic.suggested_topics) {
        this.pmTopicTrackingState.startTracking();
      }
    },
    deactivate() {
      this._super(...arguments);
      this.controllerFor("topic").unsubscribe();
    },
    setupController(controller, params, _ref) {
      let {
        _discourse_anchor
      } = _ref;
      // Don't do anything else if we couldn't load
      // TODO: Tests require this but it seems bad
      if (params._loading_error) {
        return;
      }
      const topicController = this.controllerFor("topic");
      const topic = this.modelFor("topic");
      const postStream = topic.postStream;

      // TODO we are seeing errors where closest post is null and this is exploding
      // we need better handling and logging for this condition.

      // there are no closestPost for hidden topics
      if (topic.view_hidden) {
        return;
      }

      // The post we requested might not exist. Let's find the closest post
      const closestPost = postStream.closestPostForPostNumber(params.nearPost || 1);
      const closest = closestPost.post_number;
      topicController.setProperties({
        "model.currentPost": closest,
        enteredIndex: topic.postStream.progressIndexOfPost(closestPost),
        enteredAt: Date.now().toString(),
        userLastReadPostNumber: topic.last_read_post_number,
        highestPostNumber: topic.highest_post_number
      });
      this.appEvents.trigger("page:topic-loaded", topic);
      topicController.subscribe();

      // Highlight our post after the next render
      (0, _runloop.schedule)("afterRender", () => this.appEvents.trigger("post:highlight", closest));
      const opts = {};
      if (document.location.hash) {
        opts.anchor = document.location.hash.slice(1);
      } else if (_discourse_anchor) {
        opts.anchor = _discourse_anchor;
      }
      _url.default.jumpToPost(closest, opts);

      // completely clear out all the bookmark related attributes
      // because they are not in the response if bookmarked == false
      if (closestPost && !closestPost.bookmarked) {
        closestPost.clearBookmark();
      }
      if (!(0, _utils.isEmpty)(topic.draft)) {
        this.composer.open({
          draft: _draft.default.getLocal(topic.draft_key, topic.draft),
          draftKey: topic.draft_key,
          draftSequence: topic.draft_sequence,
          ignoreIfChanged: true,
          topic
        });
      }
    },
    willTransition() {
      this.controllerFor("topic").set("previousURL", document.location.pathname);

      // NOTE: omitting this return can break the back button when transitioning quickly between
      // topics and the latest page.
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "willTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "willTransition"), _obj)), _obj));
  _exports.default = _default;
});