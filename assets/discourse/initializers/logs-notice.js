define("discourse/initializers/logs-notice", ["exports", "discourse/services/logs-notice", "discourse/mixins/singleton"], function (_exports, _logsNotice, _singleton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/services/logs-notice",0,"discourse/mixins/singleton"eaimeta@70e063a35619d71f
  let initializedOnce = false;
  var _default = {
    name: "logs-notice",
    after: "message-bus",
    initialize(container) {
      if (initializedOnce) {
        return;
      }
      const siteSettings = container.lookup("service:site-settings");
      const messageBus = container.lookup("service:message-bus");
      const keyValueStore = container.lookup("service:key-value-store");
      const currentUser = container.lookup("service:current-user");
      _logsNotice.default.reopenClass(_singleton.default, {
        createCurrent() {
          return this.create({
            messageBus,
            keyValueStore,
            siteSettings,
            currentUser
          });
        }
      });
      initializedOnce = true;
    }
  };
  _exports.default = _default;
});