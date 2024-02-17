define("discourse/templates/modal/request-group-membership-form", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <form class="request-group-membership-form">
    <DModalBody @rawTitle={{this.title}}>
      <div class="control-group">
        <label>
          {{i18n "groups.membership_request.reason"}}
        </label>
  
        <ExpandingTextArea @value={{this.reason}} @maxlength="280" />
      </div>
    </DModalBody>
  
    <div class="modal-footer">
      <DButton
        @class="btn-primary"
        @disabled={{this.disableSubmit}}
        @label="groups.membership_request.submit"
        @action={{action "requestMember"}}
      />
  
      <DModalCancel @close={{route-action "closeModal"}} />
      <ConditionalLoadingSpinner @size="small" @condition={{this.loading}} />
    </div>
  </form>
  */
  {
    "id": "oHNaVGFf",
    "block": "[[[10,\"form\"],[14,0,\"request-group-membership-form\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@rawTitle\"],[[30,0,[\"title\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"groups.membership_request.reason\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[8,[39,2],null,[[\"@value\",\"@maxlength\"],[[30,0,[\"reason\"]],\"280\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@class\",\"@disabled\",\"@label\",\"@action\"],[\"btn-primary\",[30,0,[\"disableSubmit\"]],\"groups.membership_request.submit\",[28,[37,4],[[30,0],\"requestMember\"],null]]],null],[1,\"\\n\\n    \"],[8,[39,5],null,[[\"@close\"],[[28,[37,6],[\"closeModal\"],null]]],null],[1,\"\\n    \"],[8,[39,7],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"expanding-text-area\",\"d-button\",\"action\",\"d-modal-cancel\",\"route-action\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/modal/request-group-membership-form.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});