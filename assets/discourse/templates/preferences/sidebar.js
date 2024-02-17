define("discourse/templates/preferences/sidebar", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group preferences-sidebar-categories">
    <legend class="control-label">{{i18n
        "user.experimental_sidebar.categories_section"
      }}</legend>
  
    <div class="controls">
      <CategorySelector
        @categories={{this.selectedSidebarCategories}}
        @onChange={{action (mut this.selectedSidebarCategories)}}
        @options={{hash
          allowUncategorized=(not this.siteSettings.suppress_uncategorized_badge)
          displayCategoryDescription=true
        }}
      />
    </div>
  
    <div class="instructions">{{i18n
        "user.experimental_sidebar.categories_section_instruction"
      }}</div>
  </div>
  
  {{#if this.model.display_sidebar_tags}}
    <div class="control-group preferences-sidebar-tags">
      <legend class="control-label">{{i18n
          "user.experimental_sidebar.tags_section"
        }}</legend>
  
      <div class="controls">
        <TagChooser
          @tags={{this.selectedSidebarTagNames}}
          @everyTag={{true}}
          @unlimitedTagCount={{true}}
          @onChange={{action (mut this.selectedSidebarTagNames)}}
          @options={{hash allowAny=false}}
        />
      </div>
  
      <div class="instructions">{{i18n
          "user.experimental_sidebar.tags_section_instruction"
        }}</div>
    </div>
  {{/if}}
  
  <div class="control-group preferences-sidebar-navigation">
    <legend class="control-label">{{i18n
        "user.experimental_sidebar.navigation_section"
      }}</legend>
  
    <div class="controls controls-dropdown">
      <label>{{i18n
          "user.experimental_sidebar.list_destination_instruction"
        }}</label>
      <ComboBox
        @class="preferences-sidebar-navigation__list-destination-selector"
        @valueProperty="value"
        @content={{this.sidebarListDestinations}}
        @value={{this.newSidebarListDestination}}
        @onChange={{action (mut this.newSidebarListDestination)}}
      />
    </div>
  </div>
  
  <SaveControls
    @model={{this.model}}
    @action={{action "save"}}
    @saved={{this.saved}}
  />
  */
  {
    "id": "mYKm7WLr",
    "block": "[[[10,0],[14,0,\"control-group preferences-sidebar-categories\"],[12],[1,\"\\n  \"],[10,\"legend\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.experimental_sidebar.categories_section\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@categories\",\"@onChange\",\"@options\"],[[30,0,[\"selectedSidebarCategories\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"selectedSidebarCategories\"]]],null]],null],[28,[37,4],null,[[\"allowUncategorized\",\"displayCategoryDescription\"],[[28,[37,5],[[30,0,[\"siteSettings\",\"suppress_uncategorized_badge\"]]],null],true]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.experimental_sidebar.categories_section_instruction\"],null]],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"display_sidebar_tags\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group preferences-sidebar-tags\"],[12],[1,\"\\n    \"],[10,\"legend\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.experimental_sidebar.tags_section\"],null]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@tags\",\"@everyTag\",\"@unlimitedTagCount\",\"@onChange\",\"@options\"],[[30,0,[\"selectedSidebarTagNames\"]],true,true,[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"selectedSidebarTagNames\"]]],null]],null],[28,[37,4],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.experimental_sidebar.tags_section_instruction\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"control-group preferences-sidebar-navigation\"],[12],[1,\"\\n  \"],[10,\"legend\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.experimental_sidebar.navigation_section\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,0],[\"user.experimental_sidebar.list_destination_instruction\"],null]],[13],[1,\"\\n    \"],[8,[39,8],null,[[\"@class\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"preferences-sidebar-navigation__list-destination-selector\",\"value\",[30,0,[\"sidebarListDestinations\"]],[30,0,[\"newSidebarListDestination\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"newSidebarListDestination\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,9],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[28,[37,2],[[30,0],\"save\"],null],[30,0,[\"saved\"]]]],null]],[],false,[\"i18n\",\"category-selector\",\"action\",\"mut\",\"hash\",\"not\",\"if\",\"tag-chooser\",\"combo-box\",\"save-controls\"]]",
    "moduleName": "discourse/templates/preferences/sidebar.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});