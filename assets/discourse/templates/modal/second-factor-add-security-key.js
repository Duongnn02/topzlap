define("discourse/templates/modal/second-factor-add-security-key", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <ConditionalLoadingSpinner @condition={{this.loading}}>
      {{#if this.errorMessage}}
        <div class="control-group">
          <div class="controls">
            <div class="alert alert-error">{{this.errorMessage}}</div>
          </div>
        </div>
      {{/if}}
  
      <div class="control-group">
        <div class="controls">
          {{html-safe
            (i18n "user.second_factor.enable_security_key_description")
          }}
        </div>
      </div>
  
      <div class="control-group">
        <div class="controls">
          <Input
            @value={{this.securityKeyName}}
            id="security-key-name"
            placeholder="security key name"
          />
        </div>
      </div>
  
      <div class="control-group">
        <div class="controls">
          {{#unless this.webauthnUnsupported}}
            <DButton
              @class="btn-primary add-security-key"
              @action={{action "registerSecurityKey"}}
              @label="user.second_factor.security_key.register"
            />
          {{/unless}}
        </div>
      </div>
    </ConditionalLoadingSpinner>
  </DModalBody>
  */
  {
    "id": "dS/9rliw",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"errorMessage\"]],[[[1,\"      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[30,0,[\"errorMessage\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[1,[28,[35,3],[[28,[37,4],[\"user.second_factor.enable_security_key_description\"],null]],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,5],[[24,1,\"security-key-name\"],[24,\"placeholder\",\"security key name\"]],[[\"@value\"],[[30,0,[\"securityKeyName\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"webauthnUnsupported\"]]],[[[1,\"          \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary add-security-key\",[28,[37,8],[[30,0],\"registerSecurityKey\"],null],\"user.second_factor.security_key.register\"]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]]]],[],false,[\"d-modal-body\",\"conditional-loading-spinner\",\"if\",\"html-safe\",\"i18n\",\"input\",\"unless\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/second-factor-add-security-key.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});