define("discourse/components/topic-admin-menu-button", ["exports", "discourse/components/mount-widget"], function (_exports, _mountWidget) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/mount-widget"eaimeta@70e063a35619d71f
  var _default = _mountWidget.default.extend({
    classNames: "topic-admin-menu-button-container",
    tagName: "span",
    widget: "topic-admin-menu-button",
    buildArgs() {
      return this.getProperties("topic", "openUpwards", "rightSide");
    }
  });
  _exports.default = _default;
});