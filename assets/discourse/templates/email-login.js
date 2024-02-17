define("discourse/templates/email-login", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container email-login clearfix">
    <div class="content-wrapper">
      <div class="image-wrapper">
        <img
          src={{this.lockImageUrl}}
          class="password-reset-img"
          alt={{i18n "email_login.emoji"}}
        />
      </div>
  
      <form>
        {{#if this.model.error}}
          <div class="error-info">
            {{html-safe this.model.error}}
          </div>
        {{/if}}
  
        {{#if this.model.can_login}}
          <div class="email-login-form">
            {{#if this.secondFactorRequired}}
              {{#if this.model.security_key_required}}
                <SecurityKeyForm
                  @allowedCredentialIds={{this.model.allowed_credential_ids}}
                  @challenge={{this.model.security_key_challenge}}
                  @showSecurityKey={{this.model.security_key_required}}
                  @showSecondFactor={{false}}
                  @secondFactorMethod={{this.secondFactorMethod}}
                  @otherMethodAllowed={{this.secondFactorRequired}}
                  @action={{action "authenticateSecurityKey"}}
                />
              {{else}}
                <SecondFactorForm
                  @secondFactorMethod={{this.secondFactorMethod}}
                  @secondFactorToken={{this.secondFactorToken}}
                  @backupEnabled={{this.model.backup_codes_enabled}}
                  @isLogin={{true}}
                >
                  <SecondFactorInput
                    @value={{this.secondFactorToken}}
                    @secondFactorMethod={{this.secondFactorMethod}}
                    @backupEnabled={{this.backupEnabled}}
                  />
                </SecondFactorForm>
              {{/if}}
            {{else}}
              <h2>{{i18n
                  "email_login.confirm_title"
                  site_name=this.siteSettings.title
                }}</h2>
              <p>{{i18n
                  "email_login.logging_in_as"
                  email=this.model.token_email
                }}</p>
            {{/if}}
  
            {{#unless this.model.security_key_required}}
              <DButton
                @label="email_login.confirm_button"
                @action={{action "finishLogin"}}
                @type="submit"
                @class="btn-primary"
              />
            {{/unless}}
          </div>
        {{/if}}
      </form>
    </div>
  </div>
  */
  {
    "id": "0htze6Yj",
    "block": "[[[10,0],[14,0,\"container email-login clearfix\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"content-wrapper\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"image-wrapper\"],[12],[1,\"\\n      \"],[10,\"img\"],[15,\"src\",[30,0,[\"lockImageUrl\"]]],[14,0,\"password-reset-img\"],[15,\"alt\",[28,[37,0],[\"email_login.emoji\"],null]],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"form\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"error\"]],[[[1,\"        \"],[10,0],[14,0,\"error-info\"],[12],[1,\"\\n          \"],[1,[28,[35,2],[[30,0,[\"model\",\"error\"]]],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_login\"]],[[[1,\"        \"],[10,0],[14,0,\"email-login-form\"],[12],[1,\"\\n\"],[41,[30,0,[\"secondFactorRequired\"]],[[[41,[30,0,[\"model\",\"security_key_required\"]],[[[1,\"              \"],[8,[39,3],null,[[\"@allowedCredentialIds\",\"@challenge\",\"@showSecurityKey\",\"@showSecondFactor\",\"@secondFactorMethod\",\"@otherMethodAllowed\",\"@action\"],[[30,0,[\"model\",\"allowed_credential_ids\"]],[30,0,[\"model\",\"security_key_challenge\"]],[30,0,[\"model\",\"security_key_required\"]],false,[30,0,[\"secondFactorMethod\"]],[30,0,[\"secondFactorRequired\"]],[28,[37,4],[[30,0],\"authenticateSecurityKey\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"              \"],[8,[39,5],null,[[\"@secondFactorMethod\",\"@secondFactorToken\",\"@backupEnabled\",\"@isLogin\"],[[30,0,[\"secondFactorMethod\"]],[30,0,[\"secondFactorToken\"]],[30,0,[\"model\",\"backup_codes_enabled\"]],true]],[[\"default\"],[[[[1,\"\\n                \"],[8,[39,6],null,[[\"@value\",\"@secondFactorMethod\",\"@backupEnabled\"],[[30,0,[\"secondFactorToken\"]],[30,0,[\"secondFactorMethod\"]],[30,0,[\"backupEnabled\"]]]],null],[1,\"\\n              \"]],[]]]]],[1,\"\\n\"]],[]]]],[]],[[[1,\"            \"],[10,\"h2\"],[12],[1,[28,[35,0],[\"email_login.confirm_title\"],[[\"site_name\"],[[30,0,[\"siteSettings\",\"title\"]]]]]],[13],[1,\"\\n            \"],[10,2],[12],[1,[28,[35,0],[\"email_login.logging_in_as\"],[[\"email\"],[[30,0,[\"model\",\"token_email\"]]]]]],[13],[1,\"\\n\"]],[]]],[1,\"\\n\"],[41,[51,[30,0,[\"model\",\"security_key_required\"]]],[[[1,\"            \"],[8,[39,8],null,[[\"@label\",\"@action\",\"@type\",\"@class\"],[\"email_login.confirm_button\",[28,[37,4],[[30,0],\"finishLogin\"],null],\"submit\",\"btn-primary\"]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"if\",\"html-safe\",\"security-key-form\",\"action\",\"second-factor-form\",\"second-factor-input\",\"unless\",\"d-button\"]]",
    "moduleName": "discourse/templates/email-login.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});