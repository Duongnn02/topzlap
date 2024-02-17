define("discourse/components/reviewable-flagged-post", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="flagged-post-header">
    <ReviewableTopicLink @reviewable={{this.reviewable}} @tagName="" />
    <ReviewablePostEdits @reviewable={{this.reviewable}} @tagName="" />
  </div>
  
  <div class="post-contents-wrapper">
    <ReviewableCreatedBy
      @user={{this.reviewable.target_created_by}}
      @tagName=""
    />
    <div class="post-contents">
      <ReviewablePostHeader
        @reviewable={{this.reviewable}}
        @createdBy={{this.reviewable.target_created_by}}
        @tagName=""
      />
      <div class="post-body">
        <div class="post-body__scroll">
          {{#if this.reviewable.blank_post}}
            <p>{{i18n "review.deleted_post"}}</p>
          {{else}}
            {{html-safe this.reviewable.cooked}}
          {{/if}}
        </div>
      </div>
      <span>
        <PluginOutlet
          @name="after-reviewable-flagged-post-body"
          @connectorTagName="div"
          @outletArgs={{hash model=this.reviewable}}
        />
      </span>
      {{yield}}
    </div>
  </div>
  */
  {
    "id": "U1V2ucZN",
    "block": "[[[10,0],[14,0,\"flagged-post-header\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@reviewable\",\"@tagName\"],[[30,0,[\"reviewable\"]],\"\"]],null],[1,\"\\n  \"],[8,[39,1],null,[[\"@reviewable\",\"@tagName\"],[[30,0,[\"reviewable\"]],\"\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"post-contents-wrapper\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@user\",\"@tagName\"],[[30,0,[\"reviewable\",\"target_created_by\"]],\"\"]],null],[1,\"\\n  \"],[10,0],[14,0,\"post-contents\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@reviewable\",\"@createdBy\",\"@tagName\"],[[30,0,[\"reviewable\"]],[30,0,[\"reviewable\",\"target_created_by\"]],\"\"]],null],[1,\"\\n    \"],[10,0],[14,0,\"post-body\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"post-body__scroll\"],[12],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"blank_post\"]],[[[1,\"          \"],[10,2],[12],[1,[28,[35,5],[\"review.deleted_post\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,6],[[30,0,[\"reviewable\",\"cooked\"]]],null]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"after-reviewable-flagged-post-body\",\"div\",[28,[37,8],null,[[\"model\"],[[30,0,[\"reviewable\"]]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[18,1,null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"&default\"],false,[\"reviewable-topic-link\",\"reviewable-post-edits\",\"reviewable-created-by\",\"reviewable-post-header\",\"if\",\"i18n\",\"html-safe\",\"plugin-outlet\",\"hash\",\"yield\"]]",
    "moduleName": "discourse/components/reviewable-flagged-post.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});