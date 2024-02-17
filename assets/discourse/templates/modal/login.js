define("discourse/templates/modal/login", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
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
  
      {{#if this.canLoginLocal}}
        <div class="login-left-side">
          <div class="login-welcome-header">
            <h1 class="login-title">{{i18n "login.header_title"}}</h1>
            <img src={{this.wavingHandURL}} alt="" class="waving-hand" />
            <p class="login-subheader">{{i18n "login.subheader_title"}}</p>
          </div>
          <form id="login-form" method="post">
            <div id="credentials" class={{this.credentialsClass}}>
              <div class="input-group">
                <Input
                  @value={{this.loginName}}
                  @type="email"
                  id="login-account-name"
                  class={{value-entered this.loginName}}
                  autocomplete="username"
                  autocorrect="off"
                  autocapitalize="off"
                  disabled={{this.showSecondFactor}}
                  autofocus="autofocus"
                  tabindex="1"
                />
                <label class="alt-placeholder" for="login-account-name">{{i18n
                    "login.email_placeholder"
                  }}</label>
                {{#if this.showLoginWithEmailLink}}
                  <a
                    href
                    class={{if this.loginName "" "no-login-filled"}}
                    tabindex="3"
                    id="email-login-link"
                    {{on "click" this.emailLogin}}
                  >
                    {{i18n "email_login.login_link"}}
                  </a>
                {{/if}}
              </div>
              <div class="input-group">
                <PasswordField
                  @value={{this.loginPassword}}
                  @type={{if this.maskPassword "password" "text"}}
                  class={{value-entered this.loginPassword}}
                  id="login-account-password"
                  autocomplete="current-password"
                  maxlength="200"
                  @capsLockOn={{this.capsLockOn}}
                  disabled={{this.disableLoginFields}}
                  tabindex="1"
                />
                <label class="alt-placeholder" for="login-account-password">{{i18n
                    "login.password"
                  }}</label>
                <div class="login__password-links">
                  <a
                    href
                    id="forgot-password-link"
                    tabindex="3"
                    {{on "click" this.handleForgotPassword}}
                  >{{i18n "forgot_password.action"}}</a>
                  <TogglePasswordMask
                    @maskPassword={{this.maskPassword}}
                    @togglePasswordMask={{this.togglePasswordMask}}
                    tabindex="3"
                  />
                </div>
                <div
                  class="caps-lock-warning {{unless this.capsLockOn 'hidden'}}"
                >{{d-icon "exclamation-triangle"}}
                  {{i18n "login.caps_lock_warning"}}</div>
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
          <div class="modal-footer">
            {{#if this.canLoginLocal}}
              {{#unless this.showSecurityKey}}
                <DButton
                  @action={{action "login"}}
                  @id="login-button"
                  @form="login-form"
                  @icon="unlock"
                  @label={{this.loginButtonLabel}}
                  @disabled={{this.loginDisabled}}
                  @class="btn btn-large btn-primary"
                  @tabindex="2"
                />
              {{/unless}}
  
              {{#if this.showSignupLink}}
                <DButton
                  @class="btn-large"
                  @id="new-account-link"
                  @action={{action "createAccount"}}
                  @label="create_account.title"
                  @tabindex="3"
                />
              {{/if}}
            {{/if}}
            <ConditionalLoadingSpinner
              @condition={{this.showSpinner}}
              @size="small"
            />
          </div>
        </div>
      {{/if}}
      {{#if this.showLoginButtons}}
        {{#if this.noLoginLocal}}
          <div class="login-left-side">
            <div class="login-welcome-header">
              <h1 class="login-title">{{i18n "login.header_title"}}</h1>
              <img src={{this.wavingHandURL}} alt="" class="waving-hand" />
              <p class="login-subheader">{{i18n "login.subheader_title"}}</p>
            </div>
          </div>
        {{/if}}
  
        <div class="login-right-side">
          <LoginButtons @externalLogin={{action "externalLogin"}} />
        </div>
      {{/if}}
    </DModalBody>
  
    <PluginOutlet @name="login-after-modal-footer" @connectorTagName="div" />
  
    <div class={{this.alertClass}} id="login-alert">{{this.alert}}</div>
  </LoginModal>
  */
  {
    "id": "DoYET3Oe",
    "block": "[[[8,[39,0],null,[[\"@loginName\",\"@loginPassword\",\"@secondFactorToken\",\"@action\"],[[30,0,[\"loginName\"]],[30,0,[\"loginPassword\"]],[30,0,[\"secondFactorToken\"]],[28,[37,1],[[30,0],\"login\"],null]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,2],null,[[\"@name\",\"@connectorTagName\"],[\"login-before-modal-body\",\"div\"]],null],[1,\"\\n  \"],[8,[39,3],null,[[\"@class\"],[[30,0,[\"modalBodyClasses\"]]]],[[\"default\"],[[[[1,\"\\n\\n\"],[41,[30,0,[\"canLoginLocal\"]],[[[1,\"      \"],[10,0],[14,0,\"login-left-side\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"login-welcome-header\"],[12],[1,\"\\n          \"],[10,\"h1\"],[14,0,\"login-title\"],[12],[1,[28,[35,5],[\"login.header_title\"],null]],[13],[1,\"\\n          \"],[10,\"img\"],[15,\"src\",[30,0,[\"wavingHandURL\"]]],[14,\"alt\",\"\"],[14,0,\"waving-hand\"],[12],[13],[1,\"\\n          \"],[10,2],[14,0,\"login-subheader\"],[12],[1,[28,[35,5],[\"login.subheader_title\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"form\"],[14,1,\"login-form\"],[14,\"method\",\"post\"],[12],[1,\"\\n          \"],[10,0],[14,1,\"credentials\"],[15,0,[30,0,[\"credentialsClass\"]]],[12],[1,\"\\n            \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n              \"],[8,[39,6],[[24,1,\"login-account-name\"],[16,0,[28,[37,7],[[30,0,[\"loginName\"]]],null]],[24,\"autocomplete\",\"username\"],[24,\"autocorrect\",\"off\"],[24,\"autocapitalize\",\"off\"],[16,\"disabled\",[30,0,[\"showSecondFactor\"]]],[24,\"autofocus\",\"autofocus\"],[24,\"tabindex\",\"1\"]],[[\"@value\",\"@type\"],[[30,0,[\"loginName\"]],\"email\"]],null],[1,\"\\n              \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"login-account-name\"],[12],[1,[28,[35,5],[\"login.email_placeholder\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"showLoginWithEmailLink\"]],[[[1,\"                \"],[11,3],[24,6,\"\"],[16,0,[52,[30,0,[\"loginName\"]],\"\",\"no-login-filled\"]],[24,\"tabindex\",\"3\"],[24,1,\"email-login-link\"],[4,[38,8],[\"click\",[30,0,[\"emailLogin\"]]],null],[12],[1,\"\\n                  \"],[1,[28,[35,5],[\"email_login.login_link\"],null]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n              \"],[8,[39,9],[[16,0,[28,[37,7],[[30,0,[\"loginPassword\"]]],null]],[24,1,\"login-account-password\"],[24,\"autocomplete\",\"current-password\"],[24,\"maxlength\",\"200\"],[16,\"disabled\",[30,0,[\"disableLoginFields\"]]],[24,\"tabindex\",\"1\"]],[[\"@value\",\"@type\",\"@capsLockOn\"],[[30,0,[\"loginPassword\"]],[52,[30,0,[\"maskPassword\"]],\"password\",\"text\"],[30,0,[\"capsLockOn\"]]]],null],[1,\"\\n              \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"login-account-password\"],[12],[1,[28,[35,5],[\"login.password\"],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"login__password-links\"],[12],[1,\"\\n                \"],[11,3],[24,6,\"\"],[24,1,\"forgot-password-link\"],[24,\"tabindex\",\"3\"],[4,[38,8],[\"click\",[30,0,[\"handleForgotPassword\"]]],null],[12],[1,[28,[35,5],[\"forgot_password.action\"],null]],[13],[1,\"\\n                \"],[8,[39,10],[[24,\"tabindex\",\"3\"]],[[\"@maskPassword\",\"@togglePasswordMask\"],[[30,0,[\"maskPassword\"]],[30,0,[\"togglePasswordMask\"]]]],null],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[15,0,[29,[\"caps-lock-warning \",[52,[51,[30,0,[\"capsLockOn\"]]],\"hidden\"]]]],[12],[1,[28,[35,12],[\"exclamation-triangle\"],null]],[1,\"\\n                \"],[1,[28,[35,5],[\"login.caps_lock_warning\"],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[8,[39,13],null,[[\"@secondFactorMethod\",\"@secondFactorToken\",\"@class\",\"@backupEnabled\",\"@isLogin\"],[[30,0,[\"secondFactorMethod\"]],[30,0,[\"secondFactorToken\"]],[30,0,[\"secondFactorClass\"]],[30,0,[\"backupEnabled\"]],true]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"showSecurityKey\"]],[[[1,\"              \"],[8,[39,14],null,[[\"@allowedCredentialIds\",\"@challenge\",\"@showSecurityKey\",\"@showSecondFactor\",\"@secondFactorMethod\",\"@otherMethodAllowed\",\"@action\"],[[30,0,[\"securityKeyAllowedCredentialIds\"]],[30,0,[\"securityKeyChallenge\"]],[30,0,[\"showSecurityKey\"]],[30,0,[\"showSecondFactor\"]],[30,0,[\"secondFactorMethod\"]],[30,0,[\"otherMethodAllowed\"]],[28,[37,1],[[30,0],\"authenticateSecurityKey\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"              \"],[8,[39,15],null,[[\"@value\",\"@inputId\",\"@secondFactorMethod\",\"@backupEnabled\"],[[30,0,[\"secondFactorToken\"]],\"login-second-factor\",[30,0,[\"secondFactorMethod\"]],[30,0,[\"backupEnabled\"]]]],null],[1,\"\\n\"]],[]]],[1,\"          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n\"],[41,[30,0,[\"canLoginLocal\"]],[[[41,[51,[30,0,[\"showSecurityKey\"]]],[[[1,\"              \"],[8,[39,16],null,[[\"@action\",\"@id\",\"@form\",\"@icon\",\"@label\",\"@disabled\",\"@class\",\"@tabindex\"],[[28,[37,1],[[30,0],\"login\"],null],\"login-button\",\"login-form\",\"unlock\",[30,0,[\"loginButtonLabel\"]],[30,0,[\"loginDisabled\"]],\"btn btn-large btn-primary\",\"2\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showSignupLink\"]],[[[1,\"              \"],[8,[39,16],null,[[\"@class\",\"@id\",\"@action\",\"@label\",\"@tabindex\"],[\"btn-large\",\"new-account-link\",[28,[37,1],[[30,0],\"createAccount\"],null],\"create_account.title\",\"3\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"          \"],[8,[39,17],null,[[\"@condition\",\"@size\"],[[30,0,[\"showSpinner\"]],\"small\"]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showLoginButtons\"]],[[[41,[30,0,[\"noLoginLocal\"]],[[[1,\"        \"],[10,0],[14,0,\"login-left-side\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"login-welcome-header\"],[12],[1,\"\\n            \"],[10,\"h1\"],[14,0,\"login-title\"],[12],[1,[28,[35,5],[\"login.header_title\"],null]],[13],[1,\"\\n            \"],[10,\"img\"],[15,\"src\",[30,0,[\"wavingHandURL\"]]],[14,\"alt\",\"\"],[14,0,\"waving-hand\"],[12],[13],[1,\"\\n            \"],[10,2],[14,0,\"login-subheader\"],[12],[1,[28,[35,5],[\"login.subheader_title\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,0],[14,0,\"login-right-side\"],[12],[1,\"\\n        \"],[8,[39,18],null,[[\"@externalLogin\"],[[28,[37,1],[[30,0],\"externalLogin\"],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[39,2],null,[[\"@name\",\"@connectorTagName\"],[\"login-after-modal-footer\",\"div\"]],null],[1,\"\\n\\n  \"],[10,0],[15,0,[30,0,[\"alertClass\"]]],[14,1,\"login-alert\"],[12],[1,[30,0,[\"alert\"]]],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"login-modal\",\"action\",\"plugin-outlet\",\"d-modal-body\",\"if\",\"i18n\",\"input\",\"value-entered\",\"on\",\"password-field\",\"toggle-password-mask\",\"unless\",\"d-icon\",\"second-factor-form\",\"security-key-form\",\"second-factor-input\",\"d-button\",\"conditional-loading-spinner\",\"login-buttons\"]]",
    "moduleName": "discourse/templates/modal/login.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});