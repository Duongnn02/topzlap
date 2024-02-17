define("discourse/components/reviewable-conversation-post", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed"], function (_exports, _component, _templateFactory, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.post}}
    <div class="reviewable-conversation-post">
      {{#if this.showUsername}}
        <LinkTo
          @route="user"
          @model={{this.post.user}}
          class="username"
        >@{{this.post.user.username}}</LinkTo>
      {{/if}}
      {{html-safe this.post.excerpt}}
    </div>
  {{/if}}
  */
  {
    "id": "rEzH4/zT",
    "block": "[[[41,[30,0,[\"post\"]],[[[1,\"  \"],[10,0],[14,0,\"reviewable-conversation-post\"],[12],[1,\"\\n\"],[41,[30,0,[\"showUsername\"]],[[[1,\"      \"],[8,[39,1],[[24,0,\"username\"]],[[\"@route\",\"@model\"],[\"user\",[30,0,[\"post\",\"user\"]]]],[[\"default\"],[[[[1,\"@\"],[1,[30,0,[\"post\",\"user\",\"username\"]]]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"    \"],[1,[28,[35,2],[[30,0,[\"post\",\"excerpt\"]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"link-to\",\"html-safe\"]]",
    "moduleName": "discourse/components/reviewable-conversation-post.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    showUsername: (0, _computed.gte)("index", 1)
  }));
  _exports.default = _default;
});