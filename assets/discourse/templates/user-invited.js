define("discourse/templates/user-invited", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.can_see_invite_details}}
    <DSection @pageClass="user-invites" />
  
    <div class="user-navigation user-navigation-secondary">
      <HorizontalOverflowNav @ariaLabel="User secondary - invites">
        <NavItem
          @route="userInvited.show"
          @routeParam="pending"
          @i18nLabel={{this.pendingLabel}}
        />
        <NavItem
          @route="userInvited.show"
          @routeParam="expired"
          @i18nLabel={{this.expiredLabel}}
        />
        <NavItem
          @route="userInvited.show"
          @routeParam="redeemed"
          @i18nLabel={{this.redeemedLabel}}
        />
      </HorizontalOverflowNav>
    </div>
  {{/if}}
  
  {{outlet}}
  */
  {
    "id": "bGKWjETy",
    "block": "[[[41,[30,0,[\"can_see_invite_details\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@pageClass\"],[\"user-invites\"]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"user-navigation user-navigation-secondary\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@ariaLabel\"],[\"User secondary - invites\"]],[[\"default\"],[[[[1,\"\\n      \"],[8,[39,3],null,[[\"@route\",\"@routeParam\",\"@i18nLabel\"],[\"userInvited.show\",\"pending\",[30,0,[\"pendingLabel\"]]]],null],[1,\"\\n      \"],[8,[39,3],null,[[\"@route\",\"@routeParam\",\"@i18nLabel\"],[\"userInvited.show\",\"expired\",[30,0,[\"expiredLabel\"]]]],null],[1,\"\\n      \"],[8,[39,3],null,[[\"@route\",\"@routeParam\",\"@i18nLabel\"],[\"userInvited.show\",\"redeemed\",[30,0,[\"redeemedLabel\"]]]],null],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[46,[28,[37,5],null,null],null,null,null]],[],false,[\"if\",\"d-section\",\"horizontal-overflow-nav\",\"nav-item\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/user-invited.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});