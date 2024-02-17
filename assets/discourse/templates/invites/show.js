define("discourse/templates/invites/show", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="invite">
    <div class="container invites-show clearfix">
      <div class="login-welcome-header">
        <h1 class="login-title">{{this.welcomeTitle}}</h1>
        <img src={{this.wavingHandURL}} alt="" class="waving-hand" />
        {{#unless this.successMessage}}
          <p class="login-subheader">{{this.subheaderMessage}}</p>
        {{/unless}}
      </div>
  
      <div class={{if this.successMessage "invite-success" "invite-form"}}>
        <div class="two-col">
          <div class="col-image">
            <img src={{this.inviteImageUrl}} alt={{i18n "invites.emoji"}} />
          </div>
  
          <div class="col-form">
            {{#if this.successMessage}}
              <div class="success-info">
                <p>{{html-safe this.successMessage}}</p>
              </div>
            {{else}}
              <p>{{i18n "invites.invited_by"}}</p>
              <p><UserInfo @user={{this.invitedBy}} /></p>
  
              {{#if this.associateHtml}}
                <p class="create-account-associate-link">
                  {{html-safe this.associateHtml}}
                </p>
              {{/if}}
  
              {{#unless this.isInviteLink}}
                <p class="email-message">
                  {{html-safe this.yourEmailMessage}}
                  {{#if this.showSocialLoginAvailable}}
                    {{i18n "invites.social_login_available"}}
                  {{/if}}
                </p>
              {{/unless}}
  
              {{#if this.externalAuthsOnly}}
                {{! authOptions are present once the user has followed the OmniAuth flow (e.g. twitter/google/etc) }}
                {{#if this.authOptions}}
                  {{#unless this.isInviteLink}}
                    <InputTip
                      @validation={{this.emailValidation}}
                      @id="account-email-validation"
                    />
                  {{/unless}}
                {{else}}
                  <LoginButtons @externalLogin={{action "externalLogin"}} />
                {{/if}}
              {{/if}}
  
              {{#if this.discourseConnectEnabled}}
                <a
                  class="btn btn-primary discourse-connect raw-link"
                  href={{this.ssoPath}}
                >
                  {{i18n "continue"}}
                </a>
              {{/if}}
  
              {{#if this.shouldDisplayForm}}
                <form>
                  {{#if this.isInviteLink}}
                    <div class="input email-input input-group">
                      <Input
                        @type="email"
                        @value={{this.email}}
                        id="new-account-email"
                        name="email"
                        class={{value-entered this.email}}
                        autofocus="autofocus"
                        disabled={{this.externalAuthsOnly}}
                      />
                      <label class="alt-placeholder" for="new-account-email">
                        {{i18n "user.email.title"}}
                        <span class="required">*</span>
                      </label>
                      <InputTip
                        @validation={{this.emailValidation}}
                        @id="account-email-validation"
                      />
                      <div class="instructions">{{i18n
                          "user.email.instructions"
                        }}</div>
                    </div>
                  {{/if}}
  
                  <div class="input username-input input-group">
                    <Input
                      @value={{this.accountUsername}}
                      class={{value-entered this.accountUsername}}
                      id="new-account-username"
                      name="username"
                      maxlength={{this.maxUsernameLength}}
                      autocomplete="off"
                    />
                    <label class="alt-placeholder" for="new-account-username">
                      {{i18n "user.username.title"}}
                      <span class="required">*</span>
                    </label>
                    <InputTip
                      @validation={{this.usernameValidation}}
                      @id="username-validation"
                    />
                    <div class="instructions">{{i18n
                        "user.username.instructions"
                      }}</div>
                  </div>
  
                  {{#if this.fullnameRequired}}
                    <div class="input name-input input-group">
                      <Input
                        @value={{this.accountName}}
                        class={{value-entered this.accountName}}
                        id="new-account-name"
                        name="name"
                      />
                      <label class="alt-placeholder" for="new-account-name">
                        {{i18n "invites.name_label"}}
                        {{#if this.siteSettings.full_name_required}}
                          <span class="required">*</span>
                        {{/if}}
                      </label>
                      <div class="instructions">{{this.nameInstructions}}</div>
                    </div>
                  {{/if}}
  
                  {{#unless this.externalAuthsOnly}}
                    <div class="input password-input input-group">
                      <PasswordField
                        @value={{this.accountPassword}}
                        @class={{value-entered this.accountPassword}}
                        @type={{if this.maskPassword "password" "text"}}
                        @id="new-account-password"
                        @capsLockOn={{this.capsLockOn}}
                      />
                      <label class="alt-placeholder" for="new-account-password">
                        {{i18n "invites.password_label"}}
                        <span class="required">*</span>
                      </label>
                      <div class="create-account__password-info">
                        <div class="create-account__password-tip-validation">
                          <InputTip
                            @validation={{this.passwordValidation}}
                            @id="password-validation"
                          />
                          <span
                            class="more-info"
                          >{{this.passwordInstructions}}</span>
                          <div
                            class="caps-lock-warning
                              {{unless this.capsLockOn 'hidden'}}"
                          >
                            {{d-icon "exclamation-triangle"}}
                            {{i18n "login.caps_lock_warning"}}
                          </div>
                        </div>
                        <TogglePasswordMask
                          @maskPassword={{this.maskPassword}}
                          @togglePasswordMask={{this.togglePasswordMask}}
                          @parentController={{"invites-show"}}
                        />
                      </div>
                    </div>
                  {{/unless}}
  
                  {{#if this.userFields}}
                    <div class="user-fields">
                      {{#each this.userFields as |f|}}
                        <div class="input-group">
                          <UserField
                            @field={{f.field}}
                            @value={{f.value}}
                            @class={{value-entered f.value}}
                          />
                        </div>
                      {{/each}}
                    </div>
                  {{/if}}
  
                  <div class="invitation-cta">
                    <DButton
                      @class="btn-primary invitation-cta__accept"
                      @action={{action "submit"}}
                      @type="submit"
                      @disabled={{this.submitDisabled}}
                      @label="invites.accept_invite"
                    />
                    <div class="invitation-cta__info">
                      <span class="invitation-cta__signed-up">{{i18n
                          "login.previous_sign_up"
                        }}</span>
                      <DButton
                        @action={{route-action "showLogin"}}
                        @class="btn-flat invitation-cta__sign-in"
                        @label="log_in"
                      />
                    </div>
                  </div>
  
                  <div class="disclaimer">
                    {{html-safe this.disclaimerHtml}}
                  </div>
  
                  {{#if this.errorMessage}}
                    <br /><br />
                    <div class="alert alert-error">{{this.errorMessage}}</div>
                  {{/if}}
                </form>
              {{/if}}
              {{#if this.existingUserRedeeming}}
                {{#if this.existingUserCanRedeem}}
                  <DButton
                    @class="btn-primary"
                    @action={{action "submit"}}
                    @type="submit"
                    @disabled={{this.submitDisabled}}
                    @label="invites.accept_invite"
                  />
                {{else}}
                  <div
                    class="alert alert-error"
                  >{{this.existingUserCanRedeemError}}</div>
                {{/if}}
              {{/if}}
            {{/if}}
          </div>
        </div>
      </div>
    </div>
  </DSection>
  */
  {
    "id": "ziACTAds",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"invite\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"container invites-show clearfix\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"login-welcome-header\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,0,\"login-title\"],[12],[1,[30,0,[\"welcomeTitle\"]]],[13],[1,\"\\n      \"],[10,\"img\"],[15,\"src\",[30,0,[\"wavingHandURL\"]]],[14,\"alt\",\"\"],[14,0,\"waving-hand\"],[12],[13],[1,\"\\n\"],[41,[51,[30,0,[\"successMessage\"]]],[[[1,\"        \"],[10,2],[14,0,\"login-subheader\"],[12],[1,[30,0,[\"subheaderMessage\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,0],[15,0,[52,[30,0,[\"successMessage\"]],\"invite-success\",\"invite-form\"]],[12],[1,\"\\n      \"],[10,0],[14,0,\"two-col\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"col-image\"],[12],[1,\"\\n          \"],[10,\"img\"],[15,\"src\",[30,0,[\"inviteImageUrl\"]]],[15,\"alt\",[28,[37,3],[\"invites.emoji\"],null]],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"col-form\"],[12],[1,\"\\n\"],[41,[30,0,[\"successMessage\"]],[[[1,\"            \"],[10,0],[14,0,\"success-info\"],[12],[1,\"\\n              \"],[10,2],[12],[1,[28,[35,4],[[30,0,[\"successMessage\"]]],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],[[[1,\"            \"],[10,2],[12],[1,[28,[35,3],[\"invites.invited_by\"],null]],[13],[1,\"\\n            \"],[10,2],[12],[8,[39,5],null,[[\"@user\"],[[30,0,[\"invitedBy\"]]]],null],[13],[1,\"\\n\\n\"],[41,[30,0,[\"associateHtml\"]],[[[1,\"              \"],[10,2],[14,0,\"create-account-associate-link\"],[12],[1,\"\\n                \"],[1,[28,[35,4],[[30,0,[\"associateHtml\"]]],null]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"isInviteLink\"]]],[[[1,\"              \"],[10,2],[14,0,\"email-message\"],[12],[1,\"\\n                \"],[1,[28,[35,4],[[30,0,[\"yourEmailMessage\"]]],null]],[1,\"\\n\"],[41,[30,0,[\"showSocialLoginAvailable\"]],[[[1,\"                  \"],[1,[28,[35,3],[\"invites.social_login_available\"],null]],[1,\"\\n\"]],[]],null],[1,\"              \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"externalAuthsOnly\"]],[[[41,[30,0,[\"authOptions\"]],[[[41,[51,[30,0,[\"isInviteLink\"]]],[[[1,\"                  \"],[8,[39,6],null,[[\"@validation\",\"@id\"],[[30,0,[\"emailValidation\"]],\"account-email-validation\"]],null],[1,\"\\n\"]],[]],null]],[]],[[[1,\"                \"],[8,[39,7],null,[[\"@externalLogin\"],[[28,[37,8],[[30,0],\"externalLogin\"],null]]],null],[1,\"\\n\"]],[]]]],[]],null],[1,\"\\n\"],[41,[30,0,[\"discourseConnectEnabled\"]],[[[1,\"              \"],[10,3],[14,0,\"btn btn-primary discourse-connect raw-link\"],[15,6,[30,0,[\"ssoPath\"]]],[12],[1,\"\\n                \"],[1,[28,[35,3],[\"continue\"],null]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"shouldDisplayForm\"]],[[[1,\"              \"],[10,\"form\"],[12],[1,\"\\n\"],[41,[30,0,[\"isInviteLink\"]],[[[1,\"                  \"],[10,0],[14,0,\"input email-input input-group\"],[12],[1,\"\\n                    \"],[8,[39,9],[[24,1,\"new-account-email\"],[24,3,\"email\"],[16,0,[28,[37,10],[[30,0,[\"email\"]]],null]],[24,\"autofocus\",\"autofocus\"],[16,\"disabled\",[30,0,[\"externalAuthsOnly\"]]]],[[\"@type\",\"@value\"],[\"email\",[30,0,[\"email\"]]]],null],[1,\"\\n                    \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"new-account-email\"],[12],[1,\"\\n                      \"],[1,[28,[35,3],[\"user.email.title\"],null]],[1,\"\\n                      \"],[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[8,[39,6],null,[[\"@validation\",\"@id\"],[[30,0,[\"emailValidation\"]],\"account-email-validation\"]],null],[1,\"\\n                    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,3],[\"user.email.instructions\"],null]],[13],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n                \"],[10,0],[14,0,\"input username-input input-group\"],[12],[1,\"\\n                  \"],[8,[39,9],[[16,0,[28,[37,10],[[30,0,[\"accountUsername\"]]],null]],[24,1,\"new-account-username\"],[24,3,\"username\"],[16,\"maxlength\",[30,0,[\"maxUsernameLength\"]]],[24,\"autocomplete\",\"off\"]],[[\"@value\"],[[30,0,[\"accountUsername\"]]]],null],[1,\"\\n                  \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"new-account-username\"],[12],[1,\"\\n                    \"],[1,[28,[35,3],[\"user.username.title\"],null]],[1,\"\\n                    \"],[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[8,[39,6],null,[[\"@validation\",\"@id\"],[[30,0,[\"usernameValidation\"]],\"username-validation\"]],null],[1,\"\\n                  \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,3],[\"user.username.instructions\"],null]],[13],[1,\"\\n                \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"fullnameRequired\"]],[[[1,\"                  \"],[10,0],[14,0,\"input name-input input-group\"],[12],[1,\"\\n                    \"],[8,[39,9],[[16,0,[28,[37,10],[[30,0,[\"accountName\"]]],null]],[24,1,\"new-account-name\"],[24,3,\"name\"]],[[\"@value\"],[[30,0,[\"accountName\"]]]],null],[1,\"\\n                    \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"new-account-name\"],[12],[1,\"\\n                      \"],[1,[28,[35,3],[\"invites.name_label\"],null]],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"full_name_required\"]],[[[1,\"                        \"],[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n\"]],[]],null],[1,\"                    \"],[13],[1,\"\\n                    \"],[10,0],[14,0,\"instructions\"],[12],[1,[30,0,[\"nameInstructions\"]]],[13],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"externalAuthsOnly\"]]],[[[1,\"                  \"],[10,0],[14,0,\"input password-input input-group\"],[12],[1,\"\\n                    \"],[8,[39,11],null,[[\"@value\",\"@class\",\"@type\",\"@id\",\"@capsLockOn\"],[[30,0,[\"accountPassword\"]],[28,[37,10],[[30,0,[\"accountPassword\"]]],null],[52,[30,0,[\"maskPassword\"]],\"password\",\"text\"],\"new-account-password\",[30,0,[\"capsLockOn\"]]]],null],[1,\"\\n                    \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"new-account-password\"],[12],[1,\"\\n                      \"],[1,[28,[35,3],[\"invites.password_label\"],null]],[1,\"\\n                      \"],[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,0],[14,0,\"create-account__password-info\"],[12],[1,\"\\n                      \"],[10,0],[14,0,\"create-account__password-tip-validation\"],[12],[1,\"\\n                        \"],[8,[39,6],null,[[\"@validation\",\"@id\"],[[30,0,[\"passwordValidation\"]],\"password-validation\"]],null],[1,\"\\n                        \"],[10,1],[14,0,\"more-info\"],[12],[1,[30,0,[\"passwordInstructions\"]]],[13],[1,\"\\n                        \"],[10,0],[15,0,[29,[\"caps-lock-warning\\n                            \",[52,[51,[30,0,[\"capsLockOn\"]]],\"hidden\"]]]],[12],[1,\"\\n                          \"],[1,[28,[35,12],[\"exclamation-triangle\"],null]],[1,\"\\n                          \"],[1,[28,[35,3],[\"login.caps_lock_warning\"],null]],[1,\"\\n                        \"],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[8,[39,13],null,[[\"@maskPassword\",\"@togglePasswordMask\",\"@parentController\"],[[30,0,[\"maskPassword\"]],[30,0,[\"togglePasswordMask\"]],\"invites-show\"]],null],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"userFields\"]],[[[1,\"                  \"],[10,0],[14,0,\"user-fields\"],[12],[1,\"\\n\"],[42,[28,[37,15],[[28,[37,15],[[30,0,[\"userFields\"]]],null]],null],null,[[[1,\"                      \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n                        \"],[8,[39,16],null,[[\"@field\",\"@value\",\"@class\"],[[30,1,[\"field\"]],[30,1,[\"value\"]],[28,[37,10],[[30,1,[\"value\"]]],null]]],null],[1,\"\\n                      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n                \"],[10,0],[14,0,\"invitation-cta\"],[12],[1,\"\\n                  \"],[8,[39,17],null,[[\"@class\",\"@action\",\"@type\",\"@disabled\",\"@label\"],[\"btn-primary invitation-cta__accept\",[28,[37,8],[[30,0],\"submit\"],null],\"submit\",[30,0,[\"submitDisabled\"]],\"invites.accept_invite\"]],null],[1,\"\\n                  \"],[10,0],[14,0,\"invitation-cta__info\"],[12],[1,\"\\n                    \"],[10,1],[14,0,\"invitation-cta__signed-up\"],[12],[1,[28,[35,3],[\"login.previous_sign_up\"],null]],[13],[1,\"\\n                    \"],[8,[39,17],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,18],[\"showLogin\"],null],\"btn-flat invitation-cta__sign-in\",\"log_in\"]],null],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\\n                \"],[10,0],[14,0,\"disclaimer\"],[12],[1,\"\\n                  \"],[1,[28,[35,4],[[30,0,[\"disclaimerHtml\"]]],null]],[1,\"\\n                \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"errorMessage\"]],[[[1,\"                  \"],[10,\"br\"],[12],[13],[10,\"br\"],[12],[13],[1,\"\\n                  \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[30,0,[\"errorMessage\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"existingUserRedeeming\"]],[[[41,[30,0,[\"existingUserCanRedeem\"]],[[[1,\"                \"],[8,[39,17],null,[[\"@class\",\"@action\",\"@type\",\"@disabled\",\"@label\"],[\"btn-primary\",[28,[37,8],[[30,0],\"submit\"],null],\"submit\",[30,0,[\"submitDisabled\"]],\"invites.accept_invite\"]],null],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[30,0,[\"existingUserCanRedeemError\"]]],[13],[1,\"\\n\"]],[]]]],[]],null]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[\"f\"],false,[\"d-section\",\"unless\",\"if\",\"i18n\",\"html-safe\",\"user-info\",\"input-tip\",\"login-buttons\",\"action\",\"input\",\"value-entered\",\"password-field\",\"d-icon\",\"toggle-password-mask\",\"each\",\"-track-array\",\"user-field\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/invites/show.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});