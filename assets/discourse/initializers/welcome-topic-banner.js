define("discourse/initializers/welcome-topic-banner", ["exports", "discourse-common/utils/decorators"], function (_exports, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = (_obj = {
    name: "welcome-topic-banner",
    after: "message-bus",
    initialize(container) {
      this.site = container.lookup("service:site");
      this.messageBus = container.lookup("service:message-bus");
      if (this.site.show_welcome_topic_banner) {
        this.messageBus.subscribe("/site/welcome-topic-banner", this.onMessage);
      }
    },
    teardown() {
      this.messageBus.unsubscribe("/site/welcome-topic-banner", this.onMessage);
    },
    onMessage(disabled) {
      this.site.set("show_welcome_topic_banner", disabled);
    }
  }, (_applyDecoratedDescriptor(_obj, "onMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onMessage"), _obj)), _obj);
  _exports.default = _default;
});