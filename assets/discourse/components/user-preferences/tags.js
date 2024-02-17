define("discourse/components/user-preferences/tags", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @siteSettings.tagging_enabled}}
    <div class="control-group tag-notifications">
      <label class="control-label">{{i18n "user.tag_settings"}}</label>
  
      <div class="controls tracking-controls tracking-controls__watched-tags">
        <label>{{d-icon "d-watching" class="icon watching"}}
          {{i18n "user.watched_tags"}}</label>
        <TagChooser
          @tags={{@model.watched_tags}}
          @blockedTags={{@selectedTags}}
          @everyTag={{true}}
          @unlimitedTagCount={{true}}
          @options={{hash allowAny=false}}
        />
      </div>
  
      <div class="instructions">{{i18n "user.watched_tags_instructions"}}</div>
  
      <div class="controls tracking-controls tracking-controls__tracked-tags">
        <label>{{d-icon "d-tracking" class="icon tracking"}}
          {{i18n "user.tracked_tags"}}</label>
        <TagChooser
          @tags={{@model.tracked_tags}}
          @blockedTags={{@selectedTags}}
          @everyTag={{true}}
          @unlimitedTagCount={{true}}
          @options={{hash allowAny=false}}
        />
      </div>
  
      <div class="instructions">{{i18n "user.tracked_tags_instructions"}}</div>
  
      <div
        class="controls tracking-controls tracking-controls__watched-first-post-tags"
      >
        <label>{{d-icon "d-watching-first" class="icon watching-first-post"}}
          {{i18n "user.watched_first_post_tags"}}</label>
        <TagChooser
          @tags={{@model.watching_first_post_tags}}
          @blockedTags={{@selectedTags}}
          @everyTag={{true}}
          @unlimitedTagCount={{true}}
          @options={{hash allowAny=false}}
        />
      </div>
  
      <div class="instructions">
        {{i18n "user.watched_first_post_tags_instructions"}}
      </div>
  
      <div class="controls tracking-controls tracking-controls__muted-tags">
        <label>{{d-icon "d-muted" class="icon muted"}}
          {{i18n "user.muted_tags"}}</label>
        <TagChooser
          @tags={{@model.muted_tags}}
          @blockedTags={{@selectedTags}}
          @everyTag={{true}}
          @unlimitedTagCount={{true}}
          @options={{hash allowAny=false}}
        />
      </div>
      <div class="instructions">{{i18n "user.muted_tags_instructions"}}</div>
    </div>
  
    <PluginOutlet
      @name="user-preferences-tags"
      @connectorTagName="div"
      @outletArgs={{hash model=@model save=@save}}
    />
    <PluginOutlet
      @name="user-custom-controls"
      @connectorTagName="div"
      @outletArgs={{hash model=@model}}
    />
  {{/if}}
  */
  {
    "id": "T6yxHswG",
    "block": "[[[41,[30,1,[\"tagging_enabled\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group tag-notifications\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.tag_settings\"],null]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__watched-tags\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,2],[\"d-watching\"],[[\"class\"],[\"icon watching\"]]]],[1,\"\\n        \"],[1,[28,[35,1],[\"user.watched_tags\"],null]],[13],[1,\"\\n      \"],[8,[39,3],null,[[\"@tags\",\"@blockedTags\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,2,[\"watched_tags\"]],[30,3],true,true,[28,[37,4],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,1],[\"user.watched_tags_instructions\"],null]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__tracked-tags\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,2],[\"d-tracking\"],[[\"class\"],[\"icon tracking\"]]]],[1,\"\\n        \"],[1,[28,[35,1],[\"user.tracked_tags\"],null]],[13],[1,\"\\n      \"],[8,[39,3],null,[[\"@tags\",\"@blockedTags\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,2,[\"tracked_tags\"]],[30,3],true,true,[28,[37,4],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,1],[\"user.tracked_tags_instructions\"],null]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__watched-first-post-tags\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,2],[\"d-watching-first\"],[[\"class\"],[\"icon watching-first-post\"]]]],[1,\"\\n        \"],[1,[28,[35,1],[\"user.watched_first_post_tags\"],null]],[13],[1,\"\\n      \"],[8,[39,3],null,[[\"@tags\",\"@blockedTags\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,2,[\"watching_first_post_tags\"]],[30,3],true,true,[28,[37,4],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"user.watched_first_post_tags_instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__muted-tags\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,2],[\"d-muted\"],[[\"class\"],[\"icon muted\"]]]],[1,\"\\n        \"],[1,[28,[35,1],[\"user.muted_tags\"],null]],[13],[1,\"\\n      \"],[8,[39,3],null,[[\"@tags\",\"@blockedTags\",\"@everyTag\",\"@unlimitedTagCount\",\"@options\"],[[30,2,[\"muted_tags\"]],[30,3],true,true,[28,[37,4],null,[[\"allowAny\"],[false]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,1],[\"user.muted_tags_instructions\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-tags\",\"div\",[28,[37,4],null,[[\"model\",\"save\"],[[30,2],[30,4]]]]]],null],[1,\"\\n  \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,4],null,[[\"model\"],[[30,2]]]]]],null],[1,\"\\n\"]],[]],null]],[\"@siteSettings\",\"@model\",\"@selectedTags\",\"@save\"],false,[\"if\",\"i18n\",\"d-icon\",\"tag-chooser\",\"hash\",\"plugin-outlet\"]]",
    "moduleName": "discourse/components/user-preferences/tags.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});