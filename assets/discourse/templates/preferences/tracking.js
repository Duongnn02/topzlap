define("discourse/templates/preferences/tracking", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-preferences-tracking" />
  
  <div class="user-preferences__tracking-topics-wrapper">
    <label class="control-label">{{i18n "user.topics_settings"}}</label>
  
    <div class="user-preferences_tracking-topics-controls">
      <div class="controls controls-dropdown">
        <label>{{i18n "user.new_topic_duration.label"}}</label>
        <ComboBox
          @class="duration"
          @valueProperty="value"
          @content={{this.considerNewTopicOptions}}
          @value={{this.model.user_option.new_topic_duration_minutes}}
          @onChange={{action
            (mut this.model.user_option.new_topic_duration_minutes)
          }}
        />
      </div>
  
      <div class="controls controls-dropdown">
        <label>{{i18n "user.auto_track_topics"}}</label>
        <ComboBox
          @valueProperty="value"
          @content={{this.autoTrackDurations}}
          @value={{this.model.user_option.auto_track_topics_after_msecs}}
          @onChange={{action
            (mut this.model.user_option.auto_track_topics_after_msecs)
          }}
        />
      </div>
  
      <div class="controls controls-dropdown">
        <label>{{i18n "user.notification_level_when_replying"}}</label>
        <ComboBox
          @valueProperty="value"
          @content={{this.notificationLevelsForReplying}}
          @value={{this.model.user_option.notification_level_when_replying}}
          @onChange={{action
            (mut this.model.user_option.notification_level_when_replying)
          }}
        />
      </div>
    </div>
  </div>
  
  <div class="user-preferences__tracking-categories-tags-wrapper">
    <div>
      <UserPreferences::Categories
        @canSee={{this.canSee}}
        @model={{this.model}}
        @selectedCategories={{this.selectedCategories}}
        @hideMutedTags={{this.hideMutedTags}}
        @siteSettings={{this.siteSettings}}
      />
    </div>
  
    <div>
      <UserPreferences::Tags
        @model={{this.model}}
        @selectedTags={{this.selectedTags}}
        @save={{this.save}}
        @siteSettings={{this.siteSettings}}
      />
    </div>
  </div>
  
  {{#if this.canSave}}
    <SaveControls
      @model={{this.model}}
      @action={{this.save}}
      @saved={{this.saved}}
    />
  {{/if}}
  */
  {
    "id": "w1bb7dQJ",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"user-preferences-tracking\"]],null],[1,\"\\n\\n\"],[10,0],[14,0,\"user-preferences__tracking-topics-wrapper\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.topics_settings\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"user-preferences_tracking-topics-controls\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,1],[\"user.new_topic_duration.label\"],null]],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@class\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"duration\",\"value\",[30,0,[\"considerNewTopicOptions\"]],[30,0,[\"model\",\"user_option\",\"new_topic_duration_minutes\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"user_option\",\"new_topic_duration_minutes\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,1],[\"user.auto_track_topics\"],null]],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,0,[\"autoTrackDurations\"]],[30,0,[\"model\",\"user_option\",\"auto_track_topics_after_msecs\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"user_option\",\"auto_track_topics_after_msecs\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,1],[\"user.notification_level_when_replying\"],null]],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,0,[\"notificationLevelsForReplying\"]],[30,0,[\"model\",\"user_option\",\"notification_level_when_replying\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"user_option\",\"notification_level_when_replying\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"user-preferences__tracking-categories-tags-wrapper\"],[12],[1,\"\\n  \"],[10,0],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@canSee\",\"@model\",\"@selectedCategories\",\"@hideMutedTags\",\"@siteSettings\"],[[30,0,[\"canSee\"]],[30,0,[\"model\"]],[30,0,[\"selectedCategories\"]],[30,0,[\"hideMutedTags\"]],[30,0,[\"siteSettings\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[12],[1,\"\\n    \"],[8,[39,6],null,[[\"@model\",\"@selectedTags\",\"@save\",\"@siteSettings\"],[[30,0,[\"model\"]],[30,0,[\"selectedTags\"]],[30,0,[\"save\"]],[30,0,[\"siteSettings\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canSave\"]],[[[1,\"  \"],[8,[39,8],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[30,0,[\"save\"]],[30,0,[\"saved\"]]]],null],[1,\"\\n\"]],[]],null]],[],false,[\"d-section\",\"i18n\",\"combo-box\",\"action\",\"mut\",\"user-preferences/categories\",\"user-preferences/tags\",\"if\",\"save-controls\"]]",
    "moduleName": "discourse/templates/preferences/tracking.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});