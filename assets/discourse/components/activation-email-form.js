define("discourse/components/activation-email-form", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <p>{{i18n "login.provide_new_email"}}</p>
  <Input @value={{this.email}} class="activate-new-email" />
  */
  {
    "id": "mmaGz38S",
    "block": "[[[10,2],[12],[1,[28,[35,0],[\"login.provide_new_email\"],null]],[13],[1,\"\\n\"],[8,[39,1],[[24,0,\"activate-new-email\"]],[[\"@value\"],[[30,0,[\"email\"]]]],null]],[],false,[\"i18n\",\"input\"]]",
    "moduleName": "discourse/components/activation-email-form.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});