define("discourse/routes/user-invited-index", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    beforeModel() {
      this.replaceWith("userInvited.show", "pending");
    }
  });
  _exports.default = _default;
});