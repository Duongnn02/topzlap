define("discourse/components/parent-category-row", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/category-list-item"], function (_exports, _component, _templateFactory, _categoryListItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/category-list-item"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.isHidden}}
    <PluginOutlet
      @name="category-list-above-each-category"
      @outletArgs={{hash category=this.category}}
    />
  
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
        class="category
          {{if this.isMuted 'muted'}}
          {{if this.noCategoryStyle 'no-category-style'}}"
        style={{unless
          this.noCategoryStyle
          (html-safe
            (concat
              (border-color this.category.color)
              (category-color-variable this.category.color)
            )
          )
        }}
      >
        <CategoryTitleLink @category={{this.category}} />
        <PluginOutlet
          @name="below-category-title-link"
          @connectorTagName="div"
          @outletArgs={{hash category=this.category}}
        />
  
        {{#if this.category.description_excerpt}}
          <div class="category-description">
            {{dir-span this.category.description_excerpt htmlSafe="true"}}
          </div>
        {{/if}}
  
        {{#if this.category.isGrandParent}}
          <table class="category-list subcategories-with-subcategories">
            <tbody>
              {{#each this.category.subcategories as |subcategory|}}
                <SubCategoryRow
                  @category={{subcategory}}
                  @listType={{this.listType}}
                />
              {{/each}}
            </tbody>
          </table>
        {{else if this.category.subcategories}}
          <div class="subcategories">
            {{#each this.category.subcategories as |subcategory|}}
              <SubCategoryItem
                @category={{subcategory}}
                @listType={{this.listType}}
              />
            {{/each}}
          </div>
        {{/if}}
      </td>
  
      <td class="topics">
        <div title={{this.category.statTitle}}>{{html-safe
            this.category.stat
          }}</div>
        <CategoryUnread
          @category={{this.category}}
          @tagName="div"
          @class="unread-new"
        />
      </td>
  
      {{#unless this.isMuted}}
        {{#if this.showTopics}}
          <td class="latest">
            {{#each this.category.featuredTopics as |t|}}
              <FeaturedTopic @topic={{t}} />
            {{/each}}
          </td>
        {{/if}}
      {{/unless}}
    </tr>
  {{/unless}}
  */
  {
    "id": "kVu3bkOP",
    "block": "[[[41,[51,[30,0,[\"isHidden\"]]],[[[1,\"  \"],[8,[39,1],null,[[\"@name\",\"@outletArgs\"],[\"category-list-above-each-category\",[28,[37,2],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n\\n  \"],[10,\"tr\"],[15,\"data-category-id\",[30,0,[\"category\",\"id\"]]],[15,\"data-notification-level\",[30,0,[\"category\",\"notificationLevelString\"]]],[15,0,[29,[[52,[30,0,[\"category\",\"description_excerpt\"]],\"has-description\",\"no-description\"],\"\\n      \",[52,[30,0,[\"category\",\"uploaded_logo\",\"url\"]],\"has-logo\",\"no-logo\"]]]],[12],[1,\"\\n    \"],[10,\"td\"],[15,0,[29,[\"category\\n        \",[52,[30,0,[\"isMuted\"]],\"muted\"],\"\\n        \",[52,[30,0,[\"noCategoryStyle\"]],\"no-category-style\"]]]],[15,5,[52,[51,[30,0,[\"noCategoryStyle\"]]],[28,[37,4],[[28,[37,5],[[28,[37,6],[[30,0,[\"category\",\"color\"]]],null],[28,[37,7],[[30,0,[\"category\",\"color\"]]],null]],null]],null]]],[12],[1,\"\\n      \"],[8,[39,8],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n      \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"below-category-title-link\",\"div\",[28,[37,2],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"category\",\"description_excerpt\"]],[[[1,\"        \"],[10,0],[14,0,\"category-description\"],[12],[1,\"\\n          \"],[1,[28,[35,9],[[30,0,[\"category\",\"description_excerpt\"]]],[[\"htmlSafe\"],[\"true\"]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"category\",\"isGrandParent\"]],[[[1,\"        \"],[10,\"table\"],[14,0,\"category-list subcategories-with-subcategories\"],[12],[1,\"\\n          \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,11],[[28,[37,11],[[30,0,[\"category\",\"subcategories\"]]],null]],null],null,[[[1,\"              \"],[8,[39,12],null,[[\"@category\",\"@listType\"],[[30,1],[30,0,[\"listType\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"category\",\"subcategories\"]],[[[1,\"        \"],[10,0],[14,0,\"subcategories\"],[12],[1,\"\\n\"],[42,[28,[37,11],[[28,[37,11],[[30,0,[\"category\",\"subcategories\"]]],null]],null],null,[[[1,\"            \"],[8,[39,13],null,[[\"@category\",\"@listType\"],[[30,2],[30,0,[\"listType\"]]]],null],[1,\"\\n\"]],[2]],null],[1,\"        \"],[13],[1,\"\\n      \"]],[]],null]],[]]],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,\"td\"],[14,0,\"topics\"],[12],[1,\"\\n      \"],[10,0],[15,\"title\",[30,0,[\"category\",\"statTitle\"]]],[12],[1,[28,[35,4],[[30,0,[\"category\",\"stat\"]]],null]],[13],[1,\"\\n      \"],[8,[39,14],null,[[\"@category\",\"@tagName\",\"@class\"],[[30,0,[\"category\"]],\"div\",\"unread-new\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"isMuted\"]]],[[[41,[30,0,[\"showTopics\"]],[[[1,\"        \"],[10,\"td\"],[14,0,\"latest\"],[12],[1,\"\\n\"],[42,[28,[37,11],[[28,[37,11],[[30,0,[\"category\",\"featuredTopics\"]]],null]],null],null,[[[1,\"            \"],[8,[39,15],null,[[\"@topic\"],[[30,3]]],null],[1,\"\\n\"]],[3]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"subcategory\",\"subcategory\",\"t\"],false,[\"unless\",\"plugin-outlet\",\"hash\",\"if\",\"html-safe\",\"concat\",\"border-color\",\"category-color-variable\",\"category-title-link\",\"dir-span\",\"each\",\"-track-array\",\"sub-category-row\",\"sub-category-item\",\"category-unread\",\"featured-topic\"]]",
    "moduleName": "discourse/components/parent-category-row.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _categoryListItem.default.extend({}));
  _exports.default = _default;
});