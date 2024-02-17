define("discourse/models/post-action-type", ["exports", "discourse/models/rest", "@ember/object/computed"], function (_exports, _rest, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.MAX_MESSAGE_LENGTH = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/rest",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  const MAX_MESSAGE_LENGTH = 500;
  _exports.MAX_MESSAGE_LENGTH = MAX_MESSAGE_LENGTH;
  var _default = _rest.default.extend({
    notCustomFlag: (0, _computed.not)("is_custom_flag")
  });
  _exports.default = _default;
});