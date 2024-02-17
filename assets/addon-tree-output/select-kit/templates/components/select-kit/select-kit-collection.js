define("select-kit/templates/components/select-kit/select-kit-collection", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.collection.content.length}}
    <ul class="select-kit-collection" aria-live="polite" role="menu">
      {{#each this.collection.content as |item index|}}
        {{component
          (component-for-row this.collection.identifier item this.selectKit)
          index=index
          item=item
          value=this.value
          selectKit=this.selectKit
        }}
      {{/each}}
    </ul>
  {{/if}}
  */
  {
    "id": "tMhINnRC",
    "block": "[[[41,[30,0,[\"collection\",\"content\",\"length\"]],[[[1,\"  \"],[10,\"ul\"],[14,0,\"select-kit-collection\"],[14,\"aria-live\",\"polite\"],[14,\"role\",\"menu\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"collection\",\"content\"]]],null]],null],null,[[[1,\"      \"],[46,[28,[37,4],[[30,0,[\"collection\",\"identifier\"]],[30,1],[30,0,[\"selectKit\"]]],null],null,[[\"index\",\"item\",\"value\",\"selectKit\"],[[30,2],[30,1],[30,0,[\"value\"]],[30,0,[\"selectKit\"]]]],null],[1,\"\\n\"]],[1,2]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"item\",\"index\"],false,[\"if\",\"each\",\"-track-array\",\"component\",\"component-for-row\"]]",
    "moduleName": "select-kit/templates/components/select-kit/select-kit-collection.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});