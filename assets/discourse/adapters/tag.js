define("discourse/adapters/tag", ["exports", "discourse/adapters/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/adapters/rest"eaimeta@70e063a35619d71f
  var _default = _rest.default.extend({
    pathFor(store, type, id) {
      return id ? `/tag/${id}` : `/tags`;
    }
  });
  _exports.default = _default;
});