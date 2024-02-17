define("discourse/routes/user-topic-list", ["exports", "discourse/routes/discourse", "discourse/mixins/viewing-action-type", "discourse/lib/topic-list-tracker"], function (_exports, _discourse, _viewingActionType, _topicListTracker) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/mixins/viewing-action-type",0,"discourse/lib/topic-list-tracker"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend(_viewingActionType.default, {
    renderTemplate() {
      this.render("user-topics-list");
    },
    setupController(controller, model) {
      (0, _topicListTracker.setTopicList)(model);
      const userActionType = this.userActionType;
      this.controllerFor("user").set("userActionType", userActionType);
      this.controllerFor("user-activity").set("userActionType", userActionType);
      this.controllerFor("user-topics-list").setProperties({
        model,
        hideCategory: false
      });
    }
  });
  _exports.default = _default;
});