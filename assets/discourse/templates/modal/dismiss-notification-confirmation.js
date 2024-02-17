define("discourse/templates/modal/dismiss-notification-confirmation", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @headerClass="hidden" @class="dismiss-notification-confirmation">
    {{this.confirmationMessage}}
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @icon="check"
      @class="btn-primary"
      @action={{action "dismiss"}}
      @label="notifications.dismiss_confirmation.dismiss"
    />
    <DButton
      @action={{route-action "closeModal"}}
      @label="notifications.dismiss_confirmation.cancel"
      @class="btn-default"
    />
  </div>
  */
  {
    "id": "iC3K/m7o",
    "block": "[[[8,[39,0],null,[[\"@headerClass\",\"@class\"],[\"hidden\",\"dismiss-notification-confirmation\"]],[[\"default\"],[[[[1,\"\\n  \"],[1,[30,0,[\"confirmationMessage\"]]],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@icon\",\"@class\",\"@action\",\"@label\"],[\"check\",\"btn-primary\",[28,[37,2],[[30,0],\"dismiss\"],null],\"notifications.dismiss_confirmation.dismiss\"]],null],[1,\"\\n  \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@class\"],[[28,[37,3],[\"closeModal\"],null],\"notifications.dismiss_confirmation.cancel\",\"btn-default\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"d-button\",\"action\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/dismiss-notification-confirmation.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});