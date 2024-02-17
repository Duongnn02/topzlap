define("discourse/templates/mobile/components/sub-category-row", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.isHidden}}
    <tr
      data-category-id={{this.category.id}}
      style={{border-color this.category.color}}
      class="subcategory-list-item category {{if this.isMuted 'muted'}}"
    >
      <td>
        <CategoryTitleLink @tagName="h4" @category={{this.category}} />
        <div class="subcategories-list">
          {{#if this.category.subcategories}}
            <div class="subcategories">
              {{#each this.category.subcategories as |subcategory|}}
                <SubCategoryItem
                  @category={{subcategory}}
                  @listType={{this.listType}}
                />
              {{/each}}
            </div>
          {{/if}}
        </div>
      </td>
    </tr>
  {{/unless}}
  */
  {
    "id": "Os5z+gIw",
    "block": "[[[41,[51,[30,0,[\"isHidden\"]]],[[[1,\"  \"],[10,\"tr\"],[15,\"data-category-id\",[30,0,[\"category\",\"id\"]]],[15,5,[28,[37,1],[[30,0,[\"category\",\"color\"]]],null]],[15,0,[29,[\"subcategory-list-item category \",[52,[30,0,[\"isMuted\"]],\"muted\"]]]],[12],[1,\"\\n    \"],[10,\"td\"],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@tagName\",\"@category\"],[\"h4\",[30,0,[\"category\"]]]],null],[1,\"\\n      \"],[10,0],[14,0,\"subcategories-list\"],[12],[1,\"\\n\"],[41,[30,0,[\"category\",\"subcategories\"]],[[[1,\"          \"],[10,0],[14,0,\"subcategories\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"category\",\"subcategories\"]]],null]],null],null,[[[1,\"              \"],[8,[39,6],null,[[\"@category\",\"@listType\"],[[30,1],[30,0,[\"listType\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"subcategory\"],false,[\"unless\",\"border-color\",\"if\",\"category-title-link\",\"each\",\"-track-array\",\"sub-category-item\"]]",
    "moduleName": "discourse/templates/mobile/components/sub-category-row.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});