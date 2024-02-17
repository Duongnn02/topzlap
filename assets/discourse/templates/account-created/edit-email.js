define("discourse/templates/account-created/edit-email", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="ac-message">
    <ActivationEmailForm @email={{this.newEmail}} />
  </div>
  
  <div class="activation-controls">
    <DButton
      @action={{action "changeEmail"}}
      @label="login.submit_new_email"
      @disabled={{this.submitDisabled}}
      @class="btn-primary"
    />
    <DButton @action={{action "cancel"}} @label="cancel" @class="edit-cancel" />
  </div>
  */
  {
    "id": "5CNx4TDw",
    "block": "[[[10,0],[14,0,\"ac-message\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@email\"],[[30,0,[\"newEmail\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"activation-controls\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@disabled\",\"@class\"],[[28,[37,2],[[30,0],\"changeEmail\"],null],\"login.submit_new_email\",[30,0,[\"submitDisabled\"]],\"btn-primary\"]],null],[1,\"\\n  \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@class\"],[[28,[37,2],[[30,0],\"cancel\"],null],\"cancel\",\"edit-cancel\"]],null],[1,\"\\n\"],[13]],[],false,[\"activation-email-form\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/account-created/edit-email.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});