define("discourse/templates/group/manage/tags", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <form class="groups-form form-vertical groups-notifications-form">
  
    <PluginOutlet
      @name="before-manage-group-tags"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  
    <div class="control-group">
      <label class="control-label">{{i18n
          "groups.manage.tags.long_title"
        }}</label>
      <div>{{i18n "groups.manage.tags.description"}}</div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-watching"}}
        {{i18n "groups.notifications.watching.title"}}</label>
  
      <TagChooser
        @tags={{this.model.watching_tags}}
        @blacklist={{this.selectedTags}}
        @everyTag={{true}}
        @unlimitedTagCount={{true}}
        @options={{hash allowAny=false}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.tags.watched_tags_instructions"}}
      </div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-tracking"}}
        {{i18n "groups.notifications.tracking.title"}}</label>
  
      <TagChooser
        @tags={{this.model.tracking_tags}}
        @blacklist={{this.selectedTags}}
        @everyTag={{true}}
        @unlimitedTagCount={{true}}
        @options={{hash allowAny=false}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.tags.tracked_tags_instructions"}}
      </div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-watching-first"}}
        {{i18n "groups.notifications.watching_first_post.title"}}</label>
  
      <TagChooser
        @tags={{this.model.watching_first_post_tags}}
        @blacklist={{this.selectedTags}}
        @everyTag={{true}}
        @unlimitedTagCount={{true}}
        @options={{hash allowAny=false}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.tags.watching_first_post_tags_instructions"}}
      </div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-regular"}}
        {{i18n "groups.notifications.regular.title"}}</label>
  
      <TagChooser
        @tags={{this.model.regular_tags}}
        @blacklist={{this.selectedTags}}
        @everyTag={{true}}
        @unlimitedTagCount={{true}}
        @options={{hash allowAny=false}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.tags.regular_tags_instructions"}}
      </div>
    </div>
  
    <div class="control-group">
      <label>{{d-icon "d-muted"}}
        {{i18n "groups.notifications.muted.title"}}</label>
  
      <TagChooser
        @tags={{this.model.muted_tags}}
        @blacklist={{this.selectedTags}}
        @everyTag={{true}}
        @unlimitedTagCount={{true}}
        @options={{hash allowAny=false}}
      />
  
      <div class="control-instructions">
        {{i18n "groups.manage.tags.muted_tags_instructions"}}
      </div>
    </div>
  
    <GroupManageSaveButton @model={{this.model}} />
  </form>
  */
  {
    "id": "UfNMkmI9",
    "block": "[[[10,\"form\"],[14,0,\"groups-form form-vertical groups-notifications-form\"],[12],[1,\"\\n\\n  \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"before-manage-group-tags\",\"div\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,2],[\"groups.manage.tags.long_title\"],null]],[13],[1,\"\\n    \"],[10,0],[12],[1,[28,[35,2],[\"groups.manage.tags.description\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,3],[\"d-watching\"],null]],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.notifications.watching.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@tags\",\"@blacklist\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,0,[\"model\",\"watching_tags\"]],[30,0,[\"selectedTags\"]],true,true,[28,[37,1],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.manage.tags.watched_tags_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,3],[\"d-tracking\"],null]],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.notifications.tracking.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@tags\",\"@blacklist\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,0,[\"model\",\"tracking_tags\"]],[30,0,[\"selectedTags\"]],true,true,[28,[37,1],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.manage.tags.tracked_tags_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,3],[\"d-watching-first\"],null]],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.notifications.watching_first_post.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@tags\",\"@blacklist\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,0,[\"model\",\"watching_first_post_tags\"]],[30,0,[\"selectedTags\"]],true,true,[28,[37,1],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.manage.tags.watching_first_post_tags_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,3],[\"d-regular\"],null]],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.notifications.regular.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@tags\",\"@blacklist\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,0,[\"model\",\"regular_tags\"]],[30,0,[\"selectedTags\"]],true,true,[28,[37,1],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.manage.tags.regular_tags_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,3],[\"d-muted\"],null]],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.notifications.muted.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@tags\",\"@blacklist\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,0,[\"model\",\"muted_tags\"]],[30,0,[\"selectedTags\"]],true,true,[28,[37,1],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"groups.manage.tags.muted_tags_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,5],null,[[\"@model\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"plugin-outlet\",\"hash\",\"i18n\",\"d-icon\",\"tag-chooser\",\"group-manage-save-button\"]]",
    "moduleName": "discourse/templates/group/manage/tags.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});