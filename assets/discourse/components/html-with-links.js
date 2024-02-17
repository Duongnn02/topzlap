define("discourse/components/html-with-links", ["exports", "discourse/lib/click-track", "@ember/component"], function (_exports, _clickTrack, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/click-track",0,"@ember/component"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    click(event) {
      if (event?.target?.tagName === "A") {
        if ((0, _clickTrack.shouldOpenInNewTab)(event.target.href)) {
          (0, _clickTrack.openLinkInNewTab)(event, event.target);
        }
      }
    }
  });
  _exports.default = _default;
});