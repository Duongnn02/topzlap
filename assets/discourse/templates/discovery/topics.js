define("discourse/templates/discovery/topics", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.redirectedReason}}
    <div class="alert alert-info">{{this.redirectedReason}}</div>
  {{/if}}
  
  <TopicDismissButtons
    @position="top"
    @selectedTopics={{this.selected}}
    @model={{this.model}}
    @showResetNew={{this.showResetNew}}
    @showDismissRead={{this.showDismissRead}}
    @resetNew={{action "resetNew"}}
  />
  
  {{#if this.model.sharedDrafts}}
    <TopicList
      @class="shared-drafts"
      @listTitle="shared_drafts.title"
      @top={{this.top}}
      @hideCategory="true"
      @category={{this.category}}
      @topics={{this.model.sharedDrafts}}
      @discoveryList={{true}}
    />
  {{/if}}
  
  <DiscoveryTopicsList
    @model={{this.model}}
    @refresh={{action "refresh"}}
    @loadingComplete={{action "loadingComplete"}}
    @incomingCount={{this.topicTrackingState.incomingCount}}
    @autoAddTopicsToBulkSelect={{this.autoAddTopicsToBulkSelect}}
    @bulkSelectEnabled={{this.bulkSelectEnabled}}
    @addTopicsToBulkSelect={{action "addTopicsToBulkSelect"}}
    as |discoveryTopicList|
  >
    {{#if this.top}}
      <div class="top-lists">
        <PeriodChooser
          @period={{this.period}}
          @action={{action "changePeriod"}}
          @fullDay={{false}}
        />
      </div>
    {{else}}
      {{#if this.topicTrackingState.hasIncoming}}
        <div class="show-more {{if this.hasTopics 'has-topics'}}">
          <a
            tabindex="0"
            href
            {{on "click" this.showInserted}}
            class="alert alert-info clickable"
          >
            <CountI18n
              @key="topic_count_"
              @suffix={{this.topicTrackingState.filter}}
              @count={{this.topicTrackingState.incomingCount}}
            />
          </a>
        </div>
      {{/if}}
    {{/if}}
    <span>
      <PluginOutlet
        @name="before-topic-list"
        @connectorTagName="div"
        @outletArgs={{hash category=this.category}}
      />
    </span>
  
    {{#if this.hasTopics}}
      <TopicList
        @highlightLastVisited={{true}}
        @top={{this.top}}
        @showTopicPostBadges={{this.showTopicPostBadges}}
        @showPosters={{true}}
        @canBulkSelect={{this.canBulkSelect}}
        @changeSort={{route-action "changeSort"}}
        @toggleBulkSelect={{action "toggleBulkSelect"}}
        @updateAutoAddTopicsToBulkSelect={{action
          "updateAutoAddTopicsToBulkSelect"
        }}
        @hideCategory={{this.model.hideCategory}}
        @order={{this.order}}
        @ascending={{this.ascending}}
        @bulkSelectEnabled={{this.bulkSelectEnabled}}
        @bulkSelectAction={{action "refresh"}}
        @selected={{this.selected}}
        @expandGloballyPinned={{this.expandGloballyPinned}}
        @expandAllPinned={{this.expandAllPinned}}
        @category={{this.category}}
        @topics={{this.model.topics}}
        @discoveryList={{true}}
        @scrollOnLoad={{true}}
        @onScroll={{discoveryTopicList.saveScrollPosition}}
        @focusLastVisitedTopic={{true}}
      />
    {{/if}}
  
    <span>
      <PluginOutlet
        @name="after-topic-list"
        @connectorTagName="div"
        @outletArgs={{hash category=this.category}}
      />
    </span>
  </DiscoveryTopicsList>
  
  <footer class="topic-list-bottom">
    <ConditionalLoadingSpinner @condition={{this.model.loadingMore}} />
    {{#if this.allLoaded}}
      <TopicDismissButtons
        @position="bottom"
        @selectedTopics={{this.selected}}
        @model={{this.model}}
        @showResetNew={{this.showResetNew}}
        @showDismissRead={{this.showDismissRead}}
        @resetNew={{action "resetNew"}}
      />
  
      <FooterMessage
        @education={{this.footerEducation}}
        @message={{this.footerMessage}}
      >
        {{#if this.latest}}
          {{#if this.canCreateTopicOnCategory}}
            <DiscourseLinkedText
              @action={{route-action "createTopic"}}
              @text="topic.suggest_create_topic"
            />
          {{/if}}
        {{else if this.top}}
          {{html-safe
            (i18n
              "topic.browse_all_categories_latest_or_top" basePath=(base-path)
            )
          }}
          <TopPeriodButtons
            @period={{this.period}}
            @action={{action "changePeriod"}}
          />
        {{else}}
          {{html-safe
            (i18n "topic.browse_all_categories_latest" basePath=(base-path))
          }}
        {{/if}}
      </FooterMessage>
    {{/if}}
  </footer>
  */
  {
    "id": "yTj0ueRi",
    "block": "[[[41,[30,0,[\"redirectedReason\"]],[[[1,\"  \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,[30,0,[\"redirectedReason\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[8,[39,1],null,[[\"@position\",\"@selectedTopics\",\"@model\",\"@showResetNew\",\"@showDismissRead\",\"@resetNew\"],[\"top\",[30,0,[\"selected\"]],[30,0,[\"model\"]],[30,0,[\"showResetNew\"]],[30,0,[\"showDismissRead\"]],[28,[37,2],[[30,0],\"resetNew\"],null]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"sharedDrafts\"]],[[[1,\"  \"],[8,[39,3],null,[[\"@class\",\"@listTitle\",\"@top\",\"@hideCategory\",\"@category\",\"@topics\",\"@discoveryList\"],[\"shared-drafts\",\"shared_drafts.title\",[30,0,[\"top\"]],\"true\",[30,0,[\"category\"]],[30,0,[\"model\",\"sharedDrafts\"]],true]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[8,[39,4],null,[[\"@model\",\"@refresh\",\"@loadingComplete\",\"@incomingCount\",\"@autoAddTopicsToBulkSelect\",\"@bulkSelectEnabled\",\"@addTopicsToBulkSelect\"],[[30,0,[\"model\"]],[28,[37,2],[[30,0],\"refresh\"],null],[28,[37,2],[[30,0],\"loadingComplete\"],null],[30,0,[\"topicTrackingState\",\"incomingCount\"]],[30,0,[\"autoAddTopicsToBulkSelect\"]],[30,0,[\"bulkSelectEnabled\"]],[28,[37,2],[[30,0],\"addTopicsToBulkSelect\"],null]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"top\"]],[[[1,\"    \"],[10,0],[14,0,\"top-lists\"],[12],[1,\"\\n      \"],[8,[39,5],null,[[\"@period\",\"@action\",\"@fullDay\"],[[30,0,[\"period\"]],[28,[37,2],[[30,0],\"changePeriod\"],null],false]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"topicTrackingState\",\"hasIncoming\"]],[[[1,\"      \"],[10,0],[15,0,[29,[\"show-more \",[52,[30,0,[\"hasTopics\"]],\"has-topics\"]]]],[12],[1,\"\\n        \"],[11,3],[24,\"tabindex\",\"0\"],[24,6,\"\"],[24,0,\"alert alert-info clickable\"],[4,[38,6],[\"click\",[30,0,[\"showInserted\"]]],null],[12],[1,\"\\n          \"],[8,[39,7],null,[[\"@key\",\"@suffix\",\"@count\"],[\"topic_count_\",[30,0,[\"topicTrackingState\",\"filter\"]],[30,0,[\"topicTrackingState\",\"incomingCount\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"before-topic-list\",\"div\",[28,[37,9],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"hasTopics\"]],[[[1,\"    \"],[8,[39,3],null,[[\"@highlightLastVisited\",\"@top\",\"@showTopicPostBadges\",\"@showPosters\",\"@canBulkSelect\",\"@changeSort\",\"@toggleBulkSelect\",\"@updateAutoAddTopicsToBulkSelect\",\"@hideCategory\",\"@order\",\"@ascending\",\"@bulkSelectEnabled\",\"@bulkSelectAction\",\"@selected\",\"@expandGloballyPinned\",\"@expandAllPinned\",\"@category\",\"@topics\",\"@discoveryList\",\"@scrollOnLoad\",\"@onScroll\",\"@focusLastVisitedTopic\"],[true,[30,0,[\"top\"]],[30,0,[\"showTopicPostBadges\"]],true,[30,0,[\"canBulkSelect\"]],[28,[37,10],[\"changeSort\"],null],[28,[37,2],[[30,0],\"toggleBulkSelect\"],null],[28,[37,2],[[30,0],\"updateAutoAddTopicsToBulkSelect\"],null],[30,0,[\"model\",\"hideCategory\"]],[30,0,[\"order\"]],[30,0,[\"ascending\"]],[30,0,[\"bulkSelectEnabled\"]],[28,[37,2],[[30,0],\"refresh\"],null],[30,0,[\"selected\"]],[30,0,[\"expandGloballyPinned\"]],[30,0,[\"expandAllPinned\"]],[30,0,[\"category\"]],[30,0,[\"model\",\"topics\"]],true,true,[30,1,[\"saveScrollPosition\"]],true]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"after-topic-list\",\"div\",[28,[37,9],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[1]]]]],[1,\"\\n\\n\"],[10,\"footer\"],[14,0,\"topic-list-bottom\"],[12],[1,\"\\n  \"],[8,[39,11],null,[[\"@condition\"],[[30,0,[\"model\",\"loadingMore\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"allLoaded\"]],[[[1,\"    \"],[8,[39,1],null,[[\"@position\",\"@selectedTopics\",\"@model\",\"@showResetNew\",\"@showDismissRead\",\"@resetNew\"],[\"bottom\",[30,0,[\"selected\"]],[30,0,[\"model\"]],[30,0,[\"showResetNew\"]],[30,0,[\"showDismissRead\"]],[28,[37,2],[[30,0],\"resetNew\"],null]]],null],[1,\"\\n\\n    \"],[8,[39,12],null,[[\"@education\",\"@message\"],[[30,0,[\"footerEducation\"]],[30,0,[\"footerMessage\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"latest\"]],[[[41,[30,0,[\"canCreateTopicOnCategory\"]],[[[1,\"          \"],[8,[39,13],null,[[\"@action\",\"@text\"],[[28,[37,10],[\"createTopic\"],null],\"topic.suggest_create_topic\"]],null],[1,\"\\n\"]],[]],null]],[]],[[[41,[30,0,[\"top\"]],[[[1,\"        \"],[1,[28,[35,14],[[28,[37,15],[\"topic.browse_all_categories_latest_or_top\"],[[\"basePath\"],[[28,[37,16],null,null]]]]],null]],[1,\"\\n        \"],[8,[39,17],null,[[\"@period\",\"@action\"],[[30,0,[\"period\"]],[28,[37,2],[[30,0],\"changePeriod\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[28,[35,14],[[28,[37,15],[\"topic.browse_all_categories_latest\"],[[\"basePath\"],[[28,[37,16],null,null]]]]],null]],[1,\"\\n      \"]],[]]]],[]]],[1,\"    \"]],[]]]]],[1,\"\\n\"]],[]],null],[13]],[\"discoveryTopicList\"],false,[\"if\",\"topic-dismiss-buttons\",\"action\",\"topic-list\",\"discovery-topics-list\",\"period-chooser\",\"on\",\"count-i18n\",\"plugin-outlet\",\"hash\",\"route-action\",\"conditional-loading-spinner\",\"footer-message\",\"discourse-linked-text\",\"html-safe\",\"i18n\",\"base-path\",\"top-period-buttons\"]]",
    "moduleName": "discourse/templates/discovery/topics.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});