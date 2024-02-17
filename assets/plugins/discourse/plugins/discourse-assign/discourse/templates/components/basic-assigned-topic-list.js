define("discourse/plugins/discourse-assign/discourse/templates/components/basic-assigned-topic-list", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <ConditionalLoadingSpinner @condition={{loading}}>
    {{#if hasIncoming}}
      <div class="show-mores">
        <a href class="alert alert-info clickable" {{action showInserted}}>
          <CountI18n
            @key="topic_count_"
            @suffix="latest"
            @count={{incomingCount}}
          />
        </a>
      </div>
    {{/if}}
  
    {{#if topics}}
      {{assigned-topic-list
        showPosters=showPosters
        hideCategory=hideCategory
        topics=topics
        expandExcerpts=expandExcerpts
        bulkSelectEnabled=bulkSelectEnabled
        canBulkSelect=canBulkSelect
        bulkSelectAction=bulkSelectAction
        selected=selected
        skipHeader=skipHeader
        tagsForUser=tagsForUser
        changeSort=changeSort
        toggleBulkSelect=toggleBulkSelect
        unassign=unassign
        reassign=reassign
        onScroll=onScroll
        scrollOnLoad=scrollOnLoad
      }}
    {{else}}
      {{#unless loadingMore}}
        <div class="alert alert-info">
          {{i18n "choose_topic.none_found"}}
        </div>
      {{/unless}}
    {{/if}}
  </ConditionalLoadingSpinner>
  */
  {
    "id": "L5JeBmzj",
    "block": "[[[8,[39,0],null,[[\"@condition\"],[[99,1,[\"@condition\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[33,3],[[[1,\"    \"],[10,0],[14,0,\"show-mores\"],[12],[1,\"\\n      \"],[11,3],[24,6,\"\"],[24,0,\"alert alert-info clickable\"],[4,[38,4],[[30,0],[33,5]],null],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@key\",\"@suffix\",\"@count\"],[\"topic_count_\",\"latest\",[99,7,[\"@count\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[33,8],[[[1,\"    \"],[1,[28,[35,9],null,[[\"showPosters\",\"hideCategory\",\"topics\",\"expandExcerpts\",\"bulkSelectEnabled\",\"canBulkSelect\",\"bulkSelectAction\",\"selected\",\"skipHeader\",\"tagsForUser\",\"changeSort\",\"toggleBulkSelect\",\"unassign\",\"reassign\",\"onScroll\",\"scrollOnLoad\"],[[33,10],[33,11],[33,8],[33,12],[33,13],[33,14],[33,15],[33,16],[33,17],[33,18],[33,19],[33,20],[33,21],[33,22],[33,23],[33,24]]]]],[1,\"\\n\"]],[]],[[[41,[51,[33,26]],[[[1,\"      \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,\"\\n        \"],[1,[28,[35,27],[\"choose_topic.none_found\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]]]],[]]]]]],[],false,[\"conditional-loading-spinner\",\"loading\",\"if\",\"hasIncoming\",\"action\",\"showInserted\",\"count-i18n\",\"incomingCount\",\"topics\",\"assigned-topic-list\",\"showPosters\",\"hideCategory\",\"expandExcerpts\",\"bulkSelectEnabled\",\"canBulkSelect\",\"bulkSelectAction\",\"selected\",\"skipHeader\",\"tagsForUser\",\"changeSort\",\"toggleBulkSelect\",\"unassign\",\"reassign\",\"onScroll\",\"scrollOnLoad\",\"unless\",\"loadingMore\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/components/basic-assigned-topic-list.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});