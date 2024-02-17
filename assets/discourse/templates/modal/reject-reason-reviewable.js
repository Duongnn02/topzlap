define("discourse/templates/modal/reject-reason-reviewable", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @class="explain-reviewable">
    <Textarea @value={{this.rejectReason}} />
    <div class="control-group">
      <label>
        <Input @type="checkbox" class="inline" @checked={{this.sendEmail}} />
        {{i18n "review.reject_reason.send_email"}}
      </label>
    </div>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @icon="trash-alt"
      @class="btn-danger"
      @action={{action "perform"}}
      @label="admin.user.delete"
    />
    <DButton
      @action={{route-action "closeModal"}}
      @label="cancel"
      @class="cancel"
    />
  </div>
  */
  {
    "id": "ADcSZWvP",
    "block": "[[[8,[39,0],null,[[\"@class\"],[\"explain-reviewable\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@value\"],[[30,0,[\"rejectReason\"]]]],null],[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[8,[39,2],[[24,0,\"inline\"]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"sendEmail\"]]]],null],[1,\"\\n      \"],[1,[28,[35,3],[\"review.reject_reason.send_email\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,4],null,[[\"@icon\",\"@class\",\"@action\",\"@label\"],[\"trash-alt\",\"btn-danger\",[28,[37,5],[[30,0],\"perform\"],null],\"admin.user.delete\"]],null],[1,\"\\n  \"],[8,[39,4],null,[[\"@action\",\"@label\",\"@class\"],[[28,[37,6],[\"closeModal\"],null],\"cancel\",\"cancel\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"textarea\",\"input\",\"i18n\",\"d-button\",\"action\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/reject-reason-reviewable.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});