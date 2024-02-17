define("discourse/templates/user-private-messages-group", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <UserNav::MessagesSecondaryNav>
  
    <DNavigationItem
      @route="userPrivateMessages.group.index"
      @class="user-nav__messages-group-latest"
      @model={{this.groupName}}
      @ariaCurrentContext="subNav"
    >
      {{d-icon "envelope"}}
      <span>{{i18n "categories.latest"}}</span>
    </DNavigationItem>
  
    {{#if this.viewingSelf}}
      <DNavigationItem
        @route="userPrivateMessages.group.new"
        @model={{this.groupName}}
        @class="user-nav__messages-group-new"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "exclamation-circle"}}
        <span>{{this.newLinkText}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="userPrivateMessages.group.unread"
        @model={{this.groupName}}
        @class="user-nav__messages-group-unread"
        @ariaCurrentContext="subNav"
      >
        {{d-icon "plus-circle"}}
        <span>{{this.unreadLinkText}}</span>
      </DNavigationItem>
  
      <DNavigationItem
        @route="userPrivateMessages.group.archive"
        @class="user-nav__messages-group-archive"
        @model={{this.groupName}}
        @ariaCurrentContext="subNav"
      >
        {{d-icon "archive"}}
        <span>{{i18n "user.messages.archive"}}</span>
      </DNavigationItem>
    {{/if}}
  </UserNav::MessagesSecondaryNav>
  
  {{outlet}}
  */
  {
    "id": "IGF1Q+HU",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n\\n  \"],[8,[39,1],null,[[\"@route\",\"@class\",\"@model\",\"@ariaCurrentContext\"],[\"userPrivateMessages.group.index\",\"user-nav__messages-group-latest\",[30,0,[\"groupName\"]],\"subNav\"]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,2],[\"envelope\"],null]],[1,\"\\n    \"],[10,1],[12],[1,[28,[35,3],[\"categories.latest\"],null]],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"viewingSelf\"]],[[[1,\"    \"],[8,[39,1],null,[[\"@route\",\"@model\",\"@class\",\"@ariaCurrentContext\"],[\"userPrivateMessages.group.new\",[30,0,[\"groupName\"]],\"user-nav__messages-group-new\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,2],[\"exclamation-circle\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[30,0,[\"newLinkText\"]]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,1],null,[[\"@route\",\"@model\",\"@class\",\"@ariaCurrentContext\"],[\"userPrivateMessages.group.unread\",[30,0,[\"groupName\"]],\"user-nav__messages-group-unread\",\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,2],[\"plus-circle\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[30,0,[\"unreadLinkText\"]]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,1],null,[[\"@route\",\"@class\",\"@model\",\"@ariaCurrentContext\"],[\"userPrivateMessages.group.archive\",\"user-nav__messages-group-archive\",[30,0,[\"groupName\"]],\"subNav\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,2],[\"archive\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,3],[\"user.messages.archive\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]],null]],[]]]]],[1,\"\\n\\n\"],[46,[28,[37,6],null,null],null,null,null]],[],false,[\"user-nav/messages-secondary-nav\",\"d-navigation-item\",\"d-icon\",\"i18n\",\"if\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/user-private-messages-group.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});