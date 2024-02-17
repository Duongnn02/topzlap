define("discourse/components/category-title-link", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <a class="category-title-link" href={{this.category.url}}>
    <div class="category-text-title">
      <CategoryTitleBefore @category={{this.category}} />
      {{#if this.category.read_restricted}}
        {{d-icon this.lockIcon}}
      {{/if}}
      <span class="category-name">{{dir-span this.category.name}}</span>
    </div>
    {{#if this.category.uploaded_logo.url}}
      <CategoryLogo @category={{this.category}} />
    {{/if}}
  </a>
  */
  {
    "id": "wRw/fpvu",
    "block": "[[[10,3],[14,0,\"category-title-link\"],[15,6,[30,0,[\"category\",\"url\"]]],[12],[1,\"\\n  \"],[10,0],[14,0,\"category-text-title\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"category\",\"read_restricted\"]],[[[1,\"      \"],[1,[28,[35,2],[[30,0,[\"lockIcon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,1],[14,0,\"category-name\"],[12],[1,[28,[35,3],[[30,0,[\"category\",\"name\"]]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[41,[30,0,[\"category\",\"uploaded_logo\",\"url\"]],[[[1,\"    \"],[8,[39,4],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n\"]],[]],null],[13]],[],false,[\"category-title-before\",\"if\",\"d-icon\",\"dir-span\",\"category-logo\"]]",
    "moduleName": "discourse/components/category-title-link.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "h3",
    // icon name defined here so it can be easily overridden in theme components
    lockIcon: "lock"
  }));
  _exports.default = _default;
});