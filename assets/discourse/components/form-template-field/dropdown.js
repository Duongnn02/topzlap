define("discourse/components/form-template-field/dropdown", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group form-template-field" data-field-type="dropdown">
    {{#if @attributes.label}}
      <label class="form-template-field__label">{{@attributes.label}}</label>
    {{/if}}
    <ComboBox
      @class="form-template-field__dropdown"
      @content={{@choices}}
      @nameProperty={{null}}
      @valueProperty={{null}}
      @options={{hash
        translatedNone=@attributes.none_label
        filterable=@attributes.filterable
      }}
    />
  </div>
  */
  {
    "id": "9ew4ohBJ",
    "block": "[[[10,0],[14,0,\"control-group form-template-field\"],[14,\"data-field-type\",\"dropdown\"],[12],[1,\"\\n\"],[41,[30,1,[\"label\"]],[[[1,\"    \"],[10,\"label\"],[14,0,\"form-template-field__label\"],[12],[1,[30,1,[\"label\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,1],null,[[\"@class\",\"@content\",\"@nameProperty\",\"@valueProperty\",\"@options\"],[\"form-template-field__dropdown\",[30,2],null,null,[28,[37,2],null,[[\"translatedNone\",\"filterable\"],[[30,1,[\"none_label\"]],[30,1,[\"filterable\"]]]]]]],null],[1,\"\\n\"],[13]],[\"@attributes\",\"@choices\"],false,[\"if\",\"combo-box\",\"hash\"]]",
    "moduleName": "discourse/components/form-template-field/dropdown.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});