define("discourse/templates/group/manage/categories", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <form class="groups-form form-vertical groups-notifications-form">
    <div class="control-group">
      <label class="control-label">{{i18n
          "groups.manage.categories.long_title"
        }}</label>
      <div>{{i18n "groups.manage.categories.description"}}</div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-watching"}}
        {{i18n "groups.notifications.watching.title"}}</label>
  
      <CategorySelector
        @categories={{this.model.watchingCategories}}
        @blockedCategories={{this.selectedCategories}}
        @onChange={{action (mut this.model.watchingCategories)}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.categories.watched_categories_instructions"}}
      </div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-tracking"}}
        {{i18n "groups.notifications.tracking.title"}}</label>
  
      <CategorySelector
        @categories={{this.model.trackingCategories}}
        @blockedCategories={{this.selectedCategories}}
        @onChange={{action (mut this.model.trackingCategories)}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.categories.tracked_categories_instructions"}}
      </div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-watching-first"}}
        {{i18n "groups.notifications.watching_first_post.title"}}</label>
  
      <CategorySelector
        @categories={{this.model.watchingFirstPostCategories}}
        @blockedCategories={{this.selectedCategories}}
        @onChange={{action (mut this.model.watchingFirstPostCategories)}}
      />
  
      <div class="control-instructions">
        {{i18n
          "groups.manage.categories.watching_first_post_categories_instructions"
        }}
      </div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-regular"}}
        {{i18n "groups.notifications.regular.title"}}</label>
  
      <CategorySelector
        @categories={{this.model.regularCategories}}
        @blockedCategories={{this.selectedCategories}}
        @onChange={{action (mut this.model.regularCategories)}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.categories.regular_categories_instructions"}}
      </div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-muted"}}
        {{i18n "groups.notifications.muted.title"}}</label>
  
      <CategorySelector
        @categories={{this.model.mutedCategories}}
        @blockedCategories={{this.selectedCategories}}
        @onChange={{action (mut this.model.mutedCategories)}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.categories.muted_categories_instructions"}}
      </div>
    </div>
  
    <GroupManageSaveButton @model={{this.model}} />
  </form>
  */
  {
    "id": "VkBueYjz",
    "block": "[[[10,\"form\"],[14,0,\"groups-form form-vertical groups-notifications-form\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"groups.manage.categories.long_title\"],null]],[13],[1,\"\\n    \"],[10,0],[12],[1,[28,[35,0],[\"groups.manage.categories.description\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-watching\"],null]],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.notifications.watching.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,0,[\"model\",\"watchingCategories\"]],[30,0,[\"selectedCategories\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"watchingCategories\"]]],null]],null]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.manage.categories.watched_categories_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-tracking\"],null]],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.notifications.tracking.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,0,[\"model\",\"trackingCategories\"]],[30,0,[\"selectedCategories\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"trackingCategories\"]]],null]],null]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.manage.categories.tracked_categories_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-watching-first\"],null]],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.notifications.watching_first_post.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,0,[\"model\",\"watchingFirstPostCategories\"]],[30,0,[\"selectedCategories\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"watchingFirstPostCategories\"]]],null]],null]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.manage.categories.watching_first_post_categories_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-regular\"],null]],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.notifications.regular.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,0,[\"model\",\"regularCategories\"]],[30,0,[\"selectedCategories\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"regularCategories\"]]],null]],null]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.manage.categories.regular_categories_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-muted\"],null]],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.notifications.muted.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,0,[\"model\",\"mutedCategories\"]],[30,0,[\"selectedCategories\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"mutedCategories\"]]],null]],null]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.manage.categories.muted_categories_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,5],null,[[\"@model\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"d-icon\",\"category-selector\",\"action\",\"mut\",\"group-manage-save-button\"]]",
    "moduleName": "discourse/templates/group/manage/categories.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});