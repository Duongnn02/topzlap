define("discourse/adapters/email-template", ["exports", "discourse/adapters/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/adapters/rest"eaimeta@70e063a35619d71f
  var _default = _rest.default.extend({
    basePath() {
      return "/admin/customize/";
    }
  });
  _exports.default = _default;
});