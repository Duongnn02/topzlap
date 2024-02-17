define("discourse/components/sub-category-item", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/category-list-item"], function (_exports, _component, _templateFactory, _categoryListItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/category-list-item"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.isMuted}}
    <span class="subcategory">
      <CategoryTitleBefore @category={{this.category}} />
      {{category-link this.category hideParent="true"}}
      {{#unless this.hideUnread}}
        <CategoryUnread @category={{this.category}} />
      {{/unless}}
    </span>
  {{/unless}}
  */
  {
    "id": "y9gIjdk0",
    "block": "[[[41,[51,[30,0,[\"isMuted\"]]],[[[1,\"  \"],[10,1],[14,0,\"subcategory\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n    \"],[1,[28,[35,2],[[30,0,[\"category\"]]],[[\"hideParent\"],[\"true\"]]]],[1,\"\\n\"],[41,[51,[30,0,[\"hideUnread\"]]],[[[1,\"      \"],[8,[39,3],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"unless\",\"category-title-before\",\"category-link\",\"category-unread\"]]",
    "moduleName": "discourse/components/sub-category-item.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _categoryListItem.default.extend({}));
  _exports.default = _default;
});