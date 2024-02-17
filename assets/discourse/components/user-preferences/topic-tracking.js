define("discourse/components/user-preferences/topic-tracking", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="user-preferences_tracking-topics-controls">
    <div class="controls controls-dropdown">
      <label>{{i18n "user.new_topic_duration.label"}}</label>
      <ComboBox
        @class="duration"
        @valueProperty="value"
        @content={{@considerNewTopicOptions}}
        @value={{@model.user_option.new_topic_duration_minutes}}
        @onChange={{action (mut @model.user_option.new_topic_duration_minutes)}}
      />
    </div>
  
    <div class="controls controls-dropdown">
      <label>{{i18n "user.auto_track_topics"}}</label>
      <ComboBox
        @valueProperty="value"
        @content={{@autoTrackDurations}}
        @value={{@model.user_option.auto_track_topics_after_msecs}}
        @onChange={{action
          (mut @model.user_option.auto_track_topics_after_msecs)
        }}
      />
    </div>
  
    <div class="controls controls-dropdown">
      <label>{{i18n "user.notification_level_when_replying"}}</label>
      <ComboBox
        @valueProperty="value"
        @content={{@notificationLevelsForReplying}}
        @value={{@model.user_option.notification_level_when_replying}}
        @onChange={{action
          (mut @model.user_option.notification_level_when_replying)
        }}
      />
    </div>
  </div>
  */
  {
    "id": "6/vkl9Qy",
    "block": "[[[10,0],[14,0,\"user-preferences_tracking-topics-controls\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,0],[\"user.new_topic_duration.label\"],null]],[13],[1,\"\\n    \"],[8,[39,1],null,[[\"@class\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"duration\",\"value\",[30,1],[30,2,[\"user_option\",\"new_topic_duration_minutes\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,2,[\"user_option\",\"new_topic_duration_minutes\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,0],[\"user.auto_track_topics\"],null]],[13],[1,\"\\n    \"],[8,[39,1],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,3],[30,2,[\"user_option\",\"auto_track_topics_after_msecs\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,2,[\"user_option\",\"auto_track_topics_after_msecs\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,0],[\"user.notification_level_when_replying\"],null]],[13],[1,\"\\n    \"],[8,[39,1],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,4],[30,2,[\"user_option\",\"notification_level_when_replying\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,2,[\"user_option\",\"notification_level_when_replying\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@considerNewTopicOptions\",\"@model\",\"@autoTrackDurations\",\"@notificationLevelsForReplying\"],false,[\"i18n\",\"combo-box\",\"action\",\"mut\"]]",
    "moduleName": "discourse/components/user-preferences/topic-tracking.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});