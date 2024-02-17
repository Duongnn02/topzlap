define("discourse/initializers/banner", ["exports", "@ember/object", "discourse-common/utils/decorators", "discourse/lib/preload-store"], function (_exports, _object, _decorators, _preloadStore) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse-common/utils/decorators",0,"discourse/lib/preload-store"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = (_obj = {
    name: "banner",
    after: "message-bus",
    initialize(container) {
      this.site = container.lookup("service:site");
      this.messageBus = container.lookup("service:message-bus");
      const banner = _object.default.create(_preloadStore.default.get("banner") || {});
      this.site.set("banner", banner);
      this.messageBus.subscribe("/site/banner", this.onMessage);
    },
    teardown() {
      this.messageBus.unsubscribe("/site/banner", this.onMessage);
    },
    onMessage() {
      let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.site.set("banner", _object.default.create(data));
    }
  }, (_applyDecoratedDescriptor(_obj, "onMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onMessage"), _obj)), _obj);
  _exports.default = _default;
});