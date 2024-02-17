define("discourse/templates/preferences", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-preferences" />
  
  <div class="user-navigation user-navigation-secondary">
    <HorizontalOverflowNav @ariaLabel="User secondary - preferences">
      <DNavigationItem
        @route="preferences.account"
        @class="user-nav__preferences-account"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "user"}}
        <span>{{i18n "user.preferences_nav.account"}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="preferences.security"
        @class="user-nav__preferences-security"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "lock"}}
        <span>{{i18n "user.preferences_nav.security"}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="preferences.profile"
        @class="user-nav__preferences-profile"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "user"}}
        <span>{{i18n "user.preferences_nav.profile"}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="preferences.emails"
        @class="user-nav__preferences-emails"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "envelope"}}
        <span>{{i18n "user.preferences_nav.emails"}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="preferences.notifications"
        @class="user-nav__preferences-notifications"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "bell"}}
        <span>{{i18n "user.preferences_nav.notifications"}}</span>
      </DNavigationItem>
  
      {{#if this.model.can_change_tracking_preferences}}
        <DNavigationItem
          @route="preferences.tracking"
          @class="user-nav__preferences-tracking"
          @ariaCurrentContext="subNav"
        >
          {{d-icon "plus"}}
          <span>{{i18n "user.preferences_nav.tracking"}}</span>
        </DNavigationItem>
      {{/if}}
  
      <DNavigationItem
        @route="preferences.users"
        @class="user-nav__preferences-users"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "users"}}
        <span>{{i18n "user.preferences_nav.users"}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="preferences.interface"
        @class="user-nav__preferences-interface"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "desktop"}}
        <span>{{i18n "user.preferences_nav.interface"}}</span>
      </DNavigationItem>
  
      {{#if (not (eq this.siteSettings.navigation_menu "legacy"))}}
        <DNavigationItem
          @route="preferences.sidebar"
          @class="user-nav__preferences-sidebar"
          @ariaCurrentContext="subNav"
        >
          {{d-icon "bars"}}
          <span>{{i18n "user.preferences_nav.sidebar"}}</span>
        </DNavigationItem>
      {{/if}}
  
      <PluginOutlet
        @name="user-preferences-nav-under-interface"
        @connectorTagName="div"
        @outletArgs={{hash model=this.model}}
      />
      <PluginOutlet
        @name="user-preferences-nav"
        @connectorTagName="li"
        @outletArgs={{hash model=this.model}}
      />
    </HorizontalOverflowNav>
  </div>
  
  <section class="user-content user-preferences" id="user-content">
    <span>
      <PluginOutlet
        @name="above-user-preferences"
        @connectorTagName="div"
        @outletArgs={{hash model=this.model}}
      />
    </span>
  
    <form class="form-vertical">
      {{outlet}}
    </form>
  </section>
  */
  {
    "id": "TBb3mSkT",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"user-preferences\"]],null],[1,\"\\n\\n\"],[10,0],[14,0,\"user-navigation user-navigation-secondary\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@ariaLabel\"],[\"User secondary - preferences\"]],[[\"default\"],[[[[1,\"\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.account\",\"user-nav__preferences-account\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"user\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.account\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.security\",\"user-nav__preferences-security\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"lock\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.security\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.profile\",\"user-nav__preferences-profile\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"user\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.profile\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.emails\",\"user-nav__preferences-emails\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"envelope\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.emails\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.notifications\",\"user-nav__preferences-notifications\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"bell\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.notifications\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"can_change_tracking_preferences\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.tracking\",\"user-nav__preferences-tracking\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"plus\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.tracking\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.users\",\"user-nav__preferences-users\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"users\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.users\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.interface\",\"user-nav__preferences-interface\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,3],[\"desktop\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.interface\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n\"],[41,[28,[37,6],[[28,[37,7],[[30,0,[\"siteSettings\",\"navigation_menu\"]],\"legacy\"],null]],null],[[[1,\"      \"],[8,[39,2],null,[[\"@route\",\"@class\",\"@ariaCurrentContext\"],[\"preferences.sidebar\",\"user-nav__preferences-sidebar\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"bars\"],null]],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"user.preferences_nav.sidebar\"],null]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-nav-under-interface\",\"div\",[28,[37,9],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n    \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-nav\",\"li\",[28,[37,9],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"user-content user-preferences\"],[14,1,\"user-content\"],[12],[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"above-user-preferences\",\"div\",[28,[37,9],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"form\"],[14,0,\"form-vertical\"],[12],[1,\"\\n    \"],[46,[28,[37,11],null,null],null,null,null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"d-section\",\"horizontal-overflow-nav\",\"d-navigation-item\",\"d-icon\",\"i18n\",\"if\",\"not\",\"eq\",\"plugin-outlet\",\"hash\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/preferences.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});