define("discourse/initializers/read-only", ["exports", "discourse-common/utils/decorators"], function (_exports, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Subscribe to "read-only" status change events via the Message Bus
  var _default = (_obj = {
    name: "read-only",
    after: "message-bus",
    initialize(container) {
      this.messageBus = container.lookup("service:message-bus");
      this.site = container.lookup("service:site");
      this.messageBus.subscribe("/site/read-only", this.onMessage);
    },
    teardown() {
      this.messageBus.unsubscribe("/site/read-only", this.onMessage);
    },
    onMessage(enabled) {
      this.site.set("isReadOnly", enabled);
    }
  }, (_applyDecoratedDescriptor(_obj, "onMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onMessage"), _obj)), _obj);
  _exports.default = _default;
});