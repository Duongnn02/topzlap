define("discourse/plugins/discourse-cakeday/discourse/controllers/cakeday", ["exports", "@ember/controller", "@ember/object/computed"], function (_exports, _controller, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _controller.default.extend({
    cakedayEnabled: (0, _computed.alias)("siteSettings.cakeday_enabled"),
    birthdayEnabled: (0, _computed.alias)("siteSettings.cakeday_birthday_enabled")
  });
  _exports.default = _default;
});