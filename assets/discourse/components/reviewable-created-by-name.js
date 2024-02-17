define("discourse/components/reviewable-created-by-name", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="names">
    <span class="username">
      {{#if this.user}}
        <UserLink @user={{this.user}}>{{this.user.username}}</UserLink>
        {{#if this.user.silenced}}
          {{d-icon "ban" title="user.silenced_tooltip"}}
        {{/if}}
      {{else}}
        {{i18n "review.deleted_user"}}
      {{/if}}
    </span>
    <PluginOutlet
      @name="after-reviewable-post-user"
      @connectorTagName="div"
      @outletArgs={{hash user=this.user}}
    />
  </div>
  */
  {
    "id": "rgvcFOht",
    "block": "[[[10,0],[14,0,\"names\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"username\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\"]],[[[1,\"      \"],[8,[39,1],null,[[\"@user\"],[[30,0,[\"user\"]]]],[[\"default\"],[[[[1,[30,0,[\"user\",\"username\"]]]],[]]]]],[1,\"\\n\"],[41,[30,0,[\"user\",\"silenced\"]],[[[1,\"        \"],[1,[28,[35,2],[\"ban\"],[[\"title\"],[\"user.silenced_tooltip\"]]]],[1,\"\\n\"]],[]],null]],[]],[[[1,\"      \"],[1,[28,[35,3],[\"review.deleted_user\"],null]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n  \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"after-reviewable-post-user\",\"div\",[28,[37,5],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n\"],[13]],[],false,[\"if\",\"user-link\",\"d-icon\",\"i18n\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/reviewable-created-by-name.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});