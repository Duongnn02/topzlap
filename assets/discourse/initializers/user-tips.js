define("discourse/initializers/user-tips", ["exports", "discourse-common/utils/decorators"], function (_exports, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = (_obj = {
    name: "user-tips",
    after: "message-bus",
    initialize(container) {
      this.currentUser = container.lookup("service:current-user");
      if (!this.currentUser) {
        return;
      }
      this.messageBus = container.lookup("service:message-bus");
      this.site = container.lookup("service:site");
      this.messageBus.subscribe(`/user-tips/${this.currentUser.id}`, this.onMessage);
    },
    teardown() {
      if (this.currentUser) {
        this.messageBus?.unsubscribe(`/user-tips/${this.currentUser.id}`, this.onMessage);
      }
    },
    onMessage(seenUserTips) {
      this.currentUser.set("seen_popups", seenUserTips);
      if (!this.currentUser.user_option) {
        this.currentUser.set("user_option", {});
      }
      this.currentUser.set("user_option.seen_popups", seenUserTips);
      (seenUserTips || []).forEach(userTipId => {
        this.currentUser.hideUserTipForever(Object.keys(this.site.user_tips).find(id => this.site.user_tips[id] === userTipId));
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "onMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onMessage"), _obj)), _obj);
  _exports.default = _default;
});