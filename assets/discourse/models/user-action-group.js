define("discourse/models/user-action-group", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _object.default.extend({
    push(item) {
      if (!this.items) {
        this.items = [];
      }
      return this.items.push(item);
    }
  });
  _exports.default = _default;
});