define("discourse/components/user-preferences/user-api-keys", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @model.userApiKeys}}
    <div class="control-group pref-user-api-keys">
      <label class="control-label pref-user-api-keys__label">{{i18n
          "user.apps"
        }}</label>
  
      <div class="controls">
        {{#each @model.userApiKeys as |key|}}
          <div>
            <span
              class="pref-user-api-keys__application-name"
            >{{key.application_name}}</span>
  
            {{#if key.revoked}}
              <DButton
                @action={{route-action "undoRevokeApiKey"}}
                @actionParam={{key}}
                @class="btn"
                @label="user.undo_revoke_access"
              />
            {{else}}
              <DButton
                @action={{route-action "revokeApiKey"}}
                @actionParam={{key}}
                @class="btn"
                @label="user.revoke_access"
              />
            {{/if}}
  
            <p>
              <ul class="pref-user-api-keys__scopes-list">
                {{#each key.scopes as |scope|}}
                  <li class="pref-user-api-keys__scopes-list-item">{{scope}}</li>
                {{/each}}
              </ul>
            </p>
  
            <p class="pref-user-api-keys__created-at">
              <span>{{i18n "user.api_approved"}}</span>
              {{bound-date key.created_at}}
            </p>
  
            <p class="pref-user-api-keys__last-used-at">
              <span>{{i18n "user.api_last_used_at"}}</span>
              {{bound-date key.last_used_at}}
            </p>
          </div>
        {{/each}}
      </div>
    </div>
  {{/if}}
  */
  {
    "id": "sIZ/Fxvi",
    "block": "[[[41,[30,1,[\"userApiKeys\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group pref-user-api-keys\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label pref-user-api-keys__label\"],[12],[1,[28,[35,1],[\"user.apps\"],null]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,1,[\"userApiKeys\"]]],null]],null],null,[[[1,\"        \"],[10,0],[12],[1,\"\\n          \"],[10,1],[14,0,\"pref-user-api-keys__application-name\"],[12],[1,[30,2,[\"application_name\"]]],[13],[1,\"\\n\\n\"],[41,[30,2,[\"revoked\"]],[[[1,\"            \"],[8,[39,4],null,[[\"@action\",\"@actionParam\",\"@class\",\"@label\"],[[28,[37,5],[\"undoRevokeApiKey\"],null],[30,2],\"btn\",\"user.undo_revoke_access\"]],null],[1,\"\\n\"]],[]],[[[1,\"            \"],[8,[39,4],null,[[\"@action\",\"@actionParam\",\"@class\",\"@label\"],[[28,[37,5],[\"revokeApiKey\"],null],[30,2],\"btn\",\"user.revoke_access\"]],null],[1,\"\\n\"]],[]]],[1,\"\\n          \"],[10,2],[12],[1,\"\\n            \"],[10,\"ul\"],[14,0,\"pref-user-api-keys__scopes-list\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,2,[\"scopes\"]]],null]],null],null,[[[1,\"                \"],[10,\"li\"],[14,0,\"pref-user-api-keys__scopes-list-item\"],[12],[1,[30,3]],[13],[1,\"\\n\"]],[3]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"pref-user-api-keys__created-at\"],[12],[1,\"\\n            \"],[10,1],[12],[1,[28,[35,1],[\"user.api_approved\"],null]],[13],[1,\"\\n            \"],[1,[28,[35,6],[[30,2,[\"created_at\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"pref-user-api-keys__last-used-at\"],[12],[1,\"\\n            \"],[10,1],[12],[1,[28,[35,1],[\"user.api_last_used_at\"],null]],[13],[1,\"\\n            \"],[1,[28,[35,6],[[30,2,[\"last_used_at\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[2]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"@model\",\"key\",\"scope\"],false,[\"if\",\"i18n\",\"each\",\"-track-array\",\"d-button\",\"route-action\",\"bound-date\"]]",
    "moduleName": "discourse/components/user-preferences/user-api-keys.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});