define("discourse/components/color-picker", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.colors as |c|}}
    <ColorPickerChoice
      @color={{c}}
      @usedColors={{this.usedColors}}
      @selectColor={{action "selectColor"}}
    >
      {{d-icon "check"}}
    </ColorPickerChoice>
  {{/each}}
  */
  {
    "id": "onNtuCxk",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"colors\"]]],null]],null],null,[[[1,\"  \"],[8,[39,2],null,[[\"@color\",\"@usedColors\",\"@selectColor\"],[[30,1],[30,0,[\"usedColors\"]],[28,[37,3],[[30,0],\"selectColor\"],null]]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,4],[\"check\"],null]],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[1]],null]],[\"c\"],false,[\"each\",\"-track-array\",\"color-picker-choice\",\"action\",\"d-icon\"]]",
    "moduleName": "discourse/components/color-picker.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNames: "colors-container",
    actions: {
      selectColor(color) {
        this.set("value", color);
      }
    }
  }));
  _exports.default = _default;
});