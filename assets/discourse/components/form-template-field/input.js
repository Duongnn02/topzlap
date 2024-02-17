define("discourse/components/form-template-field/input", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group form-template-field" data-field-type="input">
    {{#if @attributes.label}}
      <label class="form-template-field__label">{{@attributes.label}}</label>
    {{/if}}
    <Input
      class="form-template-field__input"
      @type="text"
      placeholder={{@attributes.placeholder}}
    />
  </div>
  */
  {
    "id": "Lnn5RcWv",
    "block": "[[[10,0],[14,0,\"control-group form-template-field\"],[14,\"data-field-type\",\"input\"],[12],[1,\"\\n\"],[41,[30,1,[\"label\"]],[[[1,\"    \"],[10,\"label\"],[14,0,\"form-template-field__label\"],[12],[1,[30,1,[\"label\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,1],[[24,0,\"form-template-field__input\"],[16,\"placeholder\",[30,1,[\"placeholder\"]]]],[[\"@type\"],[\"text\"]],null],[1,\"\\n\"],[13]],[\"@attributes\"],false,[\"if\",\"input\"]]",
    "moduleName": "discourse/components/form-template-field/input.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});