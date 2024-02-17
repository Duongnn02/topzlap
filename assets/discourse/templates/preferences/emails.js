define("discourse/templates/preferences/emails", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.siteSettings.disable_mailing_list_mode}}
    {{~#if this.model.user_option.mailing_list_mode}}
      <div class="warning-wrap">
        <div class="warning">{{i18n "user.mailing_list_mode.warning"}}</div>
      </div>
    {{/if}}
  {{/unless}}
  <div class="control-group pref-email-settings">
    <label class="control-label">{{i18n "user.email_settings"}}</label>
  
    <div class="controls controls-dropdown">
      <label for="user-email-messages-level">{{i18n
          "user.email_messages_level"
        }}</label>
      <ComboBox
        @valueProperty="value"
        @content={{this.emailLevelOptions}}
        @value={{this.model.user_option.email_messages_level}}
        @id="user-email-messages-level"
        @onChange={{action (mut this.model.user_option.email_messages_level)}}
      />
      {{#if this.emailMessagesLevelAway}}
        <div class="instructions">{{this.emailFrequencyInstructions}}</div>
      {{/if}}
    </div>
  
    <div class="controls controls-dropdown">
      <label for="user-email-level">{{i18n "user.email_level.title"}}</label>
      <ComboBox
        @valueProperty="value"
        @content={{this.emailLevelOptions}}
        @value={{this.model.user_option.email_level}}
        @id="user-email-level"
        @onChange={{action (mut this.model.user_option.email_level)}}
      />
      {{#if this.emailLevelAway}}
        <div class="instructions">{{this.emailFrequencyInstructions}}</div>
      {{/if}}
    </div>
  
    <div class="controls controls-dropdown">
      <label>{{i18n "user.email_previous_replies.title"}}</label>
      <ComboBox
        @valueProperty="value"
        @content={{this.previousRepliesOptions}}
        @value={{this.model.user_option.email_previous_replies}}
        @onChange={{action (mut this.model.user_option.email_previous_replies)}}
      />
    </div>
    <PreferenceCheckbox
      @labelKey="user.email_in_reply_to"
      @checked={{this.model.user_option.email_in_reply_to}}
    />
  
    <span>
      <PluginOutlet
        @name="user-preferences-emails-pref-email-settings"
        @connectorTagName="div"
        @outletArgs={{hash model=this.model save=(action "save")}}
      />
    </span>
  </div>
  
  {{#unless this.siteSettings.disable_digest_emails}}
    <div class="control-group pref-activity-summary">
      <label class="control-label">{{i18n "user.email_activity_summary"}}</label>
      <PreferenceCheckbox
        @labelKey="user.email_digests.title"
        @disabled={{this.model.user_option.mailing_list_mode}}
        @checked={{this.model.user_option.email_digests}}
      />
      {{#if this.model.user_option.email_digests}}
        <div class="controls controls-dropdown">
          <ComboBox
            @valueProperty="value"
            @content={{this.digestFrequencies}}
            @value={{this.model.user_option.digest_after_minutes}}
            @onChange={{action (mut this.model.user_option.digest_after_minutes)}}
            @options={{hash filterable=true}}
          />
        </div>
        <PreferenceCheckbox
          @labelKey="user.include_tl0_in_digests"
          @disabled={{this.model.user_option.mailing_list_mode}}
          @checked={{this.model.user_option.include_tl0_in_digests}}
        />
      {{/if}}
    </div>
  {{/unless}}
  
  {{#unless this.siteSettings.disable_mailing_list_mode}}
    <div class="control-group pref-mailing-list-mode">
      <label class="control-label">{{i18n "user.mailing_list_mode.label"}}</label>
      <PreferenceCheckbox
        @labelKey="user.mailing_list_mode.enabled"
        @checked={{this.model.user_option.mailing_list_mode}}
      />
      <div class="instructions">{{html-safe
          (i18n "user.mailing_list_mode.instructions")
        }}</div>
      {{#if this.model.user_option.mailing_list_mode}}
        <div class="controls controls-dropdown">
          <ComboBox
            @valueProperty="value"
            @content={{this.mailingListModeOptions}}
            @value={{this.model.user_option.mailing_list_mode_frequency}}
            @onChange={{action
              (mut this.model.user_option.mailing_list_mode_frequency)
            }}
          />
        </div>
      {{/if}}
    </div>
  {{/unless}}
  
  <span>
    <PluginOutlet
      @name="user-preferences-emails"
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
  
  <SaveControls
    @model={{this.model}}
    @action={{action "save"}}
    @saved={{this.saved}}
  />
  */
  {
    "id": "6igppaM8",
    "block": "[[[41,[51,[30,0,[\"siteSettings\",\"disable_mailing_list_mode\"]]],[[[41,[30,0,[\"model\",\"user_option\",\"mailing_list_mode\"]],[[[1,\"    \"],[10,0],[14,0,\"warning-wrap\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"warning\"],[12],[1,[28,[35,2],[\"user.mailing_list_mode.warning\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[10,0],[14,0,\"control-group pref-email-settings\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,2],[\"user.email_settings\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"user-email-messages-level\"],[12],[1,[28,[35,2],[\"user.email_messages_level\"],null]],[13],[1,\"\\n    \"],[8,[39,3],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@id\",\"@onChange\"],[\"value\",[30,0,[\"emailLevelOptions\"]],[30,0,[\"model\",\"user_option\",\"email_messages_level\"]],\"user-email-messages-level\",[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"model\",\"user_option\",\"email_messages_level\"]]],null]],null]]],null],[1,\"\\n\"],[41,[30,0,[\"emailMessagesLevelAway\"]],[[[1,\"      \"],[10,0],[14,0,\"instructions\"],[12],[1,[30,0,[\"emailFrequencyInstructions\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"user-email-level\"],[12],[1,[28,[35,2],[\"user.email_level.title\"],null]],[13],[1,\"\\n    \"],[8,[39,3],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@id\",\"@onChange\"],[\"value\",[30,0,[\"emailLevelOptions\"]],[30,0,[\"model\",\"user_option\",\"email_level\"]],\"user-email-level\",[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"model\",\"user_option\",\"email_level\"]]],null]],null]]],null],[1,\"\\n\"],[41,[30,0,[\"emailLevelAway\"]],[[[1,\"      \"],[10,0],[14,0,\"instructions\"],[12],[1,[30,0,[\"emailFrequencyInstructions\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,2],[\"user.email_previous_replies.title\"],null]],[13],[1,\"\\n    \"],[8,[39,3],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,0,[\"previousRepliesOptions\"]],[30,0,[\"model\",\"user_option\",\"email_previous_replies\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"model\",\"user_option\",\"email_previous_replies\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\"],[\"user.email_in_reply_to\",[30,0,[\"model\",\"user_option\",\"email_in_reply_to\"]]]],null],[1,\"\\n\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,7],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-emails-pref-email-settings\",\"div\",[28,[37,8],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,4],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"siteSettings\",\"disable_digest_emails\"]]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-activity-summary\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,2],[\"user.email_activity_summary\"],null]],[13],[1,\"\\n    \"],[8,[39,6],null,[[\"@labelKey\",\"@disabled\",\"@checked\"],[\"user.email_digests.title\",[30,0,[\"model\",\"user_option\",\"mailing_list_mode\"]],[30,0,[\"model\",\"user_option\",\"email_digests\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"user_option\",\"email_digests\"]],[[[1,\"      \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\",\"@options\"],[\"value\",[30,0,[\"digestFrequencies\"]],[30,0,[\"model\",\"user_option\",\"digest_after_minutes\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"model\",\"user_option\",\"digest_after_minutes\"]]],null]],null],[28,[37,8],null,[[\"filterable\"],[true]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,6],null,[[\"@labelKey\",\"@disabled\",\"@checked\"],[\"user.include_tl0_in_digests\",[30,0,[\"model\",\"user_option\",\"mailing_list_mode\"]],[30,0,[\"model\",\"user_option\",\"include_tl0_in_digests\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"siteSettings\",\"disable_mailing_list_mode\"]]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-mailing-list-mode\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,2],[\"user.mailing_list_mode.label\"],null]],[13],[1,\"\\n    \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\"],[\"user.mailing_list_mode.enabled\",[30,0,[\"model\",\"user_option\",\"mailing_list_mode\"]]]],null],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,9],[[28,[37,2],[\"user.mailing_list_mode.instructions\"],null]],null]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"user_option\",\"mailing_list_mode\"]],[[[1,\"      \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,0,[\"mailingListModeOptions\"]],[30,0,[\"model\",\"user_option\",\"mailing_list_mode_frequency\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"model\",\"user_option\",\"mailing_list_mode_frequency\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,7],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-emails\",\"div\",[28,[37,8],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,4],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"br\"],[12],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,7],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,8],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,10],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[28,[37,4],[[30,0],\"save\"],null],[30,0,[\"saved\"]]]],null]],[],false,[\"unless\",\"if\",\"i18n\",\"combo-box\",\"action\",\"mut\",\"preference-checkbox\",\"plugin-outlet\",\"hash\",\"html-safe\",\"save-controls\"]]",
    "moduleName": "discourse/templates/preferences/emails.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});