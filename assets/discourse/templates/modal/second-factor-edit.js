define("discourse/templates/modal/second-factor-edit", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <div class="input-group">
      <label for="authenticator-name">{{i18n
          "user.second_factor.edit_description"
        }}</label>
      <Input name="authenticator-name" @type="text" @value={{this.model.name}} />
    </div>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @action={{action "editSecondFactor"}}
      @class="btn-primary"
      @label="user.second_factor.save"
    />
  </div>
  */
  {
    "id": "vPwFrfQh",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"authenticator-name\"],[12],[1,[28,[35,1],[\"user.second_factor.edit_description\"],null]],[13],[1,\"\\n    \"],[8,[39,2],[[24,3,\"authenticator-name\"]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"model\",\"name\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,4],[[30,0],\"editSecondFactor\"],null],\"btn-primary\",\"user.second_factor.save\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"input\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/second-factor-edit.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});