define("select-kit/templates/components/dropdown-select-box/dropdown-select-box-row", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.icons}}
    <div class="icons">
      <span class="selection-indicator"></span>
      {{#each this.icons as |icon|}}
        {{d-icon icon translatedTitle=(dasherize this.title)}}
      {{/each}}
    </div>
  {{/if}}
  
  <div class="texts">
    <span class="name">{{html-safe this.label}}</span>
    <span class="desc">{{html-safe this.description}}</span>
  </div>
  */
  {
    "id": "DH+HQICR",
    "block": "[[[41,[30,0,[\"icons\"]],[[[1,\"  \"],[10,0],[14,0,\"icons\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"selection-indicator\"],[12],[13],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"icons\"]]],null]],null],null,[[[1,\"      \"],[1,[28,[35,3],[[30,1]],[[\"translatedTitle\"],[[28,[37,4],[[30,0,[\"title\"]]],null]]]]],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"texts\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"name\"],[12],[1,[28,[35,5],[[30,0,[\"label\"]]],null]],[13],[1,\"\\n  \"],[10,1],[14,0,\"desc\"],[12],[1,[28,[35,5],[[30,0,[\"description\"]]],null]],[13],[1,\"\\n\"],[13]],[\"icon\"],false,[\"if\",\"each\",\"-track-array\",\"d-icon\",\"dasherize\",\"html-safe\"]]",
    "moduleName": "select-kit/templates/components/dropdown-select-box/dropdown-select-box-row.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});