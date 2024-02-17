define("discourse/templates/modal/create-account", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <CreateAccount
    @email={{this.accountEmail}}
    @disabled={{this.submitDisabled}}
    @action={{action "createAccount"}}
  >
    {{#unless this.complete}}
      <span>
        <PluginOutlet
          @name="create-account-before-modal-body"
          @connectorTagName="div"
        />
      </span>
      <DModalBody
        @class={{this.modalBodyClasses}}
        @preventModalAlertHiding={{true}}
      >
        <div class="create-account-form {{this.authOptions.auth_provider}}">
          <div class="login-welcome-header" id="create-account-title">
            <h1 class="login-title">{{i18n "create_account.header_title"}}</h1>
            <img src={{this.wavingHandURL}} alt="" class="waving-hand" />
            <p class="login-subheader">{{i18n
                "create_account.subheader_title"
              }}</p>
          </div>
          {{#if this.showCreateForm}}
  
            <div class="login-form">
              <form>
                {{#if this.associateHtml}}
                  <div class="input-group create-account-associate-link">
                    <span>{{html-safe this.associateHtml}}</span>
                  </div>
                {{/if}}
                <div class="input-group create-account-email">
                  <Input
                    @type="email"
                    disabled={{this.emailDisabled}}
                    @value={{this.accountEmail}}
                    id="new-account-email"
                    name="email"
                    class={{value-entered this.accountEmail}}
                    autofocus="autofocus"
                    {{on "focusout" (action "checkEmailAvailability")}}
                    aria-describedby="account-email-validation"
                    aria-invalid={{this.emailValidation.failed}}
                  />
                  <label class="alt-placeholder" for="new-account-email">
                    {{i18n "user.email.title"}}
                    {{~#if this.userFields~}}
                      <span class="required">*</span>
                    {{/if}}
                  </label>
                  <InputTip
                    @validation={{this.emailValidation}}
                    @id="account-email-validation"
                  />
                  <span class="more-info">{{i18n
                      "user.email.instructions"
                    }}</span>
                </div>
  
                <div class="input-group create-account__username">
                  <Input
                    @value={{this.accountUsername}}
                    disabled={{this.usernameDisabled}}
                    class={{value-entered this.accountUsername}}
                    id="new-account-username"
                    name="username"
                    maxlength={{this.maxUsernameLength}}
                    aria-describedby="username-validation"
                    aria-invalid={{this.usernameValidation.failed}}
                    autocomplete="off"
                  />
                  <label class="alt-placeholder" for="new-account-username">
                    {{i18n "user.username.title"}}
                    {{~#if this.userFields~}}
                      <span class="required">*</span>
                    {{/if}}
                  </label>
  
                  <InputTip
                    @validation={{this.usernameValidation}}
                    @id="username-validation"
                  />
                  <span class="more-info">{{i18n
                      "user.username.instructions"
                    }}</span>
                </div>
  
                <div class="input-group create-account__fullname">
                  {{#if this.fullnameRequired}}
                    <TextField
                      @disabled={{this.nameDisabled}}
                      @value={{this.accountName}}
                      @id="new-account-name"
                      @class={{value-entered this.accountName}}
                      aria-describedby="fullname-validation"
                      aria-invalid={{this.nameValidation.failed}}
                    />
                    <label class="alt-placeholder" for="new-account-name">
                      {{i18n "user.name.title"}}
                      {{#if this.siteSettings.full_name_required}}
                        {{~#if this.userFields~}}
                          <span class="required">*</span>
                        {{/if}}
                      {{/if}}
                    </label>
  
                    <InputTip
                      @validation={{this.nameValidation}}
                      @id="fullname-validation"
                    />
                    <span class="more-info">{{this.nameInstructions}}</span>
                  {{/if}}
                </div>
  
                <PluginOutlet
                  @name="create-account-before-password"
                  @outletArgs={{hash
                    accountName=this.accountName
                    accountUsername=this.accountUsername
                    accountPassword=this.accountPassword
                    userFields=this.userFields
                    authOptions=this.authOptions
                  }}
                />
  
                <div class="input-group create-account__password">
                  {{#if this.passwordRequired}}
                    <PasswordField
                      @value={{this.accountPassword}}
                      @class={{value-entered this.accountPassword}}
                      @type={{if this.maskPassword "password" "text"}}
                      id="new-account-password"
                      @autocomplete="current-password"
                      @capsLockOn={{this.capsLockOn}}
                      aria-describedby="password-validation"
                      aria-invalid={{this.passwordValidation.failed}}
                    />
                    <label class="alt-placeholder" for="new-account-password">
                      {{i18n "user.password.title"}}
                      {{~#if this.userFields~}}
                        <span class="required">*</span>
                      {{/if}}
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
                      />
                    </div>
                  {{/if}}
  
                  <div class="password-confirmation">
                    <label for="new-account-password-confirmation">{{i18n
                        "user.password_confirmation.title"
                      }}</label>
                    <HoneypotInput
                      @id="new-account-confirmation"
                      @autocomplete="new-password"
                      @value={{this.accountHoneypot}}
                    />
                    <Input
                      @value={{this.accountChallenge}}
                      id="new-account-challenge"
                    />
                  </div>
                </div>
  
                {{#if this.requireInviteCode}}
                  <div class="input-group create-account__invite-code">
                    <Input
                      @value={{this.inviteCode}}
                      class={{value-entered this.inviteCode}}
                      id="inviteCode"
                    />
                    <label class="alt-placeholder" for="invite-code">{{i18n
                        "user.invite_code.title"
                      }}</label>
                    <span class="more-info">{{i18n
                        "user.invite_code.instructions"
                      }}</span>
                  </div>
                {{/if}}
  
                <PluginOutlet
                  @name="create-account-after-password"
                  @outletArgs={{hash
                    accountName=this.accountName
                    accountUsername=this.accountUsername
                    accountPassword=this.accountPassword
                    userFields=this.userFields
                  }}
                />
  
                {{#if this.userFields}}
                  <div class="user-fields">
                    {{#each this.userFields as |f|}}
                      <div class="input-group">
                        {{! adding the value-entered class here to
                        be able to detect if the user field has a value
                        entered }}
                        <UserField
                          @field={{f.field}}
                          @value={{f.value}}
                          @class={{value-entered f.value}}
                          @validation={{f.validation}}
                        />
                      </div>
                    {{/each}}
                  </div>
                {{/if}}
              </form>
            </div>
  
            <div class="modal-footer">
              <DButton
                @class="btn-large btn-primary"
                @action={{action "createAccount"}}
                @disabled={{this.submitDisabled}}
                @label="create_account.title"
                @isLoading={{this.formSubmitted}}
              />
  
              {{#unless this.hasAuthOptions}}
                <DButton
                  @class="btn-large"
                  @id="login-link"
                  @action={{route-action "showLogin"}}
                  @disabled={{this.formSubmitted}}
                  @label="log_in"
                />
              {{/unless}}
  
              <div class="disclaimer">
                {{html-safe this.disclaimerHtml}}
              </div>
            </div>
  
            <PluginOutlet
              @name="create-account-after-modal-footer"
              @connectorTagName="div"
            />
  
          {{/if}}
          {{#unless this.hasAuthOptions}}
            <div class="create-account-login-buttons">
              <LoginButtons @externalLogin={{action "externalLogin"}} />
            </div>
          {{/unless}}
  
          {{#if this.skipConfirmation}}
            {{loading-spinner size="large"}}
          {{/if}}
        </div>
      </DModalBody>
    {{/unless}}
  </CreateAccount>
  */
  {
    "id": "V32SkW71",
    "block": "[[[8,[39,0],null,[[\"@email\",\"@disabled\",\"@action\"],[[30,0,[\"accountEmail\"]],[30,0,[\"submitDisabled\"]],[28,[37,1],[[30,0],\"createAccount\"],null]]],[[\"default\"],[[[[1,\"\\n\"],[41,[51,[30,0,[\"complete\"]]],[[[1,\"    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"create-account-before-modal-body\",\"div\"]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[8,[39,4],null,[[\"@class\",\"@preventModalAlertHiding\"],[[30,0,[\"modalBodyClasses\"]],true]],[[\"default\"],[[[[1,\"\\n      \"],[10,0],[15,0,[29,[\"create-account-form \",[30,0,[\"authOptions\",\"auth_provider\"]]]]],[12],[1,\"\\n        \"],[10,0],[14,0,\"login-welcome-header\"],[14,1,\"create-account-title\"],[12],[1,\"\\n          \"],[10,\"h1\"],[14,0,\"login-title\"],[12],[1,[28,[35,5],[\"create_account.header_title\"],null]],[13],[1,\"\\n          \"],[10,\"img\"],[15,\"src\",[30,0,[\"wavingHandURL\"]]],[14,\"alt\",\"\"],[14,0,\"waving-hand\"],[12],[13],[1,\"\\n          \"],[10,2],[14,0,\"login-subheader\"],[12],[1,[28,[35,5],[\"create_account.subheader_title\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"],[41,[30,0,[\"showCreateForm\"]],[[[1,\"\\n          \"],[10,0],[14,0,\"login-form\"],[12],[1,\"\\n            \"],[10,\"form\"],[12],[1,\"\\n\"],[41,[30,0,[\"associateHtml\"]],[[[1,\"                \"],[10,0],[14,0,\"input-group create-account-associate-link\"],[12],[1,\"\\n                  \"],[10,1],[12],[1,[28,[35,7],[[30,0,[\"associateHtml\"]]],null]],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[10,0],[14,0,\"input-group create-account-email\"],[12],[1,\"\\n                \"],[8,[39,8],[[16,\"disabled\",[30,0,[\"emailDisabled\"]]],[24,1,\"new-account-email\"],[24,3,\"email\"],[16,0,[28,[37,9],[[30,0,[\"accountEmail\"]]],null]],[24,\"autofocus\",\"autofocus\"],[24,\"aria-describedby\",\"account-email-validation\"],[16,\"aria-invalid\",[30,0,[\"emailValidation\",\"failed\"]]],[4,[38,10],[\"focusout\",[28,[37,1],[[30,0],\"checkEmailAvailability\"],null]],null]],[[\"@type\",\"@value\"],[\"email\",[30,0,[\"accountEmail\"]]]],null],[1,\"\\n                \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"new-account-email\"],[12],[1,\"\\n                  \"],[1,[28,[35,5],[\"user.email.title\"],null]],[41,[30,0,[\"userFields\"]],[[[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n                \"],[8,[39,11],null,[[\"@validation\",\"@id\"],[[30,0,[\"emailValidation\"]],\"account-email-validation\"]],null],[1,\"\\n                \"],[10,1],[14,0,\"more-info\"],[12],[1,[28,[35,5],[\"user.email.instructions\"],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n\\n              \"],[10,0],[14,0,\"input-group create-account__username\"],[12],[1,\"\\n                \"],[8,[39,8],[[16,\"disabled\",[30,0,[\"usernameDisabled\"]]],[16,0,[28,[37,9],[[30,0,[\"accountUsername\"]]],null]],[24,1,\"new-account-username\"],[24,3,\"username\"],[16,\"maxlength\",[30,0,[\"maxUsernameLength\"]]],[24,\"aria-describedby\",\"username-validation\"],[16,\"aria-invalid\",[30,0,[\"usernameValidation\",\"failed\"]]],[24,\"autocomplete\",\"off\"]],[[\"@value\"],[[30,0,[\"accountUsername\"]]]],null],[1,\"\\n                \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"new-account-username\"],[12],[1,\"\\n                  \"],[1,[28,[35,5],[\"user.username.title\"],null]],[41,[30,0,[\"userFields\"]],[[[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n\\n                \"],[8,[39,11],null,[[\"@validation\",\"@id\"],[[30,0,[\"usernameValidation\"]],\"username-validation\"]],null],[1,\"\\n                \"],[10,1],[14,0,\"more-info\"],[12],[1,[28,[35,5],[\"user.username.instructions\"],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n\\n              \"],[10,0],[14,0,\"input-group create-account__fullname\"],[12],[1,\"\\n\"],[41,[30,0,[\"fullnameRequired\"]],[[[1,\"                  \"],[8,[39,12],[[24,\"aria-describedby\",\"fullname-validation\"],[16,\"aria-invalid\",[30,0,[\"nameValidation\",\"failed\"]]]],[[\"@disabled\",\"@value\",\"@id\",\"@class\"],[[30,0,[\"nameDisabled\"]],[30,0,[\"accountName\"]],\"new-account-name\",[28,[37,9],[[30,0,[\"accountName\"]]],null]]],null],[1,\"\\n                  \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"new-account-name\"],[12],[1,\"\\n                    \"],[1,[28,[35,5],[\"user.name.title\"],null]],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"full_name_required\"]],[[[41,[30,0,[\"userFields\"]],[[[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"                  \"],[13],[1,\"\\n\\n                  \"],[8,[39,11],null,[[\"@validation\",\"@id\"],[[30,0,[\"nameValidation\"]],\"fullname-validation\"]],null],[1,\"\\n                  \"],[10,1],[14,0,\"more-info\"],[12],[1,[30,0,[\"nameInstructions\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[13],[1,\"\\n\\n              \"],[8,[39,3],null,[[\"@name\",\"@outletArgs\"],[\"create-account-before-password\",[28,[37,13],null,[[\"accountName\",\"accountUsername\",\"accountPassword\",\"userFields\",\"authOptions\"],[[30,0,[\"accountName\"]],[30,0,[\"accountUsername\"]],[30,0,[\"accountPassword\"]],[30,0,[\"userFields\"]],[30,0,[\"authOptions\"]]]]]]],null],[1,\"\\n\\n              \"],[10,0],[14,0,\"input-group create-account__password\"],[12],[1,\"\\n\"],[41,[30,0,[\"passwordRequired\"]],[[[1,\"                  \"],[8,[39,14],[[24,1,\"new-account-password\"],[24,\"aria-describedby\",\"password-validation\"],[16,\"aria-invalid\",[30,0,[\"passwordValidation\",\"failed\"]]]],[[\"@value\",\"@class\",\"@type\",\"@autocomplete\",\"@capsLockOn\"],[[30,0,[\"accountPassword\"]],[28,[37,9],[[30,0,[\"accountPassword\"]]],null],[52,[30,0,[\"maskPassword\"]],\"password\",\"text\"],\"current-password\",[30,0,[\"capsLockOn\"]]]],null],[1,\"\\n                  \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"new-account-password\"],[12],[1,\"\\n                    \"],[1,[28,[35,5],[\"user.password.title\"],null]],[41,[30,0,[\"userFields\"]],[[[10,1],[14,0,\"required\"],[12],[1,\"*\"],[13],[1,\"\\n\"]],[]],null],[1,\"                  \"],[13],[1,\"\\n                  \"],[10,0],[14,0,\"create-account__password-info\"],[12],[1,\"\\n                    \"],[10,0],[14,0,\"create-account__password-tip-validation\"],[12],[1,\"\\n                      \"],[8,[39,11],null,[[\"@validation\",\"@id\"],[[30,0,[\"passwordValidation\"]],\"password-validation\"]],null],[1,\"\\n                      \"],[10,1],[14,0,\"more-info\"],[12],[1,[30,0,[\"passwordInstructions\"]]],[13],[1,\"\\n                      \"],[10,0],[15,0,[29,[\"caps-lock-warning\\n                          \",[52,[51,[30,0,[\"capsLockOn\"]]],\"hidden\"]]]],[12],[1,\"\\n                        \"],[1,[28,[35,15],[\"exclamation-triangle\"],null]],[1,\"\\n                        \"],[1,[28,[35,5],[\"login.caps_lock_warning\"],null]],[1,\"\\n                      \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[8,[39,16],null,[[\"@maskPassword\",\"@togglePasswordMask\"],[[30,0,[\"maskPassword\"]],[30,0,[\"togglePasswordMask\"]]]],null],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n                \"],[10,0],[14,0,\"password-confirmation\"],[12],[1,\"\\n                  \"],[10,\"label\"],[14,\"for\",\"new-account-password-confirmation\"],[12],[1,[28,[35,5],[\"user.password_confirmation.title\"],null]],[13],[1,\"\\n                  \"],[8,[39,17],null,[[\"@id\",\"@autocomplete\",\"@value\"],[\"new-account-confirmation\",\"new-password\",[30,0,[\"accountHoneypot\"]]]],null],[1,\"\\n                  \"],[8,[39,8],[[24,1,\"new-account-challenge\"]],[[\"@value\"],[[30,0,[\"accountChallenge\"]]]],null],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"requireInviteCode\"]],[[[1,\"                \"],[10,0],[14,0,\"input-group create-account__invite-code\"],[12],[1,\"\\n                  \"],[8,[39,8],[[16,0,[28,[37,9],[[30,0,[\"inviteCode\"]]],null]],[24,1,\"inviteCode\"]],[[\"@value\"],[[30,0,[\"inviteCode\"]]]],null],[1,\"\\n                  \"],[10,\"label\"],[14,0,\"alt-placeholder\"],[14,\"for\",\"invite-code\"],[12],[1,[28,[35,5],[\"user.invite_code.title\"],null]],[13],[1,\"\\n                  \"],[10,1],[14,0,\"more-info\"],[12],[1,[28,[35,5],[\"user.invite_code.instructions\"],null]],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n              \"],[8,[39,3],null,[[\"@name\",\"@outletArgs\"],[\"create-account-after-password\",[28,[37,13],null,[[\"accountName\",\"accountUsername\",\"accountPassword\",\"userFields\"],[[30,0,[\"accountName\"]],[30,0,[\"accountUsername\"]],[30,0,[\"accountPassword\"]],[30,0,[\"userFields\"]]]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"userFields\"]],[[[1,\"                \"],[10,0],[14,0,\"user-fields\"],[12],[1,\"\\n\"],[42,[28,[37,19],[[28,[37,19],[[30,0,[\"userFields\"]]],null]],null],null,[[[1,\"                    \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n\"],[1,\"                      \"],[8,[39,20],null,[[\"@field\",\"@value\",\"@class\",\"@validation\"],[[30,1,[\"field\"]],[30,1,[\"value\"]],[28,[37,9],[[30,1,[\"value\"]]],null],[30,1,[\"validation\"]]]],null],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[1]],null],[1,\"                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n            \"],[8,[39,21],null,[[\"@class\",\"@action\",\"@disabled\",\"@label\",\"@isLoading\"],[\"btn-large btn-primary\",[28,[37,1],[[30,0],\"createAccount\"],null],[30,0,[\"submitDisabled\"]],\"create_account.title\",[30,0,[\"formSubmitted\"]]]],null],[1,\"\\n\\n\"],[41,[51,[30,0,[\"hasAuthOptions\"]]],[[[1,\"              \"],[8,[39,21],null,[[\"@class\",\"@id\",\"@action\",\"@disabled\",\"@label\"],[\"btn-large\",\"login-link\",[28,[37,22],[\"showLogin\"],null],[30,0,[\"formSubmitted\"]],\"log_in\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n            \"],[10,0],[14,0,\"disclaimer\"],[12],[1,\"\\n              \"],[1,[28,[35,7],[[30,0,[\"disclaimerHtml\"]]],null]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"create-account-after-modal-footer\",\"div\"]],null],[1,\"\\n\\n\"]],[]],null],[41,[51,[30,0,[\"hasAuthOptions\"]]],[[[1,\"          \"],[10,0],[14,0,\"create-account-login-buttons\"],[12],[1,\"\\n            \"],[8,[39,23],null,[[\"@externalLogin\"],[[28,[37,1],[[30,0],\"externalLogin\"],null]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"skipConfirmation\"]],[[[1,\"          \"],[1,[28,[35,24],null,[[\"size\"],[\"large\"]]]],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]],null]],[]]]]]],[\"f\"],false,[\"create-account\",\"action\",\"unless\",\"plugin-outlet\",\"d-modal-body\",\"i18n\",\"if\",\"html-safe\",\"input\",\"value-entered\",\"on\",\"input-tip\",\"text-field\",\"hash\",\"password-field\",\"d-icon\",\"toggle-password-mask\",\"honeypot-input\",\"each\",\"-track-array\",\"user-field\",\"d-button\",\"route-action\",\"login-buttons\",\"loading-spinner\"]]",
    "moduleName": "discourse/templates/modal/create-account.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});