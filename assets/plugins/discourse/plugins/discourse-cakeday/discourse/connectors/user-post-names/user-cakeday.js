define("discourse/plugins/discourse-cakeday/discourse/connectors/user-post-names/user-cakeday", ["exports", "discourse/plugins/discourse-cakeday/discourse/lib/cakeday"], function (_exports, _cakeday) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/plugins/discourse-cakeday/discourse/lib/cakeday"eaimeta@70e063a35619d71f
  var _default = {
    setupComponent(_ref, component) {
      let {
        model
      } = _ref;
      component.set("isCakeday", (0, _cakeday.cakeday)(model.cakedate));
      component.set("isBirthday", (0, _cakeday.birthday)(model.birthdate));
      component.set("cakedayTitle", (0, _cakeday.cakedayTitle)(model, this.currentUser));
      component.set("birthdayTitle", (0, _cakeday.birthdayTitle)(model, this.currentUser));
    }
  };
  _exports.default = _default;
});