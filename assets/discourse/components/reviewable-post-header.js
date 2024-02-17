define("discourse/components/reviewable-post-header", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="reviewable-post-header">
    <ReviewableCreatedByName @user={{this.createdBy}} @tagName="" />
    {{#if this.reviewable.reply_to_post_number}}
      <a
        href={{concat
          this.reviewable.topic_url
          "/"
          this.reviewable.reply_to_post_number
        }}
        class="reviewable-reply-to"
      >
        {{d-icon "share"}}
        <span>{{i18n "review.in_reply_to"}}</span>
      </a>
    {{/if}}
  </div>
  */
  {
    "id": "ZpWg80nO",
    "block": "[[[10,0],[14,0,\"reviewable-post-header\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@user\",\"@tagName\"],[[30,0,[\"createdBy\"]],\"\"]],null],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"reply_to_post_number\"]],[[[1,\"    \"],[10,3],[15,6,[28,[37,2],[[30,0,[\"reviewable\",\"topic_url\"]],\"/\",[30,0,[\"reviewable\",\"reply_to_post_number\"]]],null]],[14,0,\"reviewable-reply-to\"],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"share\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"review.in_reply_to\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"reviewable-created-by-name\",\"if\",\"concat\",\"d-icon\",\"i18n\"]]",
    "moduleName": "discourse/components/reviewable-post-header.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});