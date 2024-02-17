define("discourse/templates/modal/second-factor-edit-security-key", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <form class="form-horizontal">
      <div class="input-group">
        <label for="security-key-name">{{i18n
            "user.second_factor.security_key.edit_description"
          }}</label>
        <Input name="security-key-name" @type="text" @value={{this.model.name}} />
      </div>
    </form>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @action={{action "editSecurityKey"}}
      @class="btn-primary"
      @label="user.second_factor.security_key.save"
    />
  </div>
  */
  {
    "id": "3ZlGj7AS",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,\"form\"],[14,0,\"form-horizontal\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"security-key-name\"],[12],[1,[28,[35,1],[\"user.second_factor.security_key.edit_description\"],null]],[13],[1,\"\\n      \"],[8,[39,2],[[24,3,\"security-key-name\"]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"model\",\"name\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,4],[[30,0],\"editSecurityKey\"],null],\"btn-primary\",\"user.second_factor.security_key.save\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"input\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/second-factor-edit-security-key.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});