define("discourse/templates/user/activity", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-activity" />
  
  <div class="user-navigation user-navigation-secondary">
    <HorizontalOverflowNav @ariaLabel="User secondary - activity">
      <DNavigationItem
        @route="userActivity.index"
        @class="user-nav__activity-all"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "stream"}}
        <span>{{i18n "user.filters.all"}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="userActivity.topics"
        @class="user-nav__activity-topics"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "list-ul"}}
        <span>{{i18n "user_action_groups.4"}}</span>
      </DNavigationItem>
      <DNavigationItem
        @route="userActivity.replies"
        @class="user-nav__activity-replies"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "reply"}}
        <span>{{i18n "user_action_groups.5"}}</span>
      </DNavigationItem>
  
      {{#if this.user.showRead}}
        <DNavigationItem
          @route="userActivity.read"
          @class="user-nav__activity-read"
          @title={{i18n "user.read_help"}}
          @ariaCurrentContext="subNav"
        >
          {{d-icon "history"}}
          <span>{{i18n "user.read"}}</span>
        </DNavigationItem>
      {{/if}}
  
      {{#if this.user.showDrafts}}
        <DNavigationItem
          @route="userActivity.drafts"
          @class="user-nav__activity-drafts"
          @ariaCurrentContext="subNav"
        >
          {{d-icon "pencil-alt"}}
          <span>{{this.draftLabel}}</span>
        </DNavigationItem>
      {{/if}}
  
      {{#if (gt this.model.pending_posts_count 0)}}
        <DNavigationItem
          @route="userActivity.pending"
          @class="user-nav__activity-pending"
          @ariaCurrentContext="subNav"
        >
          {{d-icon "clock"}}
          <span>{{this.pendingLabel}}</span>
        </DNavigationItem>
      {{/if}}
  
      <DNavigationItem
        @route="userActivity.likesGiven"
        @class="user-nav__activity-likes"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "heart"}}
        <span>{{i18n "user_action_groups.1"}}</span>
      </DNavigationItem>
  
      {{#if this.user.showBookmarks}}
        <DNavigationItem
          @route="userActivity.bookmarks"
          @class="user-nav__activity-bookmarks"
          @ariaCurrentContext="subNav"
        >
          {{d-icon "bookmark"}}
          <span>{{i18n "user_action_groups.3"}}</span>
        </DNavigationItem>
      {{/if}}
  
      <PluginOutlet
        @name="user-activity-bottom"
        @connectorTagName="li"
        @outletArgs={{hash model=this.model}}
      />
    </HorizontalOverflowNav>
  </div>
  
  <section class="user-content" id="user-content">
    {{outlet}}
  </section>
  */
  {
    "id": "xhTPkYg1",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"user-activity\"]],null],[1,\"\\n\\n\"],[10,0],[14,0,\"user-navigation user-navigation-secondary\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@ariaLabel\"],[\"User secondary - activity\"]],[[\"default\"],[[[[1,\"\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userActivity.index\",\"user-nav__activity-all\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"stream\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.filters.all\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userActivity.topics\",\"user-nav__activity-topics\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"list-ul\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user_action_groups.4\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userActivity.replies\",\"user-nav__activity-replies\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"reply\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user_action_groups.5\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"user\",\"showRead\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@title\",\"@ariaCurrentContext\"],[\"userActivity.read\",\"user-nav__activity-read\",[28,[37,4],[\"user.read_help\"],null],\"subNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"history\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.read\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"user\",\"showDrafts\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userActivity.drafts\",\"user-nav__activity-drafts\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"pencil-alt\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[30,0,[\"draftLabel\"]]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,6],[[30,0,[\"model\",\"pending_posts_count\"]],0],null],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userActivity.pending\",\"user-nav__activity-pending\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"clock\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[30,0,[\"pendingLabel\"]]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userActivity.likesGiven\",\"user-nav__activity-likes\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"heart\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user_action_groups.1\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"user\",\"showBookmarks\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"userActivity.bookmarks\",\"user-nav__activity-bookmarks\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"bookmark\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user_action_groups.3\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,7],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-activity-bottom\",\"li\",[28,[37,8],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n  \"],[46,[28,[37,10],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"d-section\",\"horizontal-overflow-nav\",\"d-navigation-item\",\"d-icon\",\"i18n\",\"if\",\"gt\",\"plugin-outlet\",\"hash\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/user/activity.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});