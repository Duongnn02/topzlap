define("discourse/templates/mobile/components/categories-only", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.categories}}
    {{#if this.filteredCategories}}
      <div class="category-list {{if this.showTopics 'with-topics'}}">
        {{#each this.filteredCategories as |c|}}
          <ParentCategoryRow @category={{c}} @showTopics={{this.showTopics}} />
        {{/each}}
      </div>
    {{/if}}
  
    {{#if this.mutedCategories}}
      <div class="muted-categories">
        <a href class="muted-categories-link" {{on "click" this.toggleShowMuted}}>
          <h3 class="muted-categories-heading">{{i18n "categories.muted"}}</h3>
          {{#if this.mutedToggleIcon}}
            {{d-icon this.mutedToggleIcon}}
          {{/if}}
        </a>
        <div
          class="category-list
            {{if this.showTopics 'with-topics'}}
            {{unless this.showMutedCategories 'hidden'}}"
        >
          {{#each this.mutedCategories as |c|}}
            <ParentCategoryRow
              @category={{c}}
              @showTopics={{this.showTopics}}
              @listType="muted"
            />
          {{/each}}
        </div>
      </div>
    {{/if}}
  {{/if}}
  */
  {
    "id": "pdomExhe",
    "block": "[[[41,[30,0,[\"categories\"]],[[[41,[30,0,[\"filteredCategories\"]],[[[1,\"    \"],[10,0],[15,0,[29,[\"category-list \",[52,[30,0,[\"showTopics\"]],\"with-topics\"]]]],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"filteredCategories\"]]],null]],null],null,[[[1,\"        \"],[8,[39,3],null,[[\"@category\",\"@showTopics\"],[[30,1],[30,0,[\"showTopics\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"mutedCategories\"]],[[[1,\"    \"],[10,0],[14,0,\"muted-categories\"],[12],[1,\"\\n      \"],[11,3],[24,6,\"\"],[24,0,\"muted-categories-link\"],[4,[38,4],[\"click\",[30,0,[\"toggleShowMuted\"]]],null],[12],[1,\"\\n        \"],[10,\"h3\"],[14,0,\"muted-categories-heading\"],[12],[1,[28,[35,5],[\"categories.muted\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"mutedToggleIcon\"]],[[[1,\"          \"],[1,[28,[35,6],[[30,0,[\"mutedToggleIcon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n      \"],[10,0],[15,0,[29,[\"category-list\\n          \",[52,[30,0,[\"showTopics\"]],\"with-topics\"],\"\\n          \",[52,[51,[30,0,[\"showMutedCategories\"]]],\"hidden\"]]]],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"mutedCategories\"]]],null]],null],null,[[[1,\"          \"],[8,[39,3],null,[[\"@category\",\"@showTopics\",\"@listType\"],[[30,2],[30,0,[\"showTopics\"]],\"muted\"]],null],[1,\"\\n\"]],[2]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[\"c\",\"c\"],false,[\"if\",\"each\",\"-track-array\",\"parent-category-row\",\"on\",\"i18n\",\"d-icon\",\"unless\"]]",
    "moduleName": "discourse/templates/mobile/components/categories-only.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});