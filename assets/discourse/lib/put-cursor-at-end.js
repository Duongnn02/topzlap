define("discourse/lib/put-cursor-at-end", ["exports", "discourse-common/lib/helpers", "discourse/lib/safari-hacks"], function (_exports, _helpers, _safariHacks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"discourse/lib/safari-hacks"eaimeta@70e063a35619d71f
  function _default(element) {
    const caps = (0, _helpers.helperContext)().capabilities;
    if (caps.isApple && _safariHacks.default.touchstartEvent) {
      _safariHacks.default.touchstartEvent(element);
    } else {
      element.focus();
    }
    const len = element.value.length;
    element.setSelectionRange(len, len);

    // Scroll to the bottom, in case we're in a tall textarea
    element.scrollTop = 999999;
  }
});