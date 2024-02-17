define("discourse/plugins/discourse-assign/discourse/components/flagged-topic-listener", ["exports", "@ember/component", "@ember/object"], function (_exports, _component, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"@ember/object"eaimeta@70e063a35619d71f
  function assignIfEqual(topic, data) {
    if (topic && topic.id === data.topic_id) {
      (0, _object.set)(topic, "assigned_to_user", data.assigned_to);
    }
  }
  var _default = _component.default.extend({
    didInsertElement() {
      this._super();
      this.messageBus.subscribe("/staff/topic-assignment", data => {
        let flaggedTopics = this.flaggedTopics;
        if (flaggedTopics) {
          flaggedTopics.forEach(ft => assignIfEqual(ft.topic, data));
        } else {
          assignIfEqual(this.topic, data);
        }
      });
    },
    willDestroyElement() {
      this._super();
      this.messageBus.unsubscribe("/staff/topic-assignment");
    }
  });
  _exports.default = _default;
});