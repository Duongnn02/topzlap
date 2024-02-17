define("discourse/templates/review-topics", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.reviewableTopics}}
    <table class="reviewable-topics">
      <thead>
        <th>{{i18n "review.topics.topic"}} </th>
        <th>{{i18n "review.topics.reviewable_count"}}</th>
        <th>{{i18n "review.topics.reported_by"}}</th>
        <th></th>
      </thead>
      <tbody>
        {{#each this.reviewableTopics as |rt|}}
          <tr class="reviewable-topic">
            <td class="topic-title">
              <div class="combined-title">
                <TopicStatus @topic={{rt}} />
                <a
                  href={{rt.relative_url}}
                  rel="noopener noreferrer"
                  target="_blank"
                >{{replace-emoji rt.title}}</a>
              </div>
            </td>
            <td class="reviewable-count">
              {{rt.stats.count}}
            </td>
            <td class="reported-by">
              {{i18n "review.topics.unique_users" count=rt.stats.unique_users}}
            </td>
            <td class="reviewable-details">
              <ReviewableClaimedTopic
                @topicId={{rt.id}}
                @claimedBy={{rt.claimed_by}}
              />
              <LinkTo
                @route="review.index"
                @query={{hash topic_id=rt.id}}
                class="btn btn-primary btn-small"
              >
                {{d-icon "list"}}
                <span>{{i18n "review.topics.details"}}</span>
              </LinkTo>
            </td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  {{else}}
    <div class="no-review">
      {{i18n "review.none"}}
    </div>
  {{/if}}
  */
  {
    "id": "RHcd3fA+",
    "block": "[[[41,[30,0,[\"reviewableTopics\"]],[[[1,\"  \"],[10,\"table\"],[14,0,\"reviewable-topics\"],[12],[1,\"\\n    \"],[10,\"thead\"],[12],[1,\"\\n      \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.topics.topic\"],null]],[1,\" \"],[13],[1,\"\\n      \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.topics.reviewable_count\"],null]],[13],[1,\"\\n      \"],[10,\"th\"],[12],[1,[28,[35,1],[\"review.topics.reported_by\"],null]],[13],[1,\"\\n      \"],[10,\"th\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"reviewableTopics\"]]],null]],null],null,[[[1,\"        \"],[10,\"tr\"],[14,0,\"reviewable-topic\"],[12],[1,\"\\n          \"],[10,\"td\"],[14,0,\"topic-title\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"combined-title\"],[12],[1,\"\\n              \"],[8,[39,4],null,[[\"@topic\"],[[30,1]]],null],[1,\"\\n              \"],[10,3],[15,6,[30,1,[\"relative_url\"]]],[14,\"rel\",\"noopener noreferrer\"],[14,\"target\",\"_blank\"],[12],[1,[28,[35,5],[[30,1,[\"title\"]]],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"td\"],[14,0,\"reviewable-count\"],[12],[1,\"\\n            \"],[1,[30,1,[\"stats\",\"count\"]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"td\"],[14,0,\"reported-by\"],[12],[1,\"\\n            \"],[1,[28,[35,1],[\"review.topics.unique_users\"],[[\"count\"],[[30,1,[\"stats\",\"unique_users\"]]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"td\"],[14,0,\"reviewable-details\"],[12],[1,\"\\n            \"],[8,[39,6],null,[[\"@topicId\",\"@claimedBy\"],[[30,1,[\"id\"]],[30,1,[\"claimed_by\"]]]],null],[1,\"\\n            \"],[8,[39,7],[[24,0,\"btn btn-primary btn-small\"]],[[\"@route\",\"@query\"],[\"review.index\",[28,[37,8],null,[[\"topic_id\"],[[30,1,[\"id\"]]]]]]],[[\"default\"],[[[[1,\"\\n              \"],[1,[28,[35,9],[\"list\"],null]],[1,\"\\n              \"],[10,1],[12],[1,[28,[35,1],[\"review.topics.details\"],null]],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"no-review\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"review.none\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"rt\"],false,[\"if\",\"i18n\",\"each\",\"-track-array\",\"topic-status\",\"replace-emoji\",\"reviewable-claimed-topic\",\"link-to\",\"hash\",\"d-icon\"]]",
    "moduleName": "discourse/templates/review-topics.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});