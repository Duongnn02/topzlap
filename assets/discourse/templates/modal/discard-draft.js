define("discourse/templates/modal/discard-draft", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @headerClass="hidden">
    <div class="instructions">
      {{i18n "post.cancel_composer.confirm"}}
    </div>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @icon="far-trash-alt"
      @label="post.cancel_composer.discard"
      @class="btn-danger discard-draft"
      @action={{action "destroyDraft"}}
    />
    {{#if this.model.canSaveDraft}}
      <DButton
        @label="post.cancel_composer.save_draft"
        @class="save-draft"
        @action={{action "saveDraftAndClose"}}
      />
    {{/if}}
    <DButton
      @label="post.cancel_composer.keep_editing"
      @class="keep-editing"
      @action={{action "dismissModal"}}
    />
  </div>
  */
  {
    "id": "xaJz68sj",
    "block": "[[[8,[39,0],null,[[\"@headerClass\"],[\"hidden\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"post.cancel_composer.confirm\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@icon\",\"@label\",\"@class\",\"@action\"],[\"far-trash-alt\",\"post.cancel_composer.discard\",\"btn-danger discard-draft\",[28,[37,3],[[30,0],\"destroyDraft\"],null]]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"canSaveDraft\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@label\",\"@class\",\"@action\"],[\"post.cancel_composer.save_draft\",\"save-draft\",[28,[37,3],[[30,0],\"saveDraftAndClose\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,2],null,[[\"@label\",\"@class\",\"@action\"],[\"post.cancel_composer.keep_editing\",\"keep-editing\",[28,[37,3],[[30,0],\"dismissModal\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"d-button\",\"action\",\"if\"]]",
    "moduleName": "discourse/templates/modal/discard-draft.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});