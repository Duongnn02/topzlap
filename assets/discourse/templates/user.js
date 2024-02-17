define("discourse/templates/user", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <PluginOutlet
    @name="above-user-profile"
    @connectorTagName="div"
    @outletArgs={{hash model=this.model}}
  />
  <div
    class="container
      {{if this.viewingSelf 'viewing-self'}}
      {{if this.model.profile_hidden 'profile-hidden'}}
      {{this.primaryGroup}}"
  >
    <DSection @class="user-main">
      <a href="#user-content" id="skip-link" class="skip-link__user-nav">
        {{i18n "skip_user_nav"}}
      </a>
      <section
        class="{{if this.collapsedInfo 'collapsed-info'}}
          about
          {{if this.hasProfileBackgroundUrl 'has-background' 'no-background'}}"
      >
        {{#unless this.collapsedInfo}}
          {{#if this.showStaffCounters}}
            <div class="staff-counters">
              {{#if this.model.number_of_flags_given}}
                <div>
                  {{html-safe
                    (i18n
                      "user.staff_counters.flags_given"
                      className="helpful-flags"
                      count=this.model.number_of_flags_given
                    )
                  }}
                </div>
              {{/if}}
              {{#if this.model.number_of_flagged_posts}}
                <div>
                  <LinkTo
                    @route="review"
                    @query={{hash
                      username=this.model.username
                      status="all"
                      type="ReviewableFlaggedPost"
                    }}
                  >
                    {{html-safe
                      (i18n
                        "user.staff_counters.flagged_posts"
                        className="flagged-posts"
                        count=this.model.number_of_flagged_posts
                      )
                    }}
                  </LinkTo>
                </div>
              {{/if}}
              {{#if this.model.number_of_rejected_posts}}
                <div>
                  <LinkTo
                    @route="review"
                    @query={{hash
                      username=this.model.username
                      status="rejected"
                      type="ReviewableQueuedPost"
                    }}
                  >
                    {{html-safe
                      (i18n
                        "user.staff_counters.rejected_posts"
                        className="flagged-posts"
                        count=this.model.number_of_rejected_posts
                      )
                    }}
                  </LinkTo>
                </div>
              {{/if}}
  
              {{#if this.model.number_of_deleted_posts}}
                <div>
                  <LinkTo @route="user.deletedPosts" @model={{this.model}}>
                    {{html-safe
                      (i18n
                        "user.staff_counters.deleted_posts"
                        className="deleted-posts"
                        count=this.model.number_of_deleted_posts
                      )
                    }}
                  </LinkTo>
                </div>
              {{/if}}
              {{#if this.model.number_of_suspensions}}
                <div>
                  <a href {{on "click" this.showSuspensions}}>
                    {{html-safe
                      (i18n
                        "user.staff_counters.suspensions"
                        className="suspensions"
                        count=this.model.number_of_suspensions
                      )
                    }}
                  </a>
                </div>
              {{/if}}
              {{#if this.model.warnings_received_count}}
                <div>
                  <LinkTo
                    @route="userPrivateMessages.user.warnings"
                    @model={{this.model}}
                  >
                    {{html-safe
                      (i18n
                        "user.staff_counters.warnings_received"
                        className="warnings-received"
                        count=this.model.warnings_received_count
                      )
                    }}
                  </LinkTo>
                </div>
              {{/if}}
            </div>
          {{/if}}
          <div
            class="user-profile-image"
            style={{this.model.profileBackgroundUrl}}
          ></div>
        {{/unless}}
        <div class="details">
          <div class="primary">
            <PluginOutlet
              @name="before-user-profile-avatar"
              @outletArgs={{hash model=this.model}}
            />
            <UserProfileAvatar @user={{this.model}} @tagName="" />
            <div class="primary-textual">
              <div class="user-profile-names">
                <div
                  class="{{if this.nameFirst 'full-name' 'username'}}
                    user-profile-names__primary"
                >
                  {{if
                    this.nameFirst
                    this.model.name
                    (format-username this.model.username)
                  }}
                  {{user-status this.model currentUser=this.currentUser}}
                  {{#if this.model.status}}
                    <UserStatusMessage @status={{this.model.status}} />
                  {{/if}}
                </div>
                <div
                  class="{{if this.nameFirst 'username' 'full-name'}}
                    user-profile-names__secondary"
                >{{#if
                    this.nameFirst
                  }}{{this.model.username}}{{else}}{{this.model.name}}{{/if}}</div>
                {{#if this.model.staged}}
                  <div class="staged user-profile-names__secondary">{{i18n
                      "user.staged"
                    }}</div>
                {{/if}}
                {{#if this.model.title}}
                  <div
                    class="user-profile-names__title"
                  >{{this.model.title}}</div>
                {{/if}}
                <span>
                  <PluginOutlet
                    @name="user-post-names"
                    @connectorTagName="div"
                    @outletArgs={{hash model=this.model}}
                  />
                </span>
              </div>
  
              {{#if this.showFeaturedTopic}}
                <div class="featured-topic user-profile__featured-topic">
                  <span title={{i18n "user.featured_topic"}}>
                    {{d-icon "book"~}}
                  </span><LinkTo
                    @route="topic"
                    @models={{array
                      this.model.featured_topic.slug
                      this.model.featured_topic.id
                    }}
                  >{{html-safe
                      (replace-emoji this.model.featured_topic.fancy_title)
                    }}</LinkTo>
                </div>
              {{/if}}
  
              <div
                class="location-and-website user-profile__location-and-website"
              >
                {{#if this.model.location}}<div
                    class="user-profile-location"
                  >{{d-icon "map-marker-alt"~}}
                    {{this.model.location}}</div>{{/if}}
                {{#if this.model.website_name}}
                  <div class="user-profile-website">
                    {{! template-lint-disable link-rel-noopener }}
                    {{d-icon "globe"~}}
                    {{#if this.linkWebsite~}}
                      <a
                        href={{this.model.website}}
                        rel="noopener {{unless
                          this.removeNoFollow
                          'nofollow ugc'
                        }}"
                        target="_blank"
                      >{{this.model.website_name}}</a>
                    {{else}}
                      <span
                        title={{this.model.website}}
                      >{{this.model.website_name}}</span>
                    {{/if}}
                    {{! template-lint-enable link-rel-noopener }}
                  </div>
                {{/if}}
                <span>
                  <PluginOutlet
                    @name="user-location-and-website"
                    @connectorTagName="div"
                    @outletArgs={{hash model=this.model}}
                  />
                </span>
              </div>
  
              <div class="bio">
                {{#if this.model.suspended}}
                  <div class="suspended">
                    {{d-icon "ban"}}
                    <b>
                      {{#if this.model.suspendedForever}}
                        {{i18n "user.suspended_permanently"}}
                      {{else}}
                        {{i18n
                          "user.suspended_notice"
                          date=this.model.suspendedTillDate
                        }}
                      {{/if}}
                    </b>
                    <br />
                    {{#if this.model.suspend_reason}}
                      <b>{{i18n "user.suspended_reason"}}</b>
                      {{this.model.suspend_reason}}
                    {{/if}}
                  </div>
                {{/if}}
                {{#if this.isNotSuspendedOrIsStaff}}
                  <HtmlWithLinks>
                    {{html-safe this.model.bio_cooked}}
                  </HtmlWithLinks>
                {{/if}}
              </div>
  
              {{#if this.publicUserFields}}
                <div class="public-user-fields">
                  {{#each this.publicUserFields as |uf|}}
                    {{#if uf.value}}
                      <div class="public-user-field {{uf.field.dasherized_name}}">
                        <span class="user-field-name">{{uf.field.name}}</span>:
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
  
                  <span>
                    <PluginOutlet
                      @name="user-profile-public-fields"
                      @connectorTagName="div"
                      @outletArgs={{hash
                        publicUserFields=this.publicUserFields
                        model=this.model
                      }}
                    />
                  </span>
                </div>
              {{/if}}
  
              <span>
                <PluginOutlet
                  @name="user-profile-primary"
                  @connectorTagName="div"
                  @outletArgs={{hash model=this.model}}
                />
              </span>
            </div>
  
            <section class="controls">
              <ul>
                {{#if this.model.can_send_private_message_to_user}}
                  <li>
                    <DButton
                      @class="btn-primary compose-pm"
                      @action={{route-action "composePrivateMessage" this.model}}
                      @icon="envelope"
                      @label="user.private_message"
                    />
                  </li>
                {{/if}}
  
                {{#if this.canMuteOrIgnoreUser}}
                  <li>
                    <UserNotificationsDropdown
                      @user={{this.model}}
                      @value={{this.userNotificationLevel}}
                      @updateNotificationLevel={{action
                        "updateNotificationLevel"
                      }}
                    />
                  </li>
                {{/if}}
  
                {{#if this.displayTopLevelAdminButton}}
                  <li><a
                      href={{this.model.adminPath}}
                      class="btn btn-default"
                    >{{d-icon "wrench"}}<span class="d-button-label">{{i18n
                          "admin.user.show_admin_profile"
                        }}</span></a></li>
                {{/if}}
  
                <PluginOutlet
                  @name="user-profile-controls"
                  @connectorTagName="li"
                  @outletArgs={{hash model=this.model}}
                />
  
                {{#if this.canExpandProfile}}
                  <li>
                    <DButton
                      @ariaExpanded={{this.collapsedInfoState.isExpanded}}
                      @ariaLabel={{this.collapsedInfoState.ariaLabel}}
                      @ariaControls="collapsed-info-panel"
                      @class="btn-default"
                      @label={{concat "user." this.collapsedInfoState.label}}
                      @icon={{this.collapsedInfoState.icon}}
                      @action={{action this.collapsedInfoState.action}}
                    />
                  </li>
                {{/if}}
              </ul>
            </section>
          </div>
          <PluginOutlet
            @name="user-profile-above-collapsed-info"
            @outletArgs={{hash model=this.model collapsedInfo=this.collapsedInfo}}
          />
          {{#unless this.collapsedInfo}}
            <div class="secondary" id="collapsed-info-panel">
              <dl>
                {{#if this.model.created_at}}
                  <div><dt class="created-at">{{i18n "user.created"}}</dt><dd
                      class="created-at"
                    >{{bound-date this.model.created_at}}</dd></div>
                {{/if}}
                {{#if this.model.last_posted_at}}
                  <div><dt class="last-posted-at">{{i18n
                        "user.last_posted"
                      }}</dt><dd class="last-posted-at">{{bound-date
                        this.model.last_posted_at
                      }}</dd></div>
                {{/if}}
                {{#if this.model.last_seen_at}}
                  <div><dt class="last-seen-at">{{i18n "user.last_seen"}}</dt><dd
                      class="last-seen-at"
                    >{{bound-date this.model.last_seen_at}}</dd></div>
                {{/if}}
                {{#if this.model.profile_view_count}}
                  <div><dt class="profile-view-count">{{i18n "views"}}</dt><dd
                      class="profile-view-count"
                    >{{this.model.profile_view_count}}</dd></div>
                {{/if}}
                {{#if this.model.invited_by}}
                  <div><dt class="invited-by">{{i18n "user.invited_by"}}</dt><dd
                      class="invited-by"
                    ><LinkTo
                        @route="user"
                        @model={{this.model.invited_by}}
                      >{{this.model.invited_by.username}}</LinkTo></dd></div>
                {{/if}}
                {{#if this.model.trust_level}}
                  <div><dt class="trust-level">{{i18n "user.trust_level"}}</dt><dd
                      class="trust-level"
                    >{{this.model.trustLevel.name}}</dd></div>
                {{/if}}
                {{#if this.canCheckEmails}}
                  <div><dt class="email">{{i18n "user.email.title"}}</dt>
                    <dd class="email" title={{this.model.email}}>
                      {{#if this.model.email}}
                        {{this.model.email}}
                      {{else}}
                        <DButton
                          @action={{route-action "checkEmail"}}
                          @actionParam={{this.model}}
                          @icon="envelope"
                          @label="admin.users.check_email.text"
                          @class="btn-primary"
                        />
                      {{/if}}
                    </dd>
                  </div>
                {{/if}}
                {{#if this.model.displayGroups}}
                  <div><dt class="groups">{{i18n
                        "groups.title"
                        count=this.model.displayGroups.length
                      }}</dt>
                    <dd class="groups">
                      {{#each this.model.displayGroups as |group|}}
                        <span><LinkTo
                            @route="group"
                            @model={{group.name}}
                            class="group-link"
                          >{{group.name}}</LinkTo></span>
                      {{/each}}
  
                      <LinkTo
                        @route="groups"
                        @query={{hash username=this.model.username}}
                      >
                        ...
                      </LinkTo>
                    </dd>
                  </div>
                {{/if}}
  
                {{#if this.canDeleteUser}}
                  <div class="pull-right"><DButton
                      @action={{action "adminDelete"}}
                      @icon="exclamation-triangle"
                      @label="user.admin_delete"
                      @class="btn-danger btn-delete-user"
                    /></div>
                {{/if}}
              </dl>
              <PluginOutlet
                @name="user-profile-secondary"
                @connectorTagName="div"
                @outletArgs={{hash model=this.model}}
              />
            </div>
          {{/unless}}
        </div>
      </section>
  
      <div class="new-user-wrapper">
        <UserNav
          @user={{this.model}}
          @showNotificationsTab={{this.showNotificationsTab}}
          @showPrivateMessages={{this.showPrivateMessages}}
          @canInviteToForum={{this.canInviteToForum}}
          @showBadges={{this.showBadges}}
          @currentParentRoute={{this.currentParentRoute}}
          @showRead={{this.showRead}}
          @showDrafts={{this.showDrafts}}
          @showBookmarks={{this.showBookmarks}}
        />
  
        <div class="new-user-content-wrapper">
          {{outlet}}
        </div>
      </div>
    </DSection>
  </div>
  */
  {
    "id": "q4GU1dB3",
    "block": "[[[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"above-user-profile\",\"div\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[10,0],[15,0,[29,[\"container\\n    \",[52,[30,0,[\"viewingSelf\"]],\"viewing-self\"],\"\\n    \",[52,[30,0,[\"model\",\"profile_hidden\"]],\"profile-hidden\"],\"\\n    \",[30,0,[\"primaryGroup\"]]]]],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@class\"],[\"user-main\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,3],[14,6,\"#user-content\"],[14,1,\"skip-link\"],[14,0,\"skip-link__user-nav\"],[12],[1,\"\\n      \"],[1,[28,[35,4],[\"skip_user_nav\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"section\"],[15,0,[29,[[52,[30,0,[\"collapsedInfo\"]],\"collapsed-info\"],\"\\n        about\\n        \",[52,[30,0,[\"hasProfileBackgroundUrl\"]],\"has-background\",\"no-background\"]]]],[12],[1,\"\\n\"],[41,[51,[30,0,[\"collapsedInfo\"]]],[[[41,[30,0,[\"showStaffCounters\"]],[[[1,\"          \"],[10,0],[14,0,\"staff-counters\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"number_of_flags_given\"]],[[[1,\"              \"],[10,0],[12],[1,\"\\n                \"],[1,[28,[35,6],[[28,[37,4],[\"user.staff_counters.flags_given\"],[[\"className\",\"count\"],[\"helpful-flags\",[30,0,[\"model\",\"number_of_flags_given\"]]]]]],null]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"number_of_flagged_posts\"]],[[[1,\"              \"],[10,0],[12],[1,\"\\n                \"],[8,[39,7],null,[[\"@route\",\"@query\"],[\"review\",[28,[37,1],null,[[\"username\",\"status\",\"type\"],[[30,0,[\"model\",\"username\"]],\"all\",\"ReviewableFlaggedPost\"]]]]],[[\"default\"],[[[[1,\"\\n                  \"],[1,[28,[35,6],[[28,[37,4],[\"user.staff_counters.flagged_posts\"],[[\"className\",\"count\"],[\"flagged-posts\",[30,0,[\"model\",\"number_of_flagged_posts\"]]]]]],null]],[1,\"\\n                \"]],[]]]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"number_of_rejected_posts\"]],[[[1,\"              \"],[10,0],[12],[1,\"\\n                \"],[8,[39,7],null,[[\"@route\",\"@query\"],[\"review\",[28,[37,1],null,[[\"username\",\"status\",\"type\"],[[30,0,[\"model\",\"username\"]],\"rejected\",\"ReviewableQueuedPost\"]]]]],[[\"default\"],[[[[1,\"\\n                  \"],[1,[28,[35,6],[[28,[37,4],[\"user.staff_counters.rejected_posts\"],[[\"className\",\"count\"],[\"flagged-posts\",[30,0,[\"model\",\"number_of_rejected_posts\"]]]]]],null]],[1,\"\\n                \"]],[]]]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"number_of_deleted_posts\"]],[[[1,\"              \"],[10,0],[12],[1,\"\\n                \"],[8,[39,7],null,[[\"@route\",\"@model\"],[\"user.deletedPosts\",[30,0,[\"model\"]]]],[[\"default\"],[[[[1,\"\\n                  \"],[1,[28,[35,6],[[28,[37,4],[\"user.staff_counters.deleted_posts\"],[[\"className\",\"count\"],[\"deleted-posts\",[30,0,[\"model\",\"number_of_deleted_posts\"]]]]]],null]],[1,\"\\n                \"]],[]]]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"number_of_suspensions\"]],[[[1,\"              \"],[10,0],[12],[1,\"\\n                \"],[11,3],[24,6,\"\"],[4,[38,8],[\"click\",[30,0,[\"showSuspensions\"]]],null],[12],[1,\"\\n                  \"],[1,[28,[35,6],[[28,[37,4],[\"user.staff_counters.suspensions\"],[[\"className\",\"count\"],[\"suspensions\",[30,0,[\"model\",\"number_of_suspensions\"]]]]]],null]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"warnings_received_count\"]],[[[1,\"              \"],[10,0],[12],[1,\"\\n                \"],[8,[39,7],null,[[\"@route\",\"@model\"],[\"userPrivateMessages.user.warnings\",[30,0,[\"model\"]]]],[[\"default\"],[[[[1,\"\\n                  \"],[1,[28,[35,6],[[28,[37,4],[\"user.staff_counters.warnings_received\"],[[\"className\",\"count\"],[\"warnings-received\",[30,0,[\"model\",\"warnings_received_count\"]]]]]],null]],[1,\"\\n                \"]],[]]]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[10,0],[14,0,\"user-profile-image\"],[15,5,[30,0,[\"model\",\"profileBackgroundUrl\"]]],[12],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[10,0],[14,0,\"details\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"primary\"],[12],[1,\"\\n          \"],[8,[39,0],null,[[\"@name\",\"@outletArgs\"],[\"before-user-profile-avatar\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n          \"],[8,[39,9],null,[[\"@user\",\"@tagName\"],[[30,0,[\"model\"]],\"\"]],null],[1,\"\\n          \"],[10,0],[14,0,\"primary-textual\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"user-profile-names\"],[12],[1,\"\\n              \"],[10,0],[15,0,[29,[[52,[30,0,[\"nameFirst\"]],\"full-name\",\"username\"],\"\\n                  user-profile-names__primary\"]]],[12],[1,\"\\n                \"],[1,[52,[30,0,[\"nameFirst\"]],[30,0,[\"model\",\"name\"]],[28,[37,10],[[30,0,[\"model\",\"username\"]]],null]]],[1,\"\\n                \"],[1,[28,[35,11],[[30,0,[\"model\"]]],[[\"currentUser\"],[[30,0,[\"currentUser\"]]]]]],[1,\"\\n\"],[41,[30,0,[\"model\",\"status\"]],[[[1,\"                  \"],[8,[39,12],null,[[\"@status\"],[[30,0,[\"model\",\"status\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"              \"],[13],[1,\"\\n              \"],[10,0],[15,0,[29,[[52,[30,0,[\"nameFirst\"]],\"username\",\"full-name\"],\"\\n                  user-profile-names__secondary\"]]],[12],[41,[30,0,[\"nameFirst\"]],[[[1,[30,0,[\"model\",\"username\"]]]],[]],[[[1,[30,0,[\"model\",\"name\"]]]],[]]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"staged\"]],[[[1,\"                \"],[10,0],[14,0,\"staged user-profile-names__secondary\"],[12],[1,[28,[35,4],[\"user.staged\"],null]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"title\"]],[[[1,\"                \"],[10,0],[14,0,\"user-profile-names__title\"],[12],[1,[30,0,[\"model\",\"title\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[10,1],[12],[1,\"\\n                \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-post-names\",\"div\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showFeaturedTopic\"]],[[[1,\"              \"],[10,0],[14,0,\"featured-topic user-profile__featured-topic\"],[12],[1,\"\\n                \"],[10,1],[15,\"title\",[28,[37,4],[\"user.featured_topic\"],null]],[12],[1,\"\\n                  \"],[1,[28,[35,13],[\"book\"],null]],[13],[8,[39,7],null,[[\"@route\",\"@models\"],[\"topic\",[28,[37,14],[[30,0,[\"model\",\"featured_topic\",\"slug\"]],[30,0,[\"model\",\"featured_topic\",\"id\"]]],null]]],[[\"default\"],[[[[1,[28,[35,6],[[28,[37,15],[[30,0,[\"model\",\"featured_topic\",\"fancy_title\"]]],null]],null]]],[]]]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n            \"],[10,0],[14,0,\"location-and-website user-profile__location-and-website\"],[12],[1,\"\\n              \"],[41,[30,0,[\"model\",\"location\"]],[[[10,0],[14,0,\"user-profile-location\"],[12],[1,[28,[35,13],[\"map-marker-alt\"],null]],[1,[30,0,[\"model\",\"location\"]]],[13]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"website_name\"]],[[[1,\"                \"],[10,0],[14,0,\"user-profile-website\"],[12],[1,\"\\n\"],[1,\"                  \"],[1,[28,[35,13],[\"globe\"],null]],[41,[30,0,[\"linkWebsite\"]],[[[10,3],[15,6,[30,0,[\"model\",\"website\"]]],[15,\"rel\",[29,[\"noopener \",[52,[51,[30,0,[\"removeNoFollow\"]]],\"nofollow ugc\"]]]],[14,\"target\",\"_blank\"],[12],[1,[30,0,[\"model\",\"website_name\"]]],[13],[1,\"\\n\"]],[]],[[[1,\"                    \"],[10,1],[15,\"title\",[30,0,[\"model\",\"website\"]]],[12],[1,[30,0,[\"model\",\"website_name\"]]],[13],[1,\"\\n\"]],[]]],[1,\"                \"],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[10,1],[12],[1,\"\\n                \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-location-and-website\",\"div\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n            \"],[10,0],[14,0,\"bio\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"suspended\"]],[[[1,\"                \"],[10,0],[14,0,\"suspended\"],[12],[1,\"\\n                  \"],[1,[28,[35,13],[\"ban\"],null]],[1,\"\\n                  \"],[10,\"b\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"suspendedForever\"]],[[[1,\"                      \"],[1,[28,[35,4],[\"user.suspended_permanently\"],null]],[1,\"\\n\"]],[]],[[[1,\"                      \"],[1,[28,[35,4],[\"user.suspended_notice\"],[[\"date\"],[[30,0,[\"model\",\"suspendedTillDate\"]]]]]],[1,\"\\n\"]],[]]],[1,\"                  \"],[13],[1,\"\\n                  \"],[10,\"br\"],[12],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"suspend_reason\"]],[[[1,\"                    \"],[10,\"b\"],[12],[1,[28,[35,4],[\"user.suspended_reason\"],null]],[13],[1,\"\\n                    \"],[1,[30,0,[\"model\",\"suspend_reason\"]]],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"isNotSuspendedOrIsStaff\"]],[[[1,\"                \"],[8,[39,16],null,null,[[\"default\"],[[[[1,\"\\n                  \"],[1,[28,[35,6],[[30,0,[\"model\",\"bio_cooked\"]]],null]],[1,\"\\n                \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"publicUserFields\"]],[[[1,\"              \"],[10,0],[14,0,\"public-user-fields\"],[12],[1,\"\\n\"],[42,[28,[37,18],[[28,[37,18],[[30,0,[\"publicUserFields\"]]],null]],null],null,[[[41,[30,1,[\"value\"]],[[[1,\"                    \"],[10,0],[15,0,[29,[\"public-user-field \",[30,1,[\"field\",\"dasherized_name\"]]]]],[12],[1,\"\\n                      \"],[10,1],[14,0,\"user-field-name\"],[12],[1,[30,1,[\"field\",\"name\"]]],[13],[1,\":\\n                      \"],[10,1],[14,0,\"user-field-value\"],[12],[1,\"\\n\"],[42,[28,[37,18],[[28,[37,18],[[30,1,[\"value\"]]],null]],null],null,[[[1,\"                          \"],[10,1],[14,0,\"user-field-value-list-item\"],[12],[1,[30,2]],[13],[1,\"\\n\"]],[2]],[[[1,\"                          \"],[1,[30,1,[\"value\"]]],[1,\"\\n\"]],[]]],[1,\"                      \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],null]],[1]],null],[1,\"\\n                \"],[10,1],[12],[1,\"\\n                  \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-profile-public-fields\",\"div\",[28,[37,1],null,[[\"publicUserFields\",\"model\"],[[30,0,[\"publicUserFields\"]],[30,0,[\"model\"]]]]]]],null],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n            \"],[10,1],[12],[1,\"\\n              \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-profile-primary\",\"div\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,\"section\"],[14,0,\"controls\"],[12],[1,\"\\n            \"],[10,\"ul\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_send_private_message_to_user\"]],[[[1,\"                \"],[10,\"li\"],[12],[1,\"\\n                  \"],[8,[39,19],null,[[\"@class\",\"@action\",\"@icon\",\"@label\"],[\"btn-primary compose-pm\",[28,[37,20],[\"composePrivateMessage\",[30,0,[\"model\"]]],null],\"envelope\",\"user.private_message\"]],null],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canMuteOrIgnoreUser\"]],[[[1,\"                \"],[10,\"li\"],[12],[1,\"\\n                  \"],[8,[39,21],null,[[\"@user\",\"@value\",\"@updateNotificationLevel\"],[[30,0,[\"model\"]],[30,0,[\"userNotificationLevel\"]],[28,[37,22],[[30,0],\"updateNotificationLevel\"],null]]],null],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"displayTopLevelAdminButton\"]],[[[1,\"                \"],[10,\"li\"],[12],[10,3],[15,6,[30,0,[\"model\",\"adminPath\"]]],[14,0,\"btn btn-default\"],[12],[1,[28,[35,13],[\"wrench\"],null]],[10,1],[14,0,\"d-button-label\"],[12],[1,[28,[35,4],[\"admin.user.show_admin_profile\"],null]],[13],[13],[13],[1,\"\\n\"]],[]],null],[1,\"\\n              \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-profile-controls\",\"li\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canExpandProfile\"]],[[[1,\"                \"],[10,\"li\"],[12],[1,\"\\n                  \"],[8,[39,19],null,[[\"@ariaExpanded\",\"@ariaLabel\",\"@ariaControls\",\"@class\",\"@label\",\"@icon\",\"@action\"],[[30,0,[\"collapsedInfoState\",\"isExpanded\"]],[30,0,[\"collapsedInfoState\",\"ariaLabel\"]],\"collapsed-info-panel\",\"btn-default\",[28,[37,23],[\"user.\",[30,0,[\"collapsedInfoState\",\"label\"]]],null],[30,0,[\"collapsedInfoState\",\"icon\"]],[28,[37,22],[[30,0],[30,0,[\"collapsedInfoState\",\"action\"]]],null]]],null],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[8,[39,0],null,[[\"@name\",\"@outletArgs\"],[\"user-profile-above-collapsed-info\",[28,[37,1],null,[[\"model\",\"collapsedInfo\"],[[30,0,[\"model\"]],[30,0,[\"collapsedInfo\"]]]]]]],null],[1,\"\\n\"],[41,[51,[30,0,[\"collapsedInfo\"]]],[[[1,\"          \"],[10,0],[14,0,\"secondary\"],[14,1,\"collapsed-info-panel\"],[12],[1,\"\\n            \"],[10,\"dl\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"created_at\"]],[[[1,\"                \"],[10,0],[12],[10,\"dt\"],[14,0,\"created-at\"],[12],[1,[28,[35,4],[\"user.created\"],null]],[13],[10,\"dd\"],[14,0,\"created-at\"],[12],[1,[28,[35,24],[[30,0,[\"model\",\"created_at\"]]],null]],[13],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"last_posted_at\"]],[[[1,\"                \"],[10,0],[12],[10,\"dt\"],[14,0,\"last-posted-at\"],[12],[1,[28,[35,4],[\"user.last_posted\"],null]],[13],[10,\"dd\"],[14,0,\"last-posted-at\"],[12],[1,[28,[35,24],[[30,0,[\"model\",\"last_posted_at\"]]],null]],[13],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"last_seen_at\"]],[[[1,\"                \"],[10,0],[12],[10,\"dt\"],[14,0,\"last-seen-at\"],[12],[1,[28,[35,4],[\"user.last_seen\"],null]],[13],[10,\"dd\"],[14,0,\"last-seen-at\"],[12],[1,[28,[35,24],[[30,0,[\"model\",\"last_seen_at\"]]],null]],[13],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"profile_view_count\"]],[[[1,\"                \"],[10,0],[12],[10,\"dt\"],[14,0,\"profile-view-count\"],[12],[1,[28,[35,4],[\"views\"],null]],[13],[10,\"dd\"],[14,0,\"profile-view-count\"],[12],[1,[30,0,[\"model\",\"profile_view_count\"]]],[13],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"invited_by\"]],[[[1,\"                \"],[10,0],[12],[10,\"dt\"],[14,0,\"invited-by\"],[12],[1,[28,[35,4],[\"user.invited_by\"],null]],[13],[10,\"dd\"],[14,0,\"invited-by\"],[12],[8,[39,7],null,[[\"@route\",\"@model\"],[\"user\",[30,0,[\"model\",\"invited_by\"]]]],[[\"default\"],[[[[1,[30,0,[\"model\",\"invited_by\",\"username\"]]]],[]]]]],[13],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"trust_level\"]],[[[1,\"                \"],[10,0],[12],[10,\"dt\"],[14,0,\"trust-level\"],[12],[1,[28,[35,4],[\"user.trust_level\"],null]],[13],[10,\"dd\"],[14,0,\"trust-level\"],[12],[1,[30,0,[\"model\",\"trustLevel\",\"name\"]]],[13],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"canCheckEmails\"]],[[[1,\"                \"],[10,0],[12],[10,\"dt\"],[14,0,\"email\"],[12],[1,[28,[35,4],[\"user.email.title\"],null]],[13],[1,\"\\n                  \"],[10,\"dd\"],[14,0,\"email\"],[15,\"title\",[30,0,[\"model\",\"email\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"email\"]],[[[1,\"                      \"],[1,[30,0,[\"model\",\"email\"]]],[1,\"\\n\"]],[]],[[[1,\"                      \"],[8,[39,19],null,[[\"@action\",\"@actionParam\",\"@icon\",\"@label\",\"@class\"],[[28,[37,20],[\"checkEmail\"],null],[30,0,[\"model\"]],\"envelope\",\"admin.users.check_email.text\",\"btn-primary\"]],null],[1,\"\\n\"]],[]]],[1,\"                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"displayGroups\"]],[[[1,\"                \"],[10,0],[12],[10,\"dt\"],[14,0,\"groups\"],[12],[1,[28,[35,4],[\"groups.title\"],[[\"count\"],[[30,0,[\"model\",\"displayGroups\",\"length\"]]]]]],[13],[1,\"\\n                  \"],[10,\"dd\"],[14,0,\"groups\"],[12],[1,\"\\n\"],[42,[28,[37,18],[[28,[37,18],[[30,0,[\"model\",\"displayGroups\"]]],null]],null],null,[[[1,\"                      \"],[10,1],[12],[8,[39,7],[[24,0,\"group-link\"]],[[\"@route\",\"@model\"],[\"group\",[30,3,[\"name\"]]]],[[\"default\"],[[[[1,[30,3,[\"name\"]]]],[]]]]],[13],[1,\"\\n\"]],[3]],null],[1,\"\\n                    \"],[8,[39,7],null,[[\"@route\",\"@query\"],[\"groups\",[28,[37,1],null,[[\"username\"],[[30,0,[\"model\",\"username\"]]]]]]],[[\"default\"],[[[[1,\"\\n                      ...\\n                    \"]],[]]]]],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canDeleteUser\"]],[[[1,\"                \"],[10,0],[14,0,\"pull-right\"],[12],[8,[39,19],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[28,[37,22],[[30,0],\"adminDelete\"],null],\"exclamation-triangle\",\"user.admin_delete\",\"btn-danger btn-delete-user\"]],null],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n            \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-profile-secondary\",\"div\",[28,[37,1],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"new-user-wrapper\"],[12],[1,\"\\n      \"],[8,[39,25],null,[[\"@user\",\"@showNotificationsTab\",\"@showPrivateMessages\",\"@canInviteToForum\",\"@showBadges\",\"@currentParentRoute\",\"@showRead\",\"@showDrafts\",\"@showBookmarks\"],[[30,0,[\"model\"]],[30,0,[\"showNotificationsTab\"]],[30,0,[\"showPrivateMessages\"]],[30,0,[\"canInviteToForum\"]],[30,0,[\"showBadges\"]],[30,0,[\"currentParentRoute\"]],[30,0,[\"showRead\"]],[30,0,[\"showDrafts\"]],[30,0,[\"showBookmarks\"]]]],null],[1,\"\\n\\n      \"],[10,0],[14,0,\"new-user-content-wrapper\"],[12],[1,\"\\n        \"],[46,[28,[37,27],null,null],null,null,null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"],[13]],[\"uf\",\"v\",\"group\"],false,[\"plugin-outlet\",\"hash\",\"if\",\"d-section\",\"i18n\",\"unless\",\"html-safe\",\"link-to\",\"on\",\"user-profile-avatar\",\"format-username\",\"user-status\",\"user-status-message\",\"d-icon\",\"array\",\"replace-emoji\",\"html-with-links\",\"each\",\"-track-array\",\"d-button\",\"route-action\",\"user-notifications-dropdown\",\"action\",\"concat\",\"bound-date\",\"user-nav\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/user.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});