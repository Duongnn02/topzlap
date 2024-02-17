define("discourse/plugins/discourse-topic-voting/discourse/templates/connectors/user-activity-bottom/user-voted-topics", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if siteSettings.voting_show_votes_on_profile}}
    {{#link-to "userActivity.votes"}}
      {{d-icon "heart"}}
      {{i18n "topic_voting.vote_title_plural"}}
    {{/link-to}}
  {{/if}}
  */
  {
    "id": "fopjXbCD",
    "block": "[[[41,[33,1,[\"voting_show_votes_on_profile\"]],[[[6,[39,2],null,[[\"route\"],[\"userActivity.votes\"]],[[\"default\"],[[[[1,\"    \"],[1,[28,[35,3],[\"heart\"],null]],[1,\"\\n    \"],[1,[28,[35,4],[\"topic_voting.vote_title_plural\"],null]],[1,\"\\n\"]],[]]]]]],[]],null]],[],false,[\"if\",\"siteSettings\",\"link-to\",\"d-icon\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-topic-voting/discourse/templates/connectors/user-activity-bottom/user-voted-topics.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});