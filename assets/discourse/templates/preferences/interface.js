define("discourse/templates/preferences/interface", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <span>
    <PluginOutlet
      @name="user-preferences-interface-top"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model save=(action "save")}}
    />
  </span>
  
  {{#if this.showThemeSelector}}
    <div class="control-group theme">
      <label class="control-label">{{i18n "user.theme"}}</label>
      <div class="controls">
        <ComboBox
          @content={{this.userSelectableThemes}}
          @value={{this.themeId}}
        />
      </div>
      {{#if this.themeIdChanged}}
        <p class="alert alert-success save-theme-alert">{{i18n
            "user.save_to_change_theme"
            save_text=(i18n "save")
          }}</p>
      {{/if}}
      {{#if this.showThemeSetDefault}}
        <div class="controls">
          <PreferenceCheckbox
            @labelKey="user.theme_default_on_all_devices"
            @checked={{this.makeThemeDefault}}
          />
        </div>
      {{/if}}
    </div>
  {{/if}}
  
  {{#if this.showColorSchemeSelector}}
    <fieldset class="control-group color-scheme">
      <legend class="control-label">{{i18n "user.color_scheme"}}</legend>
      <div class="control-subgroup light-color-scheme">
        {{#if this.showDarkColorSchemeSelector}}
          <div class="instructions">{{i18n "user.color_schemes.regular"}}</div>
        {{/if}}
        <div class="controls">
          <ComboBox
            @content={{this.userSelectableColorSchemes}}
            @value={{this.selectedColorSchemeId}}
            @onChange={{action "loadColorScheme"}}
            @options={{hash
              translatedNone=this.selectedColorSchemeNoneLabel
              autoInsertNoneItem=this.showColorSchemeNoneItem
            }}
          />
        </div>
      </div>
      {{#if this.showDarkColorSchemeSelector}}
        <div class="control-subgroup dark-color-scheme">
          <div class="instructions">{{i18n "user.color_schemes.dark"}}</div>
          <div class="controls">
            <ComboBox
              @content={{this.userSelectableDarkColorSchemes}}
              @value={{this.selectedDarkColorSchemeId}}
              @onChange={{action "loadDarkColorScheme"}}
            />
          </div>
        </div>
  
        <div class="instructions">
          {{i18n "user.color_schemes.dark_instructions"}}
        </div>
      {{/if}}
  
      {{#if this.previewingColorScheme}}
        {{#if this.previewingColorScheme}}
          <DButton
            @action={{action "undoColorSchemePreview"}}
            @label="user.color_schemes.undo"
            @icon="undo"
            @class="btn-default btn-small undo-preview"
          />
        {{/if}}
  
        <div class="controls color-scheme-checkbox">
          <PreferenceCheckbox
            @labelKey="user.color_scheme_default_on_all_devices"
            @checked={{this.makeColorSchemeDefault}}
          />
        </div>
      {{/if}}
    </fieldset>
  {{/if}}
  
  {{#if this.showDarkModeToggle}}
    <div class="control-group dark-mode">
      <label class="control-label">{{i18n "user.dark_mode"}}</label>
      <div class="controls">
        <PreferenceCheckbox
          @labelKey="user.dark_mode_enable"
          @checked={{this.enableDarkMode}}
        />
      </div>
    </div>
  {{/if}}
  
  <div class="control-group text-size">
    <label for="text-size-selector" class="control-label">{{i18n
        "user.text_size.title"
      }}</label>
    <div class="controls">
      <ComboBox
        @id="text-size-selector"
        @valueProperty="value"
        @content={{this.textSizes}}
        @value={{this.textSize}}
        @onChange={{action "selectTextSize"}}
      />
    </div>
    {{#if this.showTextSetDefault}}
      <div class="controls">
        <PreferenceCheckbox
          @labelKey="user.text_size_default_on_all_devices"
          @checked={{this.makeTextSizeDefault}}
        />
      </div>
    {{/if}}
  </div>
  
  {{#if this.siteSettings.allow_user_locale}}
    <div class="control-group pref-locale">
      <label for="locale-selector" class="control-label">{{i18n
          "user.locale.title"
        }}</label>
      <div class="controls">
        <ComboBox
          @id="locale-selector"
          @valueProperty="value"
          @langProperty="value"
          @content={{this.availableLocales}}
          @value={{this.model.locale}}
          @onChange={{action (mut this.model.locale)}}
          @options={{hash filterable=true none="user.locale.default"}}
        />
      </div>
      <div class="instructions">
        {{i18n "user.locale.instructions"}}
      </div>
    </div>
  {{/if}}
  
  <div class="control-group home">
    <label for="home-selector" class="control-label">{{i18n "user.home"}}</label>
    <div class="controls">
      <ComboBox
        @id="home-selector"
        @content={{this.userSelectableHome}}
        @valueProperty="value"
        @value={{this.homepageId}}
        @onChange={{action (mut this.model.user_option.homepage_id)}}
      />
    </div>
  </div>
  
  <fieldset class="control-group other">
    <legend class="control-label">{{i18n "user.other_settings"}}</legend>
  
    <PreferenceCheckbox
      @labelKey="user.external_links_in_new_tab"
      @checked={{this.model.user_option.external_links_in_new_tab}}
      @class="pref-external-links"
    />
    <PreferenceCheckbox
      @labelKey="user.enable_quoting"
      @checked={{this.model.user_option.enable_quoting}}
      @class="pref-enable-quoting"
    />
    <PreferenceCheckbox
      @labelKey="user.enable_defer"
      @checked={{this.model.user_option.enable_defer}}
      @class="pref-defer-unread"
    />
    {{#if this.siteSettings.automatically_unpin_topics}}
      <PreferenceCheckbox
        @labelKey="user.automatically_unpin_topics"
        @checked={{this.model.user_option.automatically_unpin_topics}}
        @class="pref-auto-unpin"
      />
    {{/if}}
    {{#if this.siteSettings.allow_users_to_hide_profile}}
      <PreferenceCheckbox
        @labelKey="user.hide_profile_and_presence"
        @checked={{this.model.user_option.hide_profile_and_presence}}
        @class="pref-hide-profile"
      />
    {{/if}}
    <PreferenceCheckbox
      @labelKey="user.dynamic_favicon"
      @checked={{this.model.user_option.dynamic_favicon}}
      @class="pref-dynamic-favicon"
    />
    <div class="controls controls-dropdown pref-page-title">
      <label for="user-title-count-mode">{{i18n
          "user.title_count_mode.title"
        }}</label>
      <ComboBox
        @valueProperty="value"
        @content={{this.titleCountModes}}
        @value={{this.model.user_option.title_count_mode}}
        @id="user-title-count-mode"
        @onChange={{action (mut this.model.user_option.title_count_mode)}}
      />
    </div>
    <div class="controls controls-dropdown pref-bookmark-after-notification">
      <label for="bookmark-after-notification-mode">{{i18n
          "user.bookmark_after_notification.title"
        }}</label>
      <ComboBox
        @valueProperty="value"
        @content={{this.bookmarkAfterNotificationModes}}
        @value={{this.model.user_option.bookmark_auto_delete_preference}}
        @id="boookmark-after-notification-mode"
        @onChange={{action
          (mut this.model.user_option.bookmark_auto_delete_preference)
        }}
      />
    </div>
    <PreferenceCheckbox
      @labelKey="user.skip_new_user_tips.description"
      @checked={{this.model.user_option.skip_new_user_tips}}
      @class="pref-new-user-tips"
    />
    {{#if this.site.user_tips}}
      <DButton
        @class="pref-reset-seen-user-tips"
        @action={{action "resetSeenUserTips"}}
      >{{i18n "user.reset_seen_user_tips"}}</DButton>
    {{/if}}
  </fieldset>
  
  <span>
    <PluginOutlet
      @name="user-preferences-interface"
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
    "id": "+3VBfNtl",
    "block": "[[[10,1],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-interface-top\",\"div\",[28,[37,1],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,2],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showThemeSelector\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group theme\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,4],[\"user.theme\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,5],null,[[\"@content\",\"@value\"],[[30,0,[\"userSelectableThemes\"]],[30,0,[\"themeId\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"themeIdChanged\"]],[[[1,\"      \"],[10,2],[14,0,\"alert alert-success save-theme-alert\"],[12],[1,[28,[35,4],[\"user.save_to_change_theme\"],[[\"save_text\"],[[28,[37,4],[\"save\"],null]]]]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showThemeSetDefault\"]],[[[1,\"      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\"],[\"user.theme_default_on_all_devices\",[30,0,[\"makeThemeDefault\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showColorSchemeSelector\"]],[[[1,\"  \"],[10,\"fieldset\"],[14,0,\"control-group color-scheme\"],[12],[1,\"\\n    \"],[10,\"legend\"],[14,0,\"control-label\"],[12],[1,[28,[35,4],[\"user.color_scheme\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"control-subgroup light-color-scheme\"],[12],[1,\"\\n\"],[41,[30,0,[\"showDarkColorSchemeSelector\"]],[[[1,\"        \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,4],[\"user.color_schemes.regular\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,5],null,[[\"@content\",\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"userSelectableColorSchemes\"]],[30,0,[\"selectedColorSchemeId\"]],[28,[37,2],[[30,0],\"loadColorScheme\"],null],[28,[37,1],null,[[\"translatedNone\",\"autoInsertNoneItem\"],[[30,0,[\"selectedColorSchemeNoneLabel\"]],[30,0,[\"showColorSchemeNoneItem\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"showDarkColorSchemeSelector\"]],[[[1,\"      \"],[10,0],[14,0,\"control-subgroup dark-color-scheme\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,4],[\"user.color_schemes.dark\"],null]],[13],[1,\"\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[8,[39,5],null,[[\"@content\",\"@value\",\"@onChange\"],[[30,0,[\"userSelectableDarkColorSchemes\"]],[30,0,[\"selectedDarkColorSchemeId\"]],[28,[37,2],[[30,0],\"loadDarkColorScheme\"],null]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n        \"],[1,[28,[35,4],[\"user.color_schemes.dark_instructions\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"previewingColorScheme\"]],[[[41,[30,0,[\"previewingColorScheme\"]],[[[1,\"        \"],[8,[39,7],null,[[\"@action\",\"@label\",\"@icon\",\"@class\"],[[28,[37,2],[[30,0],\"undoColorSchemePreview\"],null],\"user.color_schemes.undo\",\"undo\",\"btn-default btn-small undo-preview\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,0],[14,0,\"controls color-scheme-checkbox\"],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\"],[\"user.color_scheme_default_on_all_devices\",[30,0,[\"makeColorSchemeDefault\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showDarkModeToggle\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group dark-mode\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,4],[\"user.dark_mode\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\"],[\"user.dark_mode_enable\",[30,0,[\"enableDarkMode\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"control-group text-size\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"text-size-selector\"],[14,0,\"control-label\"],[12],[1,[28,[35,4],[\"user.text_size.title\"],null]],[13],[1,\"\\n  \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@id\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"text-size-selector\",\"value\",[30,0,[\"textSizes\"]],[30,0,[\"textSize\"]],[28,[37,2],[[30,0],\"selectTextSize\"],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[41,[30,0,[\"showTextSetDefault\"]],[[[1,\"    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\"],[\"user.text_size_default_on_all_devices\",[30,0,[\"makeTextSizeDefault\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[41,[30,0,[\"siteSettings\",\"allow_user_locale\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-locale\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"locale-selector\"],[14,0,\"control-label\"],[12],[1,[28,[35,4],[\"user.locale.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,5],null,[[\"@id\",\"@valueProperty\",\"@langProperty\",\"@content\",\"@value\",\"@onChange\",\"@options\"],[\"locale-selector\",\"value\",\"value\",[30,0,[\"availableLocales\"]],[30,0,[\"model\",\"locale\"]],[28,[37,2],[[30,0],[28,[37,8],[[30,0,[\"model\",\"locale\"]]],null]],null],[28,[37,1],null,[[\"filterable\",\"none\"],[true,\"user.locale.default\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,4],[\"user.locale.instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"control-group home\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"home-selector\"],[14,0,\"control-label\"],[12],[1,[28,[35,4],[\"user.home\"],null]],[13],[1,\"\\n  \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@id\",\"@content\",\"@valueProperty\",\"@value\",\"@onChange\"],[\"home-selector\",[30,0,[\"userSelectableHome\"]],\"value\",[30,0,[\"homepageId\"]],[28,[37,2],[[30,0],[28,[37,8],[[30,0,[\"model\",\"user_option\",\"homepage_id\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"fieldset\"],[14,0,\"control-group other\"],[12],[1,\"\\n  \"],[10,\"legend\"],[14,0,\"control-label\"],[12],[1,[28,[35,4],[\"user.other_settings\"],null]],[13],[1,\"\\n\\n  \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\",\"@class\"],[\"user.external_links_in_new_tab\",[30,0,[\"model\",\"user_option\",\"external_links_in_new_tab\"]],\"pref-external-links\"]],null],[1,\"\\n  \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\",\"@class\"],[\"user.enable_quoting\",[30,0,[\"model\",\"user_option\",\"enable_quoting\"]],\"pref-enable-quoting\"]],null],[1,\"\\n  \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\",\"@class\"],[\"user.enable_defer\",[30,0,[\"model\",\"user_option\",\"enable_defer\"]],\"pref-defer-unread\"]],null],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"automatically_unpin_topics\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\",\"@class\"],[\"user.automatically_unpin_topics\",[30,0,[\"model\",\"user_option\",\"automatically_unpin_topics\"]],\"pref-auto-unpin\"]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"siteSettings\",\"allow_users_to_hide_profile\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\",\"@class\"],[\"user.hide_profile_and_presence\",[30,0,[\"model\",\"user_option\",\"hide_profile_and_presence\"]],\"pref-hide-profile\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\",\"@class\"],[\"user.dynamic_favicon\",[30,0,[\"model\",\"user_option\",\"dynamic_favicon\"]],\"pref-dynamic-favicon\"]],null],[1,\"\\n  \"],[10,0],[14,0,\"controls controls-dropdown pref-page-title\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"user-title-count-mode\"],[12],[1,[28,[35,4],[\"user.title_count_mode.title\"],null]],[13],[1,\"\\n    \"],[8,[39,5],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@id\",\"@onChange\"],[\"value\",[30,0,[\"titleCountModes\"]],[30,0,[\"model\",\"user_option\",\"title_count_mode\"]],\"user-title-count-mode\",[28,[37,2],[[30,0],[28,[37,8],[[30,0,[\"model\",\"user_option\",\"title_count_mode\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"controls controls-dropdown pref-bookmark-after-notification\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"bookmark-after-notification-mode\"],[12],[1,[28,[35,4],[\"user.bookmark_after_notification.title\"],null]],[13],[1,\"\\n    \"],[8,[39,5],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@id\",\"@onChange\"],[\"value\",[30,0,[\"bookmarkAfterNotificationModes\"]],[30,0,[\"model\",\"user_option\",\"bookmark_auto_delete_preference\"]],\"boookmark-after-notification-mode\",[28,[37,2],[[30,0],[28,[37,8],[[30,0,[\"model\",\"user_option\",\"bookmark_auto_delete_preference\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[8,[39,6],null,[[\"@labelKey\",\"@checked\",\"@class\"],[\"user.skip_new_user_tips.description\",[30,0,[\"model\",\"user_option\",\"skip_new_user_tips\"]],\"pref-new-user-tips\"]],null],[1,\"\\n\"],[41,[30,0,[\"site\",\"user_tips\"]],[[[1,\"    \"],[8,[39,7],null,[[\"@class\",\"@action\"],[\"pref-reset-seen-user-tips\",[28,[37,2],[[30,0],\"resetSeenUserTips\"],null]]],[[\"default\"],[[[[1,[28,[35,4],[\"user.reset_seen_user_tips\"],null]]],[]]]]],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-interface\",\"div\",[28,[37,1],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,2],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"br\"],[12],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,9],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[28,[37,2],[[30,0],\"save\"],null],[30,0,[\"saved\"]]]],null]],[],false,[\"plugin-outlet\",\"hash\",\"action\",\"if\",\"i18n\",\"combo-box\",\"preference-checkbox\",\"d-button\",\"mut\",\"save-controls\"]]",
    "moduleName": "discourse/templates/preferences/interface.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});