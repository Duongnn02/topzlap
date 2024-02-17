define("select-kit/templates/components/multi-select/multi-select-header", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="select-kit-header-wrapper">
    {{#each this.icons as |icon|}}
      {{d-icon icon}}
    {{/each}}
  
    <MultiSelect::FormatSelectedContent
      @content={{or this.selectedContent this.selectKit.noneItem}}
      @selectKit={{this.selectKit}}
    />
  
    {{d-icon this.caretIcon class="caret-icon"}}
  </div>
  */
  {
    "id": "rK4TbPLO",
    "block": "[[[10,0],[14,0,\"select-kit-header-wrapper\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,0,[\"icons\"]]],null]],null],null,[[[1,\"    \"],[1,[28,[35,2],[[30,1]],null]],[1,\"\\n\"]],[1]],null],[1,\"\\n  \"],[8,[39,3],null,[[\"@content\",\"@selectKit\"],[[28,[37,4],[[30,0,[\"selectedContent\"]],[30,0,[\"selectKit\",\"noneItem\"]]],null],[30,0,[\"selectKit\"]]]],null],[1,\"\\n\\n  \"],[1,[28,[35,2],[[30,0,[\"caretIcon\"]]],[[\"class\"],[\"caret-icon\"]]]],[1,\"\\n\"],[13]],[\"icon\"],false,[\"each\",\"-track-array\",\"d-icon\",\"multi-select/format-selected-content\",\"or\"]]",
    "moduleName": "select-kit/templates/components/multi-select/multi-select-header.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});