define("discourse/templates/preferences/security", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.canChangePassword}}
    <div class="control-group pref-password">
      <label class="control-label">{{i18n "user.password.title"}}</label>
      <div class="controls">
        <a href {{on "click" this.changePassword}} class="btn btn-default">
          {{d-icon "envelope"}}
          {{#if this.model.no_password}}
            {{i18n "user.change_password.set_password"}}
          {{else}}
            {{i18n "user.change_password.action"}}
          {{/if}}
        </a>
  
        {{this.passwordProgress}}
      </div>
    </div>
  
    <div class="control-group pref-second-factor">
      <label class="control-label">{{i18n "user.second_factor.title"}}</label>
      {{#unless this.model.second_factor_enabled}}
        <label>
          {{i18n "user.second_factor.short_description"}}
        </label>
      {{/unless}}
      <div class="controls pref-second-factor">
        {{#if this.isCurrentUser}}
          <LinkTo @route="preferences.second-factor" class="btn btn-default">
            {{d-icon "lock"}}
            <span>{{i18n "user.second_factor.enable"}}</span>
          </LinkTo>
        {{/if}}
      </div>
    </div>
  {{/if}}
  
  {{#if this.canCheckEmails}}
    <div class="control-group pref-auth-tokens">
      <label class="control-label">{{i18n "user.auth_tokens.title"}}</label>
  
      <div class="auth-tokens">
        {{#each this.authTokens as |token|}}
          <div class="row auth-token">
            <div class="auth-token-icon">{{d-icon token.icon}}</div>
            {{#unless token.is_active}}
              <AuthTokenDropdown
                @token={{token}}
                @revokeAuthToken={{action "revokeAuthToken"}}
                @showToken={{action "showToken"}}
              />
            {{/unless}}
            <div class="auth-token-first">
              {{html-safe
                (i18n
                  "user.auth_tokens.device_location"
                  device=token.device
                  ip=token.client_ip
                  location=token.location
                )
              }}
            </div>
            <div class="auth-token-second">
              {{#if token.is_active}}
                {{html-safe
                  (i18n "user.auth_tokens.browser_active" browser=token.browser)
                }}
              {{else}}
                {{html-safe
                  (i18n
                    "user.auth_tokens.browser_last_seen"
                    browser=token.browser
                    date=(format-date token.seen_at)
                  )
                }}
              {{/if}}
            </div>
          </div>
        {{/each}}
      </div>
  
      {{#if this.canShowAllAuthTokens}}
        <a href {{on "click" this.toggleShowAllAuthTokens}}>
          {{#if this.showAllAuthTokens}}
            {{d-icon "caret-up"}}
            {{i18n "user.auth_tokens.show_few"}}
          {{else}}
            {{d-icon "caret-down"}}
            {{i18n
              "user.auth_tokens.show_all"
              count=this.model.user_auth_tokens.length
            }}
          {{/if}}
        </a>
      {{/if}}
  
      <a
        href
        {{on "click" (fn this.revokeAuthToken null)}}
        class="pull-right text-danger"
      >{{d-icon "sign-out-alt"}} {{i18n "user.auth_tokens.log_out_all"}}</a>
    </div>
  {{/if}}
  
  <UserPreferences::UserApiKeys @model={{@model}} />
  
  <span>
    <PluginOutlet
      @name="user-preferences-security"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model save=(action "save")}}
    />
  </span>
  
  <br />
  
  <span>
    <PluginOutlet
      @name="user-custom-controls"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  </span>
  */
  {
    "id": "9jbk69Ks",
    "block": "[[[41,[30,0,[\"canChangePassword\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-password\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.password.title\"],null]],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[11,3],[24,6,\"\"],[24,0,\"btn btn-default\"],[4,[38,2],[\"click\",[30,0,[\"changePassword\"]]],null],[12],[1,\"\\n        \"],[1,[28,[35,3],[\"envelope\"],null]],[1,\"\\n\"],[41,[30,0,[\"model\",\"no_password\"]],[[[1,\"          \"],[1,[28,[35,1],[\"user.change_password.set_password\"],null]],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,1],[\"user.change_password.action\"],null]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n\\n      \"],[1,[30,0,[\"passwordProgress\"]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group pref-second-factor\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.second_factor.title\"],null]],[13],[1,\"\\n\"],[41,[51,[30,0,[\"model\",\"second_factor_enabled\"]]],[[[1,\"      \"],[10,\"label\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"user.second_factor.short_description\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,0],[14,0,\"controls pref-second-factor\"],[12],[1,\"\\n\"],[41,[30,0,[\"isCurrentUser\"]],[[[1,\"        \"],[8,[39,5],[[24,0,\"btn btn-default\"]],[[\"@route\"],[\"preferences.second-factor\"]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,3],[\"lock\"],null]],[1,\"\\n          \"],[10,1],[12],[1,[28,[35,1],[\"user.second_factor.enable\"],null]],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canCheckEmails\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-auth-tokens\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"user.auth_tokens.title\"],null]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"auth-tokens\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"authTokens\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"row auth-token\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"auth-token-icon\"],[12],[1,[28,[35,3],[[30,1,[\"icon\"]]],null]],[13],[1,\"\\n\"],[41,[51,[30,1,[\"is_active\"]]],[[[1,\"            \"],[8,[39,8],null,[[\"@token\",\"@revokeAuthToken\",\"@showToken\"],[[30,1],[28,[37,9],[[30,0],\"revokeAuthToken\"],null],[28,[37,9],[[30,0],\"showToken\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"          \"],[10,0],[14,0,\"auth-token-first\"],[12],[1,\"\\n            \"],[1,[28,[35,10],[[28,[37,1],[\"user.auth_tokens.device_location\"],[[\"device\",\"ip\",\"location\"],[[30,1,[\"device\"]],[30,1,[\"client_ip\"]],[30,1,[\"location\"]]]]]],null]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"auth-token-second\"],[12],[1,\"\\n\"],[41,[30,1,[\"is_active\"]],[[[1,\"              \"],[1,[28,[35,10],[[28,[37,1],[\"user.auth_tokens.browser_active\"],[[\"browser\"],[[30,1,[\"browser\"]]]]]],null]],[1,\"\\n\"]],[]],[[[1,\"              \"],[1,[28,[35,10],[[28,[37,1],[\"user.auth_tokens.browser_last_seen\"],[[\"browser\",\"date\"],[[30,1,[\"browser\"]],[28,[37,11],[[30,1,[\"seen_at\"]]],null]]]]],null]],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canShowAllAuthTokens\"]],[[[1,\"      \"],[11,3],[24,6,\"\"],[4,[38,2],[\"click\",[30,0,[\"toggleShowAllAuthTokens\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"showAllAuthTokens\"]],[[[1,\"          \"],[1,[28,[35,3],[\"caret-up\"],null]],[1,\"\\n          \"],[1,[28,[35,1],[\"user.auth_tokens.show_few\"],null]],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,3],[\"caret-down\"],null]],[1,\"\\n          \"],[1,[28,[35,1],[\"user.auth_tokens.show_all\"],[[\"count\"],[[30,0,[\"model\",\"user_auth_tokens\",\"length\"]]]]]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[11,3],[24,6,\"\"],[24,0,\"pull-right text-danger\"],[4,[38,2],[\"click\",[28,[37,12],[[30,0,[\"revokeAuthToken\"]],null],null]],null],[12],[1,[28,[35,3],[\"sign-out-alt\"],null]],[1,\" \"],[1,[28,[35,1],[\"user.auth_tokens.log_out_all\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[8,[39,13],null,[[\"@model\"],[[30,2]]],null],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,14],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-security\",\"div\",[28,[37,15],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,9],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"br\"],[12],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,14],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,15],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13]],[\"token\",\"@model\"],false,[\"if\",\"i18n\",\"on\",\"d-icon\",\"unless\",\"link-to\",\"each\",\"-track-array\",\"auth-token-dropdown\",\"action\",\"html-safe\",\"format-date\",\"fn\",\"user-preferences/user-api-keys\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/templates/preferences/security.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});