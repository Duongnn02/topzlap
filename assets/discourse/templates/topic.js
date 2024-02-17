define("discourse/templates/topic", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DiscourseTopic
    @multiSelect={{this.multiSelect}}
    @enteredAt={{this.enteredAt}}
    @topic={{this.model}}
    @hasScrolled={{this.hasScrolled}}
  >
    {{#if this.model}}
      <AddCategoryTagClasses
        @category={{this.model.category}}
        @tags={{this.model.tags}}
      />
      <AddTopicStatusClasses @topic={{this.model}} />
      <div class="container">
        <DiscourseBanner
          @user={{this.currentUser}}
          @banner={{this.site.banner}}
          @overlay={{this.hasScrolled}}
          @hide={{this.model.errorLoading}}
        />
      </div>
    {{/if}}
  
    {{#if this.showSharedDraftControls}}
      <SharedDraftControls @topic={{this.model}} />
    {{/if}}
  
    <span>
      <PluginOutlet
        @name="topic-above-post-stream"
        @connectorTagName="div"
        @outletArgs={{hash
          model=this.model
          editFirstPost=(action "editFirstPost")
        }}
      />
    </span>
  
    {{#if this.model.postStream.loaded}}
      {{#if this.model.postStream.firstPostPresent}}
        <TopicTitle
          @cancelled={{action "cancelEditingTopic"}}
          @save={{action "finishedEditingTopic"}}
          @model={{this.model}}
        >
          {{#if this.editingTopic}}
            <div class="edit-topic-title">
              <PrivateMessageGlyph
                @shouldShow={{this.model.isPrivateMessage}}
                @tagName=""
              />
  
              <TextField
                @id="edit-title"
                @value={{this.buffered.title}}
                @maxlength={{this.siteSettings.max_topic_title_length}}
                @autofocus="true"
              />
  
              {{#if this.showCategoryChooser}}
                <CategoryChooser
                  @class="small"
                  @value={{this.buffered.category_id}}
                  @onChange={{action "topicCategoryChanged"}}
                />
              {{/if}}
  
              {{#if this.canEditTags}}
                <MiniTagChooser
                  @value={{this.buffered.tags}}
                  @onChange={{action "topicTagsChanged"}}
                  @options={{hash
                    filterable=true
                    categoryId=this.buffered.category_id
                    minimum=this.minimumRequiredTags
                  }}
                />
              {{/if}}
  
              <span>
                <PluginOutlet
                  @name="edit-topic"
                  @connectorTagName="div"
                  @outletArgs={{hash model=this.model buffered=this.buffered}}
                />
              </span>
  
              <div class="edit-controls">
                <DButton
                  @action={{action "finishedEditingTopic"}}
                  @class="btn-primary submit-edit"
                  @icon="check"
                  @ariaLabel="composer.save_edit"
                />
                <DButton
                  @action={{action "cancelEditingTopic"}}
                  @class="btn-default cancel-edit"
                  @icon="times"
                  @ariaLabel="composer.cancel"
                />
  
                {{#if this.canRemoveTopicFeaturedLink}}
                  <a
                    href
                    {{on "click" this.removeFeaturedLink}}
                    class="remove-featured-link"
                    title={{i18n "composer.remove_featured_link"}}
                  >
                    {{d-icon "times-circle"}}
                    {{this.featuredLinkDomain}}
                  </a>
                {{/if}}
              </div>
            </div>
  
          {{else}}
            <h1 data-topic-id={{this.model.id}}>
              {{#unless this.model.is_warning}}
                {{#if this.canSendPms}}
                  <PrivateMessageGlyph
                    @shouldShow={{this.model.isPrivateMessage}}
                    @href={{this.pmPath}}
                    @title="topic_statuses.personal_message.title"
                    @ariaLabel="user.messages.inbox"
                    @tagName=""
                  />
                {{else}}
                  <PrivateMessageGlyph
                    @shouldShow={{this.model.isPrivateMessage}}
                    @tagName=""
                  />
                {{/if}}
              {{/unless}}
  
              {{#if this.model.details.loaded}}
                <TopicStatus @topic={{this.model}} />
                <a
                  href={{this.model.url}}
                  {{on "click" this.jumpTop}}
                  class="fancy-title"
                >
                  {{html-safe this.model.fancyTitle}}
                </a>
              {{/if}}
  
              {{#if this.model.details.can_edit}}
                <a
                  href
                  {{on "click" this.editTopic}}
                  class="edit-topic"
                  title={{i18n "edit"}}
                >{{d-icon "pencil-alt"}}</a>
              {{/if}}
  
              <PluginOutlet
                @name="topic-title-suffix"
                @outletArgs={{hash model=this.model}}
              />
            </h1>
  
            <TopicCategory @topic={{this.model}} @class="topic-category" />
          {{/if}}
        </TopicTitle>
  
        {{#if this.model.publishedPage}}
          <div class="published-page-notice">
            <div class="details">
              {{#if this.model.publishedPage.public}}
                <span class="is-public">{{i18n
                    "topic.publish_page.public"
                  }}</span>
              {{/if}}
              {{i18n "topic.publish_page.topic_published"}}
              <div>
                <a
                  href={{this.model.publishedPage.url}}
                  target="_blank"
                  rel="noopener noreferrer"
                >{{this.model.publishedPage.url}}</a>
              </div>
            </div>
            <div class="controls">
              <DButton
                @icon="file"
                @label="topic.publish_page.publishing_settings"
                @action={{route-action "showPagePublish"}}
              />
            </div>
          </div>
        {{/if}}
  
      {{/if}}
  
      <div class="container posts">
        <div class="selected-posts {{unless this.multiSelect 'hidden'}}">
          <SelectedPosts
            @selectedPostsCount={{this.selectedPostsCount}}
            @canSelectAll={{this.canSelectAll}}
            @canDeselectAll={{this.canDeselectAll}}
            @canDeleteSelected={{this.canDeleteSelected}}
            @canMergeTopic={{this.canMergeTopic}}
            @canChangeOwner={{this.canChangeOwner}}
            @canMergePosts={{this.canMergePosts}}
            @toggleMultiSelect={{action "toggleMultiSelect"}}
            @mergePosts={{action "mergePosts"}}
            @deleteSelected={{action "deleteSelected"}}
            @deselectAll={{action "deselectAll"}}
            @selectAll={{action "selectAll"}}
          />
        </div>
  
        <PluginOutlet @name="above-timeline" @connectorTagName="div" />
  
        <TopicNavigation
          @class="topic-navigation"
          @topic={{this.model}}
          @jumpToDate={{action "jumpToDate"}}
          @jumpToIndex={{action "jumpToIndex"}}
          as |info|
        >
          <PluginOutlet
            @name="topic-navigation"
            @connectorTagName="div"
            @outletArgs={{hash topic=this.model}}
          />
  
          {{#if info.renderTimeline}}
            <TopicTimeline
              @info={{info}}
              @model={{this.model}}
              @replyToPost={{action "replyToPost"}}
              @showSummary={{action "showSummary"}}
              @jumpToPostPrompt={{action "jumpToPostPrompt"}}
              @enteredIndex={{this.enteredIndex}}
              @prevEvent={{info.prevEvent}}
              @jumpTop={{action "jumpTop"}}
              @jumpBottom={{action "jumpBottom"}}
              @jumpEnd={{action "jumpEnd"}}
              @jumpToIndex={{action "jumpToIndex"}}
              @toggleMultiSelect={{action "toggleMultiSelect"}}
              @showTopicSlowModeUpdate={{route-action "showTopicSlowModeUpdate"}}
              @deleteTopic={{action "deleteTopic"}}
              @recoverTopic={{action "recoverTopic"}}
              @toggleClosed={{action "toggleClosed"}}
              @toggleArchived={{action "toggleArchived"}}
              @toggleVisibility={{action "toggleVisibility"}}
              @showTopicTimerModal={{route-action "showTopicTimerModal"}}
              @showFeatureTopic={{route-action "showFeatureTopic"}}
              @showChangeTimestamp={{route-action "showChangeTimestamp"}}
              @resetBumpDate={{action "resetBumpDate"}}
              @convertToPublicTopic={{action "convertToPublicTopic"}}
              @convertToPrivateMessage={{action "convertToPrivateMessage"}}
              @fullscreen={{info.topicProgressExpanded}}
              @mobileView={{this.site.mobileView}}
            />
          {{else}}
            <TopicProgress
              @prevEvent={{info.prevEvent}}
              @topic={{this.model}}
              @expanded={{info.topicProgressExpanded}}
              @jumpToPost={{action "jumpToPost"}}
            >
              <span>
                <PluginOutlet
                  @name="before-topic-progress"
                  @connectorTagName="div"
                  @outletArgs={{hash
                    model=this.model
                    jumpToPost=(action "jumpToPost")
                  }}
                />
              </span>
              <TopicAdminMenuButton
                @topic={{this.model}}
                @openUpwards="true"
                @rightSide="true"
                @toggleMultiSelect={{action "toggleMultiSelect"}}
                @showTopicSlowModeUpdate={{route-action
                  "showTopicSlowModeUpdate"
                }}
                @deleteTopic={{action "deleteTopic"}}
                @recoverTopic={{action "recoverTopic"}}
                @toggleClosed={{action "toggleClosed"}}
                @toggleArchived={{action "toggleArchived"}}
                @toggleVisibility={{action "toggleVisibility"}}
                @showTopicTimerModal={{route-action "showTopicTimerModal"}}
                @showFeatureTopic={{route-action "showFeatureTopic"}}
                @showChangeTimestamp={{route-action "showChangeTimestamp"}}
                @resetBumpDate={{action "resetBumpDate"}}
                @convertToPublicTopic={{action "convertToPublicTopic"}}
                @convertToPrivateMessage={{action "convertToPrivateMessage"}}
              />
            </TopicProgress>
          {{/if}}
        </TopicNavigation>
  
        <div class="row">
          <section class="topic-area" id="topic" data-topic-id={{this.model.id}}>
  
            <div class="posts-wrapper">
              <ConditionalLoadingSpinner
                @condition={{this.model.postStream.loadingAbove}}
              />
  
              <span>
                <PluginOutlet
                  @name="topic-above-posts"
                  @connectorTagName="div"
                  @outletArgs={{hash model=this.model}}
                />
              </span>
  
              {{#unless this.model.postStream.loadingFilter}}
                <ScrollingPostStream
                  @posts={{this.postsToRender}}
                  @canCreatePost={{this.model.details.can_create_post}}
                  @multiSelect={{this.multiSelect}}
                  @selectedPostsCount={{this.selectedPostsCount}}
                  @filteredPostsCount={{this.model.postStream.filteredPostsCount}}
                  @selectedQuery={{this.selectedQuery}}
                  @gaps={{this.model.postStream.gaps}}
                  @showReadIndicator={{this.model.show_read_indicator}}
                  @streamFilters={{this.model.postStream.streamFilters}}
                  @lastReadPostNumber={{this.userLastReadPostNumber}}
                  @highestPostNumber={{this.highestPostNumber}}
                  @showFlags={{action "showPostFlags"}}
                  @editPost={{action "editPost"}}
                  @showHistory={{route-action "showHistory"}}
                  @showLogin={{route-action "showLogin"}}
                  @showRawEmail={{route-action "showRawEmail"}}
                  @deletePost={{action "deletePost"}}
                  @permanentlyDeletePost={{action "permanentlyDeletePost"}}
                  @recoverPost={{action "recoverPost"}}
                  @expandHidden={{action "expandHidden"}}
                  @toggleBookmark={{action "toggleBookmark"}}
                  @togglePostType={{action "togglePostType"}}
                  @rebakePost={{action "rebakePost"}}
                  @changePostOwner={{action "changePostOwner"}}
                  @grantBadge={{action "grantBadge"}}
                  @changeNotice={{action "changeNotice"}}
                  @lockPost={{action "lockPost"}}
                  @unlockPost={{action "unlockPost"}}
                  @unhidePost={{action "unhidePost"}}
                  @replyToPost={{action "replyToPost"}}
                  @toggleWiki={{action "toggleWiki"}}
                  @showSummary={{action "showSummary"}}
                  @cancelFilter={{action "cancelFilter"}}
                  @removeAllowedUser={{action "removeAllowedUser"}}
                  @removeAllowedGroup={{action "removeAllowedGroup"}}
                  @topVisibleChanged={{action "topVisibleChanged"}}
                  @currentPostChanged={{action "currentPostChanged"}}
                  @currentPostScrolled={{action "currentPostScrolled"}}
                  @bottomVisibleChanged={{action "bottomVisibleChanged"}}
                  @togglePostSelection={{action "togglePostSelection"}}
                  @selectReplies={{action "selectReplies"}}
                  @selectBelow={{action "selectBelow"}}
                  @fillGapBefore={{action "fillGapBefore"}}
                  @fillGapAfter={{action "fillGapAfter"}}
                  @showInvite={{route-action "showInvite"}}
                  @showPagePublish={{route-action "showPagePublish"}}
                />
              {{/unless}}
  
              <ConditionalLoadingSpinner
                @condition={{this.model.postStream.loadingBelow}}
              />
            </div>
            <div id="topic-bottom"></div>
  
            <ConditionalLoadingSpinner
              @condition={{this.model.postStream.loadingFilter}}
            >
              {{#if this.loadedAllPosts}}
  
                {{#if this.model.pending_posts}}
                  <div class="pending-posts">
                    {{#each this.model.pending_posts as |pending|}}
                      <div class="reviewable-item">
                        <div class="reviewable-meta-data">
                          <span class="reviewable-type">
                            {{i18n "review.awaiting_approval"}}
                          </span>
                          <span class="created-at">
                            {{age-with-tooltip pending.created_at}}
                          </span>
                        </div>
                        <div class="post-contents-wrapper">
                          <ReviewableCreatedBy
                            @user={{this.currentUser}}
                            @tagName=""
                          />
                          <div class="post-contents">
                            <ReviewableCreatedByName
                              @user={{this.currentUser}}
                              @tagName=""
                            />
                            <div class="post-body"><CookText
                                @rawText={{pending.raw}}
                              /></div>
                          </div>
                        </div>
                        <div class="reviewable-actions">
                          <DButton
                            @class="btn-danger"
                            @label="review.delete"
                            @icon="trash-alt"
                            @action={{action "deletePending" pending}}
                          />
                        </div>
                      </div>
                    {{/each}}
                  </div>
                {{/if}}
  
                {{#if this.model.queued_posts_count}}
                  <div class="has-pending-posts">
                    <div>
                      {{html-safe
                        (i18n
                          "review.topic_has_pending"
                          count=this.model.queued_posts_count
                        )
                      }}
                    </div>
  
                    <LinkTo
                      @route="review"
                      @query={{hash
                        topic_id=this.model.id
                        type="ReviewableQueuedPost"
                        status="pending"
                      }}
                    >
                      {{i18n "review.view_pending"}}
                    </LinkTo>
                  </div>
                {{/if}}
  
                <SlowModeInfo
                  @topic={{this.model}}
                  @user={{this.currentUser}}
                  @tagName=""
                />
  
                <TopicTimerInfo
                  @topicClosed={{this.model.closed}}
                  @statusType={{this.model.topic_timer.status_type}}
                  @executeAt={{this.model.topic_timer.execute_at}}
                  @basedOnLastPost={{this.model.topic_timer.based_on_last_post}}
                  @durationMinutes={{this.model.topic_timer.duration_minutes}}
                  @categoryId={{this.model.topic_timer.category_id}}
                  @showTopicTimerModal={{route-action "showTopicTimerModal"}}
                  @removeTopicTimer={{action
                    "removeTopicTimer"
                    this.model.topic_timer.status_type
                    "topic_timer"
                  }}
                />
  
                {{#if this.showSelectedPostsAtBottom}}
                  <div
                    class="selected-posts
                      {{unless this.multiSelect 'hidden'}}
                      {{if this.showSelectedPostsAtBottom 'hidden'}}"
                  >
                    <SelectedPosts
                      @selectedPostsCount={{this.selectedPostsCount}}
                      @canSelectAll={{this.canSelectAll}}
                      @canDeselectAll={{this.canDeselectAll}}
                      @canDeleteSelected={{this.canDeleteSelected}}
                      @canMergeTopic={{this.canMergeTopic}}
                      @canChangeOwner={{this.canChangeOwner}}
                      @canMergePosts={{this.canMergePosts}}
                      @toggleMultiSelect={{action "toggleMultiSelect"}}
                      @mergePosts={{action "mergePosts"}}
                      @deleteSelected={{action "deleteSelected"}}
                      @deselectAll={{action "deselectAll"}}
                      @selectAll={{action "selectAll"}}
                    />
                  </div>
                {{/if}}
  
              {{/if}}
            </ConditionalLoadingSpinner>
  
          </section>
        </div>
  
      </div>
      {{#if this.loadedAllPosts}}
        {{#if this.session.showSignupCta}}
          {{! replace "Log In to Reply" with the infobox }}
          <SignupCta />
        {{else}}
          {{#if this.currentUser}}
            <span>
              <PluginOutlet
                @name="topic-above-footer-buttons"
                @connectorTagName="div"
                @outletArgs={{hash model=this.model}}
              />
            </span>
  
            <TopicFooterButtons
              @topic={{this.model}}
              @toggleMultiSelect={{action "toggleMultiSelect"}}
              @showTopicSlowModeUpdate={{route-action "showTopicSlowModeUpdate"}}
              @deleteTopic={{action "deleteTopic"}}
              @recoverTopic={{action "recoverTopic"}}
              @toggleClosed={{action "toggleClosed"}}
              @toggleArchived={{action "toggleArchived"}}
              @toggleVisibility={{action "toggleVisibility"}}
              @showTopicTimerModal={{route-action "showTopicTimerModal"}}
              @showFeatureTopic={{route-action "showFeatureTopic"}}
              @showChangeTimestamp={{route-action "showChangeTimestamp"}}
              @resetBumpDate={{action "resetBumpDate"}}
              @convertToPublicTopic={{action "convertToPublicTopic"}}
              @convertToPrivateMessage={{action "convertToPrivateMessage"}}
              @toggleBookmark={{action "toggleBookmark"}}
              @showFlagTopic={{route-action "showFlagTopic"}}
              @toggleArchiveMessage={{action "toggleArchiveMessage"}}
              @editFirstPost={{action "editFirstPost"}}
              @deferTopic={{action "deferTopic"}}
              @replyToPost={{action "replyToPost"}}
            />
          {{else}}
            <div id="topic-footer-buttons">
              <DButton
                @icon="reply"
                @class="btn-primary pull-right"
                @action={{route-action "showLogin"}}
                @label="topic.reply.title"
              />
            </div>
          {{/if}}
        {{/if}}
  
        <span>
          <PluginOutlet
            @name="topic-above-suggested"
            @connectorTagName="div"
            @outletArgs={{hash model=this.model}}
          />
        </span>
        <div
          class="{{if
              this.model.relatedMessages.length
              'related-messages-wrapper'
            }}
            {{if this.model.suggestedTopics.length 'suggested-topics-wrapper'}}"
        >
          {{#if this.model.relatedMessages.length}}
            <RelatedMessages @topic={{this.model}} />
          {{/if}}
          {{#if this.model.suggestedTopics.length}}
            <SuggestedTopics @topic={{this.model}} />
          {{/if}}
        </div>
      {{/if}}
    {{else}}
      <div class="container">
        <ConditionalLoadingSpinner @condition={{this.noErrorYet}}>
          {{#if this.model.errorHtml}}
            <div class="not-found">{{html-safe this.model.errorHtml}}</div>
          {{else}}
            <div class="topic-error">
              <div>{{this.model.errorMessage}}</div>
              {{#if this.model.noRetry}}
                {{#unless this.currentUser}}
                  <DButton
                    @action={{route-action "showLogin"}}
                    @class="btn-primary topic-retry"
                    @icon="user"
                    @label="log_in"
                  />
                {{/unless}}
              {{else}}
                <DButton
                  @action={{action "retryLoading"}}
                  @class="btn-primary topic-retry"
                  @icon="sync"
                  @label="errors.buttons.again"
                />
              {{/if}}
            </div>
            <ConditionalLoadingSpinner @condition={{this.retrying}} />
          {{/if}}
        </ConditionalLoadingSpinner>
      </div>
    {{/if}}
  
    <QuoteButton
      @quoteState={{this.quoteState}}
      @selectText={{action "selectText"}}
      @editPost={{action "editPost"}}
      @topic={{this.model}}
      @composerVisible={{this.composer.visible}}
    />
  </DiscourseTopic>
  */
  {
    "id": "FhpvZVuE",
    "block": "[[[8,[39,0],null,[[\"@multiSelect\",\"@enteredAt\",\"@topic\",\"@hasScrolled\"],[[30,0,[\"multiSelect\"]],[30,0,[\"enteredAt\"]],[30,0,[\"model\"]],[30,0,[\"hasScrolled\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"model\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@category\",\"@tags\"],[[30,0,[\"model\",\"category\"]],[30,0,[\"model\",\"tags\"]]]],null],[1,\"\\n    \"],[8,[39,3],null,[[\"@topic\"],[[30,0,[\"model\"]]]],null],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n      \"],[8,[39,4],null,[[\"@user\",\"@banner\",\"@overlay\",\"@hide\"],[[30,0,[\"currentUser\"]],[30,0,[\"site\",\"banner\"]],[30,0,[\"hasScrolled\"]],[30,0,[\"model\",\"errorLoading\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showSharedDraftControls\"]],[[[1,\"    \"],[8,[39,5],null,[[\"@topic\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"topic-above-post-stream\",\"div\",[28,[37,7],null,[[\"model\",\"editFirstPost\"],[[30,0,[\"model\"]],[28,[37,8],[[30,0],\"editFirstPost\"],null]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"postStream\",\"loaded\"]],[[[41,[30,0,[\"model\",\"postStream\",\"firstPostPresent\"]],[[[1,\"      \"],[8,[39,9],null,[[\"@cancelled\",\"@save\",\"@model\"],[[28,[37,8],[[30,0],\"cancelEditingTopic\"],null],[28,[37,8],[[30,0],\"finishedEditingTopic\"],null],[30,0,[\"model\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"editingTopic\"]],[[[1,\"          \"],[10,0],[14,0,\"edit-topic-title\"],[12],[1,\"\\n            \"],[8,[39,10],null,[[\"@shouldShow\",\"@tagName\"],[[30,0,[\"model\",\"isPrivateMessage\"]],\"\"]],null],[1,\"\\n\\n            \"],[8,[39,11],null,[[\"@id\",\"@value\",\"@maxlength\",\"@autofocus\"],[\"edit-title\",[30,0,[\"buffered\",\"title\"]],[30,0,[\"siteSettings\",\"max_topic_title_length\"]],\"true\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"showCategoryChooser\"]],[[[1,\"              \"],[8,[39,12],null,[[\"@class\",\"@value\",\"@onChange\"],[\"small\",[30,0,[\"buffered\",\"category_id\"]],[28,[37,8],[[30,0],\"topicCategoryChanged\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canEditTags\"]],[[[1,\"              \"],[8,[39,13],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"buffered\",\"tags\"]],[28,[37,8],[[30,0],\"topicTagsChanged\"],null],[28,[37,7],null,[[\"filterable\",\"categoryId\",\"minimum\"],[true,[30,0,[\"buffered\",\"category_id\"]],[30,0,[\"minimumRequiredTags\"]]]]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n            \"],[10,1],[12],[1,\"\\n              \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"edit-topic\",\"div\",[28,[37,7],null,[[\"model\",\"buffered\"],[[30,0,[\"model\"]],[30,0,[\"buffered\"]]]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n\\n            \"],[10,0],[14,0,\"edit-controls\"],[12],[1,\"\\n              \"],[8,[39,14],null,[[\"@action\",\"@class\",\"@icon\",\"@ariaLabel\"],[[28,[37,8],[[30,0],\"finishedEditingTopic\"],null],\"btn-primary submit-edit\",\"check\",\"composer.save_edit\"]],null],[1,\"\\n              \"],[8,[39,14],null,[[\"@action\",\"@class\",\"@icon\",\"@ariaLabel\"],[[28,[37,8],[[30,0],\"cancelEditingTopic\"],null],\"btn-default cancel-edit\",\"times\",\"composer.cancel\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canRemoveTopicFeaturedLink\"]],[[[1,\"                \"],[11,3],[24,6,\"\"],[24,0,\"remove-featured-link\"],[16,\"title\",[28,[37,15],[\"composer.remove_featured_link\"],null]],[4,[38,16],[\"click\",[30,0,[\"removeFeaturedLink\"]]],null],[12],[1,\"\\n                  \"],[1,[28,[35,17],[\"times-circle\"],null]],[1,\"\\n                  \"],[1,[30,0,[\"featuredLinkDomain\"]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n\"]],[]],[[[1,\"          \"],[10,\"h1\"],[15,\"data-topic-id\",[30,0,[\"model\",\"id\"]]],[12],[1,\"\\n\"],[41,[51,[30,0,[\"model\",\"is_warning\"]]],[[[41,[30,0,[\"canSendPms\"]],[[[1,\"                \"],[8,[39,10],null,[[\"@shouldShow\",\"@href\",\"@title\",\"@ariaLabel\",\"@tagName\"],[[30,0,[\"model\",\"isPrivateMessage\"]],[30,0,[\"pmPath\"]],\"topic_statuses.personal_message.title\",\"user.messages.inbox\",\"\"]],null],[1,\"\\n\"]],[]],[[[1,\"                \"],[8,[39,10],null,[[\"@shouldShow\",\"@tagName\"],[[30,0,[\"model\",\"isPrivateMessage\"]],\"\"]],null],[1,\"\\n\"]],[]]]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"details\",\"loaded\"]],[[[1,\"              \"],[8,[39,19],null,[[\"@topic\"],[[30,0,[\"model\"]]]],null],[1,\"\\n              \"],[11,3],[16,6,[30,0,[\"model\",\"url\"]]],[24,0,\"fancy-title\"],[4,[38,16],[\"click\",[30,0,[\"jumpTop\"]]],null],[12],[1,\"\\n                \"],[1,[28,[35,20],[[30,0,[\"model\",\"fancyTitle\"]]],null]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"details\",\"can_edit\"]],[[[1,\"              \"],[11,3],[24,6,\"\"],[24,0,\"edit-topic\"],[16,\"title\",[28,[37,15],[\"edit\"],null]],[4,[38,16],[\"click\",[30,0,[\"editTopic\"]]],null],[12],[1,[28,[35,17],[\"pencil-alt\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n            \"],[8,[39,6],null,[[\"@name\",\"@outletArgs\"],[\"topic-title-suffix\",[28,[37,7],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[8,[39,21],null,[[\"@topic\",\"@class\"],[[30,0,[\"model\"]],\"topic-category\"]],null],[1,\"\\n\"]],[]]],[1,\"      \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"publishedPage\"]],[[[1,\"        \"],[10,0],[14,0,\"published-page-notice\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"details\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"publishedPage\",\"public\"]],[[[1,\"              \"],[10,1],[14,0,\"is-public\"],[12],[1,[28,[35,15],[\"topic.publish_page.public\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[1,[28,[35,15],[\"topic.publish_page.topic_published\"],null]],[1,\"\\n            \"],[10,0],[12],[1,\"\\n              \"],[10,3],[15,6,[30,0,[\"model\",\"publishedPage\",\"url\"]]],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,[30,0,[\"model\",\"publishedPage\",\"url\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n            \"],[8,[39,14],null,[[\"@icon\",\"@label\",\"@action\"],[\"file\",\"topic.publish_page.publishing_settings\",[28,[37,22],[\"showPagePublish\"],null]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"container posts\"],[12],[1,\"\\n      \"],[10,0],[15,0,[29,[\"selected-posts \",[52,[51,[30,0,[\"multiSelect\"]]],\"hidden\"]]]],[12],[1,\"\\n        \"],[8,[39,23],null,[[\"@selectedPostsCount\",\"@canSelectAll\",\"@canDeselectAll\",\"@canDeleteSelected\",\"@canMergeTopic\",\"@canChangeOwner\",\"@canMergePosts\",\"@toggleMultiSelect\",\"@mergePosts\",\"@deleteSelected\",\"@deselectAll\",\"@selectAll\"],[[30,0,[\"selectedPostsCount\"]],[30,0,[\"canSelectAll\"]],[30,0,[\"canDeselectAll\"]],[30,0,[\"canDeleteSelected\"]],[30,0,[\"canMergeTopic\"]],[30,0,[\"canChangeOwner\"]],[30,0,[\"canMergePosts\"]],[28,[37,8],[[30,0],\"toggleMultiSelect\"],null],[28,[37,8],[[30,0],\"mergePosts\"],null],[28,[37,8],[[30,0],\"deleteSelected\"],null],[28,[37,8],[[30,0],\"deselectAll\"],null],[28,[37,8],[[30,0],\"selectAll\"],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\"],[\"above-timeline\",\"div\"]],null],[1,\"\\n\\n      \"],[8,[39,24],null,[[\"@class\",\"@topic\",\"@jumpToDate\",\"@jumpToIndex\"],[\"topic-navigation\",[30,0,[\"model\"]],[28,[37,8],[[30,0],\"jumpToDate\"],null],[28,[37,8],[[30,0],\"jumpToIndex\"],null]]],[[\"default\"],[[[[1,\"\\n        \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"topic-navigation\",\"div\",[28,[37,7],null,[[\"topic\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\\n\"],[41,[30,1,[\"renderTimeline\"]],[[[1,\"          \"],[8,[39,25],null,[[\"@info\",\"@model\",\"@replyToPost\",\"@showSummary\",\"@jumpToPostPrompt\",\"@enteredIndex\",\"@prevEvent\",\"@jumpTop\",\"@jumpBottom\",\"@jumpEnd\",\"@jumpToIndex\",\"@toggleMultiSelect\",\"@showTopicSlowModeUpdate\",\"@deleteTopic\",\"@recoverTopic\",\"@toggleClosed\",\"@toggleArchived\",\"@toggleVisibility\",\"@showTopicTimerModal\",\"@showFeatureTopic\",\"@showChangeTimestamp\",\"@resetBumpDate\",\"@convertToPublicTopic\",\"@convertToPrivateMessage\",\"@fullscreen\",\"@mobileView\"],[[30,1],[30,0,[\"model\"]],[28,[37,8],[[30,0],\"replyToPost\"],null],[28,[37,8],[[30,0],\"showSummary\"],null],[28,[37,8],[[30,0],\"jumpToPostPrompt\"],null],[30,0,[\"enteredIndex\"]],[30,1,[\"prevEvent\"]],[28,[37,8],[[30,0],\"jumpTop\"],null],[28,[37,8],[[30,0],\"jumpBottom\"],null],[28,[37,8],[[30,0],\"jumpEnd\"],null],[28,[37,8],[[30,0],\"jumpToIndex\"],null],[28,[37,8],[[30,0],\"toggleMultiSelect\"],null],[28,[37,22],[\"showTopicSlowModeUpdate\"],null],[28,[37,8],[[30,0],\"deleteTopic\"],null],[28,[37,8],[[30,0],\"recoverTopic\"],null],[28,[37,8],[[30,0],\"toggleClosed\"],null],[28,[37,8],[[30,0],\"toggleArchived\"],null],[28,[37,8],[[30,0],\"toggleVisibility\"],null],[28,[37,22],[\"showTopicTimerModal\"],null],[28,[37,22],[\"showFeatureTopic\"],null],[28,[37,22],[\"showChangeTimestamp\"],null],[28,[37,8],[[30,0],\"resetBumpDate\"],null],[28,[37,8],[[30,0],\"convertToPublicTopic\"],null],[28,[37,8],[[30,0],\"convertToPrivateMessage\"],null],[30,1,[\"topicProgressExpanded\"]],[30,0,[\"site\",\"mobileView\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"          \"],[8,[39,26],null,[[\"@prevEvent\",\"@topic\",\"@expanded\",\"@jumpToPost\"],[[30,1,[\"prevEvent\"]],[30,0,[\"model\"]],[30,1,[\"topicProgressExpanded\"]],[28,[37,8],[[30,0],\"jumpToPost\"],null]]],[[\"default\"],[[[[1,\"\\n            \"],[10,1],[12],[1,\"\\n              \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"before-topic-progress\",\"div\",[28,[37,7],null,[[\"model\",\"jumpToPost\"],[[30,0,[\"model\"]],[28,[37,8],[[30,0],\"jumpToPost\"],null]]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n            \"],[8,[39,27],null,[[\"@topic\",\"@openUpwards\",\"@rightSide\",\"@toggleMultiSelect\",\"@showTopicSlowModeUpdate\",\"@deleteTopic\",\"@recoverTopic\",\"@toggleClosed\",\"@toggleArchived\",\"@toggleVisibility\",\"@showTopicTimerModal\",\"@showFeatureTopic\",\"@showChangeTimestamp\",\"@resetBumpDate\",\"@convertToPublicTopic\",\"@convertToPrivateMessage\"],[[30,0,[\"model\"]],\"true\",\"true\",[28,[37,8],[[30,0],\"toggleMultiSelect\"],null],[28,[37,22],[\"showTopicSlowModeUpdate\"],null],[28,[37,8],[[30,0],\"deleteTopic\"],null],[28,[37,8],[[30,0],\"recoverTopic\"],null],[28,[37,8],[[30,0],\"toggleClosed\"],null],[28,[37,8],[[30,0],\"toggleArchived\"],null],[28,[37,8],[[30,0],\"toggleVisibility\"],null],[28,[37,22],[\"showTopicTimerModal\"],null],[28,[37,22],[\"showFeatureTopic\"],null],[28,[37,22],[\"showChangeTimestamp\"],null],[28,[37,8],[[30,0],\"resetBumpDate\"],null],[28,[37,8],[[30,0],\"convertToPublicTopic\"],null],[28,[37,8],[[30,0],\"convertToPrivateMessage\"],null]]],null],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[]]],[1,\"      \"]],[1]]]]],[1,\"\\n\\n      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[10,\"section\"],[14,0,\"topic-area\"],[14,1,\"topic\"],[15,\"data-topic-id\",[30,0,[\"model\",\"id\"]]],[12],[1,\"\\n\\n          \"],[10,0],[14,0,\"posts-wrapper\"],[12],[1,\"\\n            \"],[8,[39,28],null,[[\"@condition\"],[[30,0,[\"model\",\"postStream\",\"loadingAbove\"]]]],null],[1,\"\\n\\n            \"],[10,1],[12],[1,\"\\n              \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"topic-above-posts\",\"div\",[28,[37,7],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"model\",\"postStream\",\"loadingFilter\"]]],[[[1,\"              \"],[8,[39,29],null,[[\"@posts\",\"@canCreatePost\",\"@multiSelect\",\"@selectedPostsCount\",\"@filteredPostsCount\",\"@selectedQuery\",\"@gaps\",\"@showReadIndicator\",\"@streamFilters\",\"@lastReadPostNumber\",\"@highestPostNumber\",\"@showFlags\",\"@editPost\",\"@showHistory\",\"@showLogin\",\"@showRawEmail\",\"@deletePost\",\"@permanentlyDeletePost\",\"@recoverPost\",\"@expandHidden\",\"@toggleBookmark\",\"@togglePostType\",\"@rebakePost\",\"@changePostOwner\",\"@grantBadge\",\"@changeNotice\",\"@lockPost\",\"@unlockPost\",\"@unhidePost\",\"@replyToPost\",\"@toggleWiki\",\"@showSummary\",\"@cancelFilter\",\"@removeAllowedUser\",\"@removeAllowedGroup\",\"@topVisibleChanged\",\"@currentPostChanged\",\"@currentPostScrolled\",\"@bottomVisibleChanged\",\"@togglePostSelection\",\"@selectReplies\",\"@selectBelow\",\"@fillGapBefore\",\"@fillGapAfter\",\"@showInvite\",\"@showPagePublish\"],[[30,0,[\"postsToRender\"]],[30,0,[\"model\",\"details\",\"can_create_post\"]],[30,0,[\"multiSelect\"]],[30,0,[\"selectedPostsCount\"]],[30,0,[\"model\",\"postStream\",\"filteredPostsCount\"]],[30,0,[\"selectedQuery\"]],[30,0,[\"model\",\"postStream\",\"gaps\"]],[30,0,[\"model\",\"show_read_indicator\"]],[30,0,[\"model\",\"postStream\",\"streamFilters\"]],[30,0,[\"userLastReadPostNumber\"]],[30,0,[\"highestPostNumber\"]],[28,[37,8],[[30,0],\"showPostFlags\"],null],[28,[37,8],[[30,0],\"editPost\"],null],[28,[37,22],[\"showHistory\"],null],[28,[37,22],[\"showLogin\"],null],[28,[37,22],[\"showRawEmail\"],null],[28,[37,8],[[30,0],\"deletePost\"],null],[28,[37,8],[[30,0],\"permanentlyDeletePost\"],null],[28,[37,8],[[30,0],\"recoverPost\"],null],[28,[37,8],[[30,0],\"expandHidden\"],null],[28,[37,8],[[30,0],\"toggleBookmark\"],null],[28,[37,8],[[30,0],\"togglePostType\"],null],[28,[37,8],[[30,0],\"rebakePost\"],null],[28,[37,8],[[30,0],\"changePostOwner\"],null],[28,[37,8],[[30,0],\"grantBadge\"],null],[28,[37,8],[[30,0],\"changeNotice\"],null],[28,[37,8],[[30,0],\"lockPost\"],null],[28,[37,8],[[30,0],\"unlockPost\"],null],[28,[37,8],[[30,0],\"unhidePost\"],null],[28,[37,8],[[30,0],\"replyToPost\"],null],[28,[37,8],[[30,0],\"toggleWiki\"],null],[28,[37,8],[[30,0],\"showSummary\"],null],[28,[37,8],[[30,0],\"cancelFilter\"],null],[28,[37,8],[[30,0],\"removeAllowedUser\"],null],[28,[37,8],[[30,0],\"removeAllowedGroup\"],null],[28,[37,8],[[30,0],\"topVisibleChanged\"],null],[28,[37,8],[[30,0],\"currentPostChanged\"],null],[28,[37,8],[[30,0],\"currentPostScrolled\"],null],[28,[37,8],[[30,0],\"bottomVisibleChanged\"],null],[28,[37,8],[[30,0],\"togglePostSelection\"],null],[28,[37,8],[[30,0],\"selectReplies\"],null],[28,[37,8],[[30,0],\"selectBelow\"],null],[28,[37,8],[[30,0],\"fillGapBefore\"],null],[28,[37,8],[[30,0],\"fillGapAfter\"],null],[28,[37,22],[\"showInvite\"],null],[28,[37,22],[\"showPagePublish\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n            \"],[8,[39,28],null,[[\"@condition\"],[[30,0,[\"model\",\"postStream\",\"loadingBelow\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,1,\"topic-bottom\"],[12],[13],[1,\"\\n\\n          \"],[8,[39,28],null,[[\"@condition\"],[[30,0,[\"model\",\"postStream\",\"loadingFilter\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"loadedAllPosts\"]],[[[1,\"\\n\"],[41,[30,0,[\"model\",\"pending_posts\"]],[[[1,\"                \"],[10,0],[14,0,\"pending-posts\"],[12],[1,\"\\n\"],[42,[28,[37,31],[[28,[37,31],[[30,0,[\"model\",\"pending_posts\"]]],null]],null],null,[[[1,\"                    \"],[10,0],[14,0,\"reviewable-item\"],[12],[1,\"\\n                      \"],[10,0],[14,0,\"reviewable-meta-data\"],[12],[1,\"\\n                        \"],[10,1],[14,0,\"reviewable-type\"],[12],[1,\"\\n                          \"],[1,[28,[35,15],[\"review.awaiting_approval\"],null]],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,1],[14,0,\"created-at\"],[12],[1,\"\\n                          \"],[1,[28,[35,32],[[30,2,[\"created_at\"]]],null]],[1,\"\\n                        \"],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,0],[14,0,\"post-contents-wrapper\"],[12],[1,\"\\n                        \"],[8,[39,33],null,[[\"@user\",\"@tagName\"],[[30,0,[\"currentUser\"]],\"\"]],null],[1,\"\\n                        \"],[10,0],[14,0,\"post-contents\"],[12],[1,\"\\n                          \"],[8,[39,34],null,[[\"@user\",\"@tagName\"],[[30,0,[\"currentUser\"]],\"\"]],null],[1,\"\\n                          \"],[10,0],[14,0,\"post-body\"],[12],[8,[39,35],null,[[\"@rawText\"],[[30,2,[\"raw\"]]]],null],[13],[1,\"\\n                        \"],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,0],[14,0,\"reviewable-actions\"],[12],[1,\"\\n                        \"],[8,[39,14],null,[[\"@class\",\"@label\",\"@icon\",\"@action\"],[\"btn-danger\",\"review.delete\",\"trash-alt\",[28,[37,8],[[30,0],\"deletePending\",[30,2]],null]]],null],[1,\"\\n                      \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[2]],null],[1,\"                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"queued_posts_count\"]],[[[1,\"                \"],[10,0],[14,0,\"has-pending-posts\"],[12],[1,\"\\n                  \"],[10,0],[12],[1,\"\\n                    \"],[1,[28,[35,20],[[28,[37,15],[\"review.topic_has_pending\"],[[\"count\"],[[30,0,[\"model\",\"queued_posts_count\"]]]]]],null]],[1,\"\\n                  \"],[13],[1,\"\\n\\n                  \"],[8,[39,36],null,[[\"@route\",\"@query\"],[\"review\",[28,[37,7],null,[[\"topic_id\",\"type\",\"status\"],[[30,0,[\"model\",\"id\"]],\"ReviewableQueuedPost\",\"pending\"]]]]],[[\"default\"],[[[[1,\"\\n                    \"],[1,[28,[35,15],[\"review.view_pending\"],null]],[1,\"\\n                  \"]],[]]]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n              \"],[8,[39,37],null,[[\"@topic\",\"@user\",\"@tagName\"],[[30,0,[\"model\"]],[30,0,[\"currentUser\"]],\"\"]],null],[1,\"\\n\\n              \"],[8,[39,38],null,[[\"@topicClosed\",\"@statusType\",\"@executeAt\",\"@basedOnLastPost\",\"@durationMinutes\",\"@categoryId\",\"@showTopicTimerModal\",\"@removeTopicTimer\"],[[30,0,[\"model\",\"closed\"]],[30,0,[\"model\",\"topic_timer\",\"status_type\"]],[30,0,[\"model\",\"topic_timer\",\"execute_at\"]],[30,0,[\"model\",\"topic_timer\",\"based_on_last_post\"]],[30,0,[\"model\",\"topic_timer\",\"duration_minutes\"]],[30,0,[\"model\",\"topic_timer\",\"category_id\"]],[28,[37,22],[\"showTopicTimerModal\"],null],[28,[37,8],[[30,0],\"removeTopicTimer\",[30,0,[\"model\",\"topic_timer\",\"status_type\"]],\"topic_timer\"],null]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"showSelectedPostsAtBottom\"]],[[[1,\"                \"],[10,0],[15,0,[29,[\"selected-posts\\n                    \",[52,[51,[30,0,[\"multiSelect\"]]],\"hidden\"],\"\\n                    \",[52,[30,0,[\"showSelectedPostsAtBottom\"]],\"hidden\"]]]],[12],[1,\"\\n                  \"],[8,[39,23],null,[[\"@selectedPostsCount\",\"@canSelectAll\",\"@canDeselectAll\",\"@canDeleteSelected\",\"@canMergeTopic\",\"@canChangeOwner\",\"@canMergePosts\",\"@toggleMultiSelect\",\"@mergePosts\",\"@deleteSelected\",\"@deselectAll\",\"@selectAll\"],[[30,0,[\"selectedPostsCount\"]],[30,0,[\"canSelectAll\"]],[30,0,[\"canDeselectAll\"]],[30,0,[\"canDeleteSelected\"]],[30,0,[\"canMergeTopic\"]],[30,0,[\"canChangeOwner\"]],[30,0,[\"canMergePosts\"]],[28,[37,8],[[30,0],\"toggleMultiSelect\"],null],[28,[37,8],[[30,0],\"mergePosts\"],null],[28,[37,8],[[30,0],\"deleteSelected\"],null],[28,[37,8],[[30,0],\"deselectAll\"],null],[28,[37,8],[[30,0],\"selectAll\"],null]]],null],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"]],[]],null],[1,\"          \"]],[]]]]],[1,\"\\n\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"loadedAllPosts\"]],[[[41,[30,0,[\"session\",\"showSignupCta\"]],[[[1,\"        \"],[8,[39,39],null,null,null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"currentUser\"]],[[[1,\"          \"],[10,1],[12],[1,\"\\n            \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"topic-above-footer-buttons\",\"div\",[28,[37,7],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[8,[39,40],null,[[\"@topic\",\"@toggleMultiSelect\",\"@showTopicSlowModeUpdate\",\"@deleteTopic\",\"@recoverTopic\",\"@toggleClosed\",\"@toggleArchived\",\"@toggleVisibility\",\"@showTopicTimerModal\",\"@showFeatureTopic\",\"@showChangeTimestamp\",\"@resetBumpDate\",\"@convertToPublicTopic\",\"@convertToPrivateMessage\",\"@toggleBookmark\",\"@showFlagTopic\",\"@toggleArchiveMessage\",\"@editFirstPost\",\"@deferTopic\",\"@replyToPost\"],[[30,0,[\"model\"]],[28,[37,8],[[30,0],\"toggleMultiSelect\"],null],[28,[37,22],[\"showTopicSlowModeUpdate\"],null],[28,[37,8],[[30,0],\"deleteTopic\"],null],[28,[37,8],[[30,0],\"recoverTopic\"],null],[28,[37,8],[[30,0],\"toggleClosed\"],null],[28,[37,8],[[30,0],\"toggleArchived\"],null],[28,[37,8],[[30,0],\"toggleVisibility\"],null],[28,[37,22],[\"showTopicTimerModal\"],null],[28,[37,22],[\"showFeatureTopic\"],null],[28,[37,22],[\"showChangeTimestamp\"],null],[28,[37,8],[[30,0],\"resetBumpDate\"],null],[28,[37,8],[[30,0],\"convertToPublicTopic\"],null],[28,[37,8],[[30,0],\"convertToPrivateMessage\"],null],[28,[37,8],[[30,0],\"toggleBookmark\"],null],[28,[37,22],[\"showFlagTopic\"],null],[28,[37,8],[[30,0],\"toggleArchiveMessage\"],null],[28,[37,8],[[30,0],\"editFirstPost\"],null],[28,[37,8],[[30,0],\"deferTopic\"],null],[28,[37,8],[[30,0],\"replyToPost\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,0],[14,1,\"topic-footer-buttons\"],[12],[1,\"\\n            \"],[8,[39,14],null,[[\"@icon\",\"@class\",\"@action\",\"@label\"],[\"reply\",\"btn-primary pull-right\",[28,[37,22],[\"showLogin\"],null],\"topic.reply.title\"]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]]],[]]],[1,\"\\n      \"],[10,1],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"topic-above-suggested\",\"div\",[28,[37,7],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[15,0,[29,[[52,[30,0,[\"model\",\"relatedMessages\",\"length\"]],\"related-messages-wrapper\"],\"\\n          \",[52,[30,0,[\"model\",\"suggestedTopics\",\"length\"]],\"suggested-topics-wrapper\"]]]],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"relatedMessages\",\"length\"]],[[[1,\"          \"],[8,[39,41],null,[[\"@topic\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"suggestedTopics\",\"length\"]],[[[1,\"          \"],[8,[39,42],null,[[\"@topic\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null]],[]],[[[1,\"    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n      \"],[8,[39,28],null,[[\"@condition\"],[[30,0,[\"noErrorYet\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"model\",\"errorHtml\"]],[[[1,\"          \"],[10,0],[14,0,\"not-found\"],[12],[1,[28,[35,20],[[30,0,[\"model\",\"errorHtml\"]]],null]],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,0],[14,0,\"topic-error\"],[12],[1,\"\\n            \"],[10,0],[12],[1,[30,0,[\"model\",\"errorMessage\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"noRetry\"]],[[[41,[51,[30,0,[\"currentUser\"]]],[[[1,\"                \"],[8,[39,14],null,[[\"@action\",\"@class\",\"@icon\",\"@label\"],[[28,[37,22],[\"showLogin\"],null],\"btn-primary topic-retry\",\"user\",\"log_in\"]],null],[1,\"\\n\"]],[]],null]],[]],[[[1,\"              \"],[8,[39,14],null,[[\"@action\",\"@class\",\"@icon\",\"@label\"],[[28,[37,8],[[30,0],\"retryLoading\"],null],\"btn-primary topic-retry\",\"sync\",\"errors.buttons.again\"]],null],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n          \"],[8,[39,28],null,[[\"@condition\"],[[30,0,[\"retrying\"]]]],null],[1,\"\\n\"]],[]]],[1,\"      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n  \"],[8,[39,43],null,[[\"@quoteState\",\"@selectText\",\"@editPost\",\"@topic\",\"@composerVisible\"],[[30,0,[\"quoteState\"]],[28,[37,8],[[30,0],\"selectText\"],null],[28,[37,8],[[30,0],\"editPost\"],null],[30,0,[\"model\"]],[30,0,[\"composer\",\"visible\"]]]],null],[1,\"\\n\"]],[]]]]]],[\"info\",\"pending\"],false,[\"discourse-topic\",\"if\",\"add-category-tag-classes\",\"add-topic-status-classes\",\"discourse-banner\",\"shared-draft-controls\",\"plugin-outlet\",\"hash\",\"action\",\"topic-title\",\"private-message-glyph\",\"text-field\",\"category-chooser\",\"mini-tag-chooser\",\"d-button\",\"i18n\",\"on\",\"d-icon\",\"unless\",\"topic-status\",\"html-safe\",\"topic-category\",\"route-action\",\"selected-posts\",\"topic-navigation\",\"topic-timeline\",\"topic-progress\",\"topic-admin-menu-button\",\"conditional-loading-spinner\",\"scrolling-post-stream\",\"each\",\"-track-array\",\"age-with-tooltip\",\"reviewable-created-by\",\"reviewable-created-by-name\",\"cook-text\",\"link-to\",\"slow-mode-info\",\"topic-timer-info\",\"signup-cta\",\"topic-footer-buttons\",\"related-messages\",\"suggested-topics\",\"quote-button\"]]",
    "moduleName": "discourse/templates/topic.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});