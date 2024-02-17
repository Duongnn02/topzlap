define("discourse/components/category-name-fields", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="field">
    {{#unless this.category.isUncategorizedCategory}}
      <section class="field-item">
        <label>{{i18n "category.name"}}</label>
        <TextField
          @value={{this.category.name}}
          @placeholderKey="category.name_placeholder"
          @maxlength="50"
          @class="category-name"
        />
      </section>
    {{/unless}}
    <section class="field-item">
      <label>{{i18n "category.slug"}}</label>
      <TextField
        @value={{this.category.slug}}
        @placeholderKey="category.slug_placeholder"
        @maxlength="255"
      />
    </section>
  </section>
  */
  {
    "id": "YT41FuCy",
    "block": "[[[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"category\",\"isUncategorizedCategory\"]]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field-item\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,1],[\"category.name\"],null]],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@value\",\"@placeholderKey\",\"@maxlength\",\"@class\"],[[30,0,[\"category\",\"name\"]],\"category.name_placeholder\",\"50\",\"category-name\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[10,\"section\"],[14,0,\"field-item\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"category.slug\"],null]],[13],[1,\"\\n    \"],[8,[39,2],null,[[\"@value\",\"@placeholderKey\",\"@maxlength\"],[[30,0,[\"category\",\"slug\"]],\"category.slug_placeholder\",\"255\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"unless\",\"i18n\",\"text-field\"]]",
    "moduleName": "discourse/components/category-name-fields.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});