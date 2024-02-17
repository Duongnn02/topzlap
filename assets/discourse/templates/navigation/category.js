define("discourse/templates/navigation/category", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <AddCategoryTagClasses @category={{this.category}} />
  
  <section class="category-heading">
    {{#if this.category.uploaded_logo.url}}
      <CategoryLogo @category={{this.category}} />
      {{#if this.category.description}}
        <p>{{dir-span this.category.description htmlSafe="true"}}</p>
      {{/if}}
    {{/if}}
  
    <span>
      <PluginOutlet
        @name="category-heading"
        @connectorTagName="div"
        @outletArgs={{hash category=this.category}}
      />
    </span>
  </section>
  
  <DSection @class="navigation-container category-navigation">
    <DNavigation
      @category={{this.category}}
      @filterMode={{this.filterMode}}
      @noSubcategories={{this.noSubcategories}}
      @canCreateTopic={{this.canCreateTopic}}
      @createTopic={{route-action "createTopic"}}
      @createTopicDisabled={{this.cannotCreateTopicOnCategory}}
      @hasDraft={{this.currentUser.has_topic_draft}}
      @editCategory={{route-action "editCategory" this.category}}
    />
  
    <PluginOutlet
      @name="category-navigation"
      @connectorTagName="div"
      @outletArgs={{hash category=this.category}}
    />
  </DSection>
  */
  {
    "id": "Kwc++pUr",
    "block": "[[[8,[39,0],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"category-heading\"],[12],[1,\"\\n\"],[41,[30,0,[\"category\",\"uploaded_logo\",\"url\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"category\",\"description\"]],[[[1,\"      \"],[10,2],[12],[1,[28,[35,3],[[30,0,[\"category\",\"description\"]]],[[\"htmlSafe\"],[\"true\"]]]],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"category-heading\",\"div\",[28,[37,5],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,6],null,[[\"@class\"],[\"navigation-container category-navigation\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,7],null,[[\"@category\",\"@filterMode\",\"@noSubcategories\",\"@canCreateTopic\",\"@createTopic\",\"@createTopicDisabled\",\"@hasDraft\",\"@editCategory\"],[[30,0,[\"category\"]],[30,0,[\"filterMode\"]],[30,0,[\"noSubcategories\"]],[30,0,[\"canCreateTopic\"]],[28,[37,8],[\"createTopic\"],null],[30,0,[\"cannotCreateTopicOnCategory\"]],[30,0,[\"currentUser\",\"has_topic_draft\"]],[28,[37,8],[\"editCategory\",[30,0,[\"category\"]]],null]]],null],[1,\"\\n\\n  \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"category-navigation\",\"div\",[28,[37,5],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n\"]],[]]]]]],[],false,[\"add-category-tag-classes\",\"if\",\"category-logo\",\"dir-span\",\"plugin-outlet\",\"hash\",\"d-section\",\"d-navigation\",\"route-action\"]]",
    "moduleName": "discourse/templates/navigation/category.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});