define("discourse/components/form-template-field/textarea", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group form-template-field" data-field-type="textarea">
    {{#if @attributes.label}}
      <label class="form-template-field__label">{{@attributes.label}}</label>
    {{/if}}
    <Textarea
      class="form-template-field__textarea"
      placeholder={{@attributes.placeholder}}
    />
  </div>
  */
  {
    "id": "t9V2s9fF",
    "block": "[[[10,0],[14,0,\"control-group form-template-field\"],[14,\"data-field-type\",\"textarea\"],[12],[1,\"\\n\"],[41,[30,1,[\"label\"]],[[[1,\"    \"],[10,\"label\"],[14,0,\"form-template-field__label\"],[12],[1,[30,1,[\"label\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,1],[[24,0,\"form-template-field__textarea\"],[16,\"placeholder\",[30,1,[\"placeholder\"]]]],null,null],[1,\"\"],[13]],[\"@attributes\"],false,[\"if\",\"textarea\"]]",
    "moduleName": "discourse/components/form-template-field/textarea.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});