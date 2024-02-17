define("discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/topic-above-post-stream/topic-removed-notification", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if akismetFlaggedTopic}}
    <div class="alert alert-info category-read-only-banner">
      {{i18n "akismet.topic_deleted"}}
    </div>
  {{/if}}
  */
  {
    "id": "BnuSuPOJ",
    "block": "[[[41,[33,1],[[[1,\"  \"],[10,0],[14,0,\"alert alert-info category-read-only-banner\"],[12],[1,\"\\n    \"],[1,[28,[35,2],[\"akismet.topic_deleted\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"akismetFlaggedTopic\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/topic-above-post-stream/topic-removed-notification.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});