define("discourse/components/score-value", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.value}}
    <span class="score-value">
      <span class="score-number">{{float this.value}}</span>
      {{#if this.label}}
        <span
          title={{i18n (concat "review.explain." this.label ".title")}}
          class="score-value-type"
        >
          {{i18n (concat "review.explain." this.label ".name")}}
        </span>
      {{/if}}
    </span>
    <span class="op">+</span>
  {{/if}}
  */
  {
    "id": "iqqZ/jP7",
    "block": "[[[41,[30,0,[\"value\"]],[[[1,\"  \"],[10,1],[14,0,\"score-value\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"score-number\"],[12],[1,[28,[35,1],[[30,0,[\"value\"]]],null]],[13],[1,\"\\n\"],[41,[30,0,[\"label\"]],[[[1,\"      \"],[10,1],[15,\"title\",[28,[37,2],[[28,[37,3],[\"review.explain.\",[30,0,[\"label\"]],\".title\"],null]],null]],[14,0,\"score-value-type\"],[12],[1,\"\\n        \"],[1,[28,[35,2],[[28,[37,3],[\"review.explain.\",[30,0,[\"label\"]],\".name\"],null]],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"op\"],[12],[1,\"+\"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"float\",\"i18n\",\"concat\"]]",
    "moduleName": "discourse/components/score-value.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});