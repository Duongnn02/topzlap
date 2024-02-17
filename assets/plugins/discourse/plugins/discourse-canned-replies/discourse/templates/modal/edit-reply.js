define("discourse/plugins/discourse-canned-replies/discourse/templates/modal/edit-reply", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#d-modal-body
    title="canned_replies.edit.modal_title"
    class="canned-replies-modal"
  }}
    {{canned-replies-form title=replyTitle content=replyContent}}
  {{/d-modal-body}}
  
  <div class="modal-footer canned-replies-footer">
    {{d-button
      class="btn-primary edit-reply-save-btn"
      action=(action "save")
      label=savingLabel
      disabled=disableSaveButton
    }}
  
    {{d-button
      action=(action "cancel")
      icon="chevron-left"
      label="canned_replies.back"
      class="canned-replies-edit-back"
    }}
  
    {{d-button
      class="btn-danger"
      action=(action "remove")
      icon="trash-alt"
      disabled=saving
    }}
  </div>
  */
  {
    "id": "oSfmq9+V",
    "block": "[[[6,[39,0],null,[[\"title\",\"class\"],[\"canned_replies.edit.modal_title\",\"canned-replies-modal\"]],[[\"default\"],[[[[1,\"  \"],[1,[28,[35,1],null,[[\"title\",\"content\"],[[33,2],[33,3]]]]],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"modal-footer canned-replies-footer\"],[12],[1,\"\\n  \"],[1,[28,[35,4],null,[[\"class\",\"action\",\"label\",\"disabled\"],[\"btn-primary edit-reply-save-btn\",[28,[37,5],[[30,0],\"save\"],null],[33,6],[33,7]]]]],[1,\"\\n\\n  \"],[1,[28,[35,4],null,[[\"action\",\"icon\",\"label\",\"class\"],[[28,[37,5],[[30,0],\"cancel\"],null],\"chevron-left\",\"canned_replies.back\",\"canned-replies-edit-back\"]]]],[1,\"\\n\\n  \"],[1,[28,[35,4],null,[[\"class\",\"action\",\"icon\",\"disabled\"],[\"btn-danger\",[28,[37,5],[[30,0],\"remove\"],null],\"trash-alt\",[33,8]]]]],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"canned-replies-form\",\"replyTitle\",\"replyContent\",\"d-button\",\"action\",\"savingLabel\",\"disableSaveButton\",\"saving\"]]",
    "moduleName": "discourse/plugins/discourse-canned-replies/discourse/templates/modal/edit-reply.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});