define("discourse/templates/mobile/components/parent-category-row", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.isHidden}}
    <PluginOutlet
      @name="category-list-above-each-category"
      @outletArgs={{hash category=this.category}}
    />
    <div
      data-category-id={{this.category.id}}
      data-notification-level={{this.category.notificationLevelString}}
      style={{border-color this.category.color}}
      class="category-list-item category {{if this.isMuted 'muted'}}"
    >
      <table class="topic-list">
        <tbody>
          <tr>
            <th class="main-link">
              <CategoryTitleLink @category={{this.category}} />
            </th>
          </tr>
          {{#if this.category.description_excerpt}}
            <tr class="category-description">
              <td colspan="3">
                {{html-safe this.category.description_excerpt}}
              </td>
            </tr>
          {{/if}}
          {{#unless this.isMuted}}
            {{#if this.showTopics}}
              {{#each this.category.topics as |t|}}
                <MobileCategoryTopic @topic={{t}} />
              {{/each}}
            {{/if}}
          {{/unless}}
          {{#if this.category.isGrandParent}}
            {{#each this.category.subcategories as |subcategory|}}
              <SubCategoryRow
                @category={{subcategory}}
                @listType={{this.listType}}
              />
            {{/each}}
          {{else if this.category.subcategories}}
            <tr class="subcategories-list">
              <td>
                <div class="subcategories">
                  {{#each this.category.subcategories as |subcategory|}}
                    <SubCategoryItem
                      @category={{subcategory}}
                      @listType={{this.listType}}
                    />
                  {{/each}}
                </div>
              </td>
            </tr>
          {{/if}}
        </tbody>
      </table>
      <footer class="clearfix category-topics-count">
        <div class="category-stat">
          <a href={{this.category.url}}>
            {{html-safe this.category.statTotal}}
          </a>
        </div>
        {{#unless this.category.pickAll}}
          <div class="category-stat">
            <a href={{this.category.url}}>
              {{html-safe this.category.stat}}
            </a>
          </div>
        {{/unless}}
      </footer>
    </div>
  {{/unless}}
  */
  {
    "id": "R3z5M8j9",
    "block": "[[[41,[51,[30,0,[\"isHidden\"]]],[[[1,\"  \"],[8,[39,1],null,[[\"@name\",\"@outletArgs\"],[\"category-list-above-each-category\",[28,[37,2],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n  \"],[10,0],[15,\"data-category-id\",[30,0,[\"category\",\"id\"]]],[15,\"data-notification-level\",[30,0,[\"category\",\"notificationLevelString\"]]],[15,5,[28,[37,3],[[30,0,[\"category\",\"color\"]]],null]],[15,0,[29,[\"category-list-item category \",[52,[30,0,[\"isMuted\"]],\"muted\"]]]],[12],[1,\"\\n    \"],[10,\"table\"],[14,0,\"topic-list\"],[12],[1,\"\\n      \"],[10,\"tbody\"],[12],[1,\"\\n        \"],[10,\"tr\"],[12],[1,\"\\n          \"],[10,\"th\"],[14,0,\"main-link\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"],[41,[30,0,[\"category\",\"description_excerpt\"]],[[[1,\"          \"],[10,\"tr\"],[14,0,\"category-description\"],[12],[1,\"\\n            \"],[10,\"td\"],[14,\"colspan\",\"3\"],[12],[1,\"\\n              \"],[1,[28,[35,6],[[30,0,[\"category\",\"description_excerpt\"]]],null]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[41,[51,[30,0,[\"isMuted\"]]],[[[41,[30,0,[\"showTopics\"]],[[[42,[28,[37,8],[[28,[37,8],[[30,0,[\"category\",\"topics\"]]],null]],null],null,[[[1,\"              \"],[8,[39,9],null,[[\"@topic\"],[[30,1]]],null],[1,\"\\n\"]],[1]],null]],[]],null]],[]],null],[41,[30,0,[\"category\",\"isGrandParent\"]],[[[42,[28,[37,8],[[28,[37,8],[[30,0,[\"category\",\"subcategories\"]]],null]],null],null,[[[1,\"            \"],[8,[39,10],null,[[\"@category\",\"@listType\"],[[30,2],[30,0,[\"listType\"]]]],null],[1,\"\\n\"]],[2]],null]],[]],[[[41,[30,0,[\"category\",\"subcategories\"]],[[[1,\"          \"],[10,\"tr\"],[14,0,\"subcategories-list\"],[12],[1,\"\\n            \"],[10,\"td\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"subcategories\"],[12],[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"category\",\"subcategories\"]]],null]],null],null,[[[1,\"                  \"],[8,[39,11],null,[[\"@category\",\"@listType\"],[[30,3],[30,0,[\"listType\"]]]],null],[1,\"\\n\"]],[3]],null],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"]],[]],null]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"footer\"],[14,0,\"clearfix category-topics-count\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"category-stat\"],[12],[1,\"\\n        \"],[10,3],[15,6,[30,0,[\"category\",\"url\"]]],[12],[1,\"\\n          \"],[1,[28,[35,6],[[30,0,[\"category\",\"statTotal\"]]],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"],[41,[51,[30,0,[\"category\",\"pickAll\"]]],[[[1,\"        \"],[10,0],[14,0,\"category-stat\"],[12],[1,\"\\n          \"],[10,3],[15,6,[30,0,[\"category\",\"url\"]]],[12],[1,\"\\n            \"],[1,[28,[35,6],[[30,0,[\"category\",\"stat\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"t\",\"subcategory\",\"subcategory\"],false,[\"unless\",\"plugin-outlet\",\"hash\",\"border-color\",\"if\",\"category-title-link\",\"html-safe\",\"each\",\"-track-array\",\"mobile-category-topic\",\"sub-category-row\",\"sub-category-item\"]]",
    "moduleName": "discourse/templates/mobile/components/parent-category-row.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});