define("discourse/templates/user/notifications", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-notifications" />
  
  <div class="user-navigation user-navigation-secondary">
    <HorizontalOverflowNav @ariaLabel="User secondary - notifications">
      <DNavigationItem
        @route="userNotifications.index"
        @class="user-nav__notifications-all"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "bell"}}
        <span>{{i18n "user.filters.all"}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="userNotifications.responses"
        @class="user-nav__notifications-responses"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "reply"}}
        <span>{{i18n "user_action_groups.6"}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="userNotifications.likesReceived"
        @class="user-nav__notifications-likes"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "heart"}}
        <span>{{i18n "user_action_groups.2"}}</span>
      </DNavigationItem>
  
      {{#if this.siteSettings.enable_mentions}}
        <DNavigationItem
          @route="userNotifications.mentions"
          @class="user-nav__notifications-mentions"
          @ariaCurrentContext="subNav"
        >
          {{d-icon "at"}}
          <span>{{i18n "user_action_groups.7"}}</span>
        </DNavigationItem>
      {{/if}}
  
      <DNavigationItem
        @route="userNotifications.edits"
        @class="user-nav__notifications-edits"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "pencil-alt"}}
        <span>{{i18n "user_action_groups.11"}}</span>
      </DNavigationItem>
  
      <PluginOutlet
        @name="user-notifications-bottom"
        @connectorTagName="li"
        @outletArgs={{hash model=this.model}}
      />
  
    </HorizontalOverflowNav>
  
    {{#if this.model}}
      <div class="navigation-controls">
        <DButton
          @title="user.dismiss_notifications_tooltip"
          @class="btn btn-default dismiss-notifications"
          @action={{action "resetNew"}}
          @label="user.dismiss_notifications"
          @icon="check"
          @disabled={{this.allNotificationsRead}}
        />
      </div>
    {{/if}}
  </div>
  
  <section class="user-content" id="user-content">
    <LoadMore
      @class="notification-history user-stream"
      @selector=".user-stream .notification"
      @action={{action "loadMore"}}
    >
      {{outlet}}
      <ConditionalLoadingSpinner @condition={{this.model.loadingMore}} />
    </LoadMore>
  </section>
  */
  {
    "id": "bMdKbyIA",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"user-notifications\"]],null],[1,\"\\n\\n\"],[10,0],[14,0,\"user-navigation user-navigation-secondary\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@ariaLabel\"],[\"User secondary - notifications\"]],[[\"default\"],[[[[1,\"\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userNotifications.index\",\"user-nav__notifications-all\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"bell\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.filters.all\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userNotifications.responses\",\"user-nav__notifications-responses\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"reply\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user_action_groups.6\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userNotifications.likesReceived\",\"user-nav__notifications-likes\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"heart\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user_action_groups.2\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"siteSettings\",\"enable_mentions\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userNotifications.mentions\",\"user-nav__notifications-mentions\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"at\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user_action_groups.7\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userNotifications.edits\",\"user-nav__notifications-edits\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"pencil-alt\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user_action_groups.11\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-notifications-bottom\",\"li\",[28,[37,7],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\\n  \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"model\"]],[[[1,\"    \"],[10,0],[14,0,\"navigation-controls\"],[12],[1,\"\\n      \"],[8,[39,8],null,[[\"@title\",\"@class\",\"@action\",\"@label\",\"@icon\",\"@disabled\"],[\"user.dismiss_notifications_tooltip\",\"btn btn-default dismiss-notifications\",[28,[37,9],[[30,0],\"resetNew\"],null],\"user.dismiss_notifications\",\"check\",[30,0,[\"allNotificationsRead\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n  \"],[8,[39,10],null,[[\"@class\",\"@selector\",\"@action\"],[\"notification-history user-stream\",\".user-stream .notification\",[28,[37,9],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n    \"],[46,[28,[37,12],null,null],null,null,null],[1,\"\\n    \"],[8,[39,13],null,[[\"@condition\"],[[30,0,[\"model\",\"loadingMore\"]]]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"],[13]],[],false,[\"d-section\",\"horizontal-overflow-nav\",\"d-navigation-item\",\"d-icon\",\"i18n\",\"if\",\"plugin-outlet\",\"hash\",\"d-button\",\"action\",\"load-more\",\"component\",\"-outlet\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/user/notifications.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});