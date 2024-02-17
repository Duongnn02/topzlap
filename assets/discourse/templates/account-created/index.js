define("discourse/templates/account-created/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container invites-show">
    <div class="login-welcome-header">
      <h1 class="login-title">{{this.welcomeTitle}}</h1>
      <img src={{this.wavingHandURL}} alt="" class="waving-hand" />
    </div>
  
    <div class="ac-page">
      <div class="two-col">
        <div class="col-image">
          <img src={{this.envelopeImageUrl}} alt={{i18n "invites.emoji"}} />
        </div>
        <div class="col-form">
          <div class="success-info">
            {{html-safe this.accountCreated.message}}
          </div>
          {{#if this.accountCreated.show_controls}}
            <ActivationControls
              @sendActivationEmail={{action "sendActivationEmail"}}
              @editActivationEmail={{action "editActivationEmail"}}
            />
          {{/if}}
        </div>
      </div>
    </div>
  </div>
  */
  {
    "id": "MBXTlZCB",
    "block": "[[[10,0],[14,0,\"container invites-show\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"login-welcome-header\"],[12],[1,\"\\n    \"],[10,\"h1\"],[14,0,\"login-title\"],[12],[1,[30,0,[\"welcomeTitle\"]]],[13],[1,\"\\n    \"],[10,\"img\"],[15,\"src\",[30,0,[\"wavingHandURL\"]]],[14,\"alt\",\"\"],[14,0,\"waving-hand\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"ac-page\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"two-col\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col-image\"],[12],[1,\"\\n        \"],[10,\"img\"],[15,\"src\",[30,0,[\"envelopeImageUrl\"]]],[15,\"alt\",[28,[37,0],[\"invites.emoji\"],null]],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"col-form\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"success-info\"],[12],[1,\"\\n          \"],[1,[28,[35,1],[[30,0,[\"accountCreated\",\"message\"]]],null]],[1,\"\\n        \"],[13],[1,\"\\n\"],[41,[30,0,[\"accountCreated\",\"show_controls\"]],[[[1,\"          \"],[8,[39,3],null,[[\"@sendActivationEmail\",\"@editActivationEmail\"],[[28,[37,4],[[30,0],\"sendActivationEmail\"],null],[28,[37,4],[[30,0],\"editActivationEmail\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"html-safe\",\"if\",\"activation-controls\",\"action\"]]",
    "moduleName": "discourse/templates/account-created/index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});