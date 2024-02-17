define("discourse/components/reviewable-queued-post", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/lib/show-modal"], function (_exports, _component, _templateFactory, _object, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ReviewableTopicLink @reviewable={{this.reviewable}} @tagName="">
    <div class="title-text">
      {{d-icon "plus-square" title="review.new_topic"}}
      {{this.reviewable.payload.title}}
    </div>
    {{category-badge this.reviewable.category}}
    <ReviewableTags @tags={{this.reviewable.payload.tags}} @tagName="" />
    {{#if this.reviewable.payload.via_email}}
      <a href {{on "click" this.showRawEmail}} class="show-raw-email">
        {{d-icon "envelope" title="post.via_email"}}
      </a>
    {{/if}}
  </ReviewableTopicLink>
  
  <div class="post-contents-wrapper">
    <ReviewableCreatedBy @user={{this.reviewable.created_by}} @tagName="" />
  
    <div class="post-contents">
      <ReviewablePostHeader
        @reviewable={{this.reviewable}}
        @createdBy={{this.reviewable.created_by}}
        @tagName=""
      />
  
      <CookText
        @rawText={{this.reviewable.payload.raw}}
        @class="post-body"
        @categoryId={{this.reviewable.category_id}}
        @topicId={{this.reviewable.topic_id}}
        @paintOneboxes={{true}}
        @opts={{hash removeMissing=true}}
      />
  
      {{yield}}
    </div>
  </div>
  */
  {
    "id": "hQ3qqNUb",
    "block": "[[[8,[39,0],null,[[\"@reviewable\",\"@tagName\"],[[30,0,[\"reviewable\"]],\"\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"title-text\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"plus-square\"],[[\"title\"],[\"review.new_topic\"]]]],[1,\"\\n    \"],[1,[30,0,[\"reviewable\",\"payload\",\"title\"]]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[1,[28,[35,2],[[30,0,[\"reviewable\",\"category\"]]],null]],[1,\"\\n  \"],[8,[39,3],null,[[\"@tags\",\"@tagName\"],[[30,0,[\"reviewable\",\"payload\",\"tags\"]],\"\"]],null],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"payload\",\"via_email\"]],[[[1,\"    \"],[11,3],[24,6,\"\"],[24,0,\"show-raw-email\"],[4,[38,5],[\"click\",[30,0,[\"showRawEmail\"]]],null],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"envelope\"],[[\"title\"],[\"post.via_email\"]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"post-contents-wrapper\"],[12],[1,\"\\n  \"],[8,[39,6],null,[[\"@user\",\"@tagName\"],[[30,0,[\"reviewable\",\"created_by\"]],\"\"]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"post-contents\"],[12],[1,\"\\n    \"],[8,[39,7],null,[[\"@reviewable\",\"@createdBy\",\"@tagName\"],[[30,0,[\"reviewable\"]],[30,0,[\"reviewable\",\"created_by\"]],\"\"]],null],[1,\"\\n\\n    \"],[8,[39,8],null,[[\"@rawText\",\"@class\",\"@categoryId\",\"@topicId\",\"@paintOneboxes\",\"@opts\"],[[30,0,[\"reviewable\",\"payload\",\"raw\"]],\"post-body\",[30,0,[\"reviewable\",\"category_id\"]],[30,0,[\"reviewable\",\"topic_id\"]],true,[28,[37,9],null,[[\"removeMissing\"],[true]]]]],null],[1,\"\\n\\n    \"],[18,1,null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"&default\"],false,[\"reviewable-topic-link\",\"d-icon\",\"category-badge\",\"reviewable-tags\",\"if\",\"on\",\"reviewable-created-by\",\"reviewable-post-header\",\"cook-text\",\"hash\",\"yield\"]]",
    "moduleName": "discourse/components/reviewable-queued-post.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    showRawEmail(event) {
      event?.preventDefault();
      (0, _showModal.default)("raw-email").set("rawEmail", this.reviewable.payload.raw_email);
    }
  }, (_applyDecoratedDescriptor(_obj, "showRawEmail", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showRawEmail"), _obj)), _obj)));
  _exports.default = _default;
});