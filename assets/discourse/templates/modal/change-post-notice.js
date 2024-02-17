define("discourse/templates/modal/change-post-notice", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @title={{if
      this.model.notice
      "post.controls.change_post_notice"
      "post.controls.add_post_notice"
    }}
  >
    <form><Textarea @value={{this.notice}} /></form>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @label={{if this.saving "saving" "save"}}
      @action={{action "setNotice" this.notice}}
      @disabled={{this.disabled}}
    />
    {{#if this.model.notice}}
      <DButton
        @class="btn-danger"
        @label="post.controls.delete_post_notice"
        @action={{action "setNotice"}}
        @disabled={{this.saving}}
      />
    {{/if}}
    <DModalCancel @close={{route-action "closeModal"}} />
  </div>
  */
  {
    "id": "UuGCl915",
    "block": "[[[8,[39,0],null,[[\"@title\"],[[52,[30,0,[\"model\",\"notice\"]],\"post.controls.change_post_notice\",\"post.controls.add_post_notice\"]]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"form\"],[12],[8,[39,2],null,[[\"@value\"],[[30,0,[\"notice\"]]]],null],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@class\",\"@label\",\"@action\",\"@disabled\"],[\"btn-primary\",[52,[30,0,[\"saving\"]],\"saving\",\"save\"],[28,[37,4],[[30,0],\"setNotice\",[30,0,[\"notice\"]]],null],[30,0,[\"disabled\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"notice\"]],[[[1,\"    \"],[8,[39,3],null,[[\"@class\",\"@label\",\"@action\",\"@disabled\"],[\"btn-danger\",\"post.controls.delete_post_notice\",[28,[37,4],[[30,0],\"setNotice\"],null],[30,0,[\"saving\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,5],null,[[\"@close\"],[[28,[37,6],[\"closeModal\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"if\",\"textarea\",\"d-button\",\"action\",\"d-modal-cancel\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/change-post-notice.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});