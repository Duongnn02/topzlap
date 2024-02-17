define("discourse/components/form-template-field/upload", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group form-template-field" data-field-type="upload">
    {{#if @attributes.label}}
      <label class="form-template-field__label">{{@attributes.label}}</label>
    {{/if}}
    <input
      type="file"
      accept={{@attributes.file_types}}
      class="form-template-field__upload"
      multiple={{@attributes.allow_multiple}}
    />
  </div>
  */
  {
    "id": "Qypp/kOj",
    "block": "[[[10,0],[14,0,\"control-group form-template-field\"],[14,\"data-field-type\",\"upload\"],[12],[1,\"\\n\"],[41,[30,1,[\"label\"]],[[[1,\"    \"],[10,\"label\"],[14,0,\"form-template-field__label\"],[12],[1,[30,1,[\"label\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[10,\"input\"],[15,\"accept\",[30,1,[\"file_types\"]]],[14,0,\"form-template-field__upload\"],[15,\"multiple\",[30,1,[\"allow_multiple\"]]],[14,4,\"file\"],[12],[13],[1,\"\\n\"],[13]],[\"@attributes\"],false,[\"if\"]]",
    "moduleName": "discourse/components/form-template-field/upload.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});