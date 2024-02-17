define("discourse/templates/user/notifications-index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.model.error}}
    <div class="item error">
      {{#if this.model.forbidden}}
        {{i18n "errors.reasons.forbidden"}}
      {{else}}
        {{i18n "errors.desc.unknown"}}
      {{/if}}
    </div>
  {{else if this.doesNotHaveNotifications}}
    <EmptyState
      @title={{i18n "user.no_notifications_page_title"}}
      @body={{this.emptyStateBody}}
    />
  {{else}}
    <div class="user-notifications-filter">
      <NotificationsFilter
        @value={{this.filter}}
        @onChange={{action (mut this.filter)}}
      />
    </div>
  
    {{#if this.nothingFound}}
      <div class="alert alert-info">{{i18n "notifications.empty"}}</div>
    {{else}}
      <UserNotificationsLarge @notifications={{this.model}} />
      <ConditionalLoadingSpinner @condition={{this.loading}} />
    {{/if}}
  {{/if}}
  */
  {
    "id": "cJmB2Pne",
    "block": "[[[41,[30,0,[\"model\",\"error\"]],[[[1,\"  \"],[10,0],[14,0,\"item error\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"forbidden\"]],[[[1,\"      \"],[1,[28,[35,1],[\"errors.reasons.forbidden\"],null]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,1],[\"errors.desc.unknown\"],null]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"doesNotHaveNotifications\"]],[[[1,\"  \"],[8,[39,2],null,[[\"@title\",\"@body\"],[[28,[37,1],[\"user.no_notifications_page_title\"],null],[30,0,[\"emptyStateBody\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"user-notifications-filter\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@value\",\"@onChange\"],[[30,0,[\"filter\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"filter\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"nothingFound\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,[28,[35,1],[\"notifications.empty\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,6],null,[[\"@notifications\"],[[30,0,[\"model\"]]]],null],[1,\"\\n    \"],[8,[39,7],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]]]],[]]]],[]]]],[],false,[\"if\",\"i18n\",\"empty-state\",\"notifications-filter\",\"action\",\"mut\",\"user-notifications-large\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/user/notifications-index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});