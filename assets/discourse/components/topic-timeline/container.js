define("discourse/components/topic-timeline/container", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@glimmer/tracking", "@ember/object", "I18n", "@ember/template", "@ember/service", "discourse-common/utils/decorators", "discourse/widgets/post-small-action", "discourse-common/utils/dom-utils", "discourse/lib/offset-calculator"], function (_exports, _component, _templateFactory, _component2, _tracking, _object, _I18n, _template, _service, _decorators, _postSmallAction, _domUtils, _offsetCalculator) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.SCROLLER_HEIGHT = void 0;
  _exports.scrollareaHeight = scrollareaHeight;
  _exports.timelineDate = timelineDate;
  var _dec, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/object",0,"I18n",0,"@ember/template",0,"@ember/service",0,"discourse-common/utils/decorators",0,"discourse/widgets/post-small-action",0,"discourse-common/utils/dom-utils",0,"discourse/lib/offset-calculator"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @fullscreen}}
    <div class="title">
      <h2>
        <a
          class="fancy-title"
          href
          {{on "click" @jumpTop}}
        >{{this.topicTitle}}</a>
      </h2>
      {{#if (or this.siteSettings.topic_featured_link_enabled this.showTags)}}
        <div class="topic-header-extra">
          {{#if this.showTags}}
            <div class="list-tags">
              {{discourse-tags @model mode="list" tags=@model.tags}}
            </div>
          {{/if}}
          {{#if this.siteSettings.topic_featured_link_enabled}}
            {{topic-featured-link @model}}
          {{/if}}
        </div>
      {{/if}}
  
      {{#if (and (not @model.isPrivateMessage) @model.category)}}
        <div class="topic-category">
          {{#if @model.category.parentCategory}}
            {{category-link @model.category.parentCategory}}
          {{/if}}
          {{category-link @model.category}}
        </div>
      {{/if}}
      {{#if this.excerpt}}
        <div class="post-excerpt">{{html-safe this.excerpt}}</div>
      {{/if}}
    </div>
  {{/if}}
  
  {{#if (and (not @fullscreen) this.currentUser)}}
    <div class="timeline-controls">
      <PluginOutlet
        @name="timeline-controls-before"
        @outletArgs={{hash model=@model}}
      />
      <TopicAdminMenuButton
        @topic={{@model}}
        @addKeyboardTargetClass={{true}}
        @toggleMultiSelect={{@toggleMultiSelect}}
        @showTopicSlowModeUpdate={{@showTopicSlowModeUpdate}}
        @deleteTopic={{@deleteTopic}}
        @recoverTopic={{@recoverTopic}}
        @toggleClosed={{@toggleClosed}}
        @toggleArchived={{@toggleArchived}}
        @toggleVisibility={{@toggleVisibility}}
        @showTopicTimerModal={{@showTopicTimerModal}}
        @showFeatureTopic={{@showFeatureTopic}}
        @showChangeTimestamp={{@showChangeTimestamp}}
        @resetBumpDate={{@resetBumpDate}}
        @convertToPublicTopic={{@convertToPublicTopic}}
        @convertToPrivateMessage={{@convertToPrivateMessage}}
      />
    </div>
  {{/if}}
  
  {{#if this.displayTimeLineScrollArea}}
    <div class="timeline-scrollarea-wrapper">
      <div class="timeline-date-wrapper">
        <a
          class="start-date"
          onClick={{this.updatePercentage}}
          title={{this.startDate}}
        >
          <span>
            {{this.startDate}}
          </span>
        </a>
      </div>
      <div class="timeline-scrollarea" style={{this.timelineScrollareaStyle}}>
        <div
          class="timeline-padding"
          style={{this.beforePadding}}
          onClick={{this.updatePercentage}}
        ></div>
        <TopicTimeline::Scroller
          @current={{this.current}}
          @total={{this.total}}
          @onGoBack={{this.onGoBack}}
          @fullscreen={{@fullscreen}}
          @showDockedButton={{this.showDockedButton}}
          @date={{this.date}}
          @didStartDrag={{this.didStartDrag}}
          @dragMove={{this.dragMove}}
          @didEndDrag={{this.didEndDrag}}
        />
        <div
          class="timeline-padding"
          style={{this.afterPadding}}
          onClick={{this.updatePercentage}}
        ></div>
  
        {{#if (and this.hasBackPosition this.showButton)}}
          <div class="timeline-last-read" style={{this.lastReadStyle}}>
            {{d-icon "minus" class="progress"}}
            <TopicTimeline::BackButton @onGoBack={{this.goBack}} />
          </div>
        {{/if}}
      </div>
  
      <div class="timeline-date-wrapper">
        <a class="now-date" onClick={{this.updatePercentage}}>
          <span>
            {{age-with-tooltip this.nowDate this.nowDateOptions}}
          </span>
        </a>
      </div>
    </div>
  
    <div class="timeline-footer-controls">
      {{#if this.displaySummary}}
        <button
          type="button"
          class="show-summary btn btn-small"
          title={{i18n "summary.short_title"}}
          {{on "click" @showSummary}}
        >
          {{d-icon "layer-group"}}
          {{i18n "summary.short_label"}}
        </button>
      {{/if}}
  
      {{#if (and this.currentUser (not @fullscreen))}}
        {{#if this.canCreatePost}}
          <button
            type="button"
            class="btn btn-default create reply-to-post no-text btn-icon"
            title={{i18n "topic.reply.help"}}
            {{on "click" (fn @replyToPost null)}}
          >
            {{d-icon "reply"}}
          </button>
        {{/if}}
      {{/if}}
  
      {{#if @fullscreen}}
        <button
          type="button"
          class="timeline-open-jump-to-post-prompt-btn btn btn-text jump-to-post"
          title={{i18n "topic.progress.jump_prompt_long"}}
          {{on "click" @jumpToPostPrompt}}
        >
          <span class="d-button-label">
            {{i18n "topic.progress.jump_prompt"}}
          </span>
        </button>
      {{/if}}
  
      {{#if this.currentUser}}
        <TopicNotificationsButton
          @notificationLevel={{@model.details.notification_level}}
          @topic={{@model}}
          @showFullTitle={{false}}
          @appendReason={{false}}
          @placement={{"bottom-end"}}
          @showCaret={{false}}
        />
        {{#if @mobileView}}
          <TopicAdminMenuButton
            @topic={{@model}}
            @addKeyboardTargetClass={{true}}
            @openUpwards={{true}}
          />
        {{/if}}
      {{/if}}
      <PluginOutlet
        @name="timeline-footer-controls-after"
        @outletArgs={{hash model=@model}}
      />
    </div>
  {{/if}}
  */
  {
    "id": "PUlQLVYl",
    "block": "[[[41,[30,1],[[[1,\"  \"],[10,0],[14,0,\"title\"],[12],[1,\"\\n    \"],[10,\"h2\"],[12],[1,\"\\n      \"],[11,3],[24,0,\"fancy-title\"],[24,6,\"\"],[4,[38,1],[\"click\",[30,2]],null],[12],[1,[30,0,[\"topicTitle\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"siteSettings\",\"topic_featured_link_enabled\"]],[30,0,[\"showTags\"]]],null],[[[1,\"      \"],[10,0],[14,0,\"topic-header-extra\"],[12],[1,\"\\n\"],[41,[30,0,[\"showTags\"]],[[[1,\"          \"],[10,0],[14,0,\"list-tags\"],[12],[1,\"\\n            \"],[1,[28,[35,3],[[30,3]],[[\"mode\",\"tags\"],[\"list\",[30,3,[\"tags\"]]]]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"siteSettings\",\"topic_featured_link_enabled\"]],[[[1,\"          \"],[1,[28,[35,4],[[30,3]],null]],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,5],[[28,[37,6],[[30,3,[\"isPrivateMessage\"]]],null],[30,3,[\"category\"]]],null],[[[1,\"      \"],[10,0],[14,0,\"topic-category\"],[12],[1,\"\\n\"],[41,[30,3,[\"category\",\"parentCategory\"]],[[[1,\"          \"],[1,[28,[35,7],[[30,3,[\"category\",\"parentCategory\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"        \"],[1,[28,[35,7],[[30,3,[\"category\"]]],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"excerpt\"]],[[[1,\"      \"],[10,0],[14,0,\"post-excerpt\"],[12],[1,[28,[35,8],[[30,0,[\"excerpt\"]]],null]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,5],[[28,[37,6],[[30,1]],null],[30,0,[\"currentUser\"]]],null],[[[1,\"  \"],[10,0],[14,0,\"timeline-controls\"],[12],[1,\"\\n    \"],[8,[39,9],null,[[\"@name\",\"@outletArgs\"],[\"timeline-controls-before\",[28,[37,10],null,[[\"model\"],[[30,3]]]]]],null],[1,\"\\n    \"],[8,[39,11],null,[[\"@topic\",\"@addKeyboardTargetClass\",\"@toggleMultiSelect\",\"@showTopicSlowModeUpdate\",\"@deleteTopic\",\"@recoverTopic\",\"@toggleClosed\",\"@toggleArchived\",\"@toggleVisibility\",\"@showTopicTimerModal\",\"@showFeatureTopic\",\"@showChangeTimestamp\",\"@resetBumpDate\",\"@convertToPublicTopic\",\"@convertToPrivateMessage\"],[[30,3],true,[30,4],[30,5],[30,6],[30,7],[30,8],[30,9],[30,10],[30,11],[30,12],[30,13],[30,14],[30,15],[30,16]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"displayTimeLineScrollArea\"]],[[[1,\"  \"],[10,0],[14,0,\"timeline-scrollarea-wrapper\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"timeline-date-wrapper\"],[12],[1,\"\\n      \"],[10,3],[14,0,\"start-date\"],[15,\"onClick\",[30,0,[\"updatePercentage\"]]],[15,\"title\",[30,0,[\"startDate\"]]],[12],[1,\"\\n        \"],[10,1],[12],[1,\"\\n          \"],[1,[30,0,[\"startDate\"]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"timeline-scrollarea\"],[15,5,[30,0,[\"timelineScrollareaStyle\"]]],[12],[1,\"\\n      \"],[10,0],[14,0,\"timeline-padding\"],[15,5,[30,0,[\"beforePadding\"]]],[15,\"onClick\",[30,0,[\"updatePercentage\"]]],[12],[13],[1,\"\\n      \"],[8,[39,12],null,[[\"@current\",\"@total\",\"@onGoBack\",\"@fullscreen\",\"@showDockedButton\",\"@date\",\"@didStartDrag\",\"@dragMove\",\"@didEndDrag\"],[[30,0,[\"current\"]],[30,0,[\"total\"]],[30,0,[\"onGoBack\"]],[30,1],[30,0,[\"showDockedButton\"]],[30,0,[\"date\"]],[30,0,[\"didStartDrag\"]],[30,0,[\"dragMove\"]],[30,0,[\"didEndDrag\"]]]],null],[1,\"\\n      \"],[10,0],[14,0,\"timeline-padding\"],[15,5,[30,0,[\"afterPadding\"]]],[15,\"onClick\",[30,0,[\"updatePercentage\"]]],[12],[13],[1,\"\\n\\n\"],[41,[28,[37,5],[[30,0,[\"hasBackPosition\"]],[30,0,[\"showButton\"]]],null],[[[1,\"        \"],[10,0],[14,0,\"timeline-last-read\"],[15,5,[30,0,[\"lastReadStyle\"]]],[12],[1,\"\\n          \"],[1,[28,[35,13],[\"minus\"],[[\"class\"],[\"progress\"]]]],[1,\"\\n          \"],[8,[39,14],null,[[\"@onGoBack\"],[[30,0,[\"goBack\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"timeline-date-wrapper\"],[12],[1,\"\\n      \"],[10,3],[14,0,\"now-date\"],[15,\"onClick\",[30,0,[\"updatePercentage\"]]],[12],[1,\"\\n        \"],[10,1],[12],[1,\"\\n          \"],[1,[28,[35,15],[[30,0,[\"nowDate\"]],[30,0,[\"nowDateOptions\"]]],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"timeline-footer-controls\"],[12],[1,\"\\n\"],[41,[30,0,[\"displaySummary\"]],[[[1,\"      \"],[11,\"button\"],[24,0,\"show-summary btn btn-small\"],[16,\"title\",[28,[37,16],[\"summary.short_title\"],null]],[24,4,\"button\"],[4,[38,1],[\"click\",[30,17]],null],[12],[1,\"\\n        \"],[1,[28,[35,13],[\"layer-group\"],null]],[1,\"\\n        \"],[1,[28,[35,16],[\"summary.short_label\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,5],[[30,0,[\"currentUser\"]],[28,[37,6],[[30,1]],null]],null],[[[41,[30,0,[\"canCreatePost\"]],[[[1,\"        \"],[11,\"button\"],[24,0,\"btn btn-default create reply-to-post no-text btn-icon\"],[16,\"title\",[28,[37,16],[\"topic.reply.help\"],null]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,17],[[30,18],null],null]],null],[12],[1,\"\\n          \"],[1,[28,[35,13],[\"reply\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,1],[[[1,\"      \"],[11,\"button\"],[24,0,\"timeline-open-jump-to-post-prompt-btn btn btn-text jump-to-post\"],[16,\"title\",[28,[37,16],[\"topic.progress.jump_prompt_long\"],null]],[24,4,\"button\"],[4,[38,1],[\"click\",[30,19]],null],[12],[1,\"\\n        \"],[10,1],[14,0,\"d-button-label\"],[12],[1,\"\\n          \"],[1,[28,[35,16],[\"topic.progress.jump_prompt\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"currentUser\"]],[[[1,\"      \"],[8,[39,18],null,[[\"@notificationLevel\",\"@topic\",\"@showFullTitle\",\"@appendReason\",\"@placement\",\"@showCaret\"],[[30,3,[\"details\",\"notification_level\"]],[30,3],false,false,\"bottom-end\",false]],null],[1,\"\\n\"],[41,[30,20],[[[1,\"        \"],[8,[39,11],null,[[\"@topic\",\"@addKeyboardTargetClass\",\"@openUpwards\"],[[30,3],true,true]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"    \"],[8,[39,9],null,[[\"@name\",\"@outletArgs\"],[\"timeline-footer-controls-after\",[28,[37,10],null,[[\"model\"],[[30,3]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"@fullscreen\",\"@jumpTop\",\"@model\",\"@toggleMultiSelect\",\"@showTopicSlowModeUpdate\",\"@deleteTopic\",\"@recoverTopic\",\"@toggleClosed\",\"@toggleArchived\",\"@toggleVisibility\",\"@showTopicTimerModal\",\"@showFeatureTopic\",\"@showChangeTimestamp\",\"@resetBumpDate\",\"@convertToPublicTopic\",\"@convertToPrivateMessage\",\"@showSummary\",\"@replyToPost\",\"@jumpToPostPrompt\",\"@mobileView\"],false,[\"if\",\"on\",\"or\",\"discourse-tags\",\"topic-featured-link\",\"and\",\"not\",\"category-link\",\"html-safe\",\"plugin-outlet\",\"hash\",\"topic-admin-menu-button\",\"topic-timeline/scroller\",\"d-icon\",\"topic-timeline/back-button\",\"age-with-tooltip\",\"i18n\",\"fn\",\"topic-notifications-button\"]]",
    "moduleName": "discourse/components/topic-timeline/container.hbs",
    "isStrictMode": false
  });
  const SCROLLER_HEIGHT = 50;
  _exports.SCROLLER_HEIGHT = SCROLLER_HEIGHT;
  const MIN_SCROLLAREA_HEIGHT = 170;
  const MAX_SCROLLAREA_HEIGHT = 300;
  const LAST_READ_HEIGHT = 20;
  let TopicTimelineScrollArea = (_dec = (0, _decorators.debounce)(50), (_class = class TopicTimelineScrollArea extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "appEvents", _descriptor, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor2, this);
      _initializerDefineProperty(this, "currentUser", _descriptor3, this);
      _initializerDefineProperty(this, "showButton", _descriptor4, this);
      _initializerDefineProperty(this, "current", _descriptor5, this);
      _initializerDefineProperty(this, "percentage", _descriptor6, this);
      _initializerDefineProperty(this, "total", _descriptor7, this);
      _initializerDefineProperty(this, "date", _descriptor8, this);
      _initializerDefineProperty(this, "lastReadPercentage", _descriptor9, this);
      _initializerDefineProperty(this, "lastRead", _descriptor10, this);
      _initializerDefineProperty(this, "lastReadTop", _descriptor11, this);
      _initializerDefineProperty(this, "before", _descriptor12, this);
      _initializerDefineProperty(this, "after", _descriptor13, this);
      _initializerDefineProperty(this, "timelineScrollareaStyle", _descriptor14, this);
      _initializerDefineProperty(this, "dragging", _descriptor15, this);
      _initializerDefineProperty(this, "excerpt", _descriptor16, this);
      _defineProperty(this, "intersectionObserver", null);
      if (!this.args.mobileView) {
        // listen for scrolling event to update timeline
        this.appEvents.on("topic:current-post-scrolled", this.postScrolled);
        // listen for composer sizing changes to update timeline
        this.appEvents.on("composer:opened", this.calculatePosition);
        this.appEvents.on("composer:resized", this.calculatePosition);
        this.appEvents.on("composer:closed", this.calculatePosition);
        this.appEvents.on("post-stream:posted", this.calculatePosition);
      }
      this.intersectionObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const bounds = entry.boundingClientRect;
          if (entry.target.id === "topic-bottom") {
            this.topicBottom = bounds.y + window.scrollY;
          } else {
            this.topicTop = bounds.y + window.scrollY;
          }
        }
      });
      const elements = [document.querySelector(".container.posts"), document.querySelector("#topic-bottom")];
      for (let i = 0; i < elements.length; i++) {
        this.intersectionObserver.observe(elements[i]);
      }
      this.calculatePosition();
      this.dockCheck();
    }
    get displaySummary() {
      return this.siteSettings.summary_timeline_button && !this.args.fullScreen && this.args.model.has_summary && !this.args.model.postStream.summary;
    }
    get displayTimeLineScrollArea() {
      if (this.args.mobileView) {
        return true;
      }
      if (this.total === 1) {
        const postsWrapper = document.querySelector(".posts-wrapper");
        if (postsWrapper && postsWrapper.offsetHeight < 1000) {
          return false;
        }
      }
      return true;
    }
    get canCreatePost() {
      return this.args.model.details?.can_create_post;
    }
    get topicTitle() {
      return (0, _template.htmlSafe)(this.args.mobileView ? this.args.model.fancyTitle : "");
    }
    get showTags() {
      return this.siteSettings.tagging_enabled && this.args.model.tags?.length > 0;
    }
    get style() {
      return (0, _template.htmlSafe)(`height: ${scrollareaHeight()}px`);
    }
    get beforePadding() {
      return (0, _template.htmlSafe)(`height: ${this.before}px`);
    }
    get afterPadding() {
      return (0, _template.htmlSafe)(`height: ${this.after}px`);
    }
    get showDockedButton() {
      return !this.args.mobileView && this.hasBackPosition && !this.showButton;
    }
    get hasBackPosition() {
      return this.lastRead && this.lastRead > 3 && this.lastRead > this.current && Math.abs(this.lastRead - this.current) > 3 && Math.abs(this.lastRead - this.total) > 1 && this.lastRead !== this.total;
    }
    get lastReadStyle() {
      return (0, _template.htmlSafe)(`height: ${LAST_READ_HEIGHT}px; top: ${this.topPosition}px`);
    }
    get topPosition() {
      const bottom = scrollareaHeight() - LAST_READ_HEIGHT / 2;
      return this.lastReadTop > bottom ? bottom : this.lastReadTop;
    }
    get startDate() {
      return timelineDate(this.args.model.createdAt);
    }
    get nowDateOptions() {
      return {
        addAgo: true,
        defaultFormat: timelineDate
      };
    }
    get nowDate() {
      return this.args.model.get("last_posted_at") || this.args.model.get("created_at");
    }
    get lastReadHeight() {
      return Math.round(this.lastReadPercentage * scrollareaHeight());
    }
    calculatePosition() {
      this.timelineScrollareaStyle = (0, _template.htmlSafe)(`height: ${scrollareaHeight()}px`);
      const topic = this.args.model;
      const postStream = topic.postStream;
      this.total = postStream.filteredPostsCount;
      this.scrollPosition = this.clamp(Math.floor(this.total * this.percentage), 0, this.total) + 1;
      this.current = this.clamp(this.scrollPosition, 1, this.total);
      const daysAgo = postStream.closestDaysAgoFor(this.current);
      let date;
      if (daysAgo === undefined) {
        const post = postStream.posts.findBy("id", postStream.stream[this.current]);
        if (post) {
          date = new Date(post.created_at);
        }
      } else if (daysAgo !== null) {
        date = new Date();
        date.setDate(date.getDate() - daysAgo || 0);
      } else {
        date = null;
      }
      this.date = date;
      const lastReadNumber = topic.last_read_post_number;
      const lastReadId = topic.last_read_post_id;
      if (lastReadId && lastReadNumber) {
        const idx = postStream.stream.indexOf(lastReadId) + 1;
        this.lastRead = idx;
        this.lastReadPercentage = this._percentFor(topic, idx);
      }
      if (this.position !== this.scrollPosition) {
        this.position = this.scrollPosition;
        this.updateScrollPosition(this.current);
      }
      this.before = this.scrollareaRemaining() * this.percentage;
      this.after = scrollareaHeight() - this.before - SCROLLER_HEIGHT;
      if (this.percentage === null) {
        return;
      }
      if (this.hasBackPosition) {
        this.lastReadTop = Math.round(this.lastReadPercentage * scrollareaHeight());
        this.showButton = this.before + SCROLLER_HEIGHT - 5 < this.lastReadTop || this.before > this.lastReadTop + 25;
      }
    }
    updateScrollPosition(scrollPosition) {
      // only ran on mobile
      if (!this.args.fullscreen) {
        return;
      }
      const stream = this.args.model.postStream;
      if (!this.position === scrollPosition) {
        return;
      }

      // we have an off by one, stream is zero based,
      stream.excerpt(scrollPosition - 1).then(info => {
        if (info && this.position === scrollPosition) {
          let excerpt = "";
          if (info.username) {
            excerpt = "<span class='username'>" + info.username + ":</span> ";
          }
          if (info.excerpt) {
            this.excerpt = excerpt + info.excerpt;
          } else if (info.action_code) {
            this.excerpt = `${excerpt} ${(0, _postSmallAction.actionDescriptionHtml)(info.action_code, info.created_at, info.username)}`;
          }
        }
      });
    }
    updatePercentage(e) {
      // pageY for mouse and mobile
      const y = e.pageY || e.touches[0].pageY;
      const area = document.querySelector(".timeline-scrollarea");
      const areaTop = _domUtils.default.offset(area).top;
      this.percentage = this.clamp(parseFloat(y - areaTop) / area.offsetHeight);
      this.commit();
    }
    didStartDrag() {
      this.dragging = true;
    }
    dragMove(event) {
      event.stopPropagation();
      event.preventDefault();
      this.updatePercentage(event);
    }
    didEndDrag() {
      this.dragging = false;
      this.commit();
    }
    postScrolled(e) {
      this.current = e.postIndex;
      this.percentage = e.percent;
      this.calculatePosition();
      this.dockCheck();
    }
    goBack() {
      this.args.jumpToIndex(this.lastRead);
    }
    dockCheck() {
      const timeline = document.querySelector(".timeline-container");
      const timelineHeight = timeline && timeline.offsetHeight || 400;
      const prevDockAt = this.dockAt;
      const positionTop = (0, _offsetCalculator.headerOffset)() + window.pageYOffset;
      const currentPosition = positionTop + timelineHeight;
      this.dockBottom = false;
      if (positionTop < this.topicTop) {
        this.dockAt = parseInt(this.topicTop, 10);
      } else if (currentPosition > this.topicBottom) {
        this.dockAt = parseInt(this.topicBottom - timelineHeight, 10);
        this.dockBottom = true;
        if (this.dockAt < 0) {
          this.dockAt = 0;
        }
      } else {
        this.dockAt = null;
      }
      if (this.dockAt !== prevDockAt) {
        if (this.dockAt) {
          this.args.setDocked(true);
          if (this.dockBottom) {
            this.args.setDockedBottom(true);
          }
        } else {
          this.args.setDocked(false);
          this.args.setDockedBottom(false);
        }
      }
    }
    commit() {
      this.calculatePosition();
      if (!this.dragging) {
        if (this.current === this.scrollPosition) {
          this.args.jumpToIndex(this.current);
        } else {
          this.args.jumpEnd();
        }
      }
    }
    clamp(p) {
      let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
      let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
      return Math.max(Math.min(p, max), min);
    }
    scrollareaRemaining() {
      return scrollareaHeight() - SCROLLER_HEIGHT;
    }
    willDestroy() {
      if (!this.args.mobileView) {
        this.intersectionObserver?.disconnect();
        this.intersectionObserver = null;
        this.appEvents.off("composer:opened", this.calculatePosition);
        this.appEvents.off("composer:resized", this.calculatePosition);
        this.appEvents.off("composer:closed", this.calculatePosition);
        this.appEvents.off("topic:current-post-scrolled", this.postScrolled);
        this.appEvents.off("post-stream:posted", this.calculatePosition);
      }
    }
    _percentFor(topic, postIndex) {
      const total = topic.postStream.filteredPostsCount;
      switch (postIndex) {
        // if first post, no top padding
        case 0:
          return 0;
        // if last, no bottom padding
        case total - 1:
          return 1;
        // otherwise, calculate
        default:
          return this.clamp(parseFloat(postIndex) / total);
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "showButton", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "current", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "percentage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this._percentFor(this.args.model, this.args.enteredIndex);
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "total", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "date", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "lastReadPercentage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "lastRead", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "lastReadTop", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "before", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "after", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "timelineScrollareaStyle", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "dragging", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "excerpt", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "";
    }
  }), _applyDecoratedDescriptor(_class.prototype, "calculatePosition", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "calculatePosition"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateScrollPosition", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "updateScrollPosition"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updatePercentage", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "updatePercentage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didStartDrag", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "didStartDrag"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "dragMove", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "dragMove"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didEndDrag", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "didEndDrag"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "postScrolled", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "postScrolled"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "goBack", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "goBack"), _class.prototype)), _class));
  _exports.default = TopicTimelineScrollArea;
  function scrollareaHeight() {
    const composerHeight = document.getElementById("reply-control").offsetHeight || 0,
      headerHeight = document.querySelector(".d-header")?.offsetHeight || 0;

    // scrollarea takes up about half of the timeline's height
    const availableHeight = (window.innerHeight - composerHeight - headerHeight) / 2;
    return Math.max(MIN_SCROLLAREA_HEIGHT, Math.min(availableHeight, MAX_SCROLLAREA_HEIGHT));
  }
  function timelineDate(date) {
    const fmt = date.getFullYear() === new Date().getFullYear() ? "long_no_year_no_time" : "timeline_date";
    return moment(date).format(_I18n.default.t(`dates.${fmt}`));
  }
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, TopicTimelineScrollArea);
});