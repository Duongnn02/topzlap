define("discourse/templates/second-factor-auth", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.message}}
    <div class="alert {{this.alertClass}}">{{this.message}}</div>
  {{/if}}
  {{#unless this.loadError}}
    <h3>{{this.secondFactorTitle}}</h3>
    {{#if this.customDescription}}
      <p class="action-description">{{this.customDescription}}</p>
    {{/if}}
    <p>{{this.secondFactorDescription}}</p>
    {{#if this.showSecurityKeyForm}}
      <div id="security-key">
        <DButton
          @action={{action "authenticateSecurityKey"}}
          @icon="key"
          @id="security-key-authenticate-button"
          @label="login.security_key_authenticate"
          @type="button"
          @class="btn btn-large btn-primary"
        />
      </div>
    {{else if (or this.showTotpForm this.showBackupCodesForm)}}
      <form class={{this.inputFormClass}}>
        <SecondFactorInput
          @value={{this.secondFactorToken}}
          @secondFactorMethod={{this.shownSecondFactorMethod}}
          @onTokenInput={{action "onTokenInput"}}
        />
        <DButton
          @action={{action "authenticateToken"}}
          @class="btn-primary"
          @label="submit"
          @type="submit"
        />
      </form>
    {{/if}}
  
    {{#if this.alternativeMethods.length}}
      <p>
        {{#each this.alternativeMethods as |method index|}}
          {{#if (gt index 0)}}
            <span>&middot;</span>
          {{/if}}
          <span>
            <a
              href
              class="toggle-second-factor-method {{method.class}}"
              {{on "click" (fn this.useAnotherMethod method.id)}}
            >
              {{i18n method.translationKey}}
            </a>
          </span>
        {{/each}}
      </p>
    {{/if}}
  {{/unless}}
  */
  {
    "id": "ttKRmp+p",
    "block": "[[[41,[30,0,[\"message\"]],[[[1,\"  \"],[10,0],[15,0,[29,[\"alert \",[30,0,[\"alertClass\"]]]]],[12],[1,[30,0,[\"message\"]]],[13],[1,\"\\n\"]],[]],null],[41,[51,[30,0,[\"loadError\"]]],[[[1,\"  \"],[10,\"h3\"],[12],[1,[30,0,[\"secondFactorTitle\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"customDescription\"]],[[[1,\"    \"],[10,2],[14,0,\"action-description\"],[12],[1,[30,0,[\"customDescription\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[10,2],[12],[1,[30,0,[\"secondFactorDescription\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"showSecurityKeyForm\"]],[[[1,\"    \"],[10,0],[14,1,\"security-key\"],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@action\",\"@icon\",\"@id\",\"@label\",\"@type\",\"@class\"],[[28,[37,3],[[30,0],\"authenticateSecurityKey\"],null],\"key\",\"security-key-authenticate-button\",\"login.security_key_authenticate\",\"button\",\"btn btn-large btn-primary\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[41,[28,[37,4],[[30,0,[\"showTotpForm\"]],[30,0,[\"showBackupCodesForm\"]]],null],[[[1,\"    \"],[10,\"form\"],[15,0,[30,0,[\"inputFormClass\"]]],[12],[1,\"\\n      \"],[8,[39,5],null,[[\"@value\",\"@secondFactorMethod\",\"@onTokenInput\"],[[30,0,[\"secondFactorToken\"]],[30,0,[\"shownSecondFactorMethod\"]],[28,[37,3],[[30,0],\"onTokenInput\"],null]]],null],[1,\"\\n      \"],[8,[39,2],null,[[\"@action\",\"@class\",\"@label\",\"@type\"],[[28,[37,3],[[30,0],\"authenticateToken\"],null],\"btn-primary\",\"submit\",\"submit\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]],null]],[]]],[1,\"\\n\"],[41,[30,0,[\"alternativeMethods\",\"length\"]],[[[1,\"    \"],[10,2],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"alternativeMethods\"]]],null]],null],null,[[[41,[28,[37,8],[[30,2],0],null],[[[1,\"          \"],[10,1],[12],[1,\"·\"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[10,1],[12],[1,\"\\n          \"],[11,3],[24,6,\"\"],[16,0,[29,[\"toggle-second-factor-method \",[30,1,[\"class\"]]]]],[4,[38,9],[\"click\",[28,[37,10],[[30,0,[\"useAnotherMethod\"]],[30,1,[\"id\"]]],null]],null],[12],[1,\"\\n            \"],[1,[28,[35,11],[[30,1,[\"translationKey\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1,2]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[\"method\",\"index\"],false,[\"if\",\"unless\",\"d-button\",\"action\",\"or\",\"second-factor-input\",\"each\",\"-track-array\",\"gt\",\"on\",\"fn\",\"i18n\"]]",
    "moduleName": "discourse/templates/second-factor-auth.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});