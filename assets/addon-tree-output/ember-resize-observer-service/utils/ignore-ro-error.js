define("ember-resize-observer-service/utils/ignore-ro-error", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = ignoreROError;
  const errorMessages = ['ResizeObserver loop limit exceeded', 'ResizeObserver loop completed with undelivered notifications.'];

  /**
   * Ignores "ResizeObserver loop limit exceeded" error in Ember tests.
   *
   * This "error" is safe to ignore as it is just a warning message,
   * telling that the "looping" observation will be skipped in the current frame,
   * and will be delivered in the next one.
   *
   * For some reason, it is fired as an `error` event at `window` failing Ember
   * tests and exploding Sentry with errors that must be ignored.
   */
  function ignoreROError() {
    if (typeof window.onerror !== 'function') {
      return;
    }
    const onError = window.onerror;
    window.onerror = function (message) {
      if (errorMessages.includes(message)) {
        return true;
      } else {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        onError(message, ...args);
      }
    };
  }
});