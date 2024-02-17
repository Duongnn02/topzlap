define("discourse/templates/user/summary", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-summary" @tagName="">
    <div class="user-content" id="user-content">
      <PluginOutlet
        @name="above-user-summary-stats"
        @outletArgs={{hash model=this.model user=this.user}}
      />
      {{#if this.model.can_see_summary_stats}}
        <div class="top-section stats-section">
          <h3 class="stats-title">{{i18n "user.summary.stats"}}</h3>
          <ul>
            <li class="stats-days-visited">
              <UserStat
                @value={{this.model.days_visited}}
                @label="user.summary.days_visited"
              />
            </li>
            <li class="stats-time-read">
              <UserStat
                @value={{this.timeRead}}
                @label="user.summary.time_read"
                @rawTitle={{i18n
                  "user.summary.time_read_title"
                  duration=this.timeReadMedium
                }}
                @type="string"
              />
            </li>
            {{#if this.showRecentTimeRead}}
              <li class="stats-recent-read">
                <UserStat
                  @value={{this.recentTimeRead}}
                  @label="user.summary.recent_time_read"
                  @rawTitle={{i18n
                    "user.summary.recent_time_read_title"
                    duration=this.recentTimeReadMedium
                  }}
                  @type="string"
                />
              </li>
            {{/if}}
            <li class="stats-topics-entered">
              <UserStat
                @value={{this.model.topics_entered}}
                @label="user.summary.topics_entered"
              />
            </li>
            <li class="stats-posts-read">
              <UserStat
                @value={{this.model.posts_read_count}}
                @label="user.summary.posts_read"
              />
            </li>
            <li class="stats-likes-given linked-stat">
              <LinkTo @route="userActivity.likesGiven">
                <UserStat
                  @value={{this.model.likes_given}}
                  @icon="heart"
                  @label="user.summary.likes_given"
                />
              </LinkTo>
            </li>
            <li class="stats-likes-received">
              <UserStat
                @value={{this.model.likes_received}}
                @icon="heart"
                @label="user.summary.likes_received"
              />
            </li>
            {{#if this.model.bookmark_count}}
              <li class="stats-bookmark-count linked-stat">
                <LinkTo @route="userActivity.bookmarks">
                  <UserStat
                    @value={{this.model.bookmark_count}}
                    @label="user.summary.bookmark_count"
                  />
                </LinkTo>
              </li>
            {{/if}}
            <li class="stats-topic-count linked-stat">
              <LinkTo @route="userActivity.topics">
                <UserStat
                  @value={{this.model.topic_count}}
                  @label="user.summary.topic_count"
                />
              </LinkTo>
            </li>
            <li class="stats-post-count linked-stat">
              <LinkTo @route="userActivity.replies">
                <UserStat
                  @value={{this.model.post_count}}
                  @label="user.summary.post_count"
                />
              </LinkTo>
            </li>
            <PluginOutlet
              @name="user-summary-stat"
              @connectorTagName="li"
              @outletArgs={{hash model=this.model user=this.user}}
            />
          </ul>
        </div>
      {{/if}}
  
      <PluginOutlet
        @name="below-user-summary-stats"
        @outletArgs={{hash model=this.model user=this.user}}
      />
  
      <div class="top-section">
        <UserSummarySection
          @title="top_replies"
          @class="replies-section pull-left"
        >
          <UserSummaryTopicsList
            @type="replies"
            @items={{this.model.replies}}
            @user={{this.user}}
            as |reply|
          >
            <UserSummaryTopic
              @createdAt={{reply.createdAt}}
              @topic={{reply.topic}}
              @likes={{reply.like_count}}
              @url={{reply.url}}
            />
          </UserSummaryTopicsList>
        </UserSummarySection>
  
        <UserSummarySection
          @title="top_topics"
          @class="topics-section pull-right"
        >
          <UserSummaryTopicsList
            @type="topics"
            @items={{this.model.topics}}
            @user={{this.user}}
            as |topic|
          >
            <UserSummaryTopic
              @createdAt={{topic.created_at}}
              @topic={{topic}}
              @likes={{topic.like_count}}
              @url={{topic.url}}
            />
          </UserSummaryTopicsList>
        </UserSummarySection>
      </div>
  
      <div class="top-section">
        <UserSummarySection @title="top_links" @class="links-section pull-left">
          {{#if this.model.links.length}}
            <ul>
              {{! template-lint-disable }}
              {{#each this.model.links as |link|}}
                <li>
                  <a
                    class="domain"
                    href={{link.url}}
                    title={{link.title}}
                    rel="noopener {{unless
                      this.user.removeNoFollow
                      'nofollow ugc'
                    }}"
                    target="_blank"
                  >
                    {{shorten-url link.url}}
                  </a>
                  <span
                    class="badge badge-notification clicks"
                    title="{{i18n 'topic_map.clicks' count=link.clicks}}"
                  >{{number link.clicks}}</span>
                  <br />
                  <a href="{{link.post_url}}">{{html-safe
                      link.topic.fancyTitle
                    }}</a>
                </li>
              {{/each}}
            </ul>
          {{else}}
            <p>{{i18n "user.summary.no_links"}}</p>
          {{/if}}
        </UserSummarySection>
  
        <UserSummarySection
          @title="most_replied_to_users"
          @class="summary-user-list replied-section pull-right"
        >
          <UserSummaryUsersList
            @none="no_replies"
            @users={{this.model.most_replied_to_users}}
            as |user|
          >
            <UserSummaryUser @user={{user}} @icon="reply" @countClass="replies" />
          </UserSummaryUsersList>
        </UserSummarySection>
      </div>
  
      <div class="top-section most-liked-section">
        <UserSummarySection
          @title="most_liked_by"
          @class="summary-user-list liked-by-section pull-left"
        >
          <UserSummaryUsersList
            @none="no_likes"
            @users={{this.model.most_liked_by_users}}
            as |user|
          >
            <UserSummaryUser @user={{user}} @icon="heart" @countClass="likes" />
          </UserSummaryUsersList>
        </UserSummarySection>
  
        <UserSummarySection
          @title="most_liked_users"
          @class="summary-user-list liked-section pull-right"
        >
          <UserSummaryUsersList
            @none="no_likes"
            @users={{this.model.most_liked_users}}
            as |user|
          >
            <UserSummaryUser @user={{user}} @icon="heart" @countClass="likes" />
          </UserSummaryUsersList>
        </UserSummarySection>
      </div>
  
      {{#if this.model.top_categories.length}}
        <div class="top-section top-categories-section">
          <UserSummarySection
            @title="top_categories"
            @class="summary-category-list pull-left"
          >
            <table>
              <thead>
                <th class="category-link"></th>
                <th class="topic-count">{{i18n "user.summary.topics"}}</th>
                <th class="reply-count">{{i18n "user.summary.replies"}}</th>
              </thead>
              <tbody>
                {{#each this.model.top_categories as |category|}}
                  <tr>
                    <td class="category-link">
                      {{category-link
                        category
                        allowUncategorized="true"
                        hideParent=false
                      }}
                    </td>
                    <td class="topic-count">
                      <UserSummaryCategorySearch
                        @user={{this.user}}
                        @category={{category}}
                        @count={{category.topic_count}}
                      />
                    </td>
                    <td class="reply-count">
                      <UserSummaryCategorySearch
                        @user={{this.user}}
                        @category={{category}}
                        @count={{category.post_count}}
                      />
                    </td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          </UserSummarySection>
        </div>
      {{/if}}
  
      {{#if this.siteSettings.enable_badges}}
        <div class="top-section badges-section">
          <h3 class="stats-title">{{i18n "user.summary.top_badges"}}</h3>
  
          {{#if this.model.badges}}
            <div class="badge-group-list">
              {{#each this.model.badges as |badge|}}
                <BadgeCard
                  @badge={{badge}}
                  @count={{badge.count}}
                  @username={{this.user.username_lower}}
                />
              {{/each}}
              <PluginOutlet
                @name="after-user-summary-badges"
                @outletArgs={{hash model=this.model user=this.user}}
              />
            </div>
          {{else}}
            <p>{{i18n "user.summary.no_badges"}}</p>
          {{/if}}
  
          {{#if this.moreBadges}}
            <LinkTo @route="user.badges" @model={{this.user}} class="more">
              {{i18n "user.summary.more_badges"}}
            </LinkTo>
          {{/if}}
        </div>
      {{/if}}
    </div>
  </DSection>
  */
  {
    "id": "KkZxTRda",
    "block": "[[[8,[39,0],null,[[\"@pageClass\",\"@tagName\"],[\"user-summary\",\"\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@name\",\"@outletArgs\"],[\"above-user-summary-stats\",[28,[37,2],null,[[\"model\",\"user\"],[[30,0,[\"model\"]],[30,0,[\"user\"]]]]]]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_see_summary_stats\"]],[[[1,\"      \"],[10,0],[14,0,\"top-section stats-section\"],[12],[1,\"\\n        \"],[10,\"h3\"],[14,0,\"stats-title\"],[12],[1,[28,[35,4],[\"user.summary.stats\"],null]],[13],[1,\"\\n        \"],[10,\"ul\"],[12],[1,\"\\n          \"],[10,\"li\"],[14,0,\"stats-days-visited\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@value\",\"@label\"],[[30,0,[\"model\",\"days_visited\"]],\"user.summary.days_visited\"]],null],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"stats-time-read\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@value\",\"@label\",\"@rawTitle\",\"@type\"],[[30,0,[\"timeRead\"]],\"user.summary.time_read\",[28,[37,4],[\"user.summary.time_read_title\"],[[\"duration\"],[[30,0,[\"timeReadMedium\"]]]]],\"string\"]],null],[1,\"\\n          \"],[13],[1,\"\\n\"],[41,[30,0,[\"showRecentTimeRead\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"stats-recent-read\"],[12],[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@label\",\"@rawTitle\",\"@type\"],[[30,0,[\"recentTimeRead\"]],\"user.summary.recent_time_read\",[28,[37,4],[\"user.summary.recent_time_read_title\"],[[\"duration\"],[[30,0,[\"recentTimeReadMedium\"]]]]],\"string\"]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[10,\"li\"],[14,0,\"stats-topics-entered\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@value\",\"@label\"],[[30,0,[\"model\",\"topics_entered\"]],\"user.summary.topics_entered\"]],null],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"stats-posts-read\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@value\",\"@label\"],[[30,0,[\"model\",\"posts_read_count\"]],\"user.summary.posts_read\"]],null],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"stats-likes-given linked-stat\"],[12],[1,\"\\n            \"],[8,[39,6],null,[[\"@route\"],[\"userActivity.likesGiven\"]],[[\"default\"],[[[[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@icon\",\"@label\"],[[30,0,[\"model\",\"likes_given\"]],\"heart\",\"user.summary.likes_given\"]],null],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"stats-likes-received\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@value\",\"@icon\",\"@label\"],[[30,0,[\"model\",\"likes_received\"]],\"heart\",\"user.summary.likes_received\"]],null],[1,\"\\n          \"],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"bookmark_count\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"stats-bookmark-count linked-stat\"],[12],[1,\"\\n              \"],[8,[39,6],null,[[\"@route\"],[\"userActivity.bookmarks\"]],[[\"default\"],[[[[1,\"\\n                \"],[8,[39,5],null,[[\"@value\",\"@label\"],[[30,0,[\"model\",\"bookmark_count\"]],\"user.summary.bookmark_count\"]],null],[1,\"\\n              \"]],[]]]]],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[10,\"li\"],[14,0,\"stats-topic-count linked-stat\"],[12],[1,\"\\n            \"],[8,[39,6],null,[[\"@route\"],[\"userActivity.topics\"]],[[\"default\"],[[[[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@label\"],[[30,0,[\"model\",\"topic_count\"]],\"user.summary.topic_count\"]],null],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"stats-post-count linked-stat\"],[12],[1,\"\\n            \"],[8,[39,6],null,[[\"@route\"],[\"userActivity.replies\"]],[[\"default\"],[[[[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@label\"],[[30,0,[\"model\",\"post_count\"]],\"user.summary.post_count\"]],null],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-summary-stat\",\"li\",[28,[37,2],null,[[\"model\",\"user\"],[[30,0,[\"model\"]],[30,0,[\"user\"]]]]]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,1],null,[[\"@name\",\"@outletArgs\"],[\"below-user-summary-stats\",[28,[37,2],null,[[\"model\",\"user\"],[[30,0,[\"model\"]],[30,0,[\"user\"]]]]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"top-section\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@title\",\"@class\"],[\"top_replies\",\"replies-section pull-left\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[39,8],null,[[\"@type\",\"@items\",\"@user\"],[\"replies\",[30,0,[\"model\",\"replies\"]],[30,0,[\"user\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[8,[39,9],null,[[\"@createdAt\",\"@topic\",\"@likes\",\"@url\"],[[30,1,[\"createdAt\"]],[30,1,[\"topic\"]],[30,1,[\"like_count\"]],[30,1,[\"url\"]]]],null],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n\\n      \"],[8,[39,7],null,[[\"@title\",\"@class\"],[\"top_topics\",\"topics-section pull-right\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[39,8],null,[[\"@type\",\"@items\",\"@user\"],[\"topics\",[30,0,[\"model\",\"topics\"]],[30,0,[\"user\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[8,[39,9],null,[[\"@createdAt\",\"@topic\",\"@likes\",\"@url\"],[[30,2,[\"created_at\"]],[30,2],[30,2,[\"like_count\"]],[30,2,[\"url\"]]]],null],[1,\"\\n        \"]],[2]]]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"top-section\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@title\",\"@class\"],[\"top_links\",\"links-section pull-left\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"model\",\"links\",\"length\"]],[[[1,\"          \"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,11],[[28,[37,11],[[30,0,[\"model\",\"links\"]]],null]],null],null,[[[1,\"              \"],[10,\"li\"],[12],[1,\"\\n                \"],[10,3],[14,0,\"domain\"],[15,6,[30,3,[\"url\"]]],[15,\"title\",[30,3,[\"title\"]]],[15,\"rel\",[29,[\"noopener \",[52,[51,[30,0,[\"user\",\"removeNoFollow\"]]],\"nofollow ugc\"]]]],[14,\"target\",\"_blank\"],[12],[1,\"\\n                  \"],[1,[28,[35,13],[[30,3,[\"url\"]]],null]],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,1],[14,0,\"badge badge-notification clicks\"],[15,\"title\",[29,[[28,[37,4],[\"topic_map.clicks\"],[[\"count\"],[[30,3,[\"clicks\"]]]]]]]],[12],[1,[28,[35,14],[[30,3,[\"clicks\"]]],null]],[13],[1,\"\\n                \"],[10,\"br\"],[12],[13],[1,\"\\n                \"],[10,3],[15,6,[29,[[30,3,[\"post_url\"]]]]],[12],[1,[28,[35,15],[[30,3,[\"topic\",\"fancyTitle\"]]],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[3]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,2],[12],[1,[28,[35,4],[\"user.summary.no_links\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"      \"]],[]]]]],[1,\"\\n\\n      \"],[8,[39,7],null,[[\"@title\",\"@class\"],[\"most_replied_to_users\",\"summary-user-list replied-section pull-right\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[39,16],null,[[\"@none\",\"@users\"],[\"no_replies\",[30,0,[\"model\",\"most_replied_to_users\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[8,[39,17],null,[[\"@user\",\"@icon\",\"@countClass\"],[[30,4],\"reply\",\"replies\"]],null],[1,\"\\n        \"]],[4]]]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"top-section most-liked-section\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@title\",\"@class\"],[\"most_liked_by\",\"summary-user-list liked-by-section pull-left\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[39,16],null,[[\"@none\",\"@users\"],[\"no_likes\",[30,0,[\"model\",\"most_liked_by_users\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[8,[39,17],null,[[\"@user\",\"@icon\",\"@countClass\"],[[30,5],\"heart\",\"likes\"]],null],[1,\"\\n        \"]],[5]]]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n\\n      \"],[8,[39,7],null,[[\"@title\",\"@class\"],[\"most_liked_users\",\"summary-user-list liked-section pull-right\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[39,16],null,[[\"@none\",\"@users\"],[\"no_likes\",[30,0,[\"model\",\"most_liked_users\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[8,[39,17],null,[[\"@user\",\"@icon\",\"@countClass\"],[[30,6],\"heart\",\"likes\"]],null],[1,\"\\n        \"]],[6]]]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"top_categories\",\"length\"]],[[[1,\"      \"],[10,0],[14,0,\"top-section top-categories-section\"],[12],[1,\"\\n        \"],[8,[39,7],null,[[\"@title\",\"@class\"],[\"top_categories\",\"summary-category-list pull-left\"]],[[\"default\"],[[[[1,\"\\n          \"],[10,\"table\"],[12],[1,\"\\n            \"],[10,\"thead\"],[12],[1,\"\\n              \"],[10,\"th\"],[14,0,\"category-link\"],[12],[13],[1,\"\\n              \"],[10,\"th\"],[14,0,\"topic-count\"],[12],[1,[28,[35,4],[\"user.summary.topics\"],null]],[13],[1,\"\\n              \"],[10,\"th\"],[14,0,\"reply-count\"],[12],[1,[28,[35,4],[\"user.summary.replies\"],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,11],[[28,[37,11],[[30,0,[\"model\",\"top_categories\"]]],null]],null],null,[[[1,\"                \"],[10,\"tr\"],[12],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"category-link\"],[12],[1,\"\\n                    \"],[1,[28,[35,18],[[30,7]],[[\"allowUncategorized\",\"hideParent\"],[\"true\",false]]]],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"topic-count\"],[12],[1,\"\\n                    \"],[8,[39,19],null,[[\"@user\",\"@category\",\"@count\"],[[30,0,[\"user\"]],[30,7],[30,7,[\"topic_count\"]]]],null],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"reply-count\"],[12],[1,\"\\n                    \"],[8,[39,19],null,[[\"@user\",\"@category\",\"@count\"],[[30,0,[\"user\"]],[30,7],[30,7,[\"post_count\"]]]],null],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[7]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"enable_badges\"]],[[[1,\"      \"],[10,0],[14,0,\"top-section badges-section\"],[12],[1,\"\\n        \"],[10,\"h3\"],[14,0,\"stats-title\"],[12],[1,[28,[35,4],[\"user.summary.top_badges\"],null]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"badges\"]],[[[1,\"          \"],[10,0],[14,0,\"badge-group-list\"],[12],[1,\"\\n\"],[42,[28,[37,11],[[28,[37,11],[[30,0,[\"model\",\"badges\"]]],null]],null],null,[[[1,\"              \"],[8,[39,20],null,[[\"@badge\",\"@count\",\"@username\"],[[30,8],[30,8,[\"count\"]],[30,0,[\"user\",\"username_lower\"]]]],null],[1,\"\\n\"]],[8]],null],[1,\"            \"],[8,[39,1],null,[[\"@name\",\"@outletArgs\"],[\"after-user-summary-badges\",[28,[37,2],null,[[\"model\",\"user\"],[[30,0,[\"model\"]],[30,0,[\"user\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,2],[12],[1,[28,[35,4],[\"user.summary.no_badges\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"\\n\"],[41,[30,0,[\"moreBadges\"]],[[[1,\"          \"],[8,[39,6],[[24,0,\"more\"]],[[\"@route\",\"@model\"],[\"user.badges\",[30,0,[\"user\"]]]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,4],[\"user.summary.more_badges\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]]],[\"reply\",\"topic\",\"link\",\"user\",\"user\",\"user\",\"category\",\"badge\"],false,[\"d-section\",\"plugin-outlet\",\"hash\",\"if\",\"i18n\",\"user-stat\",\"link-to\",\"user-summary-section\",\"user-summary-topics-list\",\"user-summary-topic\",\"each\",\"-track-array\",\"unless\",\"shorten-url\",\"number\",\"html-safe\",\"user-summary-users-list\",\"user-summary-user\",\"category-link\",\"user-summary-category-search\",\"badge-card\"]]",
    "moduleName": "discourse/templates/user/summary.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});