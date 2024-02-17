define("discourse/templates/modal/forgot-password", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <form>
    <DModalBody @class="forgot-password-modal">
      {{#if this.offerHelp}}
        {{html-safe this.offerHelp}}
      {{else}}
        {{#if this.siteSettings.hide_email_address_taken}}
          <label for="username-or-email">{{i18n
              "forgot_password.invite_no_username"
            }}</label>
          <TextField
            @value={{this.accountEmailOrUsername}}
            @placeholderKey="email"
            @id="username-or-email"
            @autocorrect="off"
            @autocapitalize="off"
          />
        {{else}}
          <label for="username-or-email">{{i18n "forgot_password.invite"}}</label>
          <TextField
            @value={{this.accountEmailOrUsername}}
            @placeholderKey="login.email_placeholder"
            @id="username-or-email"
            @autocorrect="off"
            @autocapitalize="off"
          />
        {{/if}}
      {{/if}}
    </DModalBody>
    <div class="modal-footer">
      {{#if this.offerHelp}}
        <DButton
          @class="btn-large btn-primary"
          @label="forgot_password.button_ok"
          @type="submit"
          @action={{action "ok"}}
        />
        {{#unless this.helpSeen}}
          <DButton
            @class="btn-large"
            @label="forgot_password.button_help"
            @icon="question-circle"
            @action={{action "help"}}
          />
        {{/unless}}
      {{else}}
        <DButton
          @action={{action "resetPassword"}}
          @label="forgot_password.reset"
          @disabled={{this.submitDisabled}}
          @class="btn-primary forgot-password-reset"
          @type="submit"
        />
      {{/if}}
    </div>
  </form>
  */
  {
    "id": "qXmxqc1g",
    "block": "[[[10,\"form\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@class\"],[\"forgot-password-modal\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"offerHelp\"]],[[[1,\"      \"],[1,[28,[35,2],[[30,0,[\"offerHelp\"]]],null]],[1,\"\\n\"]],[]],[[[41,[30,0,[\"siteSettings\",\"hide_email_address_taken\"]],[[[1,\"        \"],[10,\"label\"],[14,\"for\",\"username-or-email\"],[12],[1,[28,[35,3],[\"forgot_password.invite_no_username\"],null]],[13],[1,\"\\n        \"],[8,[39,4],null,[[\"@value\",\"@placeholderKey\",\"@id\",\"@autocorrect\",\"@autocapitalize\"],[[30,0,[\"accountEmailOrUsername\"]],\"email\",\"username-or-email\",\"off\",\"off\"]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[10,\"label\"],[14,\"for\",\"username-or-email\"],[12],[1,[28,[35,3],[\"forgot_password.invite\"],null]],[13],[1,\"\\n        \"],[8,[39,4],null,[[\"@value\",\"@placeholderKey\",\"@id\",\"@autocorrect\",\"@autocapitalize\"],[[30,0,[\"accountEmailOrUsername\"]],\"login.email_placeholder\",\"username-or-email\",\"off\",\"off\"]],null],[1,\"\\n\"]],[]]]],[]]],[1,\"  \"]],[]]]]],[1,\"\\n  \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n\"],[41,[30,0,[\"offerHelp\"]],[[[1,\"      \"],[8,[39,5],null,[[\"@class\",\"@label\",\"@type\",\"@action\"],[\"btn-large btn-primary\",\"forgot_password.button_ok\",\"submit\",[28,[37,6],[[30,0],\"ok\"],null]]],null],[1,\"\\n\"],[41,[51,[30,0,[\"helpSeen\"]]],[[[1,\"        \"],[8,[39,5],null,[[\"@class\",\"@label\",\"@icon\",\"@action\"],[\"btn-large\",\"forgot_password.button_help\",\"question-circle\",[28,[37,6],[[30,0],\"help\"],null]]],null],[1,\"\\n\"]],[]],null]],[]],[[[1,\"      \"],[8,[39,5],null,[[\"@action\",\"@label\",\"@disabled\",\"@class\",\"@type\"],[[28,[37,6],[[30,0],\"resetPassword\"],null],\"forgot_password.reset\",[30,0,[\"submitDisabled\"]],\"btn-primary forgot-password-reset\",\"submit\"]],null],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"if\",\"html-safe\",\"i18n\",\"text-field\",\"d-button\",\"action\",\"unless\"]]",
    "moduleName": "discourse/templates/modal/forgot-password.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});