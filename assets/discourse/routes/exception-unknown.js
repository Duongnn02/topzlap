define("discourse/routes/exception-unknown", ["exports", "discourse/routes/unknown"], function (_exports, _unknown) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/unknown"eaimeta@70e063a35619d71f
  var _default = _unknown.default.extend({
    renderTemplate() {
      this.render("unknown");
    }
  });
  _exports.default = _default;
});