define("discourse/plugins/discourse-topic-voting/discourse/templates/connectors/topic-above-post-stream/topic-title-voting", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if model.can_vote}}
    {{#if model.postStream.loaded}}
      {{#if model.postStream.firstPostPresent}}
        <div class="voting title-voting">
          {{mount-widget
            widget="vote-box"
            args=model
            showLogin=(route-action "showLogin")
          }}
        </div>
      {{/if}}
    {{/if}}
  {{/if}}
  */
  {
    "id": "HDYNfkBs",
    "block": "[[[41,[33,1,[\"can_vote\"]],[[[41,[33,1,[\"postStream\",\"loaded\"]],[[[41,[33,1,[\"postStream\",\"firstPostPresent\"]],[[[1,\"      \"],[10,0],[14,0,\"voting title-voting\"],[12],[1,\"\\n        \"],[1,[28,[35,2],null,[[\"widget\",\"args\",\"showLogin\"],[\"vote-box\",[33,1],[28,[37,3],[\"showLogin\"],null]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[]],null]],[],false,[\"if\",\"model\",\"mount-widget\",\"route-action\"]]",
    "moduleName": "discourse/plugins/discourse-topic-voting/discourse/templates/connectors/topic-above-post-stream/topic-title-voting.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});