define("discourse/components/user-info", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/url", "discourse/lib/settings"], function (_exports, _component, _templateFactory, _computed, _decorators, _url, _settings) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/url",0,"discourse/lib/settings"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.includeAvatar}}
    <div class="user-image">
      <div class="user-image-inner">
        <a href={{this.userPath}} data-user-card={{@user.username}}>{{avatar
            @user
            imageSize="large"
          }}</a>
        <UserAvatarFlair @user={{@user}} />
      </div>
    </div>
  {{/if}}
  
  <div class="user-detail">
    <div class="name-line">
      <span class={{if this.nameFirst "name bold" "username bold"}}>
        {{#if this.includeLink}}
          <a href={{this.userPath}} data-user-card={{@user.username}}>
            {{if this.nameFirst @user.name (format-username @user.username)}}
          </a>
        {{else}}
          {{if this.nameFirst @user.name (format-username @user.username)}}
        {{/if}}
      </span>
      <span class={{if this.nameFirst "username margin" "name margin"}}>
        {{#if this.includeLink}}
          <a href={{this.userPath}} data-user-card={{@user.username}}>
            {{if this.nameFirst (format-username @user.username) @user.name}}
          </a>
        {{else}}
          {{if this.nameFirst (format-username @user.username) @user.name}}
        {{/if}}
      </span>
      {{#if (and @showStatus @user.status)}}
        <UserStatusMessage
          @status={{@user.status}}
          @showDescription={{@showStatusDescription}}
          @showTooltip={{@showStatusTooltip}}
        />
      {{/if}}
      <span>
        <PluginOutlet
          @name="after-user-name"
          @connectorTagName="span"
          @outletArgs={{hash user=this.user}}
        />
      </span>
    </div>
    <div class="title">{{@user.title}}</div>
  
    {{#if (has-block)}}
      <div class="details">
        {{yield}}
      </div>
    {{/if}}
  
  </div>
  
  <span>
    <PluginOutlet
      @name="after-user-info"
      @connectorTagName="div"
      @outletArgs={{hash user=this.user}}
    />
  </span>
  */
  {
    "id": "8pcc5lKR",
    "block": "[[[41,[30,0,[\"includeAvatar\"]],[[[1,\"  \"],[10,0],[14,0,\"user-image\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"user-image-inner\"],[12],[1,\"\\n      \"],[10,3],[15,6,[30,0,[\"userPath\"]]],[15,\"data-user-card\",[30,1,[\"username\"]]],[12],[1,[28,[35,1],[[30,1]],[[\"imageSize\"],[\"large\"]]]],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@user\"],[[30,1]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"user-detail\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"name-line\"],[12],[1,\"\\n    \"],[10,1],[15,0,[52,[30,0,[\"nameFirst\"]],\"name bold\",\"username bold\"]],[12],[1,\"\\n\"],[41,[30,0,[\"includeLink\"]],[[[1,\"        \"],[10,3],[15,6,[30,0,[\"userPath\"]]],[15,\"data-user-card\",[30,1,[\"username\"]]],[12],[1,\"\\n          \"],[1,[52,[30,0,[\"nameFirst\"]],[30,1,[\"name\"]],[28,[37,3],[[30,1,[\"username\"]]],null]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[52,[30,0,[\"nameFirst\"]],[30,1,[\"name\"]],[28,[37,3],[[30,1,[\"username\"]]],null]]],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n    \"],[10,1],[15,0,[52,[30,0,[\"nameFirst\"]],\"username margin\",\"name margin\"]],[12],[1,\"\\n\"],[41,[30,0,[\"includeLink\"]],[[[1,\"        \"],[10,3],[15,6,[30,0,[\"userPath\"]]],[15,\"data-user-card\",[30,1,[\"username\"]]],[12],[1,\"\\n          \"],[1,[52,[30,0,[\"nameFirst\"]],[28,[37,3],[[30,1,[\"username\"]]],null],[30,1,[\"name\"]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[52,[30,0,[\"nameFirst\"]],[28,[37,3],[[30,1,[\"username\"]]],null],[30,1,[\"name\"]]]],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n\"],[41,[28,[37,4],[[30,2],[30,1,[\"status\"]]],null],[[[1,\"      \"],[8,[39,5],null,[[\"@status\",\"@showDescription\",\"@showTooltip\"],[[30,1,[\"status\"]],[30,3],[30,4]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"after-user-name\",\"span\",[28,[37,7],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"title\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n\\n\"],[41,[48,[30,5]],[[[1,\"    \"],[10,0],[14,0,\"details\"],[12],[1,\"\\n      \"],[18,5,null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"after-user-info\",\"div\",[28,[37,7],null,[[\"user\"],[[30,0,[\"user\"]]]]]]],null],[1,\"\\n\"],[13]],[\"@user\",\"@showStatus\",\"@showStatusDescription\",\"@showStatusTooltip\",\"&default\"],false,[\"if\",\"avatar\",\"user-avatar-flair\",\"format-username\",\"and\",\"user-status-message\",\"plugin-outlet\",\"hash\",\"has-block\",\"yield\"]]",
    "moduleName": "discourse/components/user-info.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("user.username"), _dec2 = (0, _decorators.default)("user.name"), (_obj = {
    classNameBindings: [":user-info", "size"],
    attributeBindings: ["data-username"],
    size: "small",
    "data-username": (0, _computed.alias)("user.username"),
    includeLink: true,
    includeAvatar: true,
    didInsertElement() {
      this._super(...arguments);
      this.user?.trackStatus?.();
    },
    willDestroyElement() {
      this._super(...arguments);
      this.user?.stopTrackingStatus?.();
    },
    userPath(username) {
      return (0, _url.userPath)(username);
    },
    nameFirst(name) {
      return (0, _settings.prioritizeNameInUx)(name);
    }
  }, (_applyDecoratedDescriptor(_obj, "userPath", [_dec], Object.getOwnPropertyDescriptor(_obj, "userPath"), _obj), _applyDecoratedDescriptor(_obj, "nameFirst", [_dec2], Object.getOwnPropertyDescriptor(_obj, "nameFirst"), _obj)), _obj))));
  _exports.default = _default;
});