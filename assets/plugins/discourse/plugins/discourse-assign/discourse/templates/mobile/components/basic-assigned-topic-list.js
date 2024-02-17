define("discourse/plugins/discourse-assign/discourse/templates/mobile/components/basic-assigned-topic-list", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
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
      <table class="topic-list assigned-topic-list">
        <tbody class="topic-list-body assigned-topic-list-body">
          {{#each topics as |t|}}
            {{assigned-topic-list-item
              topic=t
              expandGloballyPinned=expandGloballyPinned
              expandAllPinned=expandAllPinned
              lastVisitedTopic=lastVisitedTopic
              selected=selected
              tagsForUser=tagsForUser
              unassign=unassign
              reassign=reassign
            }}
          {{/each}}
        </tbody>
      </table>
    {{else}}
      <div class="alert alert-info">
        {{i18n "choose_topic.none_found"}}
      </div>
    {{/if}}
  </ConditionalLoadingSpinner>
  */
  {
    "id": "sIEC2Iv9",
    "block": "[[[8,[39,0],null,[[\"@condition\"],[[99,1,[\"@condition\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[33,3],[[[1,\"    \"],[10,0],[14,0,\"show-mores\"],[12],[1,\"\\n      \"],[11,3],[24,6,\"\"],[24,0,\"alert alert-info clickable\"],[4,[38,4],[[30,0],[33,5]],null],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@key\",\"@suffix\",\"@count\"],[\"topic_count_\",\"latest\",[99,7,[\"@count\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[33,8],[[[1,\"    \"],[10,\"table\"],[14,0,\"topic-list assigned-topic-list\"],[12],[1,\"\\n      \"],[10,\"tbody\"],[14,0,\"topic-list-body assigned-topic-list-body\"],[12],[1,\"\\n\"],[42,[28,[37,10],[[28,[37,10],[[33,8]],null]],null],null,[[[1,\"          \"],[1,[28,[35,11],null,[[\"topic\",\"expandGloballyPinned\",\"expandAllPinned\",\"lastVisitedTopic\",\"selected\",\"tagsForUser\",\"unassign\",\"reassign\"],[[30,1],[33,12],[33,13],[33,14],[33,15],[33,16],[33,17],[33,18]]]]],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,\"\\n      \"],[1,[28,[35,19],[\"choose_topic.none_found\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]]],[]]]]]],[\"t\"],false,[\"conditional-loading-spinner\",\"loading\",\"if\",\"hasIncoming\",\"action\",\"showInserted\",\"count-i18n\",\"incomingCount\",\"topics\",\"each\",\"-track-array\",\"assigned-topic-list-item\",\"expandGloballyPinned\",\"expandAllPinned\",\"lastVisitedTopic\",\"selected\",\"tagsForUser\",\"unassign\",\"reassign\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/mobile/components/basic-assigned-topic-list.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});