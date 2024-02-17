define("discourse/templates/groups/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <PluginOutlet @name="before-groups-index-container" @connectorTagName="div" />
  
  <DSection @pageClass="groups">
    <div class="groups-header">
      {{#if this.currentUser.can_create_group}}
        <DButton
          @action={{action "new"}}
          @class="btn-default groups-header-new pull-right"
          @icon="plus"
          @label="admin.groups.new.title"
        />
      {{/if}}
  
      <div class="groups-header-filters">
        <Input
          @value={{readonly this.filter}}
          placeholder={{i18n "groups.index.all"}}
          class="groups-header-filters-name no-blur"
          {{on "input" (action "onFilterChanged" value="target.value")}}
          @type="search"
          aria-description={{i18n "groups.index.search_results"}}
        />
  
        <ComboBox
          @value={{this.type}}
          @content={{this.types}}
          @class="groups-header-filters-type"
          @onChange={{action (mut this.type)}}
          @options={{hash clearable=true none="groups.index.filter"}}
        />
      </div>
    </div>
  
    <ConditionalLoadingSpinner @condition={{this.isLoading}}>
      {{#if this.groups}}
        <LoadMore
          @selector=".groups-boxes .group-box"
          @action={{action "loadMore"}}
        >
          <div class="container">
            <div class="groups-boxes">
              {{#each this.groups as |group|}}
                <LinkTo
                  @route="group.members"
                  @model={{group.name}}
                  class="group-box"
                  data-group-name={{group.name}}
                >
                  <div class="group-box-inner">
                    <div class="group-info-wrapper">
                      {{#if group.flair_url}}
                        <span class="group-avatar-flair">
                          <AvatarFlair
                            @flairName={{group.name}}
                            @flairUrl={{group.flair_url}}
                            @flairBgColor={{group.flair_bg_color}}
                            @flairColor={{group.flair_color}}
                          />
                        </span>
                      {{/if}}
  
                      <span class="group-info">
                        <GroupsInfo @group={{group}} />
                        <div class="group-user-count">{{d-icon
                            "user"
                          }}{{group.user_count}}</div>
                      </span>
                    </div>
  
                    <div class="group-description">{{html-safe
                        group.bio_excerpt
                      }}</div>
  
                    <div class="group-membership">
                      <GroupMembershipButton
                        @tagName=""
                        @model={{group}}
                        @showLogin={{route-action "showLogin"}}
                      >
                        {{#if group.is_group_owner}}
                          <span class="is-group-owner">
                            {{d-icon "shield-alt"}}
                            {{i18n "groups.index.is_group_owner"}}
                          </span>
                        {{else if group.is_group_user}}
                          <span class="is-group-member">
                            {{d-icon "check"}}
                            {{i18n "groups.index.is_group_user"}}
                          </span>
                        {{else if group.public_admission}}
                          {{i18n "groups.index.public"}}
                        {{else if group.isPrivate}}
                          {{d-icon "far-eye-slash"}}
                          {{i18n "groups.index.private"}}
                        {{else}}
                          {{#if group.automatic}}
                            {{i18n "groups.index.automatic"}}
                          {{else}}
                            {{d-icon "ban"}}
                            {{i18n "groups.index.closed"}}
                          {{/if}}
                        {{/if}}
                      </GroupMembershipButton>
  
                      <span>
                        <PluginOutlet
                          @name="group-index-box-after"
                          @connectorTagName="div"
                          @outletArgs={{hash model=group}}
                        />
                      </span>
                    </div>
                  </div>
                </LinkTo>
              {{/each}}
            </div>
          </div>
        </LoadMore>
  
        <ConditionalLoadingSpinner @condition={{this.groups.loadingMore}} />
      {{else}}
        <p role="status">{{i18n "groups.index.empty"}}</p>
      {{/if}}
    </ConditionalLoadingSpinner>
  
  </DSection>
  
  <PluginOutlet @name="after-groups-index-container" @connectorTagName="div" />
  */
  {
    "id": "v+Z1h7FC",
    "block": "[[[8,[39,0],null,[[\"@name\",\"@connectorTagName\"],[\"before-groups-index-container\",\"div\"]],null],[1,\"\\n\\n\"],[8,[39,1],null,[[\"@pageClass\"],[\"groups\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"groups-header\"],[12],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"can_create_group\"]],[[[1,\"      \"],[8,[39,3],null,[[\"@action\",\"@class\",\"@icon\",\"@label\"],[[28,[37,4],[[30,0],\"new\"],null],\"btn-default groups-header-new pull-right\",\"plus\",\"admin.groups.new.title\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"groups-header-filters\"],[12],[1,\"\\n      \"],[8,[39,5],[[16,\"placeholder\",[28,[37,6],[\"groups.index.all\"],null]],[24,0,\"groups-header-filters-name no-blur\"],[16,\"aria-description\",[28,[37,6],[\"groups.index.search_results\"],null]],[4,[38,8],[\"input\",[28,[37,4],[[30,0],\"onFilterChanged\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@value\",\"@type\"],[[28,[37,7],[[30,0,[\"filter\"]]],null],\"search\"]],null],[1,\"\\n\\n      \"],[8,[39,9],null,[[\"@value\",\"@content\",\"@class\",\"@onChange\",\"@options\"],[[30,0,[\"type\"]],[30,0,[\"types\"]],\"groups-header-filters-type\",[28,[37,4],[[30,0],[28,[37,10],[[30,0,[\"type\"]]],null]],null],[28,[37,11],null,[[\"clearable\",\"none\"],[true,\"groups.index.filter\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,12],null,[[\"@condition\"],[[30,0,[\"isLoading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"groups\"]],[[[1,\"      \"],[8,[39,13],null,[[\"@selector\",\"@action\"],[\".groups-boxes .group-box\",[28,[37,4],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"groups-boxes\"],[12],[1,\"\\n\"],[42,[28,[37,15],[[28,[37,15],[[30,0,[\"groups\"]]],null]],null],null,[[[1,\"              \"],[8,[39,16],[[24,0,\"group-box\"],[16,\"data-group-name\",[30,1,[\"name\"]]]],[[\"@route\",\"@model\"],[\"group.members\",[30,1,[\"name\"]]]],[[\"default\"],[[[[1,\"\\n                \"],[10,0],[14,0,\"group-box-inner\"],[12],[1,\"\\n                  \"],[10,0],[14,0,\"group-info-wrapper\"],[12],[1,\"\\n\"],[41,[30,1,[\"flair_url\"]],[[[1,\"                      \"],[10,1],[14,0,\"group-avatar-flair\"],[12],[1,\"\\n                        \"],[8,[39,17],null,[[\"@flairName\",\"@flairUrl\",\"@flairBgColor\",\"@flairColor\"],[[30,1,[\"name\"]],[30,1,[\"flair_url\"]],[30,1,[\"flair_bg_color\"]],[30,1,[\"flair_color\"]]]],null],[1,\"\\n                      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n                    \"],[10,1],[14,0,\"group-info\"],[12],[1,\"\\n                      \"],[8,[39,18],null,[[\"@group\"],[[30,1]]],null],[1,\"\\n                      \"],[10,0],[14,0,\"group-user-count\"],[12],[1,[28,[35,19],[\"user\"],null]],[1,[30,1,[\"user_count\"]]],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n\\n                  \"],[10,0],[14,0,\"group-description\"],[12],[1,[28,[35,20],[[30,1,[\"bio_excerpt\"]]],null]],[13],[1,\"\\n\\n                  \"],[10,0],[14,0,\"group-membership\"],[12],[1,\"\\n                    \"],[8,[39,21],null,[[\"@tagName\",\"@model\",\"@showLogin\"],[\"\",[30,1],[28,[37,22],[\"showLogin\"],null]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,1,[\"is_group_owner\"]],[[[1,\"                        \"],[10,1],[14,0,\"is-group-owner\"],[12],[1,\"\\n                          \"],[1,[28,[35,19],[\"shield-alt\"],null]],[1,\"\\n                          \"],[1,[28,[35,6],[\"groups.index.is_group_owner\"],null]],[1,\"\\n                        \"],[13],[1,\"\\n\"]],[]],[[[41,[30,1,[\"is_group_user\"]],[[[1,\"                        \"],[10,1],[14,0,\"is-group-member\"],[12],[1,\"\\n                          \"],[1,[28,[35,19],[\"check\"],null]],[1,\"\\n                          \"],[1,[28,[35,6],[\"groups.index.is_group_user\"],null]],[1,\"\\n                        \"],[13],[1,\"\\n\"]],[]],[[[41,[30,1,[\"public_admission\"]],[[[1,\"                        \"],[1,[28,[35,6],[\"groups.index.public\"],null]],[1,\"\\n\"]],[]],[[[41,[30,1,[\"isPrivate\"]],[[[1,\"                        \"],[1,[28,[35,19],[\"far-eye-slash\"],null]],[1,\"\\n                        \"],[1,[28,[35,6],[\"groups.index.private\"],null]],[1,\"\\n\"]],[]],[[[41,[30,1,[\"automatic\"]],[[[1,\"                          \"],[1,[28,[35,6],[\"groups.index.automatic\"],null]],[1,\"\\n\"]],[]],[[[1,\"                          \"],[1,[28,[35,19],[\"ban\"],null]],[1,\"\\n                          \"],[1,[28,[35,6],[\"groups.index.closed\"],null]],[1,\"\\n\"]],[]]],[1,\"                      \"]],[]]]],[]]]],[]]]],[]]],[1,\"                    \"]],[]]]]],[1,\"\\n\\n                    \"],[10,1],[12],[1,\"\\n                      \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"group-index-box-after\",\"div\",[28,[37,11],null,[[\"model\"],[[30,1]]]]]],null],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"]],[]]]]],[1,\"\\n\"]],[1]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\\n      \"],[8,[39,12],null,[[\"@condition\"],[[30,0,[\"groups\",\"loadingMore\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,2],[14,\"role\",\"status\"],[12],[1,[28,[35,6],[\"groups.index.empty\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"  \"]],[]]]]],[1,\"\\n\\n\"]],[]]]]],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\"],[\"after-groups-index-container\",\"div\"]],null]],[\"group\"],false,[\"plugin-outlet\",\"d-section\",\"if\",\"d-button\",\"action\",\"input\",\"i18n\",\"readonly\",\"on\",\"combo-box\",\"mut\",\"hash\",\"conditional-loading-spinner\",\"load-more\",\"each\",\"-track-array\",\"link-to\",\"avatar-flair\",\"groups-info\",\"d-icon\",\"html-safe\",\"group-membership-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/groups/index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});