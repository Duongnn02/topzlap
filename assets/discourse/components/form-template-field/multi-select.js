define("discourse/components/form-template-field/multi-select", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group form-template-field" data-field-type="multi-select">
    {{#if @attributes.label}}
      <label class="form-template-field__label">{{@attributes.label}}</label>
    {{/if}}
    <MultiSelect
      @class="form-template-field__multi-select"
      @content={{@choices}}
      @nameProperty={{null}}
      @valueProperty={{null}}
      @options={{hash
        translatedNone=@attributes.none_label
        maximum=@validations.maximum
      }}
    />
  </div>
  */
  {
    "id": "amUePZwb",
    "block": "[[[10,0],[14,0,\"control-group form-template-field\"],[14,\"data-field-type\",\"multi-select\"],[12],[1,\"\\n\"],[41,[30,1,[\"label\"]],[[[1,\"    \"],[10,\"label\"],[14,0,\"form-template-field__label\"],[12],[1,[30,1,[\"label\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,1],null,[[\"@class\",\"@content\",\"@nameProperty\",\"@valueProperty\",\"@options\"],[\"form-template-field__multi-select\",[30,2],null,null,[28,[37,2],null,[[\"translatedNone\",\"maximum\"],[[30,1,[\"none_label\"]],[30,3,[\"maximum\"]]]]]]],null],[1,\"\\n\"],[13]],[\"@attributes\",\"@choices\",\"@validations\"],false,[\"if\",\"multi-select\",\"hash\"]]",
    "moduleName": "discourse/components/form-template-field/multi-select.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});