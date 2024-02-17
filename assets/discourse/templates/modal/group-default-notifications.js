define("discourse/templates/modal/group-default-notifications", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="groups.default_notifications.modal_title">
    {{i18n
      "groups.default_notifications.modal_description"
      count=this.model.count
    }}
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @action={{action "updateExistingUsers"}}
      @class="btn-primary"
      @label="groups.default_notifications.modal_yes"
    />
    <DButton
      @action={{action "cancel"}}
      @label="groups.default_notifications.modal_no"
    />
  </div>
  */
  {
    "id": "3uUE/5h0",
    "block": "[[[8,[39,0],null,[[\"@title\"],[\"groups.default_notifications.modal_title\"]],[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,1],[\"groups.default_notifications.modal_description\"],[[\"count\"],[[30,0,[\"model\",\"count\"]]]]]],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,3],[[30,0],\"updateExistingUsers\"],null],\"btn-primary\",\"groups.default_notifications.modal_yes\"]],null],[1,\"\\n  \"],[8,[39,2],null,[[\"@action\",\"@label\"],[[28,[37,3],[[30,0],\"cancel\"],null],\"groups.default_notifications.modal_no\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/group-default-notifications.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});