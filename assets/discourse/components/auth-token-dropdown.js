define("discourse/components/auth-token-dropdown", ["exports", "select-kit/components/dropdown-select-box", "I18n", "@ember/object"], function (_exports, _dropdownSelectBox, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    classNames: ["auth-token-dropdown"],
    selectKitOptions: {
      icon: "wrench",
      showFullTitle: false
    },
    content: (0, _object.computed)(function () {
      return [{
        id: "notYou",
        icon: "user-times",
        name: _I18n.default.t("user.auth_tokens.not_you"),
        description: ""
      }, {
        id: "logOut",
        icon: "sign-out-alt",
        name: _I18n.default.t("user.log_out"),
        description: ""
      }];
    }),
    actions: {
      onChange(id) {
        switch (id) {
          case "notYou":
            this.showToken(this.token);
            break;
          case "logOut":
            this.revokeAuthToken(this.token);
            break;
        }
      }
    }
  });
  _exports.default = _default;
});