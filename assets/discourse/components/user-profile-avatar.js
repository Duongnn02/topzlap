define("discourse/components/user-profile-avatar", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="user-profile-avatar">
    {{bound-avatar @user "huge"}}
    <UserAvatarFlair @user={{@user}} />
    <div>
      <PluginOutlet
        @name="user-profile-avatar-flair"
        @connectorTagName="div"
        @outletArgs={{hash model=@user}}
      />
    </div>
  </div>
  */
  {
    "id": "o2UuYpq6",
    "block": "[[[10,0],[14,0,\"user-profile-avatar\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[[30,1],\"huge\"],null]],[1,\"\\n  \"],[8,[39,1],null,[[\"@user\"],[[30,1]]],null],[1,\"\\n  \"],[10,0],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-profile-avatar-flair\",\"div\",[28,[37,3],null,[[\"model\"],[[30,1]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@user\"],false,[\"bound-avatar\",\"user-avatar-flair\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/user-profile-avatar.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});