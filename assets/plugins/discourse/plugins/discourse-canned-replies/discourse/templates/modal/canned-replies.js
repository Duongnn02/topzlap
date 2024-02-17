define("discourse/plugins/discourse-canned-replies/discourse/templates/modal/canned-replies", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#d-modal-body
    title="canned_replies.insert.modal_title"
    class="canned-replies-modal"
    style="overflow: visible"
  }}
    {{#conditional-loading-spinner condition=loadingReplies}}
      <div class="details">
        <div class="reply-selector">
          <div class="selector">
            {{combo-box
              id="canned-replies-combobox"
              valueAttribute="id"
              value=selectedReplyId
              nameProperty="title"
              content=replies
              none="canned_replies.insert.choose"
            }}
          </div>
        </div>
  
        {{#if selectedReply}}
          <div class="content">
            <div>{{cook-text selectedReply.content}}</div>
          </div>
        {{/if}}
      </div>
    {{/conditional-loading-spinner}}
  {{/d-modal-body}}
  
  <div class="modal-footer">
    {{#if canEdit}}
      {{d-button
        class="pull-left canned-replies-new"
        action=(action "newReply")
        icon="plus"
        label="canned_replies.insert.new_button"
      }}
    {{/if}}
  
    {{#if selectedReply}}
      {{#if canEdit}}
        {{d-button
          class="pull-left canned-replies-edit"
          action=(action "editReply")
          icon="pencil-alt"
          label="canned_replies.insert.edit_button"
        }}
      {{/if}}
  
      {{d-button
        class="btn-primary pull-right canned-replies-apply"
        action=(action "apply")
        icon="far-clipboard"
        label="canned_replies.insert.insert_button"
      }}
    {{/if}}
  </div>
  */
  {
    "id": "OwhfyUH4",
    "block": "[[[6,[39,0],null,[[\"title\",\"class\",\"style\"],[\"canned_replies.insert.modal_title\",\"canned-replies-modal\",\"overflow: visible\"]],[[\"default\"],[[[[6,[39,1],null,[[\"condition\"],[[33,2]]],[[\"default\"],[[[[1,\"    \"],[10,0],[14,0,\"details\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"reply-selector\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"selector\"],[12],[1,\"\\n          \"],[1,[28,[35,3],null,[[\"id\",\"valueAttribute\",\"value\",\"nameProperty\",\"content\",\"none\"],[\"canned-replies-combobox\",\"id\",[33,4],\"title\",[33,5],\"canned_replies.insert.choose\"]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[33,7],[[[1,\"        \"],[10,0],[14,0,\"content\"],[12],[1,\"\\n          \"],[10,0],[12],[1,[28,[35,8],[[33,7,[\"content\"]]],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]]]]]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n\"],[41,[33,9],[[[1,\"    \"],[1,[28,[35,10],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"pull-left canned-replies-new\",[28,[37,11],[[30,0],\"newReply\"],null],\"plus\",\"canned_replies.insert.new_button\"]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[33,7],[[[41,[33,9],[[[1,\"      \"],[1,[28,[35,10],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"pull-left canned-replies-edit\",[28,[37,11],[[30,0],\"editReply\"],null],\"pencil-alt\",\"canned_replies.insert.edit_button\"]]]],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[1,[28,[35,10],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"btn-primary pull-right canned-replies-apply\",[28,[37,11],[[30,0],\"apply\"],null],\"far-clipboard\",\"canned_replies.insert.insert_button\"]]]],[1,\"\\n\"]],[]],null],[13]],[],false,[\"d-modal-body\",\"conditional-loading-spinner\",\"loadingReplies\",\"combo-box\",\"selectedReplyId\",\"replies\",\"if\",\"selectedReply\",\"cook-text\",\"canEdit\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/plugins/discourse-canned-replies/discourse/templates/modal/canned-replies.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});