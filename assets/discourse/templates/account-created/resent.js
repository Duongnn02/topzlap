define("discourse/templates/account-created/resent", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="ac-message">
    {{#if this.email}}
      {{html-safe
        (i18n "login.sent_activation_email_again" currentEmail=this.email)
      }}
    {{else}}
      {{i18n "login.sent_activation_email_again_generic"}}
    {{/if}}
  </div>
  */
  {
    "id": "7iSEQUMF",
    "block": "[[[10,0],[14,0,\"ac-message\"],[12],[1,\"\\n\"],[41,[30,0,[\"email\"]],[[[1,\"    \"],[1,[28,[35,1],[[28,[37,2],[\"login.sent_activation_email_again\"],[[\"currentEmail\"],[[30,0,[\"email\"]]]]]],null]],[1,\"\\n\"]],[]],[[[1,\"    \"],[1,[28,[35,2],[\"login.sent_activation_email_again_generic\"],null]],[1,\"\\n\"]],[]]],[13]],[],false,[\"if\",\"html-safe\",\"i18n\"]]",
    "moduleName": "discourse/templates/account-created/resent.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});