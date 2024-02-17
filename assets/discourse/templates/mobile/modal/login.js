define("discourse/templates/mobile/modal/login", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <LoginModal
    @loginName={{this.loginName}}
    @loginPassword={{this.loginPassword}}
    @secondFactorToken={{this.secondFactorToken}}
    @action={{action "login"}}
  >
    <PluginOutlet @name="login-before-modal-body" @connectorTagName="div" />
    <DModalBody @class={{this.modalBodyClasses}}>
      <div class="login-welcome-header">
        <h1 class="login-title">{{i18n "login.header_title"}}</h1>
        <img src={{this.wavingHandURL}} alt="" class="waving-hand" />
        <p class="login-subheader">{{i18n "login.subheader_title"}}</p>
      </div>
      {{#if this.showLoginButtons}}
        <LoginButtons @externalLogin={{action "externalLogin"}} />
      {{/if}}
  
      {{#if this.canLoginLocal}}
        <form id="login-form" method="post">
          <div id="credentials" class={{this.credentialsClass}}>
            <div class="input-group">
              <Input
                @value={{this.loginName}}
                class={{value-entered this.loginName}}
                @type="email"
                id="login-account-name"
                autocorrect="off"
                autocapitalize="off"
                disabled={{this.showSecondFactor}}
                autofocus="autofocus"
              />
              <label class="alt-placeholder" for="login-account-name">{{i18n
                  "login.email_placeholder"
                }}</label>
              {{#if this.showLoginWithEmailLink}}
                <a href id="email-login-link" {{on "click" this.emailLogin}}>
                  {{i18n "email_login.login_link"}}
                </a>
              {{/if}}
            </div>
            <div class="input-group">
              <Input
                @value={{this.loginPassword}}
                class={{value-entered this.loginPassword}}
                @type="password"
                id="login-account-password"
                maxlength="200"
                disabled={{this.showSecondFactor}}
              />
              <label class="alt-placeholder" for="login-account-password">{{i18n
                  "login.password"
                }}</label>
              <a
                href
                id="forgot-password-link"
                {{on "click" this.handleForgotPassword}}
              >{{i18n "forgot_password.action"}}</a>
            </div>
          </div>
          <SecondFactorForm
            @secondFactorMethod={{this.secondFactorMethod}}
            @secondFactorToken={{this.secondFactorToken}}
            @class={{this.secondFactorClass}}
            @backupEnabled={{this.backupEnabled}}
            @isLogin={{true}}
          >
            {{#if this.showSecurityKey}}
              <SecurityKeyForm
                @allowedCredentialIds={{this.securityKeyAllowedCredentialIds}}
                @challenge={{this.securityKeyChallenge}}
                @showSecurityKey={{this.showSecurityKey}}
                @showSecondFactor={{this.showSecondFactor}}
                @secondFactorMethod={{this.secondFactorMethod}}
                @otherMethodAllowed={{this.otherMethodAllowed}}
                @action={{action "authenticateSecurityKey"}}
              />
            {{else}}
              <SecondFactorInput
                @value={{this.secondFactorToken}}
                @inputId="login-second-factor"
                @secondFactorMethod={{this.secondFactorMethod}}
                @backupEnabled={{this.backupEnabled}}
              />
            {{/if}}
          </SecondFactorForm>
        </form>
      {{/if}}
  
    </DModalBody>
  
    <div class="modal-footer">
      {{#if this.canLoginLocal}}
        {{#unless this.showSecurityKey}}
          <DButton
            @action={{action "login"}}
            @id="login-button"
            @icon="unlock"
            @label={{this.loginButtonLabel}}
            @disabled={{this.loginDisabled}}
            @class="btn-large btn-primary"
          />
        {{/unless}}
  
        {{#if this.showSignupLink}}
          <DButton
            @class="btn-large"
            @id="new-account-link"
            @action={{route-action "showCreateAccount"}}
            @label="create_account.title"
          />
        {{/if}}
      {{/if}}
    </div>
  
    <PluginOutlet @name="login-after-modal-footer" @connectorTagName="div" />
  
    <div class={{this.alertClass}} id="login-alert">{{this.alert}}</div>
  </LoginModal>
  */
  {
    "id": "/Z3Bx0aQ",
    "block": "[[[8,[39,0],null,[[\"@loginName\",\"@loginPassword\",\"@secondFactorToken\",\"@action\"],[[30,0,[\"loginName\"]],[30,0,[\"loginPassword\"]],[30,0,[\"secondFactorToken\"]],[28,[37,1],[[30,0],\"login\"],null]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,2],null,[[\"@name\",\"@connectorTagName\"],[\"login-before-modal-body\",\"div\"]],null],[1,\"\\n  \"],[8,[39,3],null,[[\"@class\"],[[30,0,[\"modalBodyClasses\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"login-welcome-header\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,0,\"login-title\"],[12],[1,[28,[35,4],[\"login.header_title\"],null]],[13],[1,\"\\n      \"],[10,\"img\"],[15,\"src\",[30,0,[\"wavingHandURL\"]]],[14,\"alt\",\"\"],[14,0,\"waving-hand\"],[12],[13],[1,\"\\n      \"],[10,2],[14,0,\"login-subheader\"],[12],[1,[28,[35,4],[\"login.subheader_title\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"showLoginButtons\"]],[[[1,\"      \"],[8,[39,6],null,[[\"@externalLogin\"],[[28,[37,1],[[30,0],\"externalLogin\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canLoginLocal\"]],[[[1,\"      \"],[10,\"form\"],[14,1,\"login-form\"],[14,\"method\",\"post\"],[12],[1,\"\\n        \"],[10,0],[14,1,\"credentials\"],[15,0,[30,0,[\"credentialsClass\"]]],[12],[1,\"\\n          \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n            \"],[8,[39,7],[[16,0,[28,[37,8],[[30,0,[\"loginName\"]]],null]],[24,1,\"login-account-name\"],[24,\"autocorrect\",\"off\"],[24,\"autocapitalize\",\"off\"],[16,\"disabled\",[30,0,[\"showSecondFactor\"]]],[24,\"autofocus\",\"autofocus\"]],[[\"@value\",\"@type\"],[[30,0,[\"loginName\"]],\"email\"]],null],[1,\"\\n            \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"login-account-name\"],[12],[1,[28,[35,4],[\"login.email_placeholder\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"showLoginWithEmailLink\"]],[[[1,\"              \"],[11,3],[24,6,\"\"],[24,1,\"email-login-link\"],[4,[38,9],[\"click\",[30,0,[\"emailLogin\"]]],null],[12],[1,\"\\n                \"],[1,[28,[35,4],[\"email_login.login_link\"],null]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n            \"],[8,[39,7],[[16,0,[28,[37,8],[[30,0,[\"loginPassword\"]]],null]],[24,1,\"login-account-password\"],[24,\"maxlength\",\"200\"],[16,\"disabled\",[30,0,[\"showSecondFactor\"]]]],[[\"@value\",\"@type\"],[[30,0,[\"loginPassword\"]],\"password\"]],null],[1,\"\\n            \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"login-account-password\"],[12],[1,[28,[35,4],[\"login.password\"],null]],[13],[1,\"\\n            \"],[11,3],[24,6,\"\"],[24,1,\"forgot-password-link\"],[4,[38,9],[\"click\",[30,0,[\"handleForgotPassword\"]]],null],[12],[1,[28,[35,4],[\"forgot_password.action\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[8,[39,10],null,[[\"@secondFactorMethod\",\"@secondFactorToken\",\"@class\",\"@backupEnabled\",\"@isLogin\"],[[30,0,[\"secondFactorMethod\"]],[30,0,[\"secondFactorToken\"]],[30,0,[\"secondFactorClass\"]],[30,0,[\"backupEnabled\"]],true]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"showSecurityKey\"]],[[[1,\"            \"],[8,[39,11],null,[[\"@allowedCredentialIds\",\"@challenge\",\"@showSecurityKey\",\"@showSecondFactor\",\"@secondFactorMethod\",\"@otherMethodAllowed\",\"@action\"],[[30,0,[\"securityKeyAllowedCredentialIds\"]],[30,0,[\"securityKeyChallenge\"]],[30,0,[\"showSecurityKey\"]],[30,0,[\"showSecondFactor\"]],[30,0,[\"secondFactorMethod\"]],[30,0,[\"otherMethodAllowed\"]],[28,[37,1],[[30,0],\"authenticateSecurityKey\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"            \"],[8,[39,12],null,[[\"@value\",\"@inputId\",\"@secondFactorMethod\",\"@backupEnabled\"],[[30,0,[\"secondFactorToken\"]],\"login-second-factor\",[30,0,[\"secondFactorMethod\"]],[30,0,[\"backupEnabled\"]]]],null],[1,\"\\n\"]],[]]],[1,\"        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n\"],[41,[30,0,[\"canLoginLocal\"]],[[[41,[51,[30,0,[\"showSecurityKey\"]]],[[[1,\"        \"],[8,[39,14],null,[[\"@action\",\"@id\",\"@icon\",\"@label\",\"@disabled\",\"@class\"],[[28,[37,1],[[30,0],\"login\"],null],\"login-button\",\"unlock\",[30,0,[\"loginButtonLabel\"]],[30,0,[\"loginDisabled\"]],\"btn-large btn-primary\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showSignupLink\"]],[[[1,\"        \"],[8,[39,14],null,[[\"@class\",\"@id\",\"@action\",\"@label\"],[\"btn-large\",\"new-account-link\",[28,[37,15],[\"showCreateAccount\"],null],\"create_account.title\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[8,[39,2],null,[[\"@name\",\"@connectorTagName\"],[\"login-after-modal-footer\",\"div\"]],null],[1,\"\\n\\n  \"],[10,0],[15,0,[30,0,[\"alertClass\"]]],[14,1,\"login-alert\"],[12],[1,[30,0,[\"alert\"]]],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"login-modal\",\"action\",\"plugin-outlet\",\"d-modal-body\",\"i18n\",\"if\",\"login-buttons\",\"input\",\"value-entered\",\"on\",\"second-factor-form\",\"security-key-form\",\"second-factor-input\",\"unless\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/mobile/modal/login.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});