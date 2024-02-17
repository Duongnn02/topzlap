define("discourse/templates/user-private-messages-tags", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <UserNav::MessagesSecondaryNav>
    <li class="tags">
      <LinkTo @route="userPrivateMessages.tags.index">
        {{d-icon "tag"}}
        <span>{{i18n "user.messages.all_tags"}}</span>
      </LinkTo>
    </li>
  
    {{#if this.tagName}}
      <li class="archive">
        <LinkTo @route="userPrivateMessages.tags.show" @model={{this.tagName}}>
          {{this.tagName}}
        </LinkTo>
      </li>
    {{/if}}
  </UserNav::MessagesSecondaryNav>
  
  {{outlet}}
  */
  {
    "id": "d1SiqzZ0",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,\"li\"],[14,0,\"tags\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@route\"],[\"userPrivateMessages.tags.index\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,2],[\"tag\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,3],[\"user.messages.all_tags\"],null]],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"tagName\"]],[[[1,\"    \"],[10,\"li\"],[14,0,\"archive\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\",\"@model\"],[\"userPrivateMessages.tags.show\",[30,0,[\"tagName\"]]]],[[\"default\"],[[[[1,\"\\n        \"],[1,[30,0,[\"tagName\"]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]]]]],[1,\"\\n\\n\"],[46,[28,[37,6],null,null],null,null,null]],[],false,[\"user-nav/messages-secondary-nav\",\"link-to\",\"d-icon\",\"i18n\",\"if\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/user-private-messages-tags.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});