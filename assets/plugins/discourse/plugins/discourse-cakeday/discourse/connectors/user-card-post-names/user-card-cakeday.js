define("discourse/plugins/discourse-cakeday/discourse/connectors/user-card-post-names/user-card-cakeday", ["exports", "discourse/plugins/discourse-cakeday/discourse/lib/cakeday"], function (_exports, _cakeday) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/plugins/discourse-cakeday/discourse/lib/cakeday"eaimeta@70e063a35619d71f
  var _default = {
    setupComponent(_ref, component) {
      let {
        user
      } = _ref;
      component.set("isCakeday", (0, _cakeday.cakeday)(user.cakedate));
      component.set("isBirthday", (0, _cakeday.birthday)(user.birthdate));
      component.set("cakedayTitle", (0, _cakeday.cakedayTitle)(user, this.currentUser));
      component.set("birthdayTitle", (0, _cakeday.birthdayTitle)(user, this.currentUser));
    }
  };
  _exports.default = _default;
});