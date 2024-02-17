define("discourse/lib/flag-targets/topic-flag", ["exports", "discourse/models/action-summary", "@ember/object", "discourse/lib/flag-targets/flag"], function (_exports, _actionSummary, _object, _flag) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/action-summary",0,"@ember/object",0,"discourse/lib/flag-targets/flag"eaimeta@70e063a35619d71f
  class TopicFlag extends _flag.default {
    title() {
      return "flagging_topic.title";
    }
    targetsTopic() {
      return true;
    }
    customSubmitLabel() {
      return "flagging_topic.notify_action";
    }
    submitLabel() {
      return "flagging_topic.action";
    }
    flagCreatedEvent() {
      return "topic:flag-created";
    }
    flagsAvailable(flagController, site, model) {
      let lookup = _object.default.create();
      model.actions_summary.forEach(a => {
        a.flagTopic = model;
        a.actionType = site.topicFlagTypeById(a.id);
        lookup.set(a.actionType.name_key, _actionSummary.default.create(a));
      });
      flagController.set("topicActionByName", lookup);
      return site.topic_flag_types.filter(item => {
        return model.actions_summary.some(a => {
          return a.id === item.id && a.can_act;
        });
      });
    }
    postActionFor(controller) {
      return controller.get(`topicActionByName.${controller.selected.name_key}`);
    }
  }
  _exports.default = TopicFlag;
});