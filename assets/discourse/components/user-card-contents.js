define("discourse/components/user-card-contents", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/computed", "discourse/mixins/can-check-emails", "discourse/mixins/card-contents-base", "discourse/mixins/cleans-up", "I18n", "discourse/models/user", "discourse/lib/formatter", "discourse-common/lib/get-url", "@ember/utils", "discourse/lib/settings", "@ember/string", "discourse/lib/text", "discourse/lib/utilities"], function (_exports, _component, _templateFactory, _object, _computed, _decorators, _computed2, _canCheckEmails, _cardContentsBase, _cleansUp, _I18n, _user, _formatter, _getUrl, _utils, _settings, _string, _text, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _obj, _init, _init2, _init3, _init4;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/computed",0,"discourse/mixins/can-check-emails",0,"discourse/mixins/card-contents-base",0,"discourse/mixins/cleans-up",0,"@ember/component",0,"I18n",0,"discourse/models/user",0,"discourse/lib/formatter",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"discourse/lib/settings",0,"@ember/string",0,"discourse/lib/text",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.visible}}
    <PluginOutlet
      @name="before-user-card-content"
      @outletArgs={{hash user=this.user}}
    />
    <div class="card-content">
      {{#if this.loading}}
        <div class="card-row first-row">
          <div class="user-card-avatar">
            <div
              class="card-avatar-placeholder animated-placeholder placeholder-animation"
            ></div>
          </div>
        </div>
  
        <div class="card-row second-row">
          <div class="animated-placeholder placeholder-animation"></div>
        </div>
        <div class="card-row">
          <div class="animated-placeholder placeholder-animation"></div>
        </div>
        <div class="card-row">
          <div class="animated-placeholder placeholder-animation"></div>
        </div>
        <div class="card-row">
          <div class="animated-placeholder placeholder-animation"></div>
        </div>
      {{else}}
        <div class="card-row first-row">
          <div class="user-card-avatar">
            {{#if this.user.profile_hidden}}
              <span class="card-huge-avatar">{{bound-avatar
                  this.user
                  "huge"
                }}</span>
            {{else}}
              <a
                href={{this.user.path}}
                {{on "click" (fn this.handleShowUser this.user)}}
                class="card-huge-avatar"
              >{{bound-avatar this.user "huge"}}</a>
            {{/if}}
  
            <UserAvatarFlair @user={{this.user}} />
  
            <div>
              <PluginOutlet
                @name="user-card-avatar-flair"
                @connectorTagName="div"
                @outletArgs={{hash user=this.user}}
              />
            </div>
          </div>
          <div class="names">
            <h1
              class="{{this.staff}}
                {{this.newUser}}
                {{if this.nameFirst 'full-name' 'username'}}"
            >
              {{#if this.user.profile_hidden}}
                <span
                  id="discourse-user-card-title"
                  class="name-username-wrapper"
                >
                  {{if
                    this.nameFirst
                    this.user.name
                    (format-username this.user.username)
                  }}
                </span>
              {{else}}
                <a
                  href={{this.user.path}}
                  {{on "click" (fn this.handleShowUser this.user)}}
                  class="user-profile-link"
                >
                  <span
                    id="discourse-user-card-title"
                    class="name-username-wrapper"
                  >
                    {{if
                      this.nameFirst
                      this.user.name
                      (format-username this.user.username)
                    }}
                  </span>
                  {{user-status this.user currentUser=this.currentUser}}
                </a>
              {{/if}}
            </h1>
            <PluginOutlet
              @name="user-card-after-username"
              @connectorTagName="div"
              @outletArgs={{hash
                user=this.user
                showUser=(fn this.handleShowUser this.user)
              }}
            />
            {{#if this.nameFirst}}
              <h2 class="username">{{this.user.username}}</h2>
            {{else}}
              {{#if this.user.name}}
                <h2 class="full-name">{{this.user.name}}</h2>
              {{/if}}
            {{/if}}
            {{#if this.user.title}}
              <h2>{{this.user.title}}</h2>
            {{/if}}
            {{#if this.user.staged}}
              <h2 class="staged">{{i18n "user.staged"}}</h2>
            {{/if}}
            {{#if this.hasStatus}}
              <h3 class="user-status">
                {{html-safe this.userStatusEmoji}}
                <span class="user-status__description">
                  {{this.user.status.description}}
                </span>
                {{format-date this.user.status.ends_at format="tiny"}}
              </h3>
            {{/if}}
            <div>
              <PluginOutlet
                @name="user-card-post-names"
                @connectorTagName="div"
                @outletArgs={{hash user=this.user}}
              />
            </div>
          </div>
          <ul class="usercard-controls">
            {{#if this.user.can_send_private_message_to_user}}
              <li class="compose-pm">
                <DButton
                  @class="btn-primary"
                  @action={{action "composePM" this.user this.post}}
                  @icon="envelope"
                  @label="user.private_message"
                />
              </li>
            {{/if}}
            <PluginOutlet
              @name="user-card-below-message-button"
              @connectorTagName="li"
              @outletArgs={{hash user=this.user close=(action "close")}}
            />
            {{#if this.showFilter}}
              <li>
                <DButton
                  @class="btn-default"
                  @action={{action "filterPosts" this.user}}
                  @icon="filter"
                  @translatedLabel={{this.filterPostsLabel}}
                />
              </li>
            {{/if}}
            {{#if this.hasUserFilters}}
              <li>
                <DButton
                  @action={{action "cancelFilter"}}
                  @icon="times"
                  @label="topic.filters.cancel"
                />
              </li>
            {{/if}}
            {{#if this.showDelete}}
              <li>
                <DButton
                  @class="btn-danger"
                  @action={{action "deleteUser"}}
                  @actionParam={{this.user}}
                  @icon="exclamation-triangle"
                  @label="admin.user.delete"
                />
              </li>
            {{/if}}
            <li>
              <PluginOutlet
                @name="user-card-additional-buttons"
                @connectorTagName="div"
                @outletArgs={{hash user=this.user close=(action "close")}}
              />
            </li>
          </ul>
          <PluginOutlet
            @name="user-card-additional-controls"
            @connectorTagName="div"
            @outletArgs={{hash user=this.user close=(action "close")}}
          />
        </div>
  
        {{#if this.user.profile_hidden}}
          <div class="card-row second-row">
            <div class="profile-hidden">
              <span>{{i18n "user.profile_hidden"}}</span>
            </div>
          </div>
        {{/if}}
  
        {{#if this.isSuspendedOrHasBio}}
          <div class="card-row second-row">
            {{#if this.user.suspend_reason}}
              <div class="suspended">
                <div class="suspension-date">
                  {{d-icon "ban"}}
                  {{#if this.user.suspendedForever}}
                    {{i18n "user.suspended_permanently"}}
                  {{else}}
                    {{i18n
                      "user.suspended_notice"
                      date=this.user.suspendedTillDate
                    }}
                  {{/if}}
                </div>
                <div class="suspension-reason">
                  <span class="suspension-reason-title">{{i18n
                      "user.suspended_reason"
                    }}</span>
                  <span
                    class="suspension-reason-description"
                  >{{this.user.suspend_reason}}</span>
                </div>
              </div>
            {{else}}
              {{#if this.user.bio_excerpt}}
                <div class="bio">
                  <HtmlWithLinks>
                    {{html-safe this.user.bio_excerpt}}
                  </HtmlWithLinks>
                </div>
              {{/if}}
            {{/if}}
          </div>
        {{/if}}
  
        {{#if this.showFeaturedTopic}}
          <div class="card-row">
            <div class="featured-topic">
              <span class="desc">{{i18n "user.featured_topic"}}</span>
              <LinkTo
                @route="topic"
                @models={{array
                  this.user.featured_topic.slug
                  this.user.featured_topic.id
                }}
              >{{replace-emoji
                  (html-safe this.user.featured_topic.fancy_title)
                }}</LinkTo>
            </div>
          </div>
        {{/if}}
  
        {{#if this.hasLocaleOrWebsite}}
          <div class="card-row">
            <div class="location-and-website">
              {{#if this.user.website_name}}
                <span class="website-name">
                  {{d-icon "globe"}}
                  {{#if this.linkWebsite}}
                    {{! template-lint-disable  }}
                    <a
                      href="{{this.user.website}}"
                      rel="noopener {{unless this.removeNoFollow 'nofollow ugc'}}"
                      target="_blank"
                    >{{this.user.website_name}}</a>
                  {{else}}
                    <span
                      title={{this.user.website}}
                    >{{this.user.website_name}}</span>
                  {{/if}}
                </span>
              {{/if}}
              {{#if this.user.location}}
                <span class="location">
                  {{d-icon "map-marker-alt"}}
                  <span>{{this.user.location}}</span>
                </span>
              {{/if}}
              {{#if this.showUserLocalTime}}
                <span class="local-time" title="{{i18n 'local_time'}}">
                  {{d-icon "far-clock"}}
                  <span>{{this.formattedUserLocalTime}}</span>
                </span>
              {{/if}}
              <span>
                <PluginOutlet
                  @name="user-card-location-and-website"
                  @connectorTagName="div"
                  @outletArgs={{hash user=this.user}}
                />
              </span>
            </div>
          </div>
        {{/if}}
  
        <div class="card-row metadata-row">
          {{#unless this.user.profile_hidden}}
            <div class="metadata">
              {{#if this.user.last_posted_at}}
                <h3><span class="desc">{{i18n "last_post"}}</span>
                  {{format-date this.user.last_posted_at leaveAgo="true"}}</h3>
              {{/if}}
              <h3><span class="desc">{{i18n "joined"}}</span>
                {{format-date this.user.created_at leaveAgo="true"}}</h3>
              {{#if this.user.time_read}}
                <h3 title="{{this.timeReadTooltip}}">
                  <span class="desc">{{i18n "time_read"}}</span>
                  {{format-duration this.user.time_read}}
                  {{#if this.showRecentTimeRead}}
                    <span>({{i18n
                        "time_read_recently"
                        time_read=this.recentTimeRead
                      }})</span>
                  {{/if}}
                </h3>
              {{/if}}
              {{#if this.showCheckEmail}}
                <h3 class="email">
                  {{d-icon "envelope" title="user.email.title"}}
                  {{#if this.user.email}}
                    {{this.user.email}}
                  {{else}}
                    <DButton
                      @action={{action "checkEmail"}}
                      @actionParam={{this.user}}
                      @icon="envelope"
                      @label="admin.users.check_email.text"
                      @class="btn-primary"
                    />
                  {{/if}}
                </h3>
              {{/if}}
              <PluginOutlet
                @name="user-card-metadata"
                @connectorTagName="div"
                @outletArgs={{hash user=this.user}}
              />
            </div>
          {{/unless}}
          <PluginOutlet
            @name="user-card-after-metadata"
            @connectorTagName="div"
            @outletArgs={{hash user=this.user}}
          />
        </div>
  
        {{#if this.publicUserFields}}
          <div class="card-row">
            <div class="public-user-fields">
              {{#each this.publicUserFields as |uf|}}
                {{#if uf.value}}
                  <div
                    class="public-user-field public-user-field__{{uf.field.dasherized_name}}"
                  >
                    <span class="user-field-name">{{uf.field.name}}:</span>
                    <span class="user-field-value">
                      {{#each uf.value as |v|}}
                        {{! some values are arrays }}
                        <span class="user-field-value-list-item">{{v}}</span>
                      {{else}}
                        {{uf.value}}
                      {{/each}}
                    </span>
                  </div>
                {{/if}}
              {{/each}}
            </div>
          </div>
        {{/if}}
  
        <PluginOutlet
          @name="user-card-before-badges"
          @connectorTagName="div"
          @outletArgs={{hash user=this.user}}
        />
  
        {{#if this.showBadges}}
          <div class="card-row">
            {{#if this.user.featured_user_badges}}
              <div class="badge-section">
                {{#each this.user.featured_user_badges as |ub|}}
                  <UserBadge @badge={{ub.badge}} @user={{this.user}} />
                {{/each}}
                {{#if this.showMoreBadges}}
                  <span class="more-user-badges">
                    <LinkTo @route="user.badges" @model={{this.user}}>
                      {{i18n "badges.more_badges" count=this.moreBadgesCount}}
                    </LinkTo>
                  </span>
                {{/if}}
              </div>
            {{/if}}
          </div>
        {{/if}}
      {{/if}}
    </div>
  {{/if}}
  */
  {
    "id": "NLbCNNEf",
    "block": "[[[41,[30,0,[\"visible\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@name\",\"@outletArgs\"],[\"before-user-card-content\",[28,[37,2],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n  \"],[10,0],[14,0,\"card-content\"],[12],[1,\"\\n\"],[41,[30,0,[\"loading\"]],[[[1,\"      \"],[10,0],[14,0,\"card-row first-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"user-card-avatar\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-avatar-placeholder animated-placeholder placeholder-animation\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"card-row second-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"animated-placeholder placeholder-animation\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"card-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"animated-placeholder placeholder-animation\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"card-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"animated-placeholder placeholder-animation\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"card-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"animated-placeholder placeholder-animation\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"card-row first-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"user-card-avatar\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\",\"profile_hidden\"]],[[[1,\"            \"],[10,1],[14,0,\"card-huge-avatar\"],[12],[1,[28,[35,3],[[30,0,[\"user\"]],\"huge\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"            \"],[11,3],[16,6,[30,0,[\"user\",\"path\"]]],[24,0,\"card-huge-avatar\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"handleShowUser\"]],[30,0,[\"user\"]]],null]],null],[12],[1,[28,[35,3],[[30,0,[\"user\"]],\"huge\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"\\n          \"],[8,[39,6],null,[[\"@user\"],[[30,0,[\"user\"]]]],null],[1,\"\\n\\n          \"],[10,0],[12],[1,\"\\n            \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-avatar-flair\",\"div\",[28,[37,2],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"names\"],[12],[1,\"\\n          \"],[10,\"h1\"],[15,0,[29,[[30,0,[\"staff\"]],\"\\n              \",[30,0,[\"newUser\"]],\"\\n              \",[52,[30,0,[\"nameFirst\"]],\"full-name\",\"username\"]]]],[12],[1,\"\\n\"],[41,[30,0,[\"user\",\"profile_hidden\"]],[[[1,\"              \"],[10,1],[14,1,\"discourse-user-card-title\"],[14,0,\"name-username-wrapper\"],[12],[1,\"\\n                \"],[1,[52,[30,0,[\"nameFirst\"]],[30,0,[\"user\",\"name\"]],[28,[37,7],[[30,0,[\"user\",\"username\"]]],null]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[11,3],[16,6,[30,0,[\"user\",\"path\"]]],[24,0,\"user-profile-link\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"handleShowUser\"]],[30,0,[\"user\"]]],null]],null],[12],[1,\"\\n                \"],[10,1],[14,1,\"discourse-user-card-title\"],[14,0,\"name-username-wrapper\"],[12],[1,\"\\n                  \"],[1,[52,[30,0,[\"nameFirst\"]],[30,0,[\"user\",\"name\"]],[28,[37,7],[[30,0,[\"user\",\"username\"]]],null]]],[1,\"\\n                \"],[13],[1,\"\\n                \"],[1,[28,[35,8],[[30,0,[\"user\"]]],[[\"currentUser\"],[[30,0,[\"currentUser\"]]]]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n          \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-after-username\",\"div\",[28,[37,2],null,[[\"user\",\"showUser\"],[[30,0,[\"user\"]],[28,[37,5],[[30,0,[\"handleShowUser\"]],[30,0,[\"user\"]]],null]]]]]],null],[1,\"\\n\"],[41,[30,0,[\"nameFirst\"]],[[[1,\"            \"],[10,\"h2\"],[14,0,\"username\"],[12],[1,[30,0,[\"user\",\"username\"]]],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"user\",\"name\"]],[[[1,\"              \"],[10,\"h2\"],[14,0,\"full-name\"],[12],[1,[30,0,[\"user\",\"name\"]]],[13],[1,\"\\n\"]],[]],null]],[]]],[41,[30,0,[\"user\",\"title\"]],[[[1,\"            \"],[10,\"h2\"],[12],[1,[30,0,[\"user\",\"title\"]]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"user\",\"staged\"]],[[[1,\"            \"],[10,\"h2\"],[14,0,\"staged\"],[12],[1,[28,[35,9],[\"user.staged\"],null]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"hasStatus\"]],[[[1,\"            \"],[10,\"h3\"],[14,0,\"user-status\"],[12],[1,\"\\n              \"],[1,[28,[35,10],[[30,0,[\"userStatusEmoji\"]]],null]],[1,\"\\n              \"],[10,1],[14,0,\"user-status__description\"],[12],[1,\"\\n                \"],[1,[30,0,[\"user\",\"status\",\"description\"]]],[1,\"\\n              \"],[13],[1,\"\\n              \"],[1,[28,[35,11],[[30,0,[\"user\",\"status\",\"ends_at\"]]],[[\"format\"],[\"tiny\"]]]],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[10,0],[12],[1,\"\\n            \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-post-names\",\"div\",[28,[37,2],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"ul\"],[14,0,\"usercard-controls\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\",\"can_send_private_message_to_user\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"compose-pm\"],[12],[1,\"\\n              \"],[8,[39,12],null,[[\"@class\",\"@action\",\"@icon\",\"@label\"],[\"btn-primary\",[28,[37,13],[[30,0],\"composePM\",[30,0,[\"user\"]],[30,0,[\"post\"]]],null],\"envelope\",\"user.private_message\"]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-below-message-button\",\"li\",[28,[37,2],null,[[\"user\",\"close\"],[[30,0,[\"user\"]],[28,[37,13],[[30,0],\"close\"],null]]]]]],null],[1,\"\\n\"],[41,[30,0,[\"showFilter\"]],[[[1,\"            \"],[10,\"li\"],[12],[1,\"\\n              \"],[8,[39,12],null,[[\"@class\",\"@action\",\"@icon\",\"@translatedLabel\"],[\"btn-default\",[28,[37,13],[[30,0],\"filterPosts\",[30,0,[\"user\"]]],null],\"filter\",[30,0,[\"filterPostsLabel\"]]]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"hasUserFilters\"]],[[[1,\"            \"],[10,\"li\"],[12],[1,\"\\n              \"],[8,[39,12],null,[[\"@action\",\"@icon\",\"@label\"],[[28,[37,13],[[30,0],\"cancelFilter\"],null],\"times\",\"topic.filters.cancel\"]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showDelete\"]],[[[1,\"            \"],[10,\"li\"],[12],[1,\"\\n              \"],[8,[39,12],null,[[\"@class\",\"@action\",\"@actionParam\",\"@icon\",\"@label\"],[\"btn-danger\",[28,[37,13],[[30,0],\"deleteUser\"],null],[30,0,[\"user\"]],\"exclamation-triangle\",\"admin.user.delete\"]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[10,\"li\"],[12],[1,\"\\n            \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-additional-buttons\",\"div\",[28,[37,2],null,[[\"user\",\"close\"],[[30,0,[\"user\"]],[28,[37,13],[[30,0],\"close\"],null]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-additional-controls\",\"div\",[28,[37,2],null,[[\"user\",\"close\"],[[30,0,[\"user\"]],[28,[37,13],[[30,0],\"close\"],null]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"user\",\"profile_hidden\"]],[[[1,\"        \"],[10,0],[14,0,\"card-row second-row\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"profile-hidden\"],[12],[1,\"\\n            \"],[10,1],[12],[1,[28,[35,9],[\"user.profile_hidden\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"isSuspendedOrHasBio\"]],[[[1,\"        \"],[10,0],[14,0,\"card-row second-row\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\",\"suspend_reason\"]],[[[1,\"            \"],[10,0],[14,0,\"suspended\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"suspension-date\"],[12],[1,\"\\n                \"],[1,[28,[35,14],[\"ban\"],null]],[1,\"\\n\"],[41,[30,0,[\"user\",\"suspendedForever\"]],[[[1,\"                  \"],[1,[28,[35,9],[\"user.suspended_permanently\"],null]],[1,\"\\n\"]],[]],[[[1,\"                  \"],[1,[28,[35,9],[\"user.suspended_notice\"],[[\"date\"],[[30,0,[\"user\",\"suspendedTillDate\"]]]]]],[1,\"\\n\"]],[]]],[1,\"              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"suspension-reason\"],[12],[1,\"\\n                \"],[10,1],[14,0,\"suspension-reason-title\"],[12],[1,[28,[35,9],[\"user.suspended_reason\"],null]],[13],[1,\"\\n                \"],[10,1],[14,0,\"suspension-reason-description\"],[12],[1,[30,0,[\"user\",\"suspend_reason\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"user\",\"bio_excerpt\"]],[[[1,\"              \"],[10,0],[14,0,\"bio\"],[12],[1,\"\\n                \"],[8,[39,15],null,null,[[\"default\"],[[[[1,\"\\n                  \"],[1,[28,[35,10],[[30,0,[\"user\",\"bio_excerpt\"]]],null]],[1,\"\\n                \"]],[]]]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showFeaturedTopic\"]],[[[1,\"        \"],[10,0],[14,0,\"card-row\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"featured-topic\"],[12],[1,\"\\n            \"],[10,1],[14,0,\"desc\"],[12],[1,[28,[35,9],[\"user.featured_topic\"],null]],[13],[1,\"\\n            \"],[8,[39,16],null,[[\"@route\",\"@models\"],[\"topic\",[28,[37,17],[[30,0,[\"user\",\"featured_topic\",\"slug\"]],[30,0,[\"user\",\"featured_topic\",\"id\"]]],null]]],[[\"default\"],[[[[1,[28,[35,18],[[28,[37,10],[[30,0,[\"user\",\"featured_topic\",\"fancy_title\"]]],null]],null]]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"hasLocaleOrWebsite\"]],[[[1,\"        \"],[10,0],[14,0,\"card-row\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"location-and-website\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\",\"website_name\"]],[[[1,\"              \"],[10,1],[14,0,\"website-name\"],[12],[1,\"\\n                \"],[1,[28,[35,14],[\"globe\"],null]],[1,\"\\n\"],[41,[30,0,[\"linkWebsite\"]],[[[1,\"                  \"],[10,3],[15,6,[29,[[30,0,[\"user\",\"website\"]]]]],[15,\"rel\",[29,[\"noopener \",[52,[51,[30,0,[\"removeNoFollow\"]]],\"nofollow ugc\"]]]],[14,\"target\",\"_blank\"],[12],[1,[30,0,[\"user\",\"website_name\"]]],[13],[1,\"\\n\"]],[]],[[[1,\"                  \"],[10,1],[15,\"title\",[30,0,[\"user\",\"website\"]]],[12],[1,[30,0,[\"user\",\"website_name\"]]],[13],[1,\"\\n\"]],[]]],[1,\"              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"user\",\"location\"]],[[[1,\"              \"],[10,1],[14,0,\"location\"],[12],[1,\"\\n                \"],[1,[28,[35,14],[\"map-marker-alt\"],null]],[1,\"\\n                \"],[10,1],[12],[1,[30,0,[\"user\",\"location\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showUserLocalTime\"]],[[[1,\"              \"],[10,1],[14,0,\"local-time\"],[15,\"title\",[29,[[28,[37,9],[\"local_time\"],null]]]],[12],[1,\"\\n                \"],[1,[28,[35,14],[\"far-clock\"],null]],[1,\"\\n                \"],[10,1],[12],[1,[30,0,[\"formattedUserLocalTime\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[10,1],[12],[1,\"\\n              \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-location-and-website\",\"div\",[28,[37,2],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,0],[14,0,\"card-row metadata-row\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"user\",\"profile_hidden\"]]],[[[1,\"          \"],[10,0],[14,0,\"metadata\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\",\"last_posted_at\"]],[[[1,\"              \"],[10,\"h3\"],[12],[10,1],[14,0,\"desc\"],[12],[1,[28,[35,9],[\"last_post\"],null]],[13],[1,\"\\n                \"],[1,[28,[35,11],[[30,0,[\"user\",\"last_posted_at\"]]],[[\"leaveAgo\"],[\"true\"]]]],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[10,\"h3\"],[12],[10,1],[14,0,\"desc\"],[12],[1,[28,[35,9],[\"joined\"],null]],[13],[1,\"\\n              \"],[1,[28,[35,11],[[30,0,[\"user\",\"created_at\"]]],[[\"leaveAgo\"],[\"true\"]]]],[13],[1,\"\\n\"],[41,[30,0,[\"user\",\"time_read\"]],[[[1,\"              \"],[10,\"h3\"],[15,\"title\",[29,[[30,0,[\"timeReadTooltip\"]]]]],[12],[1,\"\\n                \"],[10,1],[14,0,\"desc\"],[12],[1,[28,[35,9],[\"time_read\"],null]],[13],[1,\"\\n                \"],[1,[28,[35,20],[[30,0,[\"user\",\"time_read\"]]],null]],[1,\"\\n\"],[41,[30,0,[\"showRecentTimeRead\"]],[[[1,\"                  \"],[10,1],[12],[1,\"(\"],[1,[28,[35,9],[\"time_read_recently\"],[[\"time_read\"],[[30,0,[\"recentTimeRead\"]]]]]],[1,\")\"],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showCheckEmail\"]],[[[1,\"              \"],[10,\"h3\"],[14,0,\"email\"],[12],[1,\"\\n                \"],[1,[28,[35,14],[\"envelope\"],[[\"title\"],[\"user.email.title\"]]]],[1,\"\\n\"],[41,[30,0,[\"user\",\"email\"]],[[[1,\"                  \"],[1,[30,0,[\"user\",\"email\"]]],[1,\"\\n\"]],[]],[[[1,\"                  \"],[8,[39,12],null,[[\"@action\",\"@actionParam\",\"@icon\",\"@label\",\"@class\"],[[28,[37,13],[[30,0],\"checkEmail\"],null],[30,0,[\"user\"]],\"envelope\",\"admin.users.check_email.text\",\"btn-primary\"]],null],[1,\"\\n\"]],[]]],[1,\"              \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-metadata\",\"div\",[28,[37,2],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-after-metadata\",\"div\",[28,[37,2],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"publicUserFields\"]],[[[1,\"        \"],[10,0],[14,0,\"card-row\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"public-user-fields\"],[12],[1,\"\\n\"],[42,[28,[37,22],[[28,[37,22],[[30,0,[\"publicUserFields\"]]],null]],null],null,[[[41,[30,1,[\"value\"]],[[[1,\"                \"],[10,0],[15,0,[29,[\"public-user-field public-user-field__\",[30,1,[\"field\",\"dasherized_name\"]]]]],[12],[1,\"\\n                  \"],[10,1],[14,0,\"user-field-name\"],[12],[1,[30,1,[\"field\",\"name\"]]],[1,\":\"],[13],[1,\"\\n                  \"],[10,1],[14,0,\"user-field-value\"],[12],[1,\"\\n\"],[42,[28,[37,22],[[28,[37,22],[[30,1,[\"value\"]]],null]],null],null,[[[1,\"                      \"],[10,1],[14,0,\"user-field-value-list-item\"],[12],[1,[30,2]],[13],[1,\"\\n\"]],[2]],[[[1,\"                      \"],[1,[30,1,[\"value\"]]],[1,\"\\n\"]],[]]],[1,\"                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null]],[1]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-card-before-badges\",\"div\",[28,[37,2],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"showBadges\"]],[[[1,\"        \"],[10,0],[14,0,\"card-row\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\",\"featured_user_badges\"]],[[[1,\"            \"],[10,0],[14,0,\"badge-section\"],[12],[1,\"\\n\"],[42,[28,[37,22],[[28,[37,22],[[30,0,[\"user\",\"featured_user_badges\"]]],null]],null],null,[[[1,\"                \"],[8,[39,23],null,[[\"@badge\",\"@user\"],[[30,3,[\"badge\"]],[30,0,[\"user\"]]]],null],[1,\"\\n\"]],[3]],null],[41,[30,0,[\"showMoreBadges\"]],[[[1,\"                \"],[10,1],[14,0,\"more-user-badges\"],[12],[1,\"\\n                  \"],[8,[39,16],null,[[\"@route\",\"@model\"],[\"user.badges\",[30,0,[\"user\"]]]],[[\"default\"],[[[[1,\"\\n                    \"],[1,[28,[35,9],[\"badges.more_badges\"],[[\"count\"],[[30,0,[\"moreBadgesCount\"]]]]]],[1,\"\\n                  \"]],[]]]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"uf\",\"v\",\"ub\"],false,[\"if\",\"plugin-outlet\",\"hash\",\"bound-avatar\",\"on\",\"fn\",\"user-avatar-flair\",\"format-username\",\"user-status\",\"i18n\",\"html-safe\",\"format-date\",\"d-button\",\"action\",\"d-icon\",\"html-with-links\",\"link-to\",\"array\",\"replace-emoji\",\"unless\",\"format-duration\",\"each\",\"-track-array\",\"user-badge\"]]",
    "moduleName": "discourse/components/user-card-contents.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_cardContentsBase.default, _canCheckEmails.default, _cleansUp.default, (_dec = (0, _decorators.default)("user"), _dec2 = (0, _decorators.default)("user.status"), _dec3 = (0, _decorators.default)("user.status.emoji"), _dec4 = (0, _decorators.default)("user.staff"), _dec5 = (0, _decorators.default)("user.trust_level"), _dec6 = (0, _decorators.default)("user.name"), _dec7 = (0, _decorators.default)("user"), _dec8 = (0, _decorators.default)("userTimezone"), _dec9 = (0, _decorators.default)("username"), _dec10 = (0, _decorators.default)("username", "topicPostCount"), _dec11 = (0, _decorators.default)("user.user_fields.@each.value"), _dec12 = (0, _decorators.default)("user.trust_level"), _dec13 = (0, _decorators.default)("user.badge_count", "user.featured_user_badges.length"), _dec14 = (0, _decorators.default)("user.time_read", "user.recent_time_read"), _dec15 = (0, _decorators.default)("user.recent_time_read"), _dec16 = (0, _decorators.default)("showRecentTimeRead", "user.time_read", "recentTimeRead"), _dec17 = (0, _decorators.observes)("user.card_background_upload_url"), _dec18 = (0, _decorators.default)("user.primary_group_name"), (_obj = {
    elementId: "user-card",
    classNames: "user-card",
    avatarSelector: "[data-user-card]",
    avatarDataAttrKey: "userCard",
    mentionSelector: "a.mention",
    classNameBindings: ["visible:show", "showBadges", "user.card_background_upload_url::no-bg", "isFixed:fixed", "usernameClass", "primaryGroup"],
    allowBackgrounds: (0, _computed2.setting)("allow_profile_backgrounds"),
    showBadges: (0, _computed2.setting)("enable_badges"),
    postStream: (0, _computed.alias)("topic.postStream"),
    enoughPostsForFiltering: (0, _computed.gte)("topicPostCount", 2),
    showFilter: (0, _computed.and)("viewingTopic", "postStream.hasNoFilters", "enoughPostsForFiltering"),
    showName: (0, _computed2.propertyNotEqual)("user.name", "user.username"),
    hasUserFilters: (0, _computed.gt)("postStream.userFilters.length", 0),
    showMoreBadges: (0, _computed.gt)("moreBadgesCount", 0),
    showDelete: (0, _computed.and)("viewingAdmin", "showName", "user.canBeDeleted"),
    linkWebsite: (0, _computed.not)("user.isBasic"),
    hasLocaleOrWebsite(user) {
      return user.location || user.website_name || this.userTimezone;
    },
    hasStatus() {
      return this.siteSettings.enable_user_status && this.user.status;
    },
    userStatusEmoji(emoji) {
      return (0, _text.emojiUnescape)((0, _utilities.escapeExpression)(`:${emoji}:`));
    },
    isSuspendedOrHasBio: (0, _computed.or)("user.suspend_reason", "user.bio_excerpt"),
    showCheckEmail: (0, _computed.and)("user.staged", "canCheckEmails"),
    user: null,
    // If inside a topic
    topicPostCount: null,
    showFeaturedTopic: (0, _computed.and)("user.featured_topic", "siteSettings.allow_featured_topic_on_user_profiles"),
    showUserLocalTime: (0, _computed2.setting)("display_local_time_in_user_card"),
    staff: isStaff => isStaff ? "staff" : "",
    newUser: trustLevel => trustLevel === 0 ? "new-user" : "",
    nameFirst(name) {
      return (0, _settings.prioritizeNameInUx)(name);
    },
    userTimezone(user) {
      if (!this.showUserLocalTime) {
        return;
      }
      return user.get("user_option.timezone");
    },
    formattedUserLocalTime(timezone) {
      return moment.tz(timezone).format(_I18n.default.t("dates.time"));
    },
    usernameClass: username => username ? `user-card-${username}` : "",
    filterPostsLabel(username, count) {
      return _I18n.default.t("topic.filter_to", {
        username,
        count
      });
    },
    publicUserFields() {
      const siteUserFields = this.site.get("user_fields");
      if (!(0, _utils.isEmpty)(siteUserFields)) {
        const userFields = this.get("user.user_fields");
        return siteUserFields.filterBy("show_on_user_card", true).sortBy("position").map(field => {
          (0, _object.set)(field, "dasherized_name", (0, _string.dasherize)(field.get("name")));
          const value = userFields ? userFields[field.get("id")] : null;
          return (0, _utils.isEmpty)(value) ? null : _object.default.create({
            value,
            field
          });
        }).compact();
      }
    },
    removeNoFollow(trustLevel) {
      return trustLevel > 2 && !this.siteSettings.tl3_links_no_follow;
    },
    moreBadgesCount: (badgeCount, badgeLength) => badgeCount - badgeLength,
    showRecentTimeRead(timeRead, recentTimeRead) {
      return timeRead !== recentTimeRead && recentTimeRead !== 0;
    },
    recentTimeRead(recentTimeReadSeconds) {
      return (0, _formatter.durationTiny)(recentTimeReadSeconds);
    },
    timeReadTooltip(showRecent, timeRead, recentTimeRead) {
      if (showRecent) {
        return _I18n.default.t("time_read_recently_tooltip", {
          time_read: (0, _formatter.durationTiny)(timeRead),
          recent_time_read: recentTimeRead
        });
      } else {
        return _I18n.default.t("time_read_tooltip", {
          time_read: (0, _formatter.durationTiny)(timeRead)
        });
      }
    },
    addBackground() {
      if (!this.allowBackgrounds) {
        return;
      }
      const thisElem = this.element;
      if (!thisElem) {
        return;
      }
      const url = this.get("user.card_background_upload_url");
      const bg = (0, _utils.isEmpty)(url) ? "" : `url(${(0, _getUrl.getURLWithCDN)(url)})`;
      thisElem.style.backgroundImage = bg;
    },
    primaryGroup(primaryGroup) {
      return `group-${primaryGroup}`;
    },
    _showCallback(username, $target) {
      this._positionCard($target);
      this.setProperties({
        visible: true,
        loading: true
      });
      const args = {
        forCard: true,
        include_post_count_for: this.get("topic.id")
      };
      return _user.default.findByUsername(username, args).then(user => {
        if (user.topic_post_count) {
          this.set("topicPostCount", user.topic_post_count[args.include_post_count_for]);
        }
        this.setProperties({
          user
        });
        this.user.trackStatus();
        return user;
      }).catch(() => this._close()).finally(() => this.set("loading", null));
    },
    _close() {
      if (this.user) {
        this.user.stopTrackingStatus();
      }
      this.setProperties({
        user: null,
        topicPostCount: null
      });
      this._super(...arguments);
    },
    cleanUp() {
      this._close();
    },
    handleShowUser(user, event) {
      if (event && (0, _utilities.modKeysPressed)(event).length > 0) {
        return false;
      }
      event?.preventDefault();
      // Invokes `showUser` argument. Convert to `this.args.showUser` when
      // refactoring this to a glimmer component.
      this.showUser(user);
      this._close();
    },
    actions: {
      close() {
        this._close();
      },
      composePM(user, post) {
        this._close();
        this.composePrivateMessage(user, post);
      },
      cancelFilter() {
        const postStream = this.postStream;
        postStream.cancelFilter();
        postStream.refresh();
        this._close();
      },
      filterPosts() {
        this.filterPosts(this.user);
        this._close();
      },
      deleteUser() {
        this.user.delete();
        this._close();
      },
      showUser(user) {
        this.handleShowUser(user);
      },
      checkEmail(user) {
        user.checkEmail();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "hasLocaleOrWebsite", [_dec], Object.getOwnPropertyDescriptor(_obj, "hasLocaleOrWebsite"), _obj), _applyDecoratedDescriptor(_obj, "hasStatus", [_dec2], Object.getOwnPropertyDescriptor(_obj, "hasStatus"), _obj), _applyDecoratedDescriptor(_obj, "userStatusEmoji", [_dec3], Object.getOwnPropertyDescriptor(_obj, "userStatusEmoji"), _obj), _applyDecoratedDescriptor(_obj, "staff", [_dec4], (_init = Object.getOwnPropertyDescriptor(_obj, "staff"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "newUser", [_dec5], (_init2 = Object.getOwnPropertyDescriptor(_obj, "newUser"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "nameFirst", [_dec6], Object.getOwnPropertyDescriptor(_obj, "nameFirst"), _obj), _applyDecoratedDescriptor(_obj, "userTimezone", [_dec7], Object.getOwnPropertyDescriptor(_obj, "userTimezone"), _obj), _applyDecoratedDescriptor(_obj, "formattedUserLocalTime", [_dec8], Object.getOwnPropertyDescriptor(_obj, "formattedUserLocalTime"), _obj), _applyDecoratedDescriptor(_obj, "usernameClass", [_dec9], (_init3 = Object.getOwnPropertyDescriptor(_obj, "usernameClass"), _init3 = _init3 ? _init3.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init3;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "filterPostsLabel", [_dec10], Object.getOwnPropertyDescriptor(_obj, "filterPostsLabel"), _obj), _applyDecoratedDescriptor(_obj, "publicUserFields", [_dec11], Object.getOwnPropertyDescriptor(_obj, "publicUserFields"), _obj), _applyDecoratedDescriptor(_obj, "removeNoFollow", [_dec12], Object.getOwnPropertyDescriptor(_obj, "removeNoFollow"), _obj), _applyDecoratedDescriptor(_obj, "moreBadgesCount", [_dec13], (_init4 = Object.getOwnPropertyDescriptor(_obj, "moreBadgesCount"), _init4 = _init4 ? _init4.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init4;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "showRecentTimeRead", [_dec14], Object.getOwnPropertyDescriptor(_obj, "showRecentTimeRead"), _obj), _applyDecoratedDescriptor(_obj, "recentTimeRead", [_dec15], Object.getOwnPropertyDescriptor(_obj, "recentTimeRead"), _obj), _applyDecoratedDescriptor(_obj, "timeReadTooltip", [_dec16], Object.getOwnPropertyDescriptor(_obj, "timeReadTooltip"), _obj), _applyDecoratedDescriptor(_obj, "addBackground", [_dec17], Object.getOwnPropertyDescriptor(_obj, "addBackground"), _obj), _applyDecoratedDescriptor(_obj, "primaryGroup", [_dec18], Object.getOwnPropertyDescriptor(_obj, "primaryGroup"), _obj), _applyDecoratedDescriptor(_obj, "handleShowUser", [_object.action], Object.getOwnPropertyDescriptor(_obj, "handleShowUser"), _obj)), _obj))));
  _exports.default = _default;
});