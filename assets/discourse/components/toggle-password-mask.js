define("discourse/components/toggle-password-mask", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @action={{@togglePasswordMask}}
    @label={{if @maskPassword "login.show_password" "login.hide_password"}}
    @class="btn-link toggle-password-mask"
    @title={{if
      @maskPassword
      "login.show_password_title"
      "login.hide_password_title"
    }}
  />
  */
  {
    "id": "bIrUwg9P",
    "block": "[[[8,[39,0],null,[[\"@action\",\"@label\",\"@class\",\"@title\"],[[30,1],[52,[30,2],\"login.show_password\",\"login.hide_password\"],\"btn-link toggle-password-mask\",[52,[30,2],\"login.show_password_title\",\"login.hide_password_title\"]]],null]],[\"@togglePasswordMask\",\"@maskPassword\"],false,[\"d-button\",\"if\"]]",
    "moduleName": "discourse/components/toggle-password-mask.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});