define("discourse/components/user-preferences/categories", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group category-notifications">
    <label class="control-label">{{i18n "user.categories_settings"}}</label>
  
    <div class="controls tracking-controls tracking-controls__watched-categories">
      <label>{{d-icon "d-watching"}} {{i18n "user.watched_categories"}}</label>
      {{#if @canSee}}
        <a class="show-tracking" href={{@model.watchingTopicsPath}}>{{i18n
            "user.tracked_topics_link"
          }}</a>
      {{/if}}
      <CategorySelector
        @categories={{@model.watchedCategories}}
        @blockedCategories={{@selectedCategories}}
        @onChange={{action (mut @model.watchedCategories)}}
      />
    </div>
    <div class="instructions">{{i18n
        "user.watched_categories_instructions"
      }}</div>
  
    <div class="controls tracking-controls tracking-controls__tracked-categories">
      <label>{{d-icon "d-tracking"}} {{i18n "user.tracked_categories"}}</label>
      {{#if @canSee}}
        <a class="show-tracking" href={{@model.trackingTopicsPath}}>{{i18n
            "user.tracked_topics_link"
          }}</a>
      {{/if}}
      <CategorySelector
        @categories={{@model.trackedCategories}}
        @blockedCategories={{@selectedCategories}}
        @onChange={{action (mut @model.trackedCategories)}}
      />
    </div>
    <div class="instructions">{{i18n
        "user.tracked_categories_instructions"
      }}</div>
  
    <div
      class="controls tracking-controls tracking-controls__watched-first-categories"
    >
      <label>{{d-icon "d-watching-first"}}
        {{i18n "user.watched_first_post_categories"}}</label>
      <CategorySelector
        @categories={{@model.watchedFirstPostCategories}}
        @blockedCategories={{@selectedCategories}}
        @onChange={{action (mut @model.watchedFirstPostCategories)}}
      />
    </div>
    <div class="instructions">{{i18n
        "user.watched_first_post_categories_instructions"
      }}</div>
  
    {{#if @siteSettings.mute_all_categories_by_default}}
      <div
        class="controls tracking-controls tracking-controls__regular-categories"
      >
        <label>{{d-icon "d-regular"}} {{i18n "user.regular_categories"}}</label>
        <CategorySelector
          @categories={{@model.regularCategories}}
          @blockedCategories={{@selectedCategories}}
          @onChange={{action (mut @model.regularCategories)}}
        />
      </div>
      <div class="instructions">{{i18n
          "user.regular_categories_instructions"
        }}</div>
    {{else}}
      <div class="controls tracking-controls tracking-controls__muted-categories">
        <label>{{d-icon "d-muted"}} {{i18n "user.muted_categories"}}</label>
  
        {{#if @canSee}}
          <a class="show-tracking" href={{@model.mutedTopicsPath}}>{{i18n
              "user.tracked_topics_link"
            }}</a>
        {{/if}}
  
        <CategorySelector
          @categories={{@model.mutedCategories}}
          @blockedCategories={{@selectedCategories}}
          @onChange={{action (mut @model.mutedCategories)}}
        />
      </div>
  
      <div class="instructions">{{i18n
          (if
            @hideMutedTags
            "user.muted_categories_instructions"
            "user.muted_categories_instructions_dont_hide"
          )
        }}</div>
    {{/if}}
  </div>
  
  <span>
    <PluginOutlet
      @name="user-preferences-categories"
      @connectorTagName="div"
      @outletArgs={{hash model=@model save=@save}}
    />
  </span>
  
  <br />
  
  <span>
    <PluginOutlet
      @name="user-custom-controls"
      @connectorTagName="div"
      @outletArgs={{hash model=@model}}
    />
  </span>
  */
  {
    "id": "xICLqqig",
    "block": "[[[10,0],[14,0,\"control-group category-notifications\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.categories_settings\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__watched-categories\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-watching\"],null]],[1,\" \"],[1,[28,[35,0],[\"user.watched_categories\"],null]],[13],[1,\"\\n\"],[41,[30,1],[[[1,\"      \"],[10,3],[14,0,\"show-tracking\"],[15,6,[30,2,[\"watchingTopicsPath\"]]],[12],[1,[28,[35,0],[\"user.tracked_topics_link\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[8,[39,3],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,2,[\"watchedCategories\"]],[30,3],[28,[37,4],[[30,0],[28,[37,5],[[30,2,[\"watchedCategories\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.watched_categories_instructions\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__tracked-categories\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-tracking\"],null]],[1,\" \"],[1,[28,[35,0],[\"user.tracked_categories\"],null]],[13],[1,\"\\n\"],[41,[30,1],[[[1,\"      \"],[10,3],[14,0,\"show-tracking\"],[15,6,[30,2,[\"trackingTopicsPath\"]]],[12],[1,[28,[35,0],[\"user.tracked_topics_link\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[8,[39,3],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,2,[\"trackedCategories\"]],[30,3],[28,[37,4],[[30,0],[28,[37,5],[[30,2,[\"trackedCategories\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.tracked_categories_instructions\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__watched-first-categories\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-watching-first\"],null]],[1,\"\\n      \"],[1,[28,[35,0],[\"user.watched_first_post_categories\"],null]],[13],[1,\"\\n    \"],[8,[39,3],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,2,[\"watchedFirstPostCategories\"]],[30,3],[28,[37,4],[[30,0],[28,[37,5],[[30,2,[\"watchedFirstPostCategories\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.watched_first_post_categories_instructions\"],null]],[13],[1,\"\\n\\n\"],[41,[30,4,[\"mute_all_categories_by_default\"]],[[[1,\"    \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__regular-categories\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-regular\"],null]],[1,\" \"],[1,[28,[35,0],[\"user.regular_categories\"],null]],[13],[1,\"\\n      \"],[8,[39,3],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,2,[\"regularCategories\"]],[30,3],[28,[37,4],[[30,0],[28,[37,5],[[30,2,[\"regularCategories\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.regular_categories_instructions\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"controls tracking-controls tracking-controls__muted-categories\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,1],[\"d-muted\"],null]],[1,\" \"],[1,[28,[35,0],[\"user.muted_categories\"],null]],[13],[1,\"\\n\\n\"],[41,[30,1],[[[1,\"        \"],[10,3],[14,0,\"show-tracking\"],[15,6,[30,2,[\"mutedTopicsPath\"]]],[12],[1,[28,[35,0],[\"user.tracked_topics_link\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[8,[39,3],null,[[\"@categories\",\"@blockedCategories\",\"@onChange\"],[[30,2,[\"mutedCategories\"]],[30,3],[28,[37,4],[[30,0],[28,[37,5],[[30,2,[\"mutedCategories\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[[52,[30,5],\"user.muted_categories_instructions\",\"user.muted_categories_instructions_dont_hide\"]],null]],[13],[1,\"\\n\"]],[]]],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-categories\",\"div\",[28,[37,7],null,[[\"model\",\"save\"],[[30,2],[30,6]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"br\"],[12],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,7],null,[[\"model\"],[[30,2]]]]]],null],[1,\"\\n\"],[13]],[\"@canSee\",\"@model\",\"@selectedCategories\",\"@siteSettings\",\"@hideMutedTags\",\"@save\"],false,[\"i18n\",\"d-icon\",\"if\",\"category-selector\",\"action\",\"mut\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/user-preferences/categories.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});