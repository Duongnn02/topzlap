define("select-kit/templates/components/combo-box/combo-box-header", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="select-kit-header-wrapper">
    {{#each this.icons as |icon|}} {{d-icon icon}} {{/each}}
  
    {{component
      this.selectKit.options.selectedNameComponent
      tabindex=this.tabindex
      item=this.selectedContent
      selectKit=this.selectKit
    }}
  
    {{#if this.shouldDisplayClearableButton}}
      <DButton
        @class="btn-clear"
        @icon="times"
        @action={{this.selectKit.onClearSelection}}
        @ariaLabel="clear_input"
      />
    {{/if}}
  
    {{d-icon this.caretIcon class="caret-icon"}}
  </div>
  */
  {
    "id": "hVS6RfRg",
    "block": "[[[10,0],[14,0,\"select-kit-header-wrapper\"],[12],[1,\"\\n  \"],[42,[28,[37,1],[[28,[37,1],[[30,0,[\"icons\"]]],null]],null],null,[[[1,\" \"],[1,[28,[35,2],[[30,1]],null]],[1,\" \"]],[1]],null],[1,\"\\n\\n  \"],[46,[30,0,[\"selectKit\",\"options\",\"selectedNameComponent\"]],null,[[\"tabindex\",\"item\",\"selectKit\"],[[30,0,[\"tabindex\"]],[30,0,[\"selectedContent\"]],[30,0,[\"selectKit\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"shouldDisplayClearableButton\"]],[[[1,\"    \"],[8,[39,5],null,[[\"@class\",\"@icon\",\"@action\",\"@ariaLabel\"],[\"btn-clear\",\"times\",[30,0,[\"selectKit\",\"onClearSelection\"]],\"clear_input\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[1,[28,[35,2],[[30,0,[\"caretIcon\"]]],[[\"class\"],[\"caret-icon\"]]]],[1,\"\\n\"],[13]],[\"icon\"],false,[\"each\",\"-track-array\",\"d-icon\",\"component\",\"if\",\"d-button\"]]",
    "moduleName": "select-kit/templates/components/combo-box/combo-box-header.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});