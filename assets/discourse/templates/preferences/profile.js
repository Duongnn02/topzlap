define("discourse/templates/preferences/profile", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.canChangeBio}}
    <div class="control-group pref-bio">
      <label class="control-label">{{i18n "user.bio"}}</label>
      <div class="controls bio-composer input-xxlarge">
        <DEditor @value={{this.model.bio_raw}} />
      </div>
    </div>
  {{/if}}
  
  <div class="control-group pref-timezone">
    <label class="control-label">{{i18n "user.timezone"}}</label>
    <TimezoneInput
      @value={{this.model.user_option.timezone}}
      @onChange={{action (mut this.model.user_option.timezone)}}
      @class="input-xxlarge"
    />
    <DButton
      @class="btn-default"
      @icon="globe"
      @label="user.use_current_timezone"
      @action={{action "useCurrentTimezone"}}
    />
  </div>
  
  {{#if this.model.can_change_location}}
    <div class="control-group pref-location">
      <label class="control-label" for="edit-location">{{i18n
          "user.location"
        }}</label>
      <div class="controls">
        <Input
          @type="text"
          @value={{this.model.location}}
          class="input-xxlarge"
          id="edit-location"
        />
      </div>
    </div>
  {{/if}}
  
  {{#if this.model.can_change_website}}
    <div class="control-group pref-website">
      <label class="control-label" for="edit-website">{{i18n
          "user.website"
        }}</label>
      <div class="controls">
        <Input
          @type="text"
          @value={{this.model.website}}
          class="input-xxlarge"
          id="edit-website"
        />
      </div>
    </div>
  {{/if}}
  
  {{#each this.userFields as |uf|}}
    <div class="control-group">
      <UserField @field={{uf.field}} @value={{uf.value}} />
    </div>
  {{/each}}
  <div class="clearfix"></div>
  
  {{#if this.siteSettings.allow_profile_backgrounds}}
    {{#if this.canUploadProfileHeader}}
      <div class="control-group pref-profile-bg">
        <label class="control-label">{{i18n
            "user.change_profile_background.title"
          }}</label>
        <div class="controls">
          <UppyImageUploader
            @imageUrl={{this.model.profile_background_upload_url}}
            @type="profile_background"
            @id="profile-background-uploader"
          />
        </div>
        <div class="instructions">
          {{i18n "user.change_profile_background.instructions"}}
        </div>
      </div>
    {{/if}}
    {{#if this.canUploadUserCardBackground}}
      <div class="control-group pref-profile-bg">
        <label class="control-label">{{i18n
            "user.change_card_background.title"
          }}</label>
        <div class="controls">
          <UppyImageUploader
            @imageUrl={{this.model.card_background_upload_url}}
            @type="card_background"
            @id="profile-card-background-uploader"
          />
        </div>
        <div class="instructions">
          {{i18n "user.change_card_background.instructions"}}
        </div>
      </div>
    {{/if}}
  {{/if}}
  
  {{#if this.siteSettings.allow_featured_topic_on_user_profiles}}
    <div class="control-group">
      <label class="control-label">{{i18n "user.featured_topic"}}</label>
      {{#if this.model.featured_topic}}
        <label class="featured-topic-link">
          <LinkTo
            @route="topic"
            @models={{array
              this.model.featured_topic.slug
              this.model.featured_topic.id
            }}
          >
            {{replace-emoji (html-safe this.model.featured_topic.fancy_title)}}
          </LinkTo>
        </label>
      {{/if}}
  
      <div>
        <DButton
          @action={{action "showFeaturedTopicModal"}}
          @class="btn-default feature-topic-on-profile-btn"
          @label="user.feature_topic_on_profile.open_search"
        />
        {{#if this.model.featured_topic}}
          <DButton
            @action={{action "clearFeaturedTopicFromProfile"}}
            @class="btn-danger clear-feature-topic-on-profile-btn"
            @label="user.feature_topic_on_profile.clear.title"
          />
        {{/if}}
      </div>
      <div class="instructions">
        {{i18n "user.change_featured_topic.instructions"}}
      </div>
    </div>
  {{/if}}
  
  {{#if this.canChangeDefaultCalendar}}
    <div class="control-group">
      <label class="control-label">{{i18n
          "download_calendar.default_calendar"
        }}</label>
      <div>
        <ComboBox
          @valueProperty="value"
          @content={{this.calendarOptions}}
          @value={{this.model.user_option.default_calendar}}
          @id="user-default-calendar"
          @onChange={{action (mut this.model.user_option.default_calendar)}}
        />
      </div>
      <div class="instructions">
        {{i18n "download_calendar.default_calendar_instruction"}}
      </div>
    </div>
  {{/if}}
  
  <span>
    <PluginOutlet
      @name="user-preferences-profile"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model save=(action "save")}}
    />
  </span>
  
  <span>
    <PluginOutlet
      @name="user-custom-preferences"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  </span>
  
  <br />
  
  <span>
    <PluginOutlet
      @name="user-custom-controls"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  </span>
  
  <SaveControls
    @model={{this.model}}
    @action={{action "save"}}
    @saved={{this.saved}}
  />
  */
  {
    "id": "B61OxONF",
    "block": "[[[41,[30,0,[\"canChangeBio\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-bio\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.bio\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls bio-composer input-xxlarge\"],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@value\"],[[30,0,[\"model\",\"bio_raw\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"control-group pref-timezone\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.timezone\"],null]],[13],[1,\"\\n  \"],[8,[39,3],null,[[\"@value\",\"@onChange\",\"@class\"],[[30,0,[\"model\",\"user_option\",\"timezone\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"model\",\"user_option\",\"timezone\"]]],null]],null],\"input-xxlarge\"]],null],[1,\"\\n  \"],[8,[39,6],null,[[\"@class\",\"@icon\",\"@label\",\"@action\"],[\"btn-default\",\"globe\",\"user.use_current_timezone\",[28,[37,4],[[30,0],\"useCurrentTimezone\"],null]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"can_change_location\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-location\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"edit-location\"],[12],[1,[28,[35,1],[\"user.location\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,7],[[24,0,\"input-xxlarge\"],[24,1,\"edit-location\"]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"model\",\"location\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_change_website\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-website\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"edit-website\"],[12],[1,[28,[35,1],[\"user.website\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,7],[[24,0,\"input-xxlarge\"],[24,1,\"edit-website\"]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"model\",\"website\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"userFields\"]]],null]],null],null,[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[8,[39,10],null,[[\"@field\",\"@value\"],[[30,1,[\"field\"]],[30,1,[\"value\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[1]],null],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n\\n\"],[41,[30,0,[\"siteSettings\",\"allow_profile_backgrounds\"]],[[[41,[30,0,[\"canUploadProfileHeader\"]],[[[1,\"    \"],[10,0],[14,0,\"control-group pref-profile-bg\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.change_profile_background.title\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,11],null,[[\"@imageUrl\",\"@type\",\"@id\"],[[30,0,[\"model\",\"profile_background_upload_url\"]],\"profile_background\",\"profile-background-uploader\"]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"user.change_profile_background.instructions\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"canUploadUserCardBackground\"]],[[[1,\"    \"],[10,0],[14,0,\"control-group pref-profile-bg\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.change_card_background.title\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,11],null,[[\"@imageUrl\",\"@type\",\"@id\"],[[30,0,[\"model\",\"card_background_upload_url\"]],\"card_background\",\"profile-card-background-uploader\"]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"user.change_card_background.instructions\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"allow_featured_topic_on_user_profiles\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.featured_topic\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"featured_topic\"]],[[[1,\"      \"],[10,\"label\"],[14,0,\"featured-topic-link\"],[12],[1,\"\\n        \"],[8,[39,12],null,[[\"@route\",\"@models\"],[\"topic\",[28,[37,13],[[30,0,[\"model\",\"featured_topic\",\"slug\"]],[30,0,[\"model\",\"featured_topic\",\"id\"]]],null]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,14],[[28,[37,15],[[30,0,[\"model\",\"featured_topic\",\"fancy_title\"]]],null]],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,4],[[30,0],\"showFeaturedTopicModal\"],null],\"btn-default feature-topic-on-profile-btn\",\"user.feature_topic_on_profile.open_search\"]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"featured_topic\"]],[[[1,\"        \"],[8,[39,6],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,4],[[30,0],\"clearFeaturedTopicFromProfile\"],null],\"btn-danger clear-feature-topic-on-profile-btn\",\"user.feature_topic_on_profile.clear.title\"]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"user.change_featured_topic.instructions\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canChangeDefaultCalendar\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"download_calendar.default_calendar\"],null]],[13],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      \"],[8,[39,16],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@id\",\"@onChange\"],[\"value\",[30,0,[\"calendarOptions\"]],[30,0,[\"model\",\"user_option\",\"default_calendar\"]],\"user-default-calendar\",[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"model\",\"user_option\",\"default_calendar\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"download_calendar.default_calendar_instruction\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,17],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-profile\",\"div\",[28,[37,18],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,4],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,17],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-preferences\",\"div\",[28,[37,18],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"br\"],[12],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,17],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,18],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,19],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[28,[37,4],[[30,0],\"save\"],null],[30,0,[\"saved\"]]]],null]],[\"uf\"],false,[\"if\",\"i18n\",\"d-editor\",\"timezone-input\",\"action\",\"mut\",\"d-button\",\"input\",\"each\",\"-track-array\",\"user-field\",\"uppy-image-uploader\",\"link-to\",\"array\",\"replace-emoji\",\"html-safe\",\"combo-box\",\"plugin-outlet\",\"hash\",\"save-controls\"]]",
    "moduleName": "discourse/templates/preferences/profile.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});