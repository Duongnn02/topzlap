define("discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{reviewable-topic-link reviewable=reviewable tagName=""}}
  
  <div class="post-contents-wrapper">
    {{reviewable-created-by user=reviewable.target_created_by tagName=""}}
  
    <div class="post-contents">
      {{reviewable-created-by-name user=reviewable.target_created_by tagName=""}}
  
      <div class="post-body">
        {{html-safe reviewable.payload.post_cooked}}
      </div>
  
      {{yield}}
  
      {{#if reviewable.payload.external_error}}
        {{reviewable-akismet-api-error
          external_error=reviewable.payload.external_error
        }}
      {{/if}}
    </div>
  </div>
  */
  {
    "id": "XmrkvMSw",
    "block": "[[[1,[28,[35,0],null,[[\"reviewable\",\"tagName\"],[[33,1],\"\"]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"post-contents-wrapper\"],[12],[1,\"\\n  \"],[1,[28,[35,2],null,[[\"user\",\"tagName\"],[[33,1,[\"target_created_by\"]],\"\"]]]],[1,\"\\n\\n  \"],[10,0],[14,0,\"post-contents\"],[12],[1,\"\\n    \"],[1,[28,[35,3],null,[[\"user\",\"tagName\"],[[33,1,[\"target_created_by\"]],\"\"]]]],[1,\"\\n\\n    \"],[10,0],[14,0,\"post-body\"],[12],[1,\"\\n      \"],[1,[28,[35,4],[[33,1,[\"payload\",\"post_cooked\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[18,1,null],[1,\"\\n\\n\"],[41,[33,1,[\"payload\",\"external_error\"]],[[[1,\"      \"],[1,[28,[35,7],null,[[\"external_error\"],[[33,1,[\"payload\",\"external_error\"]]]]]],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[\"&default\"],false,[\"reviewable-topic-link\",\"reviewable\",\"reviewable-created-by\",\"reviewable-created-by-name\",\"html-safe\",\"yield\",\"if\",\"reviewable-akismet-api-error\"]]",
    "moduleName": "discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});