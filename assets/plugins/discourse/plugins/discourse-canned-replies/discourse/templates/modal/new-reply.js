define("discourse/plugins/discourse-canned-replies/discourse/templates/modal/new-reply", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#d-modal-body
    title="canned_replies.add.modal_title"
    class="canned-replies-modal"
  }}
    {{canned-replies-form title=newTitle content=newContent}}
  {{/d-modal-body}}
  
  <div class="modal-footer canned-replies-footer">
    {{d-button
      class="btn-primary new-reply-save-btn"
      action=(action "save")
      label="save"
      disabled=disableSaveButton
    }}
  
  </div>
  */
  {
    "id": "RudS/dVi",
    "block": "[[[6,[39,0],null,[[\"title\",\"class\"],[\"canned_replies.add.modal_title\",\"canned-replies-modal\"]],[[\"default\"],[[[[1,\"  \"],[1,[28,[35,1],null,[[\"title\",\"content\"],[[33,2],[33,3]]]]],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"modal-footer canned-replies-footer\"],[12],[1,\"\\n  \"],[1,[28,[35,4],null,[[\"class\",\"action\",\"label\",\"disabled\"],[\"btn-primary new-reply-save-btn\",[28,[37,5],[[30,0],\"save\"],null],\"save\",[33,6]]]]],[1,\"\\n\\n\"],[13]],[],false,[\"d-modal-body\",\"canned-replies-form\",\"newTitle\",\"newContent\",\"d-button\",\"action\",\"disableSaveButton\"]]",
    "moduleName": "discourse/plugins/discourse-canned-replies/discourse/templates/modal/new-reply.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});