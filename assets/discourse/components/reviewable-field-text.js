define("discourse/components/reviewable-field-text", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <Input
    @value={{this.value}}
    class="reviewable-input-text"
    {{on "change" this.valueChanged}}
  />
  */
  {
    "id": "tBQ611mt",
    "block": "[[[8,[39,0],[[24,0,\"reviewable-input-text\"],[4,[38,1],[\"change\",[30,0,[\"valueChanged\"]]],null]],[[\"@value\"],[[30,0,[\"value\"]]]],null]],[],false,[\"input\",\"on\"]]",
    "moduleName": "discourse/components/reviewable-field-text.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});