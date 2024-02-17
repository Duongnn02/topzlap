define("discourse/templates/preferences-second-factor", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-preferences" @tagName="">
    <section class="user-content user-preferences solo-preference second-factor">
      <ConditionalLoadingSpinner @condition={{this.loading}}>
        <form class="form-vertical">
          {{#if this.showEnforcedNotice}}
            <div class="alert alert-error">{{i18n
                "user.second_factor.enforced_notice"
              }}</div>
          {{/if}}
  
          {{#if this.displayOAuthWarning}}
            <div class="alert alert-warning">{{i18n
                "user.second_factor.oauth_enabled_warning"
              }}</div>
          {{/if}}
  
          {{#if this.errorMessage}}
            <div class="alert alert-error">{{this.errorMessage}}</div>
          {{/if}}
  
          {{#if this.loaded}}
            <div class="control-group totp">
              <div class="controls">
                <h2>{{i18n "user.second_factor.totp.title"}}</h2>
                {{#each this.totps as |totp|}}
                  <div class="second-factor-item row">
                    <div class="details">
                      {{#if totp.name}}
                        {{totp.name}}
                      {{else}}
                        {{i18n "user.second_factor.totp.default_name"}}
                      {{/if}}
                    </div>
                    {{#if this.isCurrentUser}}
                      <div class="actions">
                        <TokenBasedAuthDropdown
                          @totp={{totp}}
                          @editSecondFactor={{action "editSecondFactor"}}
                          @disableSingleSecondFactor={{action
                            "disableSingleSecondFactor"
                          }}
                        />
                      </div>
                    {{/if}}
                  </div>
                {{/each}}
                <DButton
                  @action={{action "createTotp"}}
                  @class="btn-default new-totp"
                  @icon="plus"
                  @disabled={{this.loading}}
                  @label="user.second_factor.totp.add"
                />
              </div>
            </div>
  
            <div class="control-group security-key">
              <div class="controls">
                <h2>{{i18n "user.second_factor.security_key.title"}}</h2>
                {{#each this.security_keys as |security_key|}}
                  <div class="second-factor-item row">
                    <div class="details">
                      {{#if security_key.name}}
                        {{security_key.name}}
                      {{else}}
                        {{i18n "user.second_factor.security_key.default_name"}}
                      {{/if}}
                    </div>
  
                    {{#if this.isCurrentUser}}
                      <div class="actions">
                        <SecurityKeyDropdown
                          @securityKey={{security_key}}
                          @editSecurityKey={{action "editSecurityKey"}}
                          @disableSingleSecondFactor={{action
                            "disableSingleSecondFactor"
                          }}
                        />
                      </div>
                    {{/if}}
                  </div>
                {{/each}}
                <DButton
                  @action={{action "createSecurityKey"}}
                  @class="btn-default new-security-key"
                  @icon="plus"
                  @disabled={{this.loading}}
                  @label="user.second_factor.security_key.add"
                />
              </div>
            </div>
  
            <div class="control-group pref-second-factor-backup">
              <div class="controls pref-second-factor-backup">
                <h2>{{i18n "user.second_factor_backup.title"}}</h2>
                <div class="second-factor-item row">
                  {{#if this.model.second_factor_enabled}}
                    <div class="details">
                      {{#if this.model.second_factor_backup_enabled}}
                        {{html-safe
                          (i18n
                            "user.second_factor_backup.manage"
                            count=this.model.second_factor_remaining_backup_codes
                          )
                        }}
                      {{else}}
                        <DButton
                          @action={{action "editSecondFactorBackup"}}
                          @class="btn-default new-second-factor-backup"
                          @icon="plus"
                          @disabled={{this.loading}}
                          @label="user.second_factor_backup.enable_long"
                        />
                      {{/if}}
                    </div>
  
                    {{#if
                      (and
                        this.model.second_factor_backup_enabled this.isCurrentUser
                      )
                    }}
                      <div class="actions">
                        <TwoFactorBackupDropdown
                          @secondFactorBackupEnabled={{this.model.second_factor_backup_enabled}}
                          @editSecondFactorBackup={{action
                            "editSecondFactorBackup"
                          }}
                          @disableSecondFactorBackup={{action
                            "disableSecondFactorBackup"
                          }}
                        />
                      </div>
                    {{/if}}
  
                  {{else}}
                    {{i18n "user.second_factor_backup.enable_prerequisites"}}
                  {{/if}}
                </div>
              </div>
            </div>
  
            {{#if this.model.second_factor_enabled}}
              {{#unless this.showEnforcedNotice}}
                <div class="control-group pref-second-factor-disable-all">
                  <div class="controls -actions">
                    <DButton
                      @class="btn-danger"
                      @icon="ban"
                      @action={{action "disableAllSecondFactors"}}
                      @disabled={{this.loading}}
                      @label="user.second_factor.disable_all"
                    />
                    <CancelLink
                      @route="preferences.security"
                      @args={{this.model.username}}
                    />
                  </div>
                </div>
              {{/unless}}
            {{/if}}
          {{else}}
            <div class="control-group">
              <label class="control-label">{{i18n "user.password.title"}}</label>
  
              <div class="controls">
                <div>
                  <TextField
                    @value={{this.password}}
                    @id="password"
                    @type="password"
                    @classNames="input-large"
                    @autofocus="autofocus"
                  />
                </div>
                <div class="instructions">
                  {{i18n "user.second_factor.confirm_password_description"}}
                </div>
              </div>
            </div>
  
            <div class="control-group">
              <div class="controls -actions">
                <DButton
                  @class="btn-primary"
                  @type="submit"
                  @action={{action "confirmPassword"}}
                  @disabled={{this.loading}}
                  @label="continue"
                />
  
                {{#unless this.showEnforcedNotice}}
                  <CancelLink
                    @route="preferences.account"
                    @args={{this.model.username}}
                  />
                {{/unless}}
              </div>
              <div class="controls" style="margin-top: 5px">
                {{this.resetPasswordProgress}}
                {{#unless this.resetPasswordLoading}}
                  <a
                    href
                    class="instructions"
                    {{on "click" this.resetPassword}}
                  >{{i18n "user.second_factor.forgot_password"}}</a>
                {{/unless}}
              </div>
            </div>
          {{/if}}
        </form>
      </ConditionalLoadingSpinner>
    </section>
  </DSection>
  */
  {
    "id": "RJF2ATFR",
    "block": "[[[8,[39,0],null,[[\"@pageClass\",\"@tagName\"],[\"user-preferences\",\"\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"section\"],[14,0,\"user-content user-preferences solo-preference second-factor\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[10,\"form\"],[14,0,\"form-vertical\"],[12],[1,\"\\n\"],[41,[30,0,[\"showEnforcedNotice\"]],[[[1,\"          \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[28,[35,3],[\"user.second_factor.enforced_notice\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"displayOAuthWarning\"]],[[[1,\"          \"],[10,0],[14,0,\"alert alert-warning\"],[12],[1,[28,[35,3],[\"user.second_factor.oauth_enabled_warning\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"errorMessage\"]],[[[1,\"          \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[30,0,[\"errorMessage\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"loaded\"]],[[[1,\"          \"],[10,0],[14,0,\"control-group totp\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n              \"],[10,\"h2\"],[12],[1,[28,[35,3],[\"user.second_factor.totp.title\"],null]],[13],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"totps\"]]],null]],null],null,[[[1,\"                \"],[10,0],[14,0,\"second-factor-item row\"],[12],[1,\"\\n                  \"],[10,0],[14,0,\"details\"],[12],[1,\"\\n\"],[41,[30,1,[\"name\"]],[[[1,\"                      \"],[1,[30,1,[\"name\"]]],[1,\"\\n\"]],[]],[[[1,\"                      \"],[1,[28,[35,3],[\"user.second_factor.totp.default_name\"],null]],[1,\"\\n\"]],[]]],[1,\"                  \"],[13],[1,\"\\n\"],[41,[30,0,[\"isCurrentUser\"]],[[[1,\"                    \"],[10,0],[14,0,\"actions\"],[12],[1,\"\\n                      \"],[8,[39,6],null,[[\"@totp\",\"@editSecondFactor\",\"@disableSingleSecondFactor\"],[[30,1],[28,[37,7],[[30,0],\"editSecondFactor\"],null],[28,[37,7],[[30,0],\"disableSingleSecondFactor\"],null]]],null],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n\"]],[1]],null],[1,\"              \"],[8,[39,8],null,[[\"@action\",\"@class\",\"@icon\",\"@disabled\",\"@label\"],[[28,[37,7],[[30,0],\"createTotp\"],null],\"btn-default new-totp\",\"plus\",[30,0,[\"loading\"]],\"user.second_factor.totp.add\"]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"control-group security-key\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n              \"],[10,\"h2\"],[12],[1,[28,[35,3],[\"user.second_factor.security_key.title\"],null]],[13],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"security_keys\"]]],null]],null],null,[[[1,\"                \"],[10,0],[14,0,\"second-factor-item row\"],[12],[1,\"\\n                  \"],[10,0],[14,0,\"details\"],[12],[1,\"\\n\"],[41,[30,2,[\"name\"]],[[[1,\"                      \"],[1,[30,2,[\"name\"]]],[1,\"\\n\"]],[]],[[[1,\"                      \"],[1,[28,[35,3],[\"user.second_factor.security_key.default_name\"],null]],[1,\"\\n\"]],[]]],[1,\"                  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"isCurrentUser\"]],[[[1,\"                    \"],[10,0],[14,0,\"actions\"],[12],[1,\"\\n                      \"],[8,[39,9],null,[[\"@securityKey\",\"@editSecurityKey\",\"@disableSingleSecondFactor\"],[[30,2],[28,[37,7],[[30,0],\"editSecurityKey\"],null],[28,[37,7],[[30,0],\"disableSingleSecondFactor\"],null]]],null],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n\"]],[2]],null],[1,\"              \"],[8,[39,8],null,[[\"@action\",\"@class\",\"@icon\",\"@disabled\",\"@label\"],[[28,[37,7],[[30,0],\"createSecurityKey\"],null],\"btn-default new-security-key\",\"plus\",[30,0,[\"loading\"]],\"user.second_factor.security_key.add\"]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"control-group pref-second-factor-backup\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"controls pref-second-factor-backup\"],[12],[1,\"\\n              \"],[10,\"h2\"],[12],[1,[28,[35,3],[\"user.second_factor_backup.title\"],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"second-factor-item row\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"second_factor_enabled\"]],[[[1,\"                  \"],[10,0],[14,0,\"details\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"second_factor_backup_enabled\"]],[[[1,\"                      \"],[1,[28,[35,10],[[28,[37,3],[\"user.second_factor_backup.manage\"],[[\"count\"],[[30,0,[\"model\",\"second_factor_remaining_backup_codes\"]]]]]],null]],[1,\"\\n\"]],[]],[[[1,\"                      \"],[8,[39,8],null,[[\"@action\",\"@class\",\"@icon\",\"@disabled\",\"@label\"],[[28,[37,7],[[30,0],\"editSecondFactorBackup\"],null],\"btn-default new-second-factor-backup\",\"plus\",[30,0,[\"loading\"]],\"user.second_factor_backup.enable_long\"]],null],[1,\"\\n\"]],[]]],[1,\"                  \"],[13],[1,\"\\n\\n\"],[41,[28,[37,11],[[30,0,[\"model\",\"second_factor_backup_enabled\"]],[30,0,[\"isCurrentUser\"]]],null],[[[1,\"                    \"],[10,0],[14,0,\"actions\"],[12],[1,\"\\n                      \"],[8,[39,12],null,[[\"@secondFactorBackupEnabled\",\"@editSecondFactorBackup\",\"@disableSecondFactorBackup\"],[[30,0,[\"model\",\"second_factor_backup_enabled\"]],[28,[37,7],[[30,0],\"editSecondFactorBackup\"],null],[28,[37,7],[[30,0],\"disableSecondFactorBackup\"],null]]],null],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"]],[]],[[[1,\"                  \"],[1,[28,[35,3],[\"user.second_factor_backup.enable_prerequisites\"],null]],[1,\"\\n\"]],[]]],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"second_factor_enabled\"]],[[[41,[51,[30,0,[\"showEnforcedNotice\"]]],[[[1,\"              \"],[10,0],[14,0,\"control-group pref-second-factor-disable-all\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"controls -actions\"],[12],[1,\"\\n                  \"],[8,[39,8],null,[[\"@class\",\"@icon\",\"@action\",\"@disabled\",\"@label\"],[\"btn-danger\",\"ban\",[28,[37,7],[[30,0],\"disableAllSecondFactors\"],null],[30,0,[\"loading\"]],\"user.second_factor.disable_all\"]],null],[1,\"\\n                  \"],[8,[39,14],null,[[\"@route\",\"@args\"],[\"preferences.security\",[30,0,[\"model\",\"username\"]]]],null],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[]],[[[1,\"          \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,3],[\"user.password.title\"],null]],[13],[1,\"\\n\\n            \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n              \"],[10,0],[12],[1,\"\\n                \"],[8,[39,15],null,[[\"@value\",\"@id\",\"@type\",\"@classNames\",\"@autofocus\"],[[30,0,[\"password\"]],\"password\",\"password\",\"input-large\",\"autofocus\"]],null],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n                \"],[1,[28,[35,3],[\"user.second_factor.confirm_password_description\"],null]],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"controls -actions\"],[12],[1,\"\\n              \"],[8,[39,8],null,[[\"@class\",\"@type\",\"@action\",\"@disabled\",\"@label\"],[\"btn-primary\",\"submit\",[28,[37,7],[[30,0],\"confirmPassword\"],null],[30,0,[\"loading\"]],\"continue\"]],null],[1,\"\\n\\n\"],[41,[51,[30,0,[\"showEnforcedNotice\"]]],[[[1,\"                \"],[8,[39,14],null,[[\"@route\",\"@args\"],[\"preferences.account\",[30,0,[\"model\",\"username\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"controls\"],[14,5,\"margin-top: 5px\"],[12],[1,\"\\n              \"],[1,[30,0,[\"resetPasswordProgress\"]]],[1,\"\\n\"],[41,[51,[30,0,[\"resetPasswordLoading\"]]],[[[1,\"                \"],[11,3],[24,6,\"\"],[24,0,\"instructions\"],[4,[38,16],[\"click\",[30,0,[\"resetPassword\"]]],null],[12],[1,[28,[35,3],[\"user.second_factor.forgot_password\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[\"totp\",\"security_key\"],false,[\"d-section\",\"conditional-loading-spinner\",\"if\",\"i18n\",\"each\",\"-track-array\",\"token-based-auth-dropdown\",\"action\",\"d-button\",\"security-key-dropdown\",\"html-safe\",\"and\",\"two-factor-backup-dropdown\",\"unless\",\"cancel-link\",\"text-field\",\"on\"]]",
    "moduleName": "discourse/templates/preferences-second-factor.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});