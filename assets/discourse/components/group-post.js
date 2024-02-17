define("discourse/components/group-post", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "discourse/lib/settings", "discourse/lib/computed", "discourse/lib/url", "I18n"], function (_exports, _component, _templateFactory, _decorators, _getUrl, _settings, _computed, _url, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"discourse/lib/settings",0,"discourse/lib/computed",0,"discourse/lib/url",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="user-stream-item__header info">
    <a
      href={{this.userUrl}}
      data-user-card={{this.post.user.username}}
      class="avatar-link"
    >
      {{avatar
        this.post.user
        imageSize="large"
        extraClasses="actor"
        ignoreTitle="true"
      }}
    </a>
  
    <div class="user-stream-item__details">
      <div class="stream-topic-title">
        <span class="title">
          <a href={{this.postUrl}} aria-label={{this.titleAriaLabel}}>
            {{html-safe this.post.topic.fancyTitle}}
          </a>
        </span>
      </div>
      <div class="group-post-category">{{category-link this.post.category}}</div>
      {{#if this.post.user}}
        <div class="group-member-info names">
          <span class="name">{{this.name}}</span>
          {{#if this.post.user.title}}<span
              class="user-title"
            >{{this.post.user.title}}</span>{{/if}}
          <PluginOutlet
            @name="group-post-additional-member-info"
            @outletArgs={{hash user=this.post.user}}
          />
        </div>
      {{/if}}
    </div>
  
    <ExpandPost @item={{this.post}} />
    <span class="time">{{format-date this.post.created_at leaveAgo="true"}}</span>
  </div>
  
  <div class="excerpt">
    {{#if this.post.expandedExcerpt}}
      {{html-safe this.post.expandedExcerpt}}
    {{else}}
      {{html-safe this.post.excerpt}}
    {{/if}}
  </div>
  */
  {
    "id": "jtc9DTuJ",
    "block": "[[[10,0],[14,0,\"user-stream-item__header info\"],[12],[1,\"\\n  \"],[10,3],[15,6,[30,0,[\"userUrl\"]]],[15,\"data-user-card\",[30,0,[\"post\",\"user\",\"username\"]]],[14,0,\"avatar-link\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[[30,0,[\"post\",\"user\"]]],[[\"imageSize\",\"extraClasses\",\"ignoreTitle\"],[\"large\",\"actor\",\"true\"]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"user-stream-item__details\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"stream-topic-title\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"title\"],[12],[1,\"\\n        \"],[10,3],[15,6,[30,0,[\"postUrl\"]]],[15,\"aria-label\",[30,0,[\"titleAriaLabel\"]]],[12],[1,\"\\n          \"],[1,[28,[35,1],[[30,0,[\"post\",\"topic\",\"fancyTitle\"]]],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"group-post-category\"],[12],[1,[28,[35,2],[[30,0,[\"post\",\"category\"]]],null]],[13],[1,\"\\n\"],[41,[30,0,[\"post\",\"user\"]],[[[1,\"      \"],[10,0],[14,0,\"group-member-info names\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"name\"],[12],[1,[30,0,[\"name\"]]],[13],[1,\"\\n        \"],[41,[30,0,[\"post\",\"user\",\"title\"]],[[[10,1],[14,0,\"user-title\"],[12],[1,[30,0,[\"post\",\"user\",\"title\"]]],[13]],[]],null],[1,\"\\n        \"],[8,[39,4],null,[[\"@name\",\"@outletArgs\"],[\"group-post-additional-member-info\",[28,[37,5],null,[[\"user\"],[[30,0,[\"post\",\"user\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[8,[39,6],null,[[\"@item\"],[[30,0,[\"post\"]]]],null],[1,\"\\n  \"],[10,1],[14,0,\"time\"],[12],[1,[28,[35,7],[[30,0,[\"post\",\"created_at\"]]],[[\"leaveAgo\"],[\"true\"]]]],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"excerpt\"],[12],[1,\"\\n\"],[41,[30,0,[\"post\",\"expandedExcerpt\"]],[[[1,\"    \"],[1,[28,[35,1],[[30,0,[\"post\",\"expandedExcerpt\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"    \"],[1,[28,[35,1],[[30,0,[\"post\",\"excerpt\"]]],null]],[1,\"\\n\"]],[]]],[13]],[],false,[\"avatar\",\"html-safe\",\"category-link\",\"if\",\"plugin-outlet\",\"hash\",\"expand-post\",\"format-date\"]]",
    "moduleName": "discourse/components/group-post.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("post.url"), _dec2 = (0, _decorators.default)("post.user"), _dec3 = (0, _decorators.default)("post.user"), _dec4 = (0, _decorators.default)("post.user.username"), _dec5 = (0, _decorators.default)("post.topic.title", "post.post_number"), (_obj = {
    classNameBindings: [":user-stream-item", ":item", "moderatorAction", "primaryGroup"],
    postUrl(url) {
      return (0, _getUrl.default)(url);
    },
    moderatorAction: (0, _computed.propertyEqual)("post.post_type", "site.post_types.moderator_action"),
    name(postUser) {
      if ((0, _settings.prioritizeNameInUx)(postUser.name)) {
        return postUser.name;
      }
      return postUser.username;
    },
    primaryGroup(postUser) {
      if (postUser.primary_group_name) {
        return `group-${postUser.primary_group_name}`;
      }
    },
    userUrl(username) {
      return (0, _url.userPath)(username.toLowerCase());
    },
    titleAriaLabel(title, postNumber) {
      return _I18n.default.t("groups.aria_post_number", {
        postNumber,
        title
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "postUrl", [_dec], Object.getOwnPropertyDescriptor(_obj, "postUrl"), _obj), _applyDecoratedDescriptor(_obj, "name", [_dec2], Object.getOwnPropertyDescriptor(_obj, "name"), _obj), _applyDecoratedDescriptor(_obj, "primaryGroup", [_dec3], Object.getOwnPropertyDescriptor(_obj, "primaryGroup"), _obj), _applyDecoratedDescriptor(_obj, "userUrl", [_dec4], Object.getOwnPropertyDescriptor(_obj, "userUrl"), _obj), _applyDecoratedDescriptor(_obj, "titleAriaLabel", [_dec5], Object.getOwnPropertyDescriptor(_obj, "titleAriaLabel"), _obj)), _obj))));
  _exports.default = _default;
});