define("discourse/templates/mobile/components/subcategories-with-featured-topics", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.categories as |category|}}
    <div class="category-list subcategory-list with-topics">
      <div class="parent-category">
        <CategoryTitleLink @category={{category}} />
        <span class="stat" title={{category.statTitle}}>{{html-safe
            category.stat
          }}</span>
      </div>
      <div class="subcategories">
        {{#each category.subcategories as |subCategory|}}
          <ParentCategoryRow @category={{subCategory}} @showTopics={{true}} />
        {{else}}
          {{! No subcategories... so just show the parent to avoid confusion }}
          <ParentCategoryRow @category={{category}} @showTopics={{true}} />
        {{/each}}
      </div>
    </div>
  {{/each}}
  */
  {
    "id": "/niEzydL",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"categories\"]]],null]],null],null,[[[1,\"  \"],[10,0],[14,0,\"category-list subcategory-list with-topics\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"parent-category\"],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@category\"],[[30,1]]],null],[1,\"\\n      \"],[10,1],[14,0,\"stat\"],[15,\"title\",[30,1,[\"statTitle\"]]],[12],[1,[28,[35,3],[[30,1,[\"stat\"]]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"subcategories\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,1,[\"subcategories\"]]],null]],null],null,[[[1,\"        \"],[8,[39,4],null,[[\"@category\",\"@showTopics\"],[[30,2],true]],null],[1,\"\\n\"]],[2]],[[[1,\"        \"],[8,[39,4],null,[[\"@category\",\"@showTopics\"],[[30,1],true]],null],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[1]],null]],[\"category\",\"subCategory\"],false,[\"each\",\"-track-array\",\"category-title-link\",\"html-safe\",\"parent-category-row\"]]",
    "moduleName": "discourse/templates/mobile/components/subcategories-with-featured-topics.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});