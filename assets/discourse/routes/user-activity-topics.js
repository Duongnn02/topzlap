define("discourse/routes/user-activity-topics", ["exports", "discourse/models/user-action", "discourse/routes/user-topic-list", "@ember/object", "@ember/template", "discourse-common/lib/get-url", "I18n"], function (_exports, _userAction, _userTopicList, _object, _template, _getUrl, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/user-action",0,"discourse/routes/user-topic-list",0,"@ember/object",0,"@ember/template",0,"discourse-common/lib/get-url",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _userTopicList.default.extend((_obj = {
    userActionType: _userAction.default.TYPES.topics,
    model() {
      return this.store.findFiltered("topicList", {
        filter: "topics/created-by/" + this.modelFor("user").get("username_lower")
      }).then(model => {
        // andrei: we agreed that this is an anti pattern,
        // it's better to avoid mutating a rest model like this
        // this place we'll be refactored later
        // see https://github.com/discourse/discourse/pull/14313#discussion_r708784704
        model.set("emptyState", this.emptyState());
        return model;
      });
    },
    afterModel(model, transition) {
      if (!this.isPoppedState(transition)) {
        this.session.set("topicListScrollPosition", null);
      }
    },
    emptyState() {
      const user = this.modelFor("user");
      let title, body;
      if (this.isCurrentUser(user)) {
        title = _I18n.default.t("user_activity.no_topics_title");
        body = (0, _template.htmlSafe)(_I18n.default.t("user_activity.no_topics_body", {
          searchUrl: (0, _getUrl.default)("/search")
        }));
      } else {
        title = _I18n.default.t("user_activity.no_topics_title_others", {
          username: user.username
        });
        body = "";
      }
      return {
        title,
        body
      };
    },
    titleToken() {
      return _I18n.default.t("user_action_groups.4");
    },
    triggerRefresh() {
      this.refresh();
    }
  }, (_applyDecoratedDescriptor(_obj, "triggerRefresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "triggerRefresh"), _obj)), _obj));
  _exports.default = _default;
});