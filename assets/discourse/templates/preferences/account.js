define("discourse/templates/preferences/account", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group pref-username">
    <label class="control-label">{{i18n "user.username.title"}}</label>
    <UsernamePreference @user={{this.model}} />
  </div>
  
  {{#unless this.siteSettings.discourse_connect_overrides_avatar}}
    <div class="control-group pref-avatar">
      <label class="control-label" id="profile-picture">{{i18n
          "user.avatar.title"
        }}</label>
      <div class="controls">
        {{! we want the "huge" version even though we're downsizing it in CSS }}
        {{bound-avatar this.model "huge"}}
        <DButton
          @action={{route-action "showAvatarSelector"}}
          @actionParam={{this.model}}
          @class="btn-default pad-left"
          @icon="pencil-alt"
        />
      </div>
    </div>
  {{/unless}}
  
  {{#if this.canCheckEmails}}
    <div class="control-group pref-email">
      <label class="control-label">{{i18n "user.email.title"}}</label>
      {{#if this.model.email}}
        {{#if this.siteSettings.enable_secondary_emails}}
          <div class="emails">
            {{#each this.emails as |email|}}
              <div class="row email">
                {{#if this.model.can_edit_email}}
                  <EmailDropdown
                    @email={{email}}
                    @setPrimaryEmail={{action "setPrimaryEmail"}}
                    @destroyEmail={{action "destroyEmail"}}
                  />
                {{/if}}
  
                <div class="email-first">{{email.email}}</div>
  
                <div class="email-second">
                  {{#if email.primary}}
                    <span class="primary">{{i18n
                        "user.email.primary_label"
                      }}</span>
                  {{/if}}
  
                  {{#unless email.confirmed}}
                    <span class="unconfirmed">{{i18n
                        "user.email.unconfirmed_label"
                      }}</span>
                    &bull;
                    {{#if email.resending}}
                      <span>{{i18n "user.email.resending_label"}}</span>
                    {{else if email.resent}}
                      <span>{{i18n "user.email.resent_label"}}</span>
                    {{else}}
                      <a
                        {{on "click" (fn this.resendConfirmationEmail email)}}
                        href
                      >{{i18n "user.email.resend_label"}}</a>
                    {{/if}}
                  {{/unless}}
                </div>
              </div>
            {{/each}}
          </div>
  
          {{#if this.model.can_edit_email}}
            <LinkTo
              @route="preferences.email"
              @query={{hash new=1}}
              class="pull-right"
            >
              {{d-icon "plus"}}
              {{i18n "user.email.add_email"}}
            </LinkTo>
          {{/if}}
        {{else}}
          <div class="controls">
            <span class="static">{{this.model.email}}</span>
            {{#if this.model.can_edit_email}}
              <LinkTo
                @route="preferences.email"
                class="btn btn-default btn-small btn-icon pad-left no-text"
              >{{d-icon "pencil-alt"}}</LinkTo>
            {{/if}}
          </div>
        {{/if}}
  
        <div class="instructions">
          {{#if this.siteSettings.auth_overrides_email}}
            {{i18n "user.email.auth_override_instructions"}}
          {{/if}}
          {{i18n "user.email.instructions"}}
        </div>
      {{else}}
        <div class="controls">
          <DButton
            @action={{route-action "checkEmail"}}
            @class="btn-default"
            @actionParam={{this.model}}
            @title="admin.users.check_email.title"
            @icon="envelope"
            @label="admin.users.check_email.text"
          />
        </div>
      {{/if}}
    </div>
  {{/if}}
  
  {{#if this.canUpdateAssociatedAccounts}}
    <div class="control-group pref-associated-accounts">
      <label class="control-label">{{i18n
          "user.associated_accounts.title"
        }}</label>
      {{#if this.associatedAccountsLoaded}}
        <table>
          <tbody>
            {{#each this.authProviders as |authProvider|}}
              {{#if authProvider.account}}
                <tr
                  class="{{dasherize authProvider.method.name}} account-connected"
                >
                  <td>{{authProvider.method.prettyName}}</td>
                  <td>{{authProvider.account.description}}</td>
                  <td>
                    {{#if authProvider.method.can_revoke}}
                      <DButton
                        @action={{action "revokeAccount"}}
                        @actionParam={{authProvider.account}}
                        @title="user.associated_accounts.revoke"
                        @class="btn-danger no-text"
                        @icon="trash-alt"
                        @disabled={{get this.revoking authProvider.method.name}}
                      />
                    {{/if}}
                  </td>
                </tr>
              {{else}}
                <tr class={{dasherize authProvider.method.name}}>
                  <td>{{authProvider.method.prettyName}}</td>
                  <td colspan="2">
                    {{#if authProvider.method.can_connect}}
                      <DButton
                        @action={{action "connectAccount"}}
                        @actionParam={{authProvider.method}}
                        @label="user.associated_accounts.connect"
                        @class="btn-default"
                        @icon="plug"
                        @disabled={{this.disableConnectButtons}}
                      />
                    {{else}}
                      {{i18n "user.associated_accounts.not_connected"}}
                    {{/if}}
                  </td>
                </tr>
              {{/if}}
            {{/each}}
          </tbody>
        </table>
      {{else}}
        <div class="controls">
          <DButton
            @action={{route-action "checkEmail"}}
            @actionParam={{this.model}}
            @title="admin.users.check_email.title"
            @icon="envelope"
            @label="admin.users.check_email.text"
          />
        </div>
      {{/if}}
    </div>
  {{/if}}
  
  {{#if this.canEditName}}
    <div class="control-group pref-name">
      <label class="control-label">{{i18n "user.name.title"}}</label>
      <div class="controls">
        {{#if this.model.can_edit_name}}
          <TextField
            @value={{this.newNameInput}}
            @classNames="input-xxlarge"
            @maxlength="255"
          />
        {{else}}
          <span class="static">{{this.model.name}}</span>
        {{/if}}
      </div>
      <div class="instructions">
        {{this.nameInstructions}}
      </div>
    </div>
  {{/if}}
  
  {{#if this.canSelectTitle}}
    <div class="control-group pref-title">
      <label class="control-label">{{i18n "user.title.title"}}</label>
      <div class="controls">
        <ComboBox
          @value={{this.newTitleInput}}
          @content={{this.model.availableTitles}}
          @onChange={{action (mut this.newTitleInput)}}
          @options={{hash none="user.title.none"}}
        />
      </div>
      <div class="instructions">
        {{i18n "user.title.instructions"}}
      </div>
    </div>
  {{/if}}
  
  {{#if this.canSelectFlair}}
    <div class="control-group pref-flair">
      <label class="control-label">{{i18n "user.flair.title"}}</label>
      <div class="controls">
        <FlairChooser
          @value={{this.newFlairGroupId}}
          @content={{this.model.availableFlairs}}
          @onChange={{action (mut this.newFlairGroupId)}}
          @options={{hash none="user.flair.none"}}
        />
      </div>
      <div class="instructions">
        {{i18n "user.flair.instructions"}}
      </div>
    </div>
  {{/if}}
  
  {{#if this.canSelectUserStatus}}
    <div class="control-group pref-user-status">
      <label class="control-label">{{i18n "user.status.title"}}</label>
      <div class="controls">
        {{#if this.newStatus}}
          <UserStatusMessage
            @status={{this.newStatus}}
            @showDescription={{true}}
          />
        {{else}}
          <span class="static">{{i18n "user.status.not_set"}}</span>
        {{/if}}
        <DButton
          @action={{action "showUserStatusModal"}}
          @actionParam={{this.newStatus}}
          @class="btn-default btn-small pad-left"
          @icon="pencil-alt"
        />
      </div>
    </div>
  {{/if}}
  
  {{#if this.canSelectPrimaryGroup}}
    <div class="control-group pref-primary-group">
      <label class="control-label">{{i18n "user.primary_group.title"}}</label>
      <div class="controls">
        <ComboBox
          @value={{this.newPrimaryGroupInput}}
          @content={{this.model.filteredGroups}}
          @options={{hash none="user.primary_group.none"}}
        />
      </div>
    </div>
  {{/if}}
  
  {{#if this.canDownloadPosts}}
    <div class="control-group pref-data-export">
      <label class="control-label">{{i18n "user.download_archive.title"}}</label>
      <div class="controls">
        <DButton
          @action={{action "exportUserArchive"}}
          @class="btn-default btn-request-archive"
          @label="user.download_archive.button_text"
          @icon="download"
        />
      </div>
      <div class="instructions">
        {{i18n "user.download_archive.description"}}
      </div>
    </div>
  {{/if}}
  
  <span>
    <PluginOutlet
      @name="user-preferences-account"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model save=(action "save")}}
    />
  </span>
  
  <br />
  
  <span>
    <PluginOutlet
      @name="user-custom-controls"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  </span>
  
  {{#if this.canSaveUser}}
    <SaveControls
      @model={{this.model}}
      @action={{action "save"}}
      @saved={{this.saved}}
    />
  {{/if}}
  
  {{#if this.model.canDeleteAccount}}
    <div class="control-group delete-account">
      <br />
      <div class="controls">
        <DButton
          @action={{action "delete"}}
          @disabled={{this.deleteDisabled}}
          @class="btn-danger"
          @icon="far-trash-alt"
          @label="user.delete_account"
        />
      </div>
    </div>
  {{/if}}
  */
  {
    "id": "zHr5SgsC",
    "block": "[[[10,0],[14,0,\"control-group pref-username\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.username.title\"],null]],[13],[1,\"\\n  \"],[8,[39,1],null,[[\"@user\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"siteSettings\",\"discourse_connect_overrides_avatar\"]]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-avatar\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[14,1,\"profile-picture\"],[12],[1,[28,[35,0],[\"user.avatar.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n\"],[1,\"      \"],[1,[28,[35,3],[[30,0,[\"model\"]],\"huge\"],null]],[1,\"\\n      \"],[8,[39,4],null,[[\"@action\",\"@actionParam\",\"@class\",\"@icon\"],[[28,[37,5],[\"showAvatarSelector\"],null],[30,0,[\"model\"]],\"btn-default pad-left\",\"pencil-alt\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canCheckEmails\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-email\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.email.title\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"email\"]],[[[41,[30,0,[\"siteSettings\",\"enable_secondary_emails\"]],[[[1,\"        \"],[10,0],[14,0,\"emails\"],[12],[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"emails\"]]],null]],null],null,[[[1,\"            \"],[10,0],[14,0,\"row email\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_edit_email\"]],[[[1,\"                \"],[8,[39,9],null,[[\"@email\",\"@setPrimaryEmail\",\"@destroyEmail\"],[[30,1],[28,[37,10],[[30,0],\"setPrimaryEmail\"],null],[28,[37,10],[[30,0],\"destroyEmail\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n              \"],[10,0],[14,0,\"email-first\"],[12],[1,[30,1,[\"email\"]]],[13],[1,\"\\n\\n              \"],[10,0],[14,0,\"email-second\"],[12],[1,\"\\n\"],[41,[30,1,[\"primary\"]],[[[1,\"                  \"],[10,1],[14,0,\"primary\"],[12],[1,[28,[35,0],[\"user.email.primary_label\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,1,[\"confirmed\"]]],[[[1,\"                  \"],[10,1],[14,0,\"unconfirmed\"],[12],[1,[28,[35,0],[\"user.email.unconfirmed_label\"],null]],[13],[1,\"\\n                  •\\n\"],[41,[30,1,[\"resending\"]],[[[1,\"                    \"],[10,1],[12],[1,[28,[35,0],[\"user.email.resending_label\"],null]],[13],[1,\"\\n\"]],[]],[[[41,[30,1,[\"resent\"]],[[[1,\"                    \"],[10,1],[12],[1,[28,[35,0],[\"user.email.resent_label\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"                    \"],[11,3],[24,6,\"\"],[4,[38,11],[\"click\",[28,[37,12],[[30,0,[\"resendConfirmationEmail\"]],[30,1]],null]],null],[12],[1,[28,[35,0],[\"user.email.resend_label\"],null]],[13],[1,\"\\n                  \"]],[]]]],[]]]],[]],null],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"can_edit_email\"]],[[[1,\"          \"],[8,[39,13],[[24,0,\"pull-right\"]],[[\"@route\",\"@query\"],[\"preferences.email\",[28,[37,14],null,[[\"new\"],[1]]]]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,15],[\"plus\"],null]],[1,\"\\n            \"],[1,[28,[35,0],[\"user.email.add_email\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[]],null]],[]],[[[1,\"        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"static\"],[12],[1,[30,0,[\"model\",\"email\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_edit_email\"]],[[[1,\"            \"],[8,[39,13],[[24,0,\"btn btn-default btn-small btn-icon pad-left no-text\"]],[[\"@route\"],[\"preferences.email\"]],[[\"default\"],[[[[1,[28,[35,15],[\"pencil-alt\"],null]]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n      \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"auth_overrides_email\"]],[[[1,\"          \"],[1,[28,[35,0],[\"user.email.auth_override_instructions\"],null]],[1,\"\\n\"]],[]],null],[1,\"        \"],[1,[28,[35,0],[\"user.email.instructions\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,4],null,[[\"@action\",\"@class\",\"@actionParam\",\"@title\",\"@icon\",\"@label\"],[[28,[37,5],[\"checkEmail\"],null],\"btn-default\",[30,0,[\"model\"]],\"admin.users.check_email.title\",\"envelope\",\"admin.users.check_email.text\"]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canUpdateAssociatedAccounts\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-associated-accounts\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.associated_accounts.title\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"associatedAccountsLoaded\"]],[[[1,\"      \"],[10,\"table\"],[12],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"authProviders\"]]],null]],null],null,[[[41,[30,2,[\"account\"]],[[[1,\"              \"],[10,\"tr\"],[15,0,[29,[[28,[37,16],[[30,2,[\"method\",\"name\"]]],null],\" account-connected\"]]],[12],[1,\"\\n                \"],[10,\"td\"],[12],[1,[30,2,[\"method\",\"prettyName\"]]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[30,2,[\"account\",\"description\"]]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,\"\\n\"],[41,[30,2,[\"method\",\"can_revoke\"]],[[[1,\"                    \"],[8,[39,4],null,[[\"@action\",\"@actionParam\",\"@title\",\"@class\",\"@icon\",\"@disabled\"],[[28,[37,10],[[30,0],\"revokeAccount\"],null],[30,2,[\"account\"]],\"user.associated_accounts.revoke\",\"btn-danger no-text\",\"trash-alt\",[28,[37,17],[[30,0,[\"revoking\"]],[30,2,[\"method\",\"name\"]]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[10,\"tr\"],[15,0,[28,[37,16],[[30,2,[\"method\",\"name\"]]],null]],[12],[1,\"\\n                \"],[10,\"td\"],[12],[1,[30,2,[\"method\",\"prettyName\"]]],[13],[1,\"\\n                \"],[10,\"td\"],[14,\"colspan\",\"2\"],[12],[1,\"\\n\"],[41,[30,2,[\"method\",\"can_connect\"]],[[[1,\"                    \"],[8,[39,4],null,[[\"@action\",\"@actionParam\",\"@label\",\"@class\",\"@icon\",\"@disabled\"],[[28,[37,10],[[30,0],\"connectAccount\"],null],[30,2,[\"method\"]],\"user.associated_accounts.connect\",\"btn-default\",\"plug\",[30,0,[\"disableConnectButtons\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"                    \"],[1,[28,[35,0],[\"user.associated_accounts.not_connected\"],null]],[1,\"\\n\"]],[]]],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]]]],[2]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,4],null,[[\"@action\",\"@actionParam\",\"@title\",\"@icon\",\"@label\"],[[28,[37,5],[\"checkEmail\"],null],[30,0,[\"model\"]],\"admin.users.check_email.title\",\"envelope\",\"admin.users.check_email.text\"]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canEditName\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-name\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.name.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_edit_name\"]],[[[1,\"        \"],[8,[39,18],null,[[\"@value\",\"@classNames\",\"@maxlength\"],[[30,0,[\"newNameInput\"]],\"input-xxlarge\",\"255\"]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[10,1],[14,0,\"static\"],[12],[1,[30,0,[\"model\",\"name\"]]],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[30,0,[\"nameInstructions\"]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canSelectTitle\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-title\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.title.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,19],null,[[\"@value\",\"@content\",\"@onChange\",\"@options\"],[[30,0,[\"newTitleInput\"]],[30,0,[\"model\",\"availableTitles\"]],[28,[37,10],[[30,0],[28,[37,20],[[30,0,[\"newTitleInput\"]]],null]],null],[28,[37,14],null,[[\"none\"],[\"user.title.none\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"user.title.instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canSelectFlair\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-flair\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.flair.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,21],null,[[\"@value\",\"@content\",\"@onChange\",\"@options\"],[[30,0,[\"newFlairGroupId\"]],[30,0,[\"model\",\"availableFlairs\"]],[28,[37,10],[[30,0],[28,[37,20],[[30,0,[\"newFlairGroupId\"]]],null]],null],[28,[37,14],null,[[\"none\"],[\"user.flair.none\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"user.flair.instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canSelectUserStatus\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-user-status\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.status.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n\"],[41,[30,0,[\"newStatus\"]],[[[1,\"        \"],[8,[39,22],null,[[\"@status\",\"@showDescription\"],[[30,0,[\"newStatus\"]],true]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[10,1],[14,0,\"static\"],[12],[1,[28,[35,0],[\"user.status.not_set\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[8,[39,4],null,[[\"@action\",\"@actionParam\",\"@class\",\"@icon\"],[[28,[37,10],[[30,0],\"showUserStatusModal\"],null],[30,0,[\"newStatus\"]],\"btn-default btn-small pad-left\",\"pencil-alt\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canSelectPrimaryGroup\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-primary-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.primary_group.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,19],null,[[\"@value\",\"@content\",\"@options\"],[[30,0,[\"newPrimaryGroupInput\"]],[30,0,[\"model\",\"filteredGroups\"]],[28,[37,14],null,[[\"none\"],[\"user.primary_group.none\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canDownloadPosts\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-data-export\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.download_archive.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,4],null,[[\"@action\",\"@class\",\"@label\",\"@icon\"],[[28,[37,10],[[30,0],\"exportUserArchive\"],null],\"btn-default btn-request-archive\",\"user.download_archive.button_text\",\"download\"]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"user.download_archive.description\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,23],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-account\",\"div\",[28,[37,14],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,10],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"br\"],[12],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,23],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,14],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canSaveUser\"]],[[[1,\"  \"],[8,[39,24],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[28,[37,10],[[30,0],\"save\"],null],[30,0,[\"saved\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"canDeleteAccount\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group delete-account\"],[12],[1,\"\\n    \"],[10,\"br\"],[12],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,4],null,[[\"@action\",\"@disabled\",\"@class\",\"@icon\",\"@label\"],[[28,[37,10],[[30,0],\"delete\"],null],[30,0,[\"deleteDisabled\"]],\"btn-danger\",\"far-trash-alt\",\"user.delete_account\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"email\",\"authProvider\"],false,[\"i18n\",\"username-preference\",\"unless\",\"bound-avatar\",\"d-button\",\"route-action\",\"if\",\"each\",\"-track-array\",\"email-dropdown\",\"action\",\"on\",\"fn\",\"link-to\",\"hash\",\"d-icon\",\"dasherize\",\"get\",\"text-field\",\"combo-box\",\"mut\",\"flair-chooser\",\"user-status-message\",\"plugin-outlet\",\"save-controls\"]]",
    "moduleName": "discourse/templates/preferences/account.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});