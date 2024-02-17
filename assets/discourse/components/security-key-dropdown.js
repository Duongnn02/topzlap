define("discourse/components/security-key-dropdown", ["exports", "select-kit/components/dropdown-select-box", "I18n", "@ember/object"], function (_exports, _dropdownSelectBox, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    classNames: ["security-key-dropdown"],
    selectKitOptions: {
      icon: "wrench",
      showFullTitle: false
    },
    content: (0, _object.computed)(function () {
      const content = [];
      content.push({
        id: "edit",
        icon: "pencil-alt",
        name: _I18n.default.t("user.second_factor.edit")
      });
      content.push({
        id: "disable",
        icon: "trash-alt",
        name: _I18n.default.t("user.second_factor.disable")
      });
      return content;
    }),
    actions: {
      onChange(id) {
        switch (id) {
          case "edit":
            this.editSecurityKey(this.securityKey);
            break;
          case "disable":
            this.disableSingleSecondFactor(this.securityKey);
            break;
        }
      }
    }
  });
  _exports.default = _default;
});