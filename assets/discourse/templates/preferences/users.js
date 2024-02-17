define("discourse/templates/preferences/users", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <label class="control-label">{{i18n "user.users"}}</label>
  {{#if this.ignoredEnabled}}
    <div class="control-group user-ignore">
      <div class="controls tracking-controls user-notifications">
        <label>{{d-icon "far-eye-slash" class="icon"}}
          {{i18n "user.ignored_users"}}</label>
        <IgnoredUserList
          @model={{this.model}}
          @items={{this.model.ignored_usernames}}
          @saving={{this.saved}}
        />
      </div>
    </div>
  {{/if}}
  
  <div class="control-group user-mute">
    <div class="controls tracking-controls">
      <label>
        {{d-icon "d-muted" class="icon"}}
        <span>{{i18n "user.muted_users"}}</span>
      </label>
      <UserChooser
        @value={{this.mutedUsernames}}
        @onChange={{action "onChangeMutedUsernames"}}
        @options={{hash excludeCurrentUser=true}}
      />
    </div>
    <div class="instructions">{{i18n "user.muted_users_instructions"}}</div>
  </div>
  
  {{#if this.currentUser.can_send_private_messages}}
    <div class="control-group private-messages">
      <label class="control-label">{{i18n "user.private_messages"}}</label>
      <div class="controls">
        <PreferenceCheckbox
          @labelKey="user.allow_private_messages"
          @checked={{this.model.user_option.allow_private_messages}}
        />
      </div>
    </div>
  
    <div class="control-group user-allow-pm">
      <div class="controls">
        <PreferenceCheckbox
          @labelKey="user.allow_private_messages_from_specific_users"
          @checked={{this.model.user_option.enable_allowed_pm_users}}
          @disabled={{this.disableAllowPmUsersSetting}}
        />
      </div>
      {{#if this.allowPmUsersEnabled}}
        <div class="controls tracking-controls">
          <UserChooser
            @value={{this.allowedPmUsernames}}
            @onChange={{action "onChangeAllowedPmUsernames"}}
            @options={{hash excludeCurrentUser=true}}
          />
        </div>
        <div class="instructions">{{i18n
            "user.allowed_pm_users_instructions"
          }}</div>
      {{/if}}
    </div>
  {{/if}}
  
  <span>
    <PluginOutlet
      @name="user-custom-controls"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  </span>
  
  <SaveControls
    @model={{this.model}}
    @action={{action "save"}}
    @saved={{this.saved}}
  />
  */
  {
    "id": "J5izBBX7",
    "block": "[[[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.users\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"ignoredEnabled\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group user-ignore\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"controls tracking-controls user-notifications\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,2],[\"far-eye-slash\"],[[\"class\"],[\"icon\"]]]],[1,\"\\n        \"],[1,[28,[35,0],[\"user.ignored_users\"],null]],[13],[1,\"\\n      \"],[8,[39,3],null,[[\"@model\",\"@items\",\"@saving\"],[[30,0,[\"model\"]],[30,0,[\"model\",\"ignored_usernames\"]],[30,0,[\"saved\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"control-group user-mute\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"controls tracking-controls\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"d-muted\"],[[\"class\"],[\"icon\"]]]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,0],[\"user.muted_users\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[8,[39,4],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"mutedUsernames\"]],[28,[37,5],[[30,0],\"onChangeMutedUsernames\"],null],[28,[37,6],null,[[\"excludeCurrentUser\"],[true]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.muted_users_instructions\"],null]],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"currentUser\",\"can_send_private_messages\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group private-messages\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.private_messages\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@labelKey\",\"@checked\"],[\"user.allow_private_messages\",[30,0,[\"model\",\"user_option\",\"allow_private_messages\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group user-allow-pm\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@labelKey\",\"@checked\",\"@disabled\"],[\"user.allow_private_messages_from_specific_users\",[30,0,[\"model\",\"user_option\",\"enable_allowed_pm_users\"]],[30,0,[\"disableAllowPmUsersSetting\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"allowPmUsersEnabled\"]],[[[1,\"      \"],[10,0],[14,0,\"controls tracking-controls\"],[12],[1,\"\\n        \"],[8,[39,4],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"allowedPmUsernames\"]],[28,[37,5],[[30,0],\"onChangeAllowedPmUsernames\"],null],[28,[37,6],null,[[\"excludeCurrentUser\"],[true]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.allowed_pm_users_instructions\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,6],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,9],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[28,[37,5],[[30,0],\"save\"],null],[30,0,[\"saved\"]]]],null]],[],false,[\"i18n\",\"if\",\"d-icon\",\"ignored-user-list\",\"user-chooser\",\"action\",\"hash\",\"preference-checkbox\",\"plugin-outlet\",\"save-controls\"]]",
    "moduleName": "discourse/templates/preferences/users.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});