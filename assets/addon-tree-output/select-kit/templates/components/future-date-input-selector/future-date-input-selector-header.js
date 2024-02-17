define("select-kit/templates/components/future-date-input-selector/future-date-input-selector-header", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="select-kit-header-wrapper">
    {{#if this.icons}}
      <div class="future-date-input-selector-icons">
        {{#each this.icons as |icon|}} {{d-icon icon}} {{/each}}
      </div>
    {{/if}}
  
    {{component
      this.selectKit.options.selectedNameComponent
      tabindex=this.tabindex
      item=this.selectedContent
      selectKit=this.selectKit
    }}
  
    {{#if this.selectedContent.timeFormatted}}
      <span class="future-date-input-selector-datetime">
        {{this.selectedContent.timeFormatted}}
      </span>
    {{/if}}
  
    {{d-icon this.caretIcon class="caret-icon"}}
  </div>
  */
  {
    "id": "o7HqYLvF",
    "block": "[[[10,0],[14,0,\"select-kit-header-wrapper\"],[12],[1,\"\\n\"],[41,[30,0,[\"icons\"]],[[[1,\"    \"],[10,0],[14,0,\"future-date-input-selector-icons\"],[12],[1,\"\\n      \"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"icons\"]]],null]],null],null,[[[1,\" \"],[1,[28,[35,3],[[30,1]],null]],[1,\" \"]],[1]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[46,[30,0,[\"selectKit\",\"options\",\"selectedNameComponent\"]],null,[[\"tabindex\",\"item\",\"selectKit\"],[[30,0,[\"tabindex\"]],[30,0,[\"selectedContent\"]],[30,0,[\"selectKit\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"selectedContent\",\"timeFormatted\"]],[[[1,\"    \"],[10,1],[14,0,\"future-date-input-selector-datetime\"],[12],[1,\"\\n      \"],[1,[30,0,[\"selectedContent\",\"timeFormatted\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[1,[28,[35,3],[[30,0,[\"caretIcon\"]]],[[\"class\"],[\"caret-icon\"]]]],[1,\"\\n\"],[13]],[\"icon\"],false,[\"if\",\"each\",\"-track-array\",\"d-icon\",\"component\"]]",
    "moduleName": "select-kit/templates/components/future-date-input-selector/future-date-input-selector-header.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});