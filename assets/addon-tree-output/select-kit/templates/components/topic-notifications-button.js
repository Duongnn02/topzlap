define("select-kit/templates/components/topic-notifications-button", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.appendReason}}
    <p class="reason">
      <TopicNotificationsOptions
        @value={{this.notificationLevel}}
        @topic={{this.topic}}
        @onChange={{action "changeTopicNotificationLevel"}}
        @options={{hash
          icon=this.icon
          showFullTitle=this.showFullTitle
          showCaret=this.showCaret
          headerAriaLabel=(i18n "topic.notifications.title")
        }}
      />
      <span class="text">{{html-safe this.notificationReasonText}}</span>
    </p>
  {{else}}
    <TopicNotificationsOptions
      @value={{this.notificationLevel}}
      @topic={{this.topic}}
      @onChange={{action "changeTopicNotificationLevel"}}
      @options={{hash
        icon=this.icon
        showFullTitle=this.showFullTitle
        showCaret=this.showCaret
        headerAriaLabel=(i18n "topic.notifications.title")
      }}
    />
  {{/if}}
  */
  {
    "id": "n2LzAerA",
    "block": "[[[41,[30,0,[\"appendReason\"]],[[[1,\"  \"],[10,2],[14,0,\"reason\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@value\",\"@topic\",\"@onChange\",\"@options\"],[[30,0,[\"notificationLevel\"]],[30,0,[\"topic\"]],[28,[37,2],[[30,0],\"changeTopicNotificationLevel\"],null],[28,[37,3],null,[[\"icon\",\"showFullTitle\",\"showCaret\",\"headerAriaLabel\"],[[30,0,[\"icon\"]],[30,0,[\"showFullTitle\"]],[30,0,[\"showCaret\"]],[28,[37,4],[\"topic.notifications.title\"],null]]]]]],null],[1,\"\\n    \"],[10,1],[14,0,\"text\"],[12],[1,[28,[35,5],[[30,0,[\"notificationReasonText\"]]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[8,[39,1],null,[[\"@value\",\"@topic\",\"@onChange\",\"@options\"],[[30,0,[\"notificationLevel\"]],[30,0,[\"topic\"]],[28,[37,2],[[30,0],\"changeTopicNotificationLevel\"],null],[28,[37,3],null,[[\"icon\",\"showFullTitle\",\"showCaret\",\"headerAriaLabel\"],[[30,0,[\"icon\"]],[30,0,[\"showFullTitle\"]],[30,0,[\"showCaret\"]],[28,[37,4],[\"topic.notifications.title\"],null]]]]]],null],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"topic-notifications-options\",\"action\",\"hash\",\"i18n\",\"html-safe\"]]",
    "moduleName": "select-kit/templates/components/topic-notifications-button.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});