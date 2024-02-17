define("discourse/initializers/message-bus", ["exports", "discourse-common/config/environment", "discourse-common/lib/get-url", "discourse/lib/ajax", "discourse/lib/user-presence"], function (_exports, _environment, _getUrl, _ajax, _userPresence) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/config/environment",0,"discourse-common/lib/get-url",0,"discourse/lib/ajax",0,"discourse/lib/user-presence"eaimeta@70e063a35619d71f
  // Initialize the message bus to receive messages.
  const LONG_POLL_AFTER_UNSEEN_TIME = 1200000; // 20 minutes
  const CONNECTIVITY_ERROR_CLASS = "message-bus-offline";
  function updateConnectivityIndicator(stat) {
    if (stat === "error") {
      document.documentElement.classList.add(CONNECTIVITY_ERROR_CLASS);
    } else {
      document.documentElement.classList.remove(CONNECTIVITY_ERROR_CLASS);
    }
  }
  function ajax(opts) {
    if (opts.complete) {
      const oldComplete = opts.complete;
      opts.complete = function (xhr, stat) {
        (0, _ajax.handleLogoff)(xhr);
        oldComplete(xhr, stat);
        updateConnectivityIndicator(stat);
      };
    } else {
      opts.complete = _ajax.handleLogoff;
    }
    return $.ajax(opts);
  }
  var _default = {
    name: "message-bus",
    after: "inject-objects",
    initialize(container) {
      // We don't use the message bus in testing
      if ((0, _environment.isTesting)()) {
        return;
      }
      const messageBus = container.lookup("service:message-bus"),
        user = container.lookup("service:current-user"),
        siteSettings = container.lookup("service:site-settings");
      messageBus.alwaysLongPoll = !(0, _environment.isProduction)();
      messageBus.shouldLongPollCallback = () => (0, _userPresence.default)({
        userUnseenTime: LONG_POLL_AFTER_UNSEEN_TIME
      });

      // we do not want to start anything till document is complete
      messageBus.stop();

      // This will notify MessageBus to force a long poll after user becomes
      // present
      // When 20 minutes pass we stop long polling due to "shouldLongPollCallback".
      (0, _userPresence.onPresenceChange)({
        unseenTime: LONG_POLL_AFTER_UNSEEN_TIME,
        callback: present => {
          if (present && messageBus.onVisibilityChange) {
            messageBus.onVisibilityChange();
          }
        }
      });
      if (siteSettings.login_required && !user) {
        // Endpoint is not available in this case, so don't try
        return;
      }

      // jQuery ready is called on "interactive" we want "complete"
      // Possibly change to document.addEventListener('readystatechange',...
      // but would only stop a handful of interval, message bus being delayed by
      // 500ms on load is fine. stuff that needs to catch up correctly should
      // pass in a position
      const interval = setInterval(() => {
        if (document.readyState === "complete") {
          clearInterval(interval);
          messageBus.start();
        }
      }, 500);
      messageBus.callbackInterval = siteSettings.anon_polling_interval;
      messageBus.backgroundCallbackInterval = siteSettings.background_polling_interval;
      messageBus.baseUrl = siteSettings.long_polling_base_url.replace(/\/$/, "") + "/";
      messageBus.enableChunkedEncoding = siteSettings.enable_chunked_encoding;
      if (messageBus.baseUrl !== "/") {
        messageBus.ajax = function (opts) {
          opts.headers = opts.headers || {};
          opts.headers["X-Shared-Session-Key"] = $("meta[name=shared_session_key]").attr("content");
          if ((0, _userPresence.default)()) {
            opts.headers["Discourse-Present"] = "true";
          }
          return ajax(opts);
        };
      } else {
        messageBus.ajax = function (opts) {
          opts.headers = opts.headers || {};
          if ((0, _userPresence.default)()) {
            opts.headers["Discourse-Present"] = "true";
          }
          return ajax(opts);
        };
        messageBus.baseUrl = (0, _getUrl.default)("/");
      }
      if (user) {
        messageBus.callbackInterval = siteSettings.polling_interval;
      }
    }
  };
  _exports.default = _default;
});