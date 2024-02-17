define("discourse/components/reviewable-tags", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.tags}}
    <div class="list-tags">
      {{#each this.tags as |t|}} {{discourse-tag t}} {{/each}}
    </div>
  {{/if}}
  */
  {
    "id": "MVN2oRpv",
    "block": "[[[41,[30,0,[\"tags\"]],[[[1,\"  \"],[10,0],[14,0,\"list-tags\"],[12],[1,\"\\n    \"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"tags\"]]],null]],null],null,[[[1,\" \"],[1,[28,[35,3],[[30,1]],null]],[1,\" \"]],[1]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"t\"],false,[\"if\",\"each\",\"-track-array\",\"discourse-tag\"]]",
    "moduleName": "discourse/components/reviewable-tags.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});