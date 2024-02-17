define("discourse/templates/user-topics-list", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.noContent}}
    <EmptyState
      @title={{this.model.emptyState.title}}
      @body={{this.model.emptyState.body}}
    />
  {{else}}
    <LoadMore
      @class="paginated-topics-list"
      @selector=".paginated-topics-list .topic-list .topic-list-item"
      @action={{action "loadMore"}}
    >
      <TopicDismissButtons
        @position="top"
        @selectedTopics={{this.selected}}
        @model={{this.model}}
        @showResetNew={{this.showResetNew}}
        @showDismissRead={{this.showDismissRead}}
        @resetNew={{action "resetNew"}}
      />
  
      {{#if (gt this.incomingCount 0)}}
        <div class="show-mores">
          <a
            tabindex="0"
            href
            {{on "click" this.showInserted}}
            class="alert alert-info clickable"
          >
            <CountI18n
              @key="topic_count_"
              @suffix="latest"
              @count={{this.incomingCount}}
            />
          </a>
        </div>
      {{/if}}
  
      <BasicTopicList
        @topicList={{this.model}}
        @hideCategory={{this.hideCategory}}
        @showPosters={{this.showPosters}}
        @bulkSelectEnabled={{this.bulkSelectEnabled}}
        @bulkSelectAction={{action "refresh"}}
        @selected={{this.selected}}
        @tagsForUser={{this.tagsForUser}}
        @onScroll={{this.saveScrollPosition}}
        @canBulkSelect={{this.canBulkSelect}}
        @scrollOnLoad={{true}}
        @toggleBulkSelect={{action "toggleBulkSelect"}}
        @updateAutoAddTopicsToBulkSelect={{action
          "updateAutoAddTopicsToBulkSelect"
        }}
      />
  
      <TopicDismissButtons
        @position="bottom"
        @selectedTopics={{this.selected}}
        @model={{this.model}}
        @showResetNew={{this.showResetNew}}
        @showDismissRead={{this.showDismissRead}}
        @resetNew={{action "resetNew"}}
      />
  
      <ConditionalLoadingSpinner @condition={{this.model.loadingMore}} />
    </LoadMore>
  {{/if}}
  */
  {
    "id": "55U39srY",
    "block": "[[[41,[30,0,[\"noContent\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@title\",\"@body\"],[[30,0,[\"model\",\"emptyState\",\"title\"]],[30,0,[\"model\",\"emptyState\",\"body\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[8,[39,2],null,[[\"@class\",\"@selector\",\"@action\"],[\"paginated-topics-list\",\".paginated-topics-list .topic-list .topic-list-item\",[28,[37,3],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n    \"],[8,[39,4],null,[[\"@position\",\"@selectedTopics\",\"@model\",\"@showResetNew\",\"@showDismissRead\",\"@resetNew\"],[\"top\",[30,0,[\"selected\"]],[30,0,[\"model\"]],[30,0,[\"showResetNew\"]],[30,0,[\"showDismissRead\"]],[28,[37,3],[[30,0],\"resetNew\"],null]]],null],[1,\"\\n\\n\"],[41,[28,[37,5],[[30,0,[\"incomingCount\"]],0],null],[[[1,\"      \"],[10,0],[14,0,\"show-mores\"],[12],[1,\"\\n        \"],[11,3],[24,\"tabindex\",\"0\"],[24,6,\"\"],[24,0,\"alert alert-info clickable\"],[4,[38,6],[\"click\",[30,0,[\"showInserted\"]]],null],[12],[1,\"\\n          \"],[8,[39,7],null,[[\"@key\",\"@suffix\",\"@count\"],[\"topic_count_\",\"latest\",[30,0,[\"incomingCount\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,8],null,[[\"@topicList\",\"@hideCategory\",\"@showPosters\",\"@bulkSelectEnabled\",\"@bulkSelectAction\",\"@selected\",\"@tagsForUser\",\"@onScroll\",\"@canBulkSelect\",\"@scrollOnLoad\",\"@toggleBulkSelect\",\"@updateAutoAddTopicsToBulkSelect\"],[[30,0,[\"model\"]],[30,0,[\"hideCategory\"]],[30,0,[\"showPosters\"]],[30,0,[\"bulkSelectEnabled\"]],[28,[37,3],[[30,0],\"refresh\"],null],[30,0,[\"selected\"]],[30,0,[\"tagsForUser\"]],[30,0,[\"saveScrollPosition\"]],[30,0,[\"canBulkSelect\"]],true,[28,[37,3],[[30,0],\"toggleBulkSelect\"],null],[28,[37,3],[[30,0],\"updateAutoAddTopicsToBulkSelect\"],null]]],null],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@position\",\"@selectedTopics\",\"@model\",\"@showResetNew\",\"@showDismissRead\",\"@resetNew\"],[\"bottom\",[30,0,[\"selected\"]],[30,0,[\"model\"]],[30,0,[\"showResetNew\"]],[30,0,[\"showDismissRead\"]],[28,[37,3],[[30,0],\"resetNew\"],null]]],null],[1,\"\\n\\n    \"],[8,[39,9],null,[[\"@condition\"],[[30,0,[\"model\",\"loadingMore\"]]]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"empty-state\",\"load-more\",\"action\",\"topic-dismiss-buttons\",\"gt\",\"on\",\"count-i18n\",\"basic-topic-list\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/user-topics-list.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});