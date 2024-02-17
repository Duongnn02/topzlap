define("discourse/templates/modal/second-factor-add-totp", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
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
          {{html-safe (i18n "user.second_factor.enable_description")}}
        </div>
      </div>
  
      <div class="control-group">
        <div class="controls">
          <div class="qr-code">
            <img src={{html-safe this.secondFactorImage}} />
          </div>
          <p>
            {{#if this.showSecondFactorKey}}
              {{this.secondFactorKey}}
            {{else}}
              <a href {{on "click" this.enableShowSecondFactorKey}}>{{i18n
                  "user.second_factor.show_key_description"
                }}</a>
            {{/if}}
          </p>
        </div>
      </div>
  
      <div class="control-group">
        <label class="control-label input-prepend">{{i18n
            "user.second_factor.name"
          }}</label>
        <div class="controls">
          <SecondFactorInput
            @value={{this.secondFactorName}}
            @inputId="second-factor-name"
            @placeholder={{i18n "user.second_factor.totp.default_name"}}
          />
        </div>
  
        <label class="control-label input-prepend">{{i18n
            "user.second_factor.label"
          }}</label>
        <div class="controls">
          <TextField
            @class="second-factor-token-input"
            @maxlength={{6}}
            @value={{this.secondFactorToken}}
            @inputId="second-factor-token"
            @placeholder="123456"
            @autocorrect="off"
            @autocapitalize="off"
            @autofocus="autofocus"
          />
        </div>
      </div>
  
      <div class="control-group">
        <div class="controls">
          <DButton
            @class="btn-primary add-totp"
            @action={{action "enableSecondFactor"}}
            @label="enable"
          />
        </div>
      </div>
    </ConditionalLoadingSpinner>
  </DModalBody>
  */
  {
    "id": "vNLGvJPQ",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"errorMessage\"]],[[[1,\"      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[30,0,[\"errorMessage\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[1,[28,[35,3],[[28,[37,4],[\"user.second_factor.enable_description\"],null]],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"qr-code\"],[12],[1,\"\\n          \"],[10,\"img\"],[15,\"src\",[28,[37,3],[[30,0,[\"secondFactorImage\"]]],null]],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"\\n\"],[41,[30,0,[\"showSecondFactorKey\"]],[[[1,\"            \"],[1,[30,0,[\"secondFactorKey\"]]],[1,\"\\n\"]],[]],[[[1,\"            \"],[11,3],[24,6,\"\"],[4,[38,5],[\"click\",[30,0,[\"enableShowSecondFactorKey\"]]],null],[12],[1,[28,[35,4],[\"user.second_factor.show_key_description\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label input-prepend\"],[12],[1,[28,[35,4],[\"user.second_factor.name\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@value\",\"@inputId\",\"@placeholder\"],[[30,0,[\"secondFactorName\"]],\"second-factor-name\",[28,[37,4],[\"user.second_factor.totp.default_name\"],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"label\"],[14,0,\"control-label input-prepend\"],[12],[1,[28,[35,4],[\"user.second_factor.label\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,7],null,[[\"@class\",\"@maxlength\",\"@value\",\"@inputId\",\"@placeholder\",\"@autocorrect\",\"@autocapitalize\",\"@autofocus\"],[\"second-factor-token-input\",6,[30,0,[\"secondFactorToken\"]],\"second-factor-token\",\"123456\",\"off\",\"off\",\"autofocus\"]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,8],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary add-totp\",[28,[37,9],[[30,0],\"enableSecondFactor\"],null],\"enable\"]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]]]],[],false,[\"d-modal-body\",\"conditional-loading-spinner\",\"if\",\"html-safe\",\"i18n\",\"on\",\"second-factor-input\",\"text-field\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/second-factor-add-totp.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});