define("discourse/initializers/sticky-avatars", ["exports", "discourse/lib/sticky-avatars"], function (_exports, _stickyAvatars) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/sticky-avatars"eaimeta@70e063a35619d71f
  var _default = {
    name: "sticky-avatars",
    after: "inject-objects",
    initialize(container) {
      this._stickyAvatars = _stickyAvatars.default.init(container);
    },
    teardown() {
      this._stickyAvatars?.destroy();
    }
  };
  _exports.default = _default;
});