define("discourse/templates/modal/activation-resent", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    {{html-safe
      (i18n "login.sent_activation_email_again" currentEmail=this.currentEmail)
    }}
  </DModalBody>
  
  <ModalFooterClose @closeModal={{route-action "closeModal"}} />
  */
  {
    "id": "mvOQkscp",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,1],[[28,[37,2],[\"login.sent_activation_email_again\"],[[\"currentEmail\"],[[30,0,[\"currentEmail\"]]]]]],null]],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[8,[39,3],null,[[\"@closeModal\"],[[28,[37,4],[\"closeModal\"],null]]],null]],[],false,[\"d-modal-body\",\"html-safe\",\"i18n\",\"modal-footer-close\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/activation-resent.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});