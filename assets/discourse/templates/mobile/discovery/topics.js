define("discourse/templates/mobile/discovery/topics", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <TopicDismissButtons
    @position="top"
    @selectedTopics={{this.selected}}
    @model={{this.model}}
    @showResetNew={{this.showResetNew}}
    @showDismissRead={{this.showDismissRead}}
    @resetNew={{action "resetNew"}}
  />
  
  <DiscoveryTopicsList
    @model={{this.model}}
    @refresh={{action "refresh"}}
    @incomingCount={{this.topicTrackingState.incomingCount}}
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
        <a
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
      {{/if}}
    {{/if}}
  
    {{#if this.hasTopics}}
      <TopicList
        @ascending={{this.ascending}}
        @highlightLastVisited={{true}}
        @showPosters={{true}}
        @canBulkSelect={{this.canBulkSelect}}
        @toggleBulkSelect={{action "toggleBulkSelect"}}
        @updateAutoAddTopicsToBulkSelect={{action
          "updateAutoAddTopicsToBulkSelect"
        }}
        @hideCategory={{this.model.hideCategory}}
        @order={{this.order}}
        @bulkSelectEnabled={{this.bulkSelectEnabled}}
        @bulkSelectAction={{action "refresh"}}
        @selected={{this.selected}}
        @expandGloballyPinned={{this.expandGloballyPinned}}
        @expandAllPinned={{this.expandAllPinned}}
        @category={{this.category}}
        @topics={{this.model.topics}}
        @scrollOnLoad={{true}}
        @onScroll={{discoveryTopicList.saveScrollPosition}}
      />
    {{/if}}
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
    "id": "wnE0WqIU",
    "block": "[[[8,[39,0],null,[[\"@position\",\"@selectedTopics\",\"@model\",\"@showResetNew\",\"@showDismissRead\",\"@resetNew\"],[\"top\",[30,0,[\"selected\"]],[30,0,[\"model\"]],[30,0,[\"showResetNew\"]],[30,0,[\"showDismissRead\"]],[28,[37,1],[[30,0],\"resetNew\"],null]]],null],[1,\"\\n\\n\"],[8,[39,2],null,[[\"@model\",\"@refresh\",\"@incomingCount\"],[[30,0,[\"model\"]],[28,[37,1],[[30,0],\"refresh\"],null],[30,0,[\"topicTrackingState\",\"incomingCount\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"top\"]],[[[1,\"    \"],[10,0],[14,0,\"top-lists\"],[12],[1,\"\\n      \"],[8,[39,4],null,[[\"@period\",\"@action\",\"@fullDay\"],[[30,0,[\"period\"]],[28,[37,1],[[30,0],\"changePeriod\"],null],false]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"topicTrackingState\",\"hasIncoming\"]],[[[1,\"      \"],[11,3],[24,6,\"\"],[24,0,\"alert alert-info clickable\"],[4,[38,5],[\"click\",[30,0,[\"showInserted\"]]],null],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@key\",\"@suffix\",\"@count\"],[\"topic_count_\",[30,0,[\"topicTrackingState\",\"filter\"]],[30,0,[\"topicTrackingState\",\"incomingCount\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"\\n\"],[41,[30,0,[\"hasTopics\"]],[[[1,\"    \"],[8,[39,7],null,[[\"@ascending\",\"@highlightLastVisited\",\"@showPosters\",\"@canBulkSelect\",\"@toggleBulkSelect\",\"@updateAutoAddTopicsToBulkSelect\",\"@hideCategory\",\"@order\",\"@bulkSelectEnabled\",\"@bulkSelectAction\",\"@selected\",\"@expandGloballyPinned\",\"@expandAllPinned\",\"@category\",\"@topics\",\"@scrollOnLoad\",\"@onScroll\"],[[30,0,[\"ascending\"]],true,true,[30,0,[\"canBulkSelect\"]],[28,[37,1],[[30,0],\"toggleBulkSelect\"],null],[28,[37,1],[[30,0],\"updateAutoAddTopicsToBulkSelect\"],null],[30,0,[\"model\",\"hideCategory\"]],[30,0,[\"order\"]],[30,0,[\"bulkSelectEnabled\"]],[28,[37,1],[[30,0],\"refresh\"],null],[30,0,[\"selected\"]],[30,0,[\"expandGloballyPinned\"]],[30,0,[\"expandAllPinned\"]],[30,0,[\"category\"]],[30,0,[\"model\",\"topics\"]],true,[30,1,[\"saveScrollPosition\"]]]],null],[1,\"\\n\"]],[]],null]],[1]]]]],[1,\"\\n\\n\"],[10,\"footer\"],[14,0,\"topic-list-bottom\"],[12],[1,\"\\n  \"],[8,[39,8],null,[[\"@condition\"],[[30,0,[\"model\",\"loadingMore\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"allLoaded\"]],[[[1,\"    \"],[8,[39,0],null,[[\"@position\",\"@selectedTopics\",\"@model\",\"@showResetNew\",\"@showDismissRead\",\"@resetNew\"],[\"bottom\",[30,0,[\"selected\"]],[30,0,[\"model\"]],[30,0,[\"showResetNew\"]],[30,0,[\"showDismissRead\"]],[28,[37,1],[[30,0],\"resetNew\"],null]]],null],[1,\"\\n\\n    \"],[8,[39,9],null,[[\"@education\",\"@message\"],[[30,0,[\"footerEducation\"]],[30,0,[\"footerMessage\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"latest\"]],[[[41,[30,0,[\"canCreateTopicOnCategory\"]],[[[1,\"          \"],[8,[39,10],null,[[\"@action\",\"@text\"],[[28,[37,11],[\"createTopic\"],null],\"topic.suggest_create_topic\"]],null],[1,\"\\n\"]],[]],null]],[]],[[[41,[30,0,[\"top\"]],[[[1,\"        \"],[1,[28,[35,12],[[28,[37,13],[\"topic.browse_all_categories_latest_or_top\"],[[\"basePath\"],[[28,[37,14],null,null]]]]],null]],[1,\"\\n        \"],[8,[39,15],null,[[\"@period\",\"@action\"],[[30,0,[\"period\"]],[28,[37,1],[[30,0],\"changePeriod\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[28,[35,12],[[28,[37,13],[\"topic.browse_all_categories_latest\"],[[\"basePath\"],[[28,[37,14],null,null]]]]],null]],[1,\"\\n      \"]],[]]]],[]]],[1,\"    \"]],[]]]]],[1,\"\\n\"]],[]],null],[13]],[\"discoveryTopicList\"],false,[\"topic-dismiss-buttons\",\"action\",\"discovery-topics-list\",\"if\",\"period-chooser\",\"on\",\"count-i18n\",\"topic-list\",\"conditional-loading-spinner\",\"footer-message\",\"discourse-linked-text\",\"route-action\",\"html-safe\",\"i18n\",\"base-path\",\"top-period-buttons\"]]",
    "moduleName": "discourse/templates/mobile/discovery/topics.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});