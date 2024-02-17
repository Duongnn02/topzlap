define("discourse/templates/password-reset", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container password-reset clearfix">
    <div class="pull-left col-image">
      <img
        src={{this.lockImageUrl}}
        class="password-reset-img"
        alt={{i18n "user.change_password.emoji"}}
      />
    </div>
  
    <div class="pull-left col-form">
      {{#if this.successMessage}}
        <p>{{this.successMessage}}</p>
  
        {{#if this.requiresApproval}}
          <p>{{i18n "login.not_approved"}}</p>
        {{else}}
          {{#unless this.redirected}}
            <a
              class="btn"
              href={{this.redirectHref}}
              {{on "click" this.done}}
            >{{this.continueButtonText}}</a>
          {{/unless}}
        {{/if}}
      {{else}}
        <form>
          {{#if this.securityKeyOrSecondFactorRequired}}
            {{#if this.errorMessage}}
              <div class="alert alert-error">{{this.errorMessage}}</div>
              <br />
            {{/if}}
            {{#if this.securityKeyRequired}}
              <SecurityKeyForm
                @allowedCredentialIds={{this.model.allowed_credential_ids}}
                @challenge={{this.model.security_key_challenge}}
                @showSecurityKey={{this.model.security_key_required}}
                @showSecondFactor={{false}}
                @secondFactorMethod={{this.secondFactorMethod}}
                @otherMethodAllowed={{this.otherMethodAllowed}}
                @action={{action "authenticateSecurityKey"}}
              />
            {{else}}
              <SecondFactorForm
                @secondFactorMethod={{this.secondFactorMethod}}
                @secondFactorToken={{this.secondFactorToken}}
                @backupEnabled={{this.backupEnabled}}
                @isLogin={{false}}
              >
                <SecondFactorInput
                  @value={{this.secondFactorToken}}
                  @inputId="second-factor"
                  @secondFactorMethod={{this.secondFactorMethod}}
                  @backupEnabled={{this.backupEnabled}}
                />
              </SecondFactorForm>
            {{/if}}
            {{#unless this.securityKeyRequired}}
              <DButton
                @action={{action "submit"}}
                @class="btn-primary"
                @label="submit"
                @type="submit"
              />
            {{/unless}}
          {{else}}
            <h2>{{i18n "user.change_password.choose"}}</h2>
  
            <div class="input">
              <PasswordField
                @value={{this.accountPassword}}
                @type={{if this.maskPassword "password" "text"}}
                @id="new-account-password"
                @capsLockOn={{this.capsLockOn}}
                @autofocus="autofocus"
              />
              <TogglePasswordMask
                @maskPassword={{this.maskPassword}}
                @togglePasswordMask={{this.togglePasswordMask}}
              />
              <InputTip @validation={{this.passwordValidation}} />
            </div>
  
            <div class="instructions">
              <div class="caps-lock-warning {{unless this.capsLockOn 'hidden'}}">
                {{d-icon "exclamation-triangle"}}
                {{i18n "login.caps_lock_warning"}}
              </div>
            </div>
  
            <DButton
              @action={{action "submit"}}
              @class="btn-primary"
              @label="user.change_password.set_password"
              @type="submit"
            />
          {{/if}}
        </form>
      {{/if}}
    </div>
  </div>
  */
  {
    "id": "poHCGId2",
    "block": "[[[10,0],[14,0,\"container password-reset clearfix\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"pull-left col-image\"],[12],[1,\"\\n    \"],[10,\"img\"],[15,\"src\",[30,0,[\"lockImageUrl\"]]],[14,0,\"password-reset-img\"],[15,\"alt\",[28,[37,0],[\"user.change_password.emoji\"],null]],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"pull-left col-form\"],[12],[1,\"\\n\"],[41,[30,0,[\"successMessage\"]],[[[1,\"      \"],[10,2],[12],[1,[30,0,[\"successMessage\"]]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"requiresApproval\"]],[[[1,\"        \"],[10,2],[12],[1,[28,[35,0],[\"login.not_approved\"],null]],[13],[1,\"\\n\"]],[]],[[[41,[51,[30,0,[\"redirected\"]]],[[[1,\"          \"],[11,3],[24,0,\"btn\"],[16,6,[30,0,[\"redirectHref\"]]],[4,[38,3],[\"click\",[30,0,[\"done\"]]],null],[12],[1,[30,0,[\"continueButtonText\"]]],[13],[1,\"\\n\"]],[]],null]],[]]]],[]],[[[1,\"      \"],[10,\"form\"],[12],[1,\"\\n\"],[41,[30,0,[\"securityKeyOrSecondFactorRequired\"]],[[[41,[30,0,[\"errorMessage\"]],[[[1,\"            \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[30,0,[\"errorMessage\"]]],[13],[1,\"\\n            \"],[10,\"br\"],[12],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"securityKeyRequired\"]],[[[1,\"            \"],[8,[39,4],null,[[\"@allowedCredentialIds\",\"@challenge\",\"@showSecurityKey\",\"@showSecondFactor\",\"@secondFactorMethod\",\"@otherMethodAllowed\",\"@action\"],[[30,0,[\"model\",\"allowed_credential_ids\"]],[30,0,[\"model\",\"security_key_challenge\"]],[30,0,[\"model\",\"security_key_required\"]],false,[30,0,[\"secondFactorMethod\"]],[30,0,[\"otherMethodAllowed\"]],[28,[37,5],[[30,0],\"authenticateSecurityKey\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"            \"],[8,[39,6],null,[[\"@secondFactorMethod\",\"@secondFactorToken\",\"@backupEnabled\",\"@isLogin\"],[[30,0,[\"secondFactorMethod\"]],[30,0,[\"secondFactorToken\"]],[30,0,[\"backupEnabled\"]],false]],[[\"default\"],[[[[1,\"\\n              \"],[8,[39,7],null,[[\"@value\",\"@inputId\",\"@secondFactorMethod\",\"@backupEnabled\"],[[30,0,[\"secondFactorToken\"]],\"second-factor\",[30,0,[\"secondFactorMethod\"]],[30,0,[\"backupEnabled\"]]]],null],[1,\"\\n            \"]],[]]]]],[1,\"\\n\"]],[]]],[41,[51,[30,0,[\"securityKeyRequired\"]]],[[[1,\"            \"],[8,[39,8],null,[[\"@action\",\"@class\",\"@label\",\"@type\"],[[28,[37,5],[[30,0],\"submit\"],null],\"btn-primary\",\"submit\",\"submit\"]],null],[1,\"\\n\"]],[]],null]],[]],[[[1,\"          \"],[10,\"h2\"],[12],[1,[28,[35,0],[\"user.change_password.choose\"],null]],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"input\"],[12],[1,\"\\n            \"],[8,[39,9],null,[[\"@value\",\"@type\",\"@id\",\"@capsLockOn\",\"@autofocus\"],[[30,0,[\"accountPassword\"]],[52,[30,0,[\"maskPassword\"]],\"password\",\"text\"],\"new-account-password\",[30,0,[\"capsLockOn\"]],\"autofocus\"]],null],[1,\"\\n            \"],[8,[39,10],null,[[\"@maskPassword\",\"@togglePasswordMask\"],[[30,0,[\"maskPassword\"]],[30,0,[\"togglePasswordMask\"]]]],null],[1,\"\\n            \"],[8,[39,11],null,[[\"@validation\"],[[30,0,[\"passwordValidation\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n            \"],[10,0],[15,0,[29,[\"caps-lock-warning \",[52,[51,[30,0,[\"capsLockOn\"]]],\"hidden\"]]]],[12],[1,\"\\n              \"],[1,[28,[35,12],[\"exclamation-triangle\"],null]],[1,\"\\n              \"],[1,[28,[35,0],[\"login.caps_lock_warning\"],null]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[8,[39,8],null,[[\"@action\",\"@class\",\"@label\",\"@type\"],[[28,[37,5],[[30,0],\"submit\"],null],\"btn-primary\",\"user.change_password.set_password\",\"submit\"]],null],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"if\",\"unless\",\"on\",\"security-key-form\",\"action\",\"second-factor-form\",\"second-factor-input\",\"d-button\",\"password-field\",\"toggle-password-mask\",\"input-tip\",\"d-icon\"]]",
    "moduleName": "discourse/templates/password-reset.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});