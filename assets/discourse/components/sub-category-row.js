define("discourse/components/sub-category-row", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/category-list-item"], function (_exports, _component, _templateFactory, _categoryListItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/category-list-item"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.isHidden}}
    <tr
      data-category-id={{this.category.id}}
      data-notification-level={{this.category.notificationLevelString}}
      class="{{if
          this.category.description_excerpt
          'has-description'
          'no-description'
        }}
        {{if this.category.uploaded_logo.url 'has-logo' 'no-logo'}}"
    >
      <td
        class="category {{if this.isMuted 'muted'}}"
        style={{border-color this.category.color}}
      >
        <CategoryTitleLink @tagName="h4" @category={{this.category}} />
        {{#if this.category.description_excerpt}}
          <div class="category-description subcategory-description">
            {{dir-span this.category.description_excerpt htmlSafe="true"}}
          </div>
        {{/if}}
        {{#if this.category.subcategories}}
          <div class="subcategories">
            {{#each this.category.subcategories as |subsubcategory|}}
              <SubCategoryItem
                @category={{subsubcategory}}
                @hideUnread="true"
                @listType={{this.listType}}
              />
            {{/each}}
          </div>
        {{/if}}
      </td>
    </tr>
  {{/unless}}
  */
  {
    "id": "FP2Xp8A6",
    "block": "[[[41,[51,[30,0,[\"isHidden\"]]],[[[1,\"  \"],[10,\"tr\"],[15,\"data-category-id\",[30,0,[\"category\",\"id\"]]],[15,\"data-notification-level\",[30,0,[\"category\",\"notificationLevelString\"]]],[15,0,[29,[[52,[30,0,[\"category\",\"description_excerpt\"]],\"has-description\",\"no-description\"],\"\\n      \",[52,[30,0,[\"category\",\"uploaded_logo\",\"url\"]],\"has-logo\",\"no-logo\"]]]],[12],[1,\"\\n    \"],[10,\"td\"],[15,0,[29,[\"category \",[52,[30,0,[\"isMuted\"]],\"muted\"]]]],[15,5,[28,[37,2],[[30,0,[\"category\",\"color\"]]],null]],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@tagName\",\"@category\"],[\"h4\",[30,0,[\"category\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"category\",\"description_excerpt\"]],[[[1,\"        \"],[10,0],[14,0,\"category-description subcategory-description\"],[12],[1,\"\\n          \"],[1,[28,[35,4],[[30,0,[\"category\",\"description_excerpt\"]]],[[\"htmlSafe\"],[\"true\"]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"category\",\"subcategories\"]],[[[1,\"        \"],[10,0],[14,0,\"subcategories\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"category\",\"subcategories\"]]],null]],null],null,[[[1,\"            \"],[8,[39,7],null,[[\"@category\",\"@hideUnread\",\"@listType\"],[[30,1],\"true\",[30,0,[\"listType\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"subsubcategory\"],false,[\"unless\",\"if\",\"border-color\",\"category-title-link\",\"dir-span\",\"each\",\"-track-array\",\"sub-category-item\"]]",
    "moduleName": "discourse/components/sub-category-row.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _categoryListItem.default.extend({}));
  _exports.default = _default;
});