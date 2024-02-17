define("discourse/plugins/discourse-assign/discourse/components/assigned-topic-list-item", ["exports", "discourse/components/topic-list-item", "@ember/object/computed"], function (_exports, _topicListItem, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/topic-list-item",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _topicListItem.default.extend({
    classNames: ["assigned-topic-list-item"],
    isPrivateMessage: (0, _computed.equal)("topic.archetype", "private_message")
  });
  _exports.default = _default;
});