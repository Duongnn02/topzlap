define("discourse/plugins/discourse-assign/discourse/templates/group-topics-list", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
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
      showPosters=showPosters
      bulkSelectEnabled=bulkSelectEnabled
      canBulkSelect=canBulkSelect
      selected=selected
      hasIncoming=hasIncoming
      incomingCount=incomingCount
      showInserted=(action "showInserted")
      tagsForUser=tagsForUser
      changeSort=(action "changeSort")
      toggleBulkSelect=(action "toggleBulkSelect")
      bulkSelectAction=(action "refresh")
      unassign=(action "unassign")
      reassign=(action "reassign")
      onScroll=saveScrollPosition
      scrollOnLoad=true
    }}
  
    <ConditionalLoadingSpinner @condition={{model.loadingMore}} />
  </LoadMore>
  */
  {
    "id": "nU9yr7Qn",
    "block": "[[[10,0],[14,0,\"topic-search-div\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"inline-form full-width\"],[12],[1,\"\\n    \"],[8,[39,0],[[24,0,\"no-blur\"],[16,\"placeholder\",[28,[37,1],[\"discourse_assign.topic_search_placeholder\"],null]],[24,\"autocomplete\",\"off\"],[4,[38,4],[\"input\",[28,[37,5],[[30,0],\"onChangeFilter\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@value\",\"@type\"],[[28,[37,2],[[33,3]],null],\"search\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[8,[39,6],null,[[\"@class\",\"@selector\",\"@action\"],[\"paginated-topics-list\",\".paginated-topics-list .topic-list tr\",[28,[37,5],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n\\n  \"],[1,[28,[35,7],null,[[\"topicList\",\"hideCategory\",\"showPosters\",\"bulkSelectEnabled\",\"canBulkSelect\",\"selected\",\"hasIncoming\",\"incomingCount\",\"showInserted\",\"tagsForUser\",\"changeSort\",\"toggleBulkSelect\",\"bulkSelectAction\",\"unassign\",\"reassign\",\"onScroll\",\"scrollOnLoad\"],[[33,8],[33,9],[33,10],[33,11],[33,12],[33,13],[33,14],[33,15],[28,[37,5],[[30,0],\"showInserted\"],null],[33,16],[28,[37,5],[[30,0],\"changeSort\"],null],[28,[37,5],[[30,0],\"toggleBulkSelect\"],null],[28,[37,5],[[30,0],\"refresh\"],null],[28,[37,5],[[30,0],\"unassign\"],null],[28,[37,5],[[30,0],\"reassign\"],null],[33,17],true]]]],[1,\"\\n\\n  \"],[8,[39,18],null,[[\"@condition\"],[[33,8,[\"loadingMore\"]]]],null],[1,\"\\n\"]],[]]]]]],[],false,[\"input\",\"i18n\",\"readonly\",\"search\",\"on\",\"action\",\"load-more\",\"basic-assigned-topic-list\",\"model\",\"hideCategory\",\"showPosters\",\"bulkSelectEnabled\",\"canBulkSelect\",\"selected\",\"hasIncoming\",\"incomingCount\",\"tagsForUser\",\"saveScrollPosition\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/group-topics-list.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});