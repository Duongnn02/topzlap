define("discourse/components/user-summary-users-list", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.users}}
    <ul>
      {{#each this.users as |user|}}
        {{yield user}}
      {{/each}}
    </ul>
  {{else}}
    <p>{{i18n (concat "user.summary." this.none)}}</p>
  {{/if}}
  */
  {
    "id": "ICXGsUVY",
    "block": "[[[41,[30,0,[\"users\"]],[[[1,\"  \"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"users\"]]],null]],null],null,[[[1,\"      \"],[18,2,[[30,1]]],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,2],[12],[1,[28,[35,4],[[28,[37,5],[\"user.summary.\",[30,0,[\"none\"]]],null]],null]],[13],[1,\"\\n\"]],[]]]],[\"user\",\"&default\"],false,[\"if\",\"each\",\"-track-array\",\"yield\",\"i18n\",\"concat\"]]",
    "moduleName": "discourse/components/user-summary-users-list.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});