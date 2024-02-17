define("discourse/initializers/logout", ["exports", "I18n", "discourse/lib/logout", "discourse-common/utils/decorators"], function (_exports, _I18n, _logout, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/logout",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let _showingLogout = false;

  // Subscribe to "logout" change events via the Message Bus
  var _default = (_obj = {
    name: "logout",
    after: "message-bus",
    initialize(container) {
      this.messageBus = container.lookup("service:message-bus");
      this.dialog = container.lookup("service:dialog");
      this.currentUser = container.lookup("service:current-user");
      if (this.currentUser) {
        this.messageBus.subscribe(`/logout/${this.currentUser.id}`, this.onMessage);
      }
    },
    teardown() {
      if (this.currentUser) {
        this.messageBus.unsubscribe(`/logout/${this.currentUser.id}`, this.onMessage);
      }
    },
    onMessage() {
      if (_showingLogout) {
        return;
      }
      _showingLogout = true;
      this.dialog.alert({
        message: _I18n.default.t("logout"),
        confirmButtonLabel: "home",
        didConfirm: _logout.default,
        didCancel: _logout.default,
        shouldDisplayCancel: false
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "onMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onMessage"), _obj)), _obj);
  _exports.default = _default;
});