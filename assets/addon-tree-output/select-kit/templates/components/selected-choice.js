define("select-kit/templates/components/selected-choice", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <button
    aria-label={{i18n "select_kit.delete_item" name=this.itemName}}
    id="{{this.id}}-choice"
    data-value={{this.itemValue}}
    data-name={{this.itemName}}
    type="button"
    {{on "click" (fn this.selectKit.deselect this.item)}}
    class="btn btn-default selected-choice {{this.extraClass}}"
  >
    {{d-icon "times"}}
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      <span class="d-button-label">
        {{this.itemName}}
      </span>
    {{/if}}
  </button>
  */
  {
    "id": "u3MdcVBS",
    "block": "[[[11,\"button\"],[16,\"aria-label\",[28,[37,0],[\"select_kit.delete_item\"],[[\"name\"],[[30,0,[\"itemName\"]]]]]],[16,1,[29,[[30,0,[\"id\"]],\"-choice\"]]],[16,\"data-value\",[30,0,[\"itemValue\"]]],[16,\"data-name\",[30,0,[\"itemName\"]]],[16,0,[29,[\"btn btn-default selected-choice \",[30,0,[\"extraClass\"]]]]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,2],[[30,0,[\"selectKit\",\"deselect\"]],[30,0,[\"item\"]]],null]],null],[12],[1,\"\\n  \"],[1,[28,[35,3],[\"times\"],null]],[1,\"\\n\"],[41,[48,[30,1]],[[[1,\"    \"],[18,1,null],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,1],[14,0,\"d-button-label\"],[12],[1,\"\\n      \"],[1,[30,0,[\"itemName\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[13]],[\"&default\"],false,[\"i18n\",\"on\",\"fn\",\"d-icon\",\"if\",\"has-block\",\"yield\"]]",
    "moduleName": "select-kit/templates/components/selected-choice.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});