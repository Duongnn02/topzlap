define("discourse/components/about-page-users", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/lib/settings", "discourse/helpers/user-avatar", "discourse/lib/url"], function (_exports, _component, _templateFactory, _object, _settings, _userAvatar, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse/lib/settings",0,"discourse/helpers/user-avatar",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.usersTemplates as |userTemplate|}}
    <div data-username={{userTemplate.username}} class="user-info small">
      <div class="user-image">
        <div class="user-image-inner">
          <a
            href={{userTemplate.userPath}}
            data-user-card={{userTemplate.username}}
          >
            {{html-safe userTemplate.avatar}}
          </a>
        </div>
      </div>
      <div class="user-detail">
        <div class="name-line">
          <span class="username">
            <a
              href={{userTemplate.userPath}}
              data-user-card={{userTemplate.username}}
            >
              {{#if
                userTemplate.prioritizeName
              }}{{userTemplate.name}}{{else}}{{userTemplate.username}}{{/if}}
            </a>
          </span>
          <span class="name">
            {{#if
              userTemplate.prioritizeName
            }}{{userTemplate.username}}{{else}}{{userTemplate.name}}{{/if}}
          </span>
        </div>
        <div class="title">{{userTemplate.title}}</div>
      </div>
    </div>
  {{/each}}
  */
  {
    "id": "XIfN6mgO",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"usersTemplates\"]]],null]],null],null,[[[1,\"  \"],[10,0],[15,\"data-username\",[30,1,[\"username\"]]],[14,0,\"user-info small\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"user-image\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"user-image-inner\"],[12],[1,\"\\n        \"],[10,3],[15,6,[30,1,[\"userPath\"]]],[15,\"data-user-card\",[30,1,[\"username\"]]],[12],[1,\"\\n          \"],[1,[28,[35,2],[[30,1,[\"avatar\"]]],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"user-detail\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"name-line\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"username\"],[12],[1,\"\\n          \"],[10,3],[15,6,[30,1,[\"userPath\"]]],[15,\"data-user-card\",[30,1,[\"username\"]]],[12],[1,\"\\n            \"],[41,[30,1,[\"prioritizeName\"]],[[[1,[30,1,[\"name\"]]]],[]],[[[1,[30,1,[\"username\"]]]],[]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"name\"],[12],[1,\"\\n          \"],[41,[30,1,[\"prioritizeName\"]],[[[1,[30,1,[\"username\"]]]],[]],[[[1,[30,1,[\"name\"]]]],[]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"title\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[1]],null]],[\"userTemplate\"],false,[\"each\",\"-track-array\",\"html-safe\",\"if\"]]",
    "moduleName": "discourse/components/about-page-users.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    usersTemplates: (0, _object.computed)("users.[]", function () {
      return (this.users || []).map(user => {
        const {
          name,
          username
        } = user;
        return {
          name,
          username,
          userPath: (0, _url.userPath)(username),
          avatar: (0, _userAvatar.renderAvatar)(user, {
            imageSize: "large",
            siteSettings: this.siteSettings
          }),
          title: user.title || "",
          prioritizeName: (0, _settings.prioritizeNameInUx)(name)
        };
      });
    })
  }));
  _exports.default = _default;
});