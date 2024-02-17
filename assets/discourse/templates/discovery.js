define("discourse/templates/discovery", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
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
    {{#unless this.viewingCategoriesList}}
      <CategoryReadOnlyBanner
        @category={{this.category}}
        @readOnly={{this.navigationCategory.cannotCreateTopicOnCategory}}
      />
    {{/unless}}
  </div>
  
  <span>
    <PluginOutlet @name="discovery-list-controls-above" @connectorTagName="div" />
  </span>
  
  <div class="list-controls">
    <PluginOutlet
      @name="discovery-navigation-bar-above"
      @connectorTagName="div"
    />
    <div class="container">
      {{outlet "navigation-bar"}}
    </div>
  </div>
  
  <ConditionalLoadingSpinner @condition={{this.loading}} />
  
  <span>
    <PluginOutlet @name="discovery-above" @connectorTagName="div" />
  </span>
  
  {{#if this.showEditWelcomeTopicBanner}}
    <WelcomeTopicBanner />
  {{/if}}
  
  <div class="container list-container {{if this.loading 'hidden'}}">
    <div class="row">
      <div class="full-width">
        <div id="header-list-area">
          {{outlet "header-list-container"}}
          <PluginOutlet
            @name="header-list-container-bottom"
            @outletArgs={{hash category=this.category}}
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="full-width">
        <PluginOutlet @name="before-list-area" />
        <div id="list-area">
          <PluginOutlet
            @name="discovery-list-container-top"
            @connectorTagName="span"
            @outletArgs={{hash category=this.category listLoading=this.loading}}
          />
          {{outlet "list-container"}}
        </div>
      </div>
    </div>
  </div>
  
  <span>
    <PluginOutlet @name="discovery-below" @connectorTagName="div" />
  </span>
  */
  {
    "id": "PNGwUD5T",
    "block": "[[[10,0],[14,0,\"container\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@user\",\"@banner\"],[[30,0,[\"currentUser\"]],[30,0,[\"site\",\"banner\"]]]],null],[1,\"\\n\"],[41,[51,[30,0,[\"viewingCategoriesList\"]]],[[[1,\"    \"],[8,[39,2],null,[[\"@category\",\"@readOnly\"],[[30,0,[\"category\"]],[30,0,[\"navigationCategory\",\"cannotCreateTopicOnCategory\"]]]],null],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"discovery-list-controls-above\",\"div\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"list-controls\"],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"discovery-navigation-bar-above\",\"div\"]],null],[1,\"\\n  \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n    \"],[46,[28,[37,5],[\"navigation-bar\"],null],null,null,null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,6],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"discovery-above\",\"div\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showEditWelcomeTopicBanner\"]],[[[1,\"  \"],[8,[39,8],null,null,null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[15,0,[29,[\"container list-container \",[52,[30,0,[\"loading\"]],\"hidden\"]]]],[12],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"full-width\"],[12],[1,\"\\n      \"],[10,0],[14,1,\"header-list-area\"],[12],[1,\"\\n        \"],[46,[28,[37,5],[\"header-list-container\"],null],null,null,null],[1,\"\\n        \"],[8,[39,3],null,[[\"@name\",\"@outletArgs\"],[\"header-list-container-bottom\",[28,[37,9],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"full-width\"],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@name\"],[\"before-list-area\"]],null],[1,\"\\n      \"],[10,0],[14,1,\"list-area\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"discovery-list-container-top\",\"span\",[28,[37,9],null,[[\"category\",\"listLoading\"],[[30,0,[\"category\"]],[30,0,[\"loading\"]]]]]]],null],[1,\"\\n        \"],[46,[28,[37,5],[\"list-container\"],null],null,null,null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"discovery-below\",\"div\"]],null],[1,\"\\n\"],[13]],[],false,[\"discourse-banner\",\"unless\",\"category-read-only-banner\",\"plugin-outlet\",\"component\",\"-outlet\",\"conditional-loading-spinner\",\"if\",\"welcome-topic-banner\",\"hash\"]]",
    "moduleName": "discourse/templates/discovery.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});