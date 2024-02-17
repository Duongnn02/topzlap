define("discourse/templates/tags/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container">
    <DiscourseBanner @user={{this.currentUser}} @banner={{this.site.banner}} />
  </div>
  
  <div class="list-controls">
    <div class="container tags-controls">
      {{#if this.canAdminTags}}
        <TagsAdminDropdown @actionsMapping={{this.actionsMapping}} />
      {{/if}}
      <h2>{{i18n "tagging.tags"}}</h2>
    </div>
  </div>
  
  <div>
    <PluginOutlet
      @name="tags-below-title"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  </div>
  
  <div class="tag-sort-options">
    {{i18n "tagging.sort_by"}}
    <span class="tag-sort-count {{if this.sortedByCount 'active'}}"><a
        href
        {{on "click" this.sortByCount}}
      >{{i18n "tagging.sort_by_count"}}</a></span>
    <span class="tag-sort-name {{if this.sortedByName 'active'}}"><a
        href
        {{on "click" this.sortById}}
      >{{i18n "tagging.sort_by_name"}}</a></span>
  </div>
  
  <hr />
  
  <div class="all-tag-lists">
    {{#each this.model.extras.categories as |category|}}
      <TagList
        @tags={{category.tags}}
        @sortProperties={{this.sortProperties}}
        @categoryId={{category.id}}
      />
    {{/each}}
  
    {{#each this.model.extras.tag_groups as |tagGroup|}}
      <TagList
        @tags={{tagGroup.tags}}
        @sortProperties={{this.sortProperties}}
        @tagGroupName={{tagGroup.name}}
      />
    {{/each}}
  
    {{#if this.model}}
      <TagList
        @tags={{this.model}}
        @sortProperties={{this.sortProperties}}
        @titleKey={{this.otherTagsTitleKey}}
      />
    {{/if}}
  </div>
  */
  {
    "id": "wSg7Tmwt",
    "block": "[[[10,0],[14,0,\"container\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@user\",\"@banner\"],[[30,0,[\"currentUser\"]],[30,0,[\"site\",\"banner\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"list-controls\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"container tags-controls\"],[12],[1,\"\\n\"],[41,[30,0,[\"canAdminTags\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@actionsMapping\"],[[30,0,[\"actionsMapping\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,\"h2\"],[12],[1,[28,[35,3],[\"tagging.tags\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[12],[1,\"\\n  \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"tags-below-title\",\"div\",[28,[37,5],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"tag-sort-options\"],[12],[1,\"\\n  \"],[1,[28,[35,3],[\"tagging.sort_by\"],null]],[1,\"\\n  \"],[10,1],[15,0,[29,[\"tag-sort-count \",[52,[30,0,[\"sortedByCount\"]],\"active\"]]]],[12],[11,3],[24,6,\"\"],[4,[38,6],[\"click\",[30,0,[\"sortByCount\"]]],null],[12],[1,[28,[35,3],[\"tagging.sort_by_count\"],null]],[13],[13],[1,\"\\n  \"],[10,1],[15,0,[29,[\"tag-sort-name \",[52,[30,0,[\"sortedByName\"]],\"active\"]]]],[12],[11,3],[24,6,\"\"],[4,[38,6],[\"click\",[30,0,[\"sortById\"]]],null],[12],[1,[28,[35,3],[\"tagging.sort_by_name\"],null]],[13],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"hr\"],[12],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"all-tag-lists\"],[12],[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"model\",\"extras\",\"categories\"]]],null]],null],null,[[[1,\"    \"],[8,[39,9],null,[[\"@tags\",\"@sortProperties\",\"@categoryId\"],[[30,1,[\"tags\"]],[30,0,[\"sortProperties\"]],[30,1,[\"id\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"model\",\"extras\",\"tag_groups\"]]],null]],null],null,[[[1,\"    \"],[8,[39,9],null,[[\"@tags\",\"@sortProperties\",\"@tagGroupName\"],[[30,2,[\"tags\"]],[30,0,[\"sortProperties\"]],[30,2,[\"name\"]]]],null],[1,\"\\n\"]],[2]],null],[1,\"\\n\"],[41,[30,0,[\"model\"]],[[[1,\"    \"],[8,[39,9],null,[[\"@tags\",\"@sortProperties\",\"@titleKey\"],[[30,0,[\"model\"]],[30,0,[\"sortProperties\"]],[30,0,[\"otherTagsTitleKey\"]]]],null],[1,\"\\n\"]],[]],null],[13]],[\"category\",\"tagGroup\"],false,[\"discourse-banner\",\"if\",\"tags-admin-dropdown\",\"i18n\",\"plugin-outlet\",\"hash\",\"on\",\"each\",\"-track-array\",\"tag-list\"]]",
    "moduleName": "discourse/templates/tags/index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});