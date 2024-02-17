define("discourse/templates/user-private-messages-tags-index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="list-controls">
    <div class="container">
      <h2>{{i18n "tagging.tags"}}</h2>
    </div>
  </div>
  
  <div class="tag-sort-options">
    {{i18n "tagging.sort_by"}}
    <span class="tag-sort-count {{if this.sortedByCount 'active'}}">
      <a href {{on "click" this.sortByCount}}>
        {{i18n "tagging.sort_by_count"}}
      </a>
    </span>
    <span class="tag-sort-name {{if this.sortedByName 'active'}}">
      <a href {{on "click" this.sortById}}>
        {{i18n "tagging.sort_by_name"}}
      </a>
    </span>
  </div>
  
  <hr />
  
  {{#if this.model}}
    <TagList
      @tags={{this.model}}
      @sortProperties={{this.sortProperties}}
      @titleKey="tagging.all_tags"
      @isPrivateMessage={{true}}
      @tagsForUser={{this.tagsForUser}}
    />
  {{/if}}
  */
  {
    "id": "lOLQ5JFP",
    "block": "[[[10,0],[14,0,\"list-controls\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n    \"],[10,\"h2\"],[12],[1,[28,[35,0],[\"tagging.tags\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"tag-sort-options\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"tagging.sort_by\"],null]],[1,\"\\n  \"],[10,1],[15,0,[29,[\"tag-sort-count \",[52,[30,0,[\"sortedByCount\"]],\"active\"]]]],[12],[1,\"\\n    \"],[11,3],[24,6,\"\"],[4,[38,2],[\"click\",[30,0,[\"sortByCount\"]]],null],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"tagging.sort_by_count\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[15,0,[29,[\"tag-sort-name \",[52,[30,0,[\"sortedByName\"]],\"active\"]]]],[12],[1,\"\\n    \"],[11,3],[24,6,\"\"],[4,[38,2],[\"click\",[30,0,[\"sortById\"]]],null],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"tagging.sort_by_name\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"hr\"],[12],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\"]],[[[1,\"  \"],[8,[39,3],null,[[\"@tags\",\"@sortProperties\",\"@titleKey\",\"@isPrivateMessage\",\"@tagsForUser\"],[[30,0,[\"model\"]],[30,0,[\"sortProperties\"]],\"tagging.all_tags\",true,[30,0,[\"tagsForUser\"]]]],null],[1,\"\\n\"]],[]],null]],[],false,[\"i18n\",\"if\",\"on\",\"tag-list\"]]",
    "moduleName": "discourse/templates/user-private-messages-tags-index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});