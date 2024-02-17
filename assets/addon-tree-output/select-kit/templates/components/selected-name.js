define("select-kit/templates/components/selected-name", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.selectKit.options.showFullTitle}}
    <div
      lang={{this.lang}}
      title={{this.title}}
      data-value={{this.value}}
      data-name={{this.name}}
      role="option"
      class="select-kit-selected-name selected-name choice"
    >
      {{#if this.item.icon}}
        {{d-icon this.item.icon}}
      {{/if}}
  
      <span class="name">
        {{this.label}}
      </span>
  
      {{#if this.shouldDisplayClearableButton}}
        <DButton
          @class="btn-clear"
          @icon="times"
          @action={{this.selectKit.deselect}}
          @actionParam={{this.item}}
          @ariaLabel="clear_input"
        />
      {{/if}}
    </div>
  {{else}}
    {{#if this.item.icon}}
      <div
        role="option"
        lang={{this.lang}}
        class="select-kit-selected-name selected-name choice"
      >
        {{d-icon this.item.icon}}
      </div>
    {{/if}}
  {{/if}}
  */
  {
    "id": "uQWUJk7u",
    "block": "[[[41,[30,0,[\"selectKit\",\"options\",\"showFullTitle\"]],[[[1,\"  \"],[10,0],[15,\"lang\",[30,0,[\"lang\"]]],[15,\"title\",[30,0,[\"title\"]]],[15,\"data-value\",[30,0,[\"value\"]]],[15,\"data-name\",[30,0,[\"name\"]]],[14,\"role\",\"option\"],[14,0,\"select-kit-selected-name selected-name choice\"],[12],[1,\"\\n\"],[41,[30,0,[\"item\",\"icon\"]],[[[1,\"      \"],[1,[28,[35,1],[[30,0,[\"item\",\"icon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,1],[14,0,\"name\"],[12],[1,\"\\n      \"],[1,[30,0,[\"label\"]]],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"shouldDisplayClearableButton\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@class\",\"@icon\",\"@action\",\"@actionParam\",\"@ariaLabel\"],[\"btn-clear\",\"times\",[30,0,[\"selectKit\",\"deselect\"]],[30,0,[\"item\"]],\"clear_input\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"item\",\"icon\"]],[[[1,\"    \"],[10,0],[14,\"role\",\"option\"],[15,\"lang\",[30,0,[\"lang\"]]],[14,0,\"select-kit-selected-name selected-name choice\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[[30,0,[\"item\",\"icon\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]]]],[],false,[\"if\",\"d-icon\",\"d-button\"]]",
    "moduleName": "select-kit/templates/components/selected-name.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});