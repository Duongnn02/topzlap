define("discourse/plugins/discourse-assign/discourse/templates/components/assigned-topic-list", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless skipHeader}}
    <thead class="topic-list-header assigned-topic-list-header">
      {{raw
        "topic-list-header"
        canBulkSelect=canBulkSelect
        canDoBulkActions=canDoBulkActions
        toggleInTitle=toggleInTitle
        hideCategory=hideCategory
        showPosters=true
        showLikes=showLikes
        showOpLikes=showOpLikes
        order=order
        ascending=ascending
        sortable=sortable
        listTitle=listTitle
        bulkSelectEnabled=bulkSelectEnabled
      }}
    </thead>
  {{/unless}}
  
  <tbody class="topic-list-body assigned-topic-list-body">
    {{#each filteredTopics as |topic|}}
      {{assigned-topic-list-item
        topic=topic
        bulkSelectEnabled=bulkSelectEnabled
        showTopicPostBadges=showTopicPostBadges
        hideCategory=hideCategory
        showPosters=true
        showLikes=showLikes
        showOpLikes=showOpLikes
        expandGloballyPinned=expandGloballyPinned
        expandAllPinned=expandAllPinned
        lastVisitedTopic=lastVisitedTopic
        selected=selected
        tagsForUser=tagsForUser
        unassign=unassign
        reassign=reassign
      }}
  
      {{raw "list/visited-line" lastVisitedTopic=lastVisitedTopic topic=topic}}
    {{/each}}
  </tbody>
  */
  {
    "id": "O95DvF5O",
    "block": "[[[41,[51,[33,1]],[[[1,\"  \"],[10,\"thead\"],[14,0,\"topic-list-header assigned-topic-list-header\"],[12],[1,\"\\n    \"],[1,[28,[35,2],[\"topic-list-header\"],[[\"canBulkSelect\",\"canDoBulkActions\",\"toggleInTitle\",\"hideCategory\",\"showPosters\",\"showLikes\",\"showOpLikes\",\"order\",\"ascending\",\"sortable\",\"listTitle\",\"bulkSelectEnabled\"],[[33,3],[33,4],[33,5],[33,6],true,[33,7],[33,8],[33,9],[33,10],[33,11],[33,12],[33,13]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,\"tbody\"],[14,0,\"topic-list-body assigned-topic-list-body\"],[12],[1,\"\\n\"],[42,[28,[37,15],[[28,[37,15],[[33,16]],null]],null],null,[[[1,\"    \"],[1,[28,[35,17],null,[[\"topic\",\"bulkSelectEnabled\",\"showTopicPostBadges\",\"hideCategory\",\"showPosters\",\"showLikes\",\"showOpLikes\",\"expandGloballyPinned\",\"expandAllPinned\",\"lastVisitedTopic\",\"selected\",\"tagsForUser\",\"unassign\",\"reassign\"],[[30,1],[33,13],[33,18],[33,6],true,[33,7],[33,8],[33,19],[33,20],[33,21],[33,22],[33,23],[33,24],[33,25]]]]],[1,\"\\n\\n    \"],[1,[28,[35,2],[\"list/visited-line\"],[[\"lastVisitedTopic\",\"topic\"],[[33,21],[30,1]]]]],[1,\"\\n\"]],[1]],null],[13]],[\"topic\"],false,[\"unless\",\"skipHeader\",\"raw\",\"canBulkSelect\",\"canDoBulkActions\",\"toggleInTitle\",\"hideCategory\",\"showLikes\",\"showOpLikes\",\"order\",\"ascending\",\"sortable\",\"listTitle\",\"bulkSelectEnabled\",\"each\",\"-track-array\",\"filteredTopics\",\"assigned-topic-list-item\",\"showTopicPostBadges\",\"expandGloballyPinned\",\"expandAllPinned\",\"lastVisitedTopic\",\"selected\",\"tagsForUser\",\"unassign\",\"reassign\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/components/assigned-topic-list.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});