define("discourse/templates/static", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @bodyClass={{this.bodyClass}} @class="container">
    <WatchRead @action={{action "markFaqRead"}} @path={{this.model.path}}>
      <div class="contents clearfix body-page">
  
        <span>
          <PluginOutlet @name="above-static" @connectorTagName="div" />
        </span>
  
        <div class="login-welcome">
          {{html-safe this.model.html}}
  
          <PluginOutlet @name="below-static" @connectorTagName="div" />
  
          {{#if this.anyButtons}}
            <div class="body-page-button-container">
              {{#if this.showSignupButton}}
                <DButton
                  @action={{route-action "showCreateAccount"}}
                  @class="btn-primary sign-up-button"
                  @label="sign_up"
                />
              {{/if}}
  
              {{#if this.showLoginButton}}
                <DButton
                  @action={{route-action "showLogin"}}
                  @class="btn-primary login-button"
                  @icon="user"
                  @label="log_in"
                />
              {{/if}}
            </div>
          {{/if}}
        </div>
      </div>
    </WatchRead>
  </DSection>
  */
  {
    "id": "gQitC8+L",
    "block": "[[[8,[39,0],null,[[\"@bodyClass\",\"@class\"],[[30,0,[\"bodyClass\"]],\"container\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@action\",\"@path\"],[[28,[37,2],[[30,0],\"markFaqRead\"],null],[30,0,[\"model\",\"path\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"contents clearfix body-page\"],[12],[1,\"\\n\\n      \"],[10,1],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"above-static\",\"div\"]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"login-welcome\"],[12],[1,\"\\n        \"],[1,[28,[35,4],[[30,0,[\"model\",\"html\"]]],null]],[1,\"\\n\\n        \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"below-static\",\"div\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"anyButtons\"]],[[[1,\"          \"],[10,0],[14,0,\"body-page-button-container\"],[12],[1,\"\\n\"],[41,[30,0,[\"showSignupButton\"]],[[[1,\"              \"],[8,[39,6],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,7],[\"showCreateAccount\"],null],\"btn-primary sign-up-button\",\"sign_up\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showLoginButton\"]],[[[1,\"              \"],[8,[39,6],null,[[\"@action\",\"@class\",\"@icon\",\"@label\"],[[28,[37,7],[\"showLogin\"],null],\"btn-primary login-button\",\"user\",\"log_in\"]],null],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]]]],[],false,[\"d-section\",\"watch-read\",\"action\",\"plugin-outlet\",\"html-safe\",\"if\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/static.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});