define("discourse/components/user-menu/likes-list-empty-state", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="empty-state">
    <span class="empty-state-title">
      {{i18n "user.no_likes_title"}}
    </span>
    <div class="empty-state-body">
      <p>
        {{html-safe
          (i18n
            "user.no_likes_body"
            preferencesUrl=(get-url "/my/preferences/notifications")
          )
        }}
      </p>
    </div>
  </div>
  */
  {
    "id": "zFQKO7gA",
    "block": "[[[10,0],[14,0,\"empty-state\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"empty-state-title\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"user.no_likes_title\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"empty-state-body\"],[12],[1,\"\\n    \"],[10,2],[12],[1,\"\\n      \"],[1,[28,[35,1],[[28,[37,0],[\"user.no_likes_body\"],[[\"preferencesUrl\"],[[28,[37,2],[\"/my/preferences/notifications\"],null]]]]],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"html-safe\",\"get-url\"]]",
    "moduleName": "discourse/components/user-menu/likes-list-empty-state.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});