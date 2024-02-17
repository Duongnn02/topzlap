define("discourse/components/activation-controls", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed"], function (_exports, _component, _templateFactory, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.siteSettings.must_approve_users}}
    <DButton
      @action={{this.sendActivationEmail}}
      @label="login.resend_title"
      @icon="envelope"
      @class="btn-primary resend"
    />
  {{/unless}}
  
  {{#if this.canEditEmail}}
    <DButton
      @action={{this.editActivationEmail}}
      @label="login.change_email"
      @icon="pencil-alt"
      @class="edit-email"
    />
  {{/if}}
  */
  {
    "id": "zniwcV4v",
    "block": "[[[41,[51,[30,0,[\"siteSettings\",\"must_approve_users\"]]],[[[1,\"  \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@icon\",\"@class\"],[[30,0,[\"sendActivationEmail\"]],\"login.resend_title\",\"envelope\",\"btn-primary resend\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canEditEmail\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@icon\",\"@class\"],[[30,0,[\"editActivationEmail\"]],\"login.change_email\",\"pencil-alt\",\"edit-email\"]],null],[1,\"\\n\"]],[]],null]],[],false,[\"unless\",\"d-button\",\"if\"]]",
    "moduleName": "discourse/components/activation-controls.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNames: "activation-controls",
    canEditEmail: (0, _computed.or)("siteSettings.enable_local_logins", "siteSettings.email_editable")
  }));
  _exports.default = _default;
});