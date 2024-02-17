define("discourse/templates/group/messages", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="user-secondary-navigation">
    <MobileNav @class="messages-nav" @desktopClass="nav-stacked action-list">
      <li>
        <LinkTo @route="group.messages.inbox" @model={{this.model.name}}>
          {{i18n "user.messages.inbox"}}
        </LinkTo>
      </li>
      <li>
        <LinkTo @route="group.messages.archive" @model={{this.model.name}}>
          {{i18n "user.messages.archive"}}
        </LinkTo>
      </li>
    </MobileNav>
  </section>
  <section class="user-content" id="user-content">
    {{outlet}}
  </section>
  */
  {
    "id": "tOzuIScs",
    "block": "[[[10,\"section\"],[14,0,\"user-secondary-navigation\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@class\",\"@desktopClass\"],[\"messages-nav\",\"nav-stacked action-list\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\",\"@model\"],[\"group.messages.inbox\",[30,0,[\"model\",\"name\"]]]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,2],[\"user.messages.inbox\"],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@route\",\"@model\"],[\"group.messages.archive\",[30,0,[\"model\",\"name\"]]]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,2],[\"user.messages.archive\"],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"section\"],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n  \"],[46,[28,[37,4],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"mobile-nav\",\"link-to\",\"i18n\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/group/messages.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});