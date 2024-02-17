define("discourse/templates/edit-category-tabs", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="edit-category {{if this.expandedMenu 'expanded-menu'}}">
    <div class="edit-category-title-bar">
      <div class="edit-category-title">
        <h2>{{this.title}}</h2>
        {{#if this.model.id}}
          <BreadCrumbs
            @categories={{this.site.categoriesList}}
            @category={{this.model}}
            @noSubcategories={{this.model.noSubcategories}}
            @editingCategory={{true}}
            @editingCategoryTab={{this.selectedTab}}
          />
        {{/if}}
      </div>
      {{#unless this.mobileView}}
        {{#if this.model.id}}
          <DButton
            @class="category-back"
            @action={{action "goBack"}}
            @label="category.back"
            @icon="caret-left"
          />
        {{/if}}
      {{/unless}}
    </div>
  
    <div class="edit-category-nav">
      <ul class="nav nav-stacked">
        <EditCategoryTab
          @panels={{this.panels}}
          @selectedTab={{this.selectedTab}}
          @params={{this.parentParams}}
          @tab="general"
        />
        <EditCategoryTab
          @panels={{this.panels}}
          @selectedTab={{this.selectedTab}}
          @params={{this.parentParams}}
          @tab="security"
        />
        <EditCategoryTab
          @panels={{this.panels}}
          @selectedTab={{this.selectedTab}}
          @params={{this.parentParams}}
          @tab="settings"
        />
        <EditCategoryTab
          @panels={{this.panels}}
          @selectedTab={{this.selectedTab}}
          @params={{this.parentParams}}
          @tab="images"
        />
        <EditCategoryTab
          @panels={{this.panels}}
          @selectedTab={{this.selectedTab}}
          @params={{this.parentParams}}
          @tab="topic-template"
        />
        {{#if this.siteSettings.tagging_enabled}}
          <EditCategoryTab
            @panels={{this.panels}}
            @selectedTab={{this.selectedTab}}
            @params={{this.parentParams}}
            @tab="tags"
          />
        {{/if}}
      </ul>
    </div>
  
    <div class="edit-category-content">
      <h3>{{this.selectedTabTitle}}</h3>
  
      {{#each this.panels as |tab|}}
        {{component
          tab
          selectedTab=this.selectedTab
          category=this.model
          registerValidator=(action "registerValidator")
        }}
      {{/each}}
    </div>
  
    {{#if this.showDeleteReason}}
      <div class="edit-category-delete-warning">
        <p class="warning">{{html-safe this.model.cannot_delete_reason}}</p>
      </div>
    {{/if}}
  
    <div class="edit-category-footer">
      <DButton
        @id="save-category"
        @class="btn-primary"
        @disabled={{this.disabled}}
        @action={{action "saveCategory"}}
        @label={{this.saveLabel}}
      />
  
      {{#if this.model.can_delete}}
        <DButton
          @class="btn-danger"
          @disabled={{this.deleteDisabled}}
          @action={{action "deleteCategory"}}
          @icon="far-trash-alt"
          @label="category.delete"
        />
      {{else if this.model.id}}
        <div class="disable-info">
          <DButton
            @disabled={{this.deleteDisabled}}
            @class="btn-default"
            @action={{action "toggleDeleteTooltip"}}
            @icon="question-circle"
            @label="category.delete"
          />
        </div>
      {{/if}}
    </div>
  </div>
  */
  {
    "id": "7SejGct4",
    "block": "[[[10,0],[15,0,[29,[\"edit-category \",[52,[30,0,[\"expandedMenu\"]],\"expanded-menu\"]]]],[12],[1,\"\\n  \"],[10,0],[14,0,\"edit-category-title-bar\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"edit-category-title\"],[12],[1,\"\\n      \"],[10,\"h2\"],[12],[1,[30,0,[\"title\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"id\"]],[[[1,\"        \"],[8,[39,1],null,[[\"@categories\",\"@category\",\"@noSubcategories\",\"@editingCategory\",\"@editingCategoryTab\"],[[30,0,[\"site\",\"categoriesList\"]],[30,0,[\"model\"]],[30,0,[\"model\",\"noSubcategories\"]],true,[30,0,[\"selectedTab\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"],[41,[51,[30,0,[\"mobileView\"]]],[[[41,[30,0,[\"model\",\"id\"]],[[[1,\"        \"],[8,[39,3],null,[[\"@class\",\"@action\",\"@label\",\"@icon\"],[\"category-back\",[28,[37,4],[[30,0],\"goBack\"],null],\"category.back\",\"caret-left\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"edit-category-nav\"],[12],[1,\"\\n    \"],[10,\"ul\"],[14,0,\"nav nav-stacked\"],[12],[1,\"\\n      \"],[8,[39,5],null,[[\"@panels\",\"@selectedTab\",\"@params\",\"@tab\"],[[30,0,[\"panels\"]],[30,0,[\"selectedTab\"]],[30,0,[\"parentParams\"]],\"general\"]],null],[1,\"\\n      \"],[8,[39,5],null,[[\"@panels\",\"@selectedTab\",\"@params\",\"@tab\"],[[30,0,[\"panels\"]],[30,0,[\"selectedTab\"]],[30,0,[\"parentParams\"]],\"security\"]],null],[1,\"\\n      \"],[8,[39,5],null,[[\"@panels\",\"@selectedTab\",\"@params\",\"@tab\"],[[30,0,[\"panels\"]],[30,0,[\"selectedTab\"]],[30,0,[\"parentParams\"]],\"settings\"]],null],[1,\"\\n      \"],[8,[39,5],null,[[\"@panels\",\"@selectedTab\",\"@params\",\"@tab\"],[[30,0,[\"panels\"]],[30,0,[\"selectedTab\"]],[30,0,[\"parentParams\"]],\"images\"]],null],[1,\"\\n      \"],[8,[39,5],null,[[\"@panels\",\"@selectedTab\",\"@params\",\"@tab\"],[[30,0,[\"panels\"]],[30,0,[\"selectedTab\"]],[30,0,[\"parentParams\"]],\"topic-template\"]],null],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"tagging_enabled\"]],[[[1,\"        \"],[8,[39,5],null,[[\"@panels\",\"@selectedTab\",\"@params\",\"@tab\"],[[30,0,[\"panels\"]],[30,0,[\"selectedTab\"]],[30,0,[\"parentParams\"]],\"tags\"]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"edit-category-content\"],[12],[1,\"\\n    \"],[10,\"h3\"],[12],[1,[30,0,[\"selectedTabTitle\"]]],[13],[1,\"\\n\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"panels\"]]],null]],null],null,[[[1,\"      \"],[46,[30,1],null,[[\"selectedTab\",\"category\",\"registerValidator\"],[[30,0,[\"selectedTab\"]],[30,0,[\"model\"]],[28,[37,4],[[30,0],\"registerValidator\"],null]]],null],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showDeleteReason\"]],[[[1,\"    \"],[10,0],[14,0,\"edit-category-delete-warning\"],[12],[1,\"\\n      \"],[10,2],[14,0,\"warning\"],[12],[1,[28,[35,9],[[30,0,[\"model\",\"cannot_delete_reason\"]]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"edit-category-footer\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@id\",\"@class\",\"@disabled\",\"@action\",\"@label\"],[\"save-category\",\"btn-primary\",[30,0,[\"disabled\"]],[28,[37,4],[[30,0],\"saveCategory\"],null],[30,0,[\"saveLabel\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"can_delete\"]],[[[1,\"      \"],[8,[39,3],null,[[\"@class\",\"@disabled\",\"@action\",\"@icon\",\"@label\"],[\"btn-danger\",[30,0,[\"deleteDisabled\"]],[28,[37,4],[[30,0],\"deleteCategory\"],null],\"far-trash-alt\",\"category.delete\"]],null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"model\",\"id\"]],[[[1,\"      \"],[10,0],[14,0,\"disable-info\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@disabled\",\"@class\",\"@action\",\"@icon\",\"@label\"],[[30,0,[\"deleteDisabled\"]],\"btn-default\",[28,[37,4],[[30,0],\"toggleDeleteTooltip\"],null],\"question-circle\",\"category.delete\"]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]],null]],[]]],[1,\"  \"],[13],[1,\"\\n\"],[13]],[\"tab\"],false,[\"if\",\"bread-crumbs\",\"unless\",\"d-button\",\"action\",\"edit-category-tab\",\"each\",\"-track-array\",\"component\",\"html-safe\"]]",
    "moduleName": "discourse/templates/edit-category-tabs.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});