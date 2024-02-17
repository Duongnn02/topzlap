define("discourse/templates/modal/activation-edit", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <ActivationEmailForm @email={{this.newEmail}} />
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @action={{action "changeEmail"}}
      @label="login.submit_new_email"
      @disabled={{this.submitDisabled}}
      @class="btn-primary"
    />
    <DButton @action={{route-action "closeModal"}} @label="close" />
  </div>
  */
  {
    "id": "I/DKuxrq",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@email\"],[[30,0,[\"newEmail\"]]]],null],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@action\",\"@label\",\"@disabled\",\"@class\"],[[28,[37,3],[[30,0],\"changeEmail\"],null],\"login.submit_new_email\",[30,0,[\"submitDisabled\"]],\"btn-primary\"]],null],[1,\"\\n  \"],[8,[39,2],null,[[\"@action\",\"@label\"],[[28,[37,4],[\"closeModal\"],null],\"close\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"activation-email-form\",\"d-button\",\"action\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/activation-edit.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});