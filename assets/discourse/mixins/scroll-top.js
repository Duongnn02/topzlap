define("discourse/mixins/scroll-top", ["exports", "discourse/lib/url", "discourse-common/config/environment", "@ember/runloop"], function (_exports, _url, _environment, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.scrollTop = scrollTop;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse-common/config/environment",0,"@ember/runloop"eaimeta@70e063a35619d71f
  const context = {
    _scrollTop() {
      if ((0, _environment.isTesting)()) {
        return;
      }
      document.documentElement.scrollTop = 0;
    }
  };
  function scrollTop() {
    if (_url.default.isJumpScheduled()) {
      return;
    }
    (0, _runloop.scheduleOnce)("afterRender", context, context._scrollTop);
  }
});