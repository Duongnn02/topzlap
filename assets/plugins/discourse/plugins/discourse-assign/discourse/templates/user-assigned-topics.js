define("discourse/plugins/discourse-assign/discourse/templates/user-assigned-topics", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if doesntHaveAssignments}}
    <EmptyState
      @title={{i18n "user.no_assignments_title"}}
      @body={{emptyStateBody}}
    />
  {{else}}
    <div class="topic-search-div">
      <div class="inline-form full-width">
        <Input
          class="no-blur"
          @value={{readonly search}}
          placeholder={{i18n "discourse_assign.topic_search_placeholder"}}
          autocomplete="off"
          @type="search"
          {{on "input" (action "onChangeFilter" value="target.value")}}
        />
      </div>
    </div>
  
    <LoadMore
      @class="paginated-topics-list"
      @selector=".paginated-topics-list .topic-list tr"
      @action={{action "loadMore"}}
    >
      {{basic-assigned-topic-list
        topicList=model
        hideCategory=hideCategory
        showPosters=true
        bulkSelectEnabled=bulkSelectEnabled
        selected=selected
        hasIncoming=hasIncoming
        incomingCount=incomingCount
        showInserted=(action "showInserted")
        tagsForUser=tagsForUser
        changeSort=(action "changeSort")
        unassign=(action "unassign")
        reassign=(action "reassign")
        onScroll=saveScrollPosition
        scrollOnLoad=true
      }}
  
      <ConditionalLoadingSpinner @condition={{model.loadingMore}} />
    </LoadMore>
  {{/if}}
  */
  {
    "id": "9vkYqENC",
    "block": "[[[41,[33,1],[[[1,\"  \"],[8,[39,2],null,[[\"@title\",\"@body\"],[[28,[37,3],[\"user.no_assignments_title\"],null],[99,4,[\"@body\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"topic-search-div\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"inline-form full-width\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"no-blur\"],[16,\"placeholder\",[28,[37,3],[\"discourse_assign.topic_search_placeholder\"],null]],[24,\"autocomplete\",\"off\"],[4,[38,8],[\"input\",[28,[37,9],[[30,0],\"onChangeFilter\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@value\",\"@type\"],[[28,[37,6],[[33,7]],null],\"search\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,10],null,[[\"@class\",\"@selector\",\"@action\"],[\"paginated-topics-list\",\".paginated-topics-list .topic-list tr\",[28,[37,9],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,11],null,[[\"topicList\",\"hideCategory\",\"showPosters\",\"bulkSelectEnabled\",\"selected\",\"hasIncoming\",\"incomingCount\",\"showInserted\",\"tagsForUser\",\"changeSort\",\"unassign\",\"reassign\",\"onScroll\",\"scrollOnLoad\"],[[33,12],[33,13],true,[33,14],[33,15],[33,16],[33,17],[28,[37,9],[[30,0],\"showInserted\"],null],[33,18],[28,[37,9],[[30,0],\"changeSort\"],null],[28,[37,9],[[30,0],\"unassign\"],null],[28,[37,9],[[30,0],\"reassign\"],null],[33,19],true]]]],[1,\"\\n\\n    \"],[8,[39,20],null,[[\"@condition\"],[[33,12,[\"loadingMore\"]]]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"doesntHaveAssignments\",\"empty-state\",\"i18n\",\"emptyStateBody\",\"input\",\"readonly\",\"search\",\"on\",\"action\",\"load-more\",\"basic-assigned-topic-list\",\"model\",\"hideCategory\",\"bulkSelectEnabled\",\"selected\",\"hasIncoming\",\"incomingCount\",\"tagsForUser\",\"saveScrollPosition\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/user-assigned-topics.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});