define("discourse/components/reviewable-scores", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.reviewable.reviewable_scores}}
    <div class="reviewable-scores__table-wrapper">
      <table class="reviewable-scores">
        <thead>
          <tr>
            <th>{{i18n "review.scores.submitted_by"}}</th>
            <th>{{i18n "review.scores.date"}}</th>
            <th>{{i18n "review.scores.type"}}</th>
            <th>{{i18n "review.scores.reviewed_by"}}</th>
            <th>{{i18n "review.scores.reviewed_timestamp"}}</th>
            <th>{{i18n "review.scores.status"}}</th>
          </tr>
        </thead>
        <tbody>
          {{#each this.reviewable.reviewable_scores as |rs|}}
            <ReviewableScore @rs={{rs}} @reviewable={{this.reviewable}} />
          {{/each}}
        </tbody>
      </table>
    </div>
  
    {{#each this.reviewable.reviewable_scores as |rs|}}
      {{#if rs.reason}}
        <div class="reviewable-score-reason">{{html-safe rs.reason}}</div>
      {{/if}}
  
      {{#if rs.reviewable_conversation}}
        <div class="reviewable-conversation">
          {{#each rs.reviewable_conversation.conversation_posts as |p index|}}
            <ReviewableConversationPost @post={{p}} @index={{index}} />
          {{/each}}
          <div class="controls">
            <a
              href={{rs.reviewable_conversation.permalink}}
              class="btn btn-small"
            >
              {{i18n "review.conversation.view_full"}}
            </a>
          </div>
        </div>
      {{/if}}
    {{/each}}
  
  {{/if}}
  */
  {
    "id": "YdwCcfyc",
    "block": "[[[41,[30,0,[\"reviewable\",\"reviewable_scores\"]],[[[1,\"  \"],[10,0],[14,0,\"reviewable-scores__table-wrapper\"],[12],[1,\"\\n    \"],[10,\"table\"],[14,0,\"reviewable-scores\"],[12],[1,\"\\n      \"],[10,\"thead\"],[12],[1,\"\\n        \"],[10,\"tr\"],[12],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.scores.submitted_by\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.scores.date\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.scores.type\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.scores.reviewed_by\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.scores.reviewed_timestamp\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.scores.status\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"reviewable\",\"reviewable_scores\"]]],null]],null],null,[[[1,\"          \"],[8,[39,4],null,[[\"@rs\",\"@reviewable\"],[[30,1],[30,0,[\"reviewable\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"reviewable\",\"reviewable_scores\"]]],null]],null],null,[[[41,[30,2,[\"reason\"]],[[[1,\"      \"],[10,0],[14,0,\"reviewable-score-reason\"],[12],[1,[28,[35,5],[[30,2,[\"reason\"]]],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,2,[\"reviewable_conversation\"]],[[[1,\"      \"],[10,0],[14,0,\"reviewable-conversation\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,2,[\"reviewable_conversation\",\"conversation_posts\"]]],null]],null],null,[[[1,\"          \"],[8,[39,6],null,[[\"@post\",\"@index\"],[[30,3],[30,4]]],null],[1,\"\\n\"]],[3,4]],null],[1,\"        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[10,3],[15,6,[30,2,[\"reviewable_conversation\",\"permalink\"]]],[14,0,\"btn btn-small\"],[12],[1,\"\\n            \"],[1,[28,[35,1],[\"review.conversation.view_full\"],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[2]],null],[1,\"\\n\"]],[]],null]],[\"rs\",\"rs\",\"p\",\"index\"],false,[\"if\",\"i18n\",\"each\",\"-track-array\",\"reviewable-score\",\"html-safe\",\"reviewable-conversation-post\"]]",
    "moduleName": "discourse/components/reviewable-scores.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});