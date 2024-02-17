define("discourse/components/create-account", ["exports", "@ember/component", "discourse/lib/cookie", "discourse-common/utils/decorators"], function (_exports, _component, _cookie, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse/lib/cookie",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_obj = {
    classNames: ["create-account-body"],
    // used for animating the label inside of inputs
    userInputFocus(event) {
      const userField = event.target.parentElement.parentElement;
      if (!userField.classList.contains("value-entered")) {
        userField.classList.toggle("value-entered");
      }
    },
    // used for animating the label inside of inputs
    userInputFocusOut(event) {
      const userField = event.target.parentElement.parentElement;
      if (event.target.value.length === 0 && userField.classList.contains("value-entered")) {
        userField.classList.toggle("value-entered");
      }
    },
    actionOnEnter(event) {
      if (!this.disabled && event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        this.action();
        return false;
      }
    },
    selectKitFocus(event) {
      const target = document.getElementById(event.target.getAttribute("for"));
      if (target?.classList.contains("select-kit")) {
        event.preventDefault();
        target.querySelector(".select-kit-header").click();
      }
    },
    didInsertElement() {
      this._super(...arguments);
      if ((0, _cookie.default)("email")) {
        this.set("email", (0, _cookie.default)("email"));
      }
      let userTextFields = document.getElementsByClassName("user-fields")[0];
      if (userTextFields) {
        userTextFields = userTextFields.getElementsByClassName("ember-text-field");
      }
      if (userTextFields) {
        for (let element of userTextFields) {
          element.addEventListener("focus", this.userInputFocus);
          element.addEventListener("focusout", this.userInputFocusOut);
        }
      }
      this.element.addEventListener("keydown", this.actionOnEnter);
      this.element.addEventListener("click", this.selectKitFocus);
    },
    willDestroyElement() {
      this._super(...arguments);
      this.element.removeEventListener("keydown", this.actionOnEnter);
      this.element.removeEventListener("click", this.selectKitFocus);
      let userTextFields = document.getElementsByClassName("user-fields")[0];
      if (userTextFields) {
        userTextFields = userTextFields.getElementsByClassName("ember-text-field");
      }
      if (userTextFields) {
        for (let element of userTextFields) {
          element.removeEventListener("focus", this.userInputFocus);
          element.removeEventListener("focusout", this.userInputFocusOut);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "actionOnEnter", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "actionOnEnter"), _obj), _applyDecoratedDescriptor(_obj, "selectKitFocus", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "selectKitFocus"), _obj)), _obj));
  _exports.default = _default;
});