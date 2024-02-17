define("discourse/components/reviewable-field", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.value}}
    <div class={{this.classes}}>
      <div class="name">{{this.name}}</div>
      <div class="value">{{this.value}}</div>
    </div>
  {{/if}}
  */
  {
    "id": "yOMLoOfQ",
    "block": "[[[41,[30,0,[\"value\"]],[[[1,\"  \"],[10,0],[15,0,[30,0,[\"classes\"]]],[12],[1,\"\\n    \"],[10,0],[14,0,\"name\"],[12],[1,[30,0,[\"name\"]]],[13],[1,\"\\n    \"],[10,0],[14,0,\"value\"],[12],[1,[30,0,[\"value\"]]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\"]]",
    "moduleName": "discourse/components/reviewable-field.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});