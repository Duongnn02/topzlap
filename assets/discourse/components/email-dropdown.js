define("discourse/components/email-dropdown", ["exports", "@ember/object", "select-kit/components/dropdown-select-box", "I18n", "@ember/service"], function (_exports, _object, _dropdownSelectBox, _I18n, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _dropdownSelectBox.default.extend((_obj = {
    router: (0, _service.inject)(),
    classNames: ["email-dropdown"],
    selectKitOptions: {
      icon: "wrench",
      showFullTitle: false
    },
    content: (0, _object.computed)("email", function () {
      const content = [];
      if (this.email.primary) {
        content.push({
          id: "updateEmail",
          icon: "pencil-alt",
          name: _I18n.default.t("user.email.update_email"),
          description: ""
        });
      }
      if (!this.email.primary && this.email.confirmed) {
        content.push({
          id: "setPrimaryEmail",
          icon: "star",
          name: _I18n.default.t("user.email.set_primary"),
          description: ""
        });
      }
      if (!this.email.primary) {
        content.push({
          id: "destroyEmail",
          icon: "times",
          name: _I18n.default.t("user.email.destroy"),
          description: ""
        });
      }
      return content;
    }),
    onChange(id) {
      switch (id) {
        case "updateEmail":
          this.router.transitionTo("preferences.email");
          break;
        case "setPrimaryEmail":
          this.setPrimaryEmail(this.email.email);
          break;
        case "destroyEmail":
          this.destroyEmail(this.email.email);
          break;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "onChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChange"), _obj)), _obj));
  _exports.default = _default;
});