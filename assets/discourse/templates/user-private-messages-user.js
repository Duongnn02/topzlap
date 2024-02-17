define("discourse/templates/user-private-messages-user", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showWarningsWarning}}
    <div class="alert alert-info">{{html-safe
        (i18n "admin.user.warnings_list_warning")
      }}</div>
  {{/if}}
  
  <UserNav::MessagesSecondaryNav>
    <DNavigationItem
      @route="userPrivateMessages.user.index"
      @class="user-nav__messages-latest"
      @model={{this.model}}
      @ariaCurrentContext="subNav"
    >
      {{d-icon "envelope"}}
      <span>{{i18n "categories.latest"}}</span>
    </DNavigationItem>
  
    <DNavigationItem
      @route="userPrivateMessages.user.sent"
      @class="user-nav__messages-sent"
      @model={{this.model}}
      @ariaCurrentContext="subNav"
    >
      {{d-icon "reply"}}
      <span>{{i18n "user.messages.sent"}}</span>
    </DNavigationItem>
  
    {{#if this.viewingSelf}}
      <DNavigationItem
        @route="userPrivateMessages.user.new"
        @class="user-nav__messages-new"
        @model={{this.model}}
        @ariaCurrentContext="subNav"
      >
        {{d-icon "exclamation-circle"}}
        <span>{{this.newLinkText}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="userPrivateMessages.user.unread"
        @class="user-nav__messages-unread"
        @model={{this.model}}
        @ariaCurrentContext="subNav"
      >
        {{d-icon "plus-circle"}}
        <span>{{this.unreadLinkText}}</span>
      </DNavigationItem>
  
    {{/if}}
  
    <DNavigationItem
      @route="userPrivateMessages.user.archive"
      @class="user-nav__messages-archive"
      @model={{this.model}}
      @ariaCurrentContext="subNav"
    >
      {{d-icon "archive"}}
      <span>{{i18n "user.messages.archive"}}</span>
    </DNavigationItem>
  
  </UserNav::MessagesSecondaryNav>
  
  {{outlet}}
  */
  {
    "id": "dsgZ0Qv2",
    "block": "[[[41,[30,0,[\"showWarningsWarning\"]],[[[1,\"  \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,[28,[35,1],[[28,[37,2],[\"admin.user.warnings_list_warning\"],null]],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[8,[39,3],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[39,4],null,[[\"@route\",\"@class\",\"@model\",\"@ariaCurrentContext\"],[\"userPrivateMessages.user.index\",\"user-nav__messages-latest\",[30,0,[\"model\"]],\"subNav\"]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,5],[\"envelope\"],null]],[1,\"\\n    \"],[10,1],[12],[1,[28,[35,2],[\"categories.latest\"],null]],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[39,4],null,[[\"@route\",\"@class\",\"@model\",\"@ariaCurrentContext\"],[\"userPrivateMessages.user.sent\",\"user-nav__messages-sent\",[30,0,[\"model\"]],\"subNav\"]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,5],[\"reply\"],null]],[1,\"\\n    \"],[10,1],[12],[1,[28,[35,2],[\"user.messages.sent\"],null]],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"viewingSelf\"]],[[[1,\"    \"],[8,[39,4],null,[[\"@route\",\"@class\",\"@model\",\"@ariaCurrentContext\"],[\"userPrivateMessages.user.new\",\"user-nav__messages-new\",[30,0,[\"model\"]],\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,5],[\"exclamation-circle\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[30,0,[\"newLinkText\"]]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@route\",\"@class\",\"@model\",\"@ariaCurrentContext\"],[\"userPrivateMessages.user.unread\",\"user-nav__messages-unread\",[30,0,[\"model\"]],\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,5],[\"plus-circle\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[30,0,[\"unreadLinkText\"]]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n\"]],[]],null],[1,\"\\n  \"],[8,[39,4],null,[[\"@route\",\"@class\",\"@model\",\"@ariaCurrentContext\"],[\"userPrivateMessages.user.archive\",\"user-nav__messages-archive\",[30,0,[\"model\"]],\"subNav\"]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,5],[\"archive\"],null]],[1,\"\\n    \"],[10,1],[12],[1,[28,[35,2],[\"user.messages.archive\"],null]],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n\"]],[]]]]],[1,\"\\n\\n\"],[46,[28,[37,7],null,null],null,null,null]],[],false,[\"if\",\"html-safe\",\"i18n\",\"user-nav/messages-secondary-nav\",\"d-navigation-item\",\"d-icon\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/user-private-messages-user.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});