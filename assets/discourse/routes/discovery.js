define("discourse/routes/discovery", ["exports", "discourse/routes/discourse", "discourse/mixins/open-composer", "discourse/models/user", "discourse/mixins/scroll-top", "discourse/lib/topic-list-tracker", "@ember/object"], function (_exports, _discourse, _openComposer, _user, _scrollTop, _topicListTracker, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  /**
    The parent route for all discovery routes.
    Handles the logic for showing the loading spinners.
  **/
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/mixins/open-composer",0,"discourse/models/user",0,"discourse/mixins/scroll-top",0,"discourse/lib/topic-list-tracker",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend(_openComposer.default, (_obj = {
    queryParams: {
      filter: {
        refreshModel: true
      }
    },
    redirect() {
      return this.redirectIfLoginRequired();
    },
    beforeModel(transition) {
      const url = transition.intent.url;
      let matches;
      if ((url === "/" || url === "/latest" || url === "/categories") && !transition.targetName.includes("discovery.top") && _user.default.currentProp("user_option.should_be_redirected_to_top")) {
        _user.default.currentProp("user_option.should_be_redirected_to_top", false);
        const period = _user.default.currentProp("user_option.redirected_to_top.period") || "all";
        this.replaceWith("discovery.top", {
          queryParams: {
            period
          }
        });
      } else if (url && (matches = url.match(/top\/(.*)$/))) {
        if (this.site.periods.includes(matches[1])) {
          this.replaceWith("discovery.top", {
            queryParams: {
              period: matches[1]
            }
          });
        }
      }
    },
    loading() {
      this.controllerFor("discovery").loadingBegan();

      // We don't want loading to bubble
      return true;
    },
    loadingComplete() {
      this.controllerFor("discovery").loadingComplete();
      if (!this.session.get("topicListScrollPosition")) {
        (0, _scrollTop.scrollTop)();
      }
    },
    didTransition() {
      this.send("loadingComplete");
      const model = this.controllerFor("discovery/topics").get("model");
      (0, _topicListTracker.setTopicList)(model);
    },
    clearPin(topic) {
      topic.clearPin();
    },
    createTopic() {
      if (this.get("currentUser.has_topic_draft")) {
        this.openTopicDraft();
      } else {
        this.openComposer(this.controllerFor("discovery/topics"));
      }
    },
    dismissReadTopics(dismissTopics) {
      const operationType = dismissTopics ? "topics" : "posts";
      this.send("dismissRead", operationType);
    },
    dismissRead(operationType) {
      const controller = this.controllerFor("discovery/topics");
      controller.send("dismissRead", operationType, {
        categoryId: controller.get("category.id"),
        includeSubcategories: !controller.noSubcategories
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "loading", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loading"), _obj), _applyDecoratedDescriptor(_obj, "loadingComplete", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadingComplete"), _obj), _applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj), _applyDecoratedDescriptor(_obj, "clearPin", [_object.action], Object.getOwnPropertyDescriptor(_obj, "clearPin"), _obj), _applyDecoratedDescriptor(_obj, "createTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createTopic"), _obj), _applyDecoratedDescriptor(_obj, "dismissReadTopics", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismissReadTopics"), _obj), _applyDecoratedDescriptor(_obj, "dismissRead", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismissRead"), _obj)), _obj));
  _exports.default = _default;
});