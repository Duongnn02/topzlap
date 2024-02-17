define("discourse/components/discourse-banner", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object"], function (_exports, _component, _templateFactory, _decorators, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.visible}}
    <div class="row">
      <div id="banner" class={{this.overlay}}>
        <div class="floated-buttons">
          {{#if this.currentUser.staff}}
            <a href={{this.banner.url}} class="btn btn-flat edit-banner">
              {{d-icon "pencil-alt"}}
              {{#unless this.site.mobileView}}
                {{html-safe (i18n "banner.edit")}}
              {{/unless}}
            </a>
          {{/if}}
  
          <DButton
            @icon="times"
            @action={{action "dismiss"}}
            @class="btn btn-flat close"
            @title="banner.close"
          />
        </div>
        <div id="banner-content">
          {{html-safe this.content}}
        </div>
      </div>
    </div>
  {{/if}}
  */
  {
    "id": "RHrpRg2h",
    "block": "[[[41,[30,0,[\"visible\"]],[[[1,\"  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,1,\"banner\"],[15,0,[30,0,[\"overlay\"]]],[12],[1,\"\\n      \"],[10,0],[14,0,\"floated-buttons\"],[12],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"staff\"]],[[[1,\"          \"],[10,3],[15,6,[30,0,[\"banner\",\"url\"]]],[14,0,\"btn btn-flat edit-banner\"],[12],[1,\"\\n            \"],[1,[28,[35,1],[\"pencil-alt\"],null]],[1,\"\\n\"],[41,[51,[30,0,[\"site\",\"mobileView\"]]],[[[1,\"              \"],[1,[28,[35,3],[[28,[37,4],[\"banner.edit\"],null]],null]],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n        \"],[8,[39,5],null,[[\"@icon\",\"@action\",\"@class\",\"@title\"],[\"times\",[28,[37,6],[[30,0],\"dismiss\"],null],\"btn btn-flat close\",\"banner.close\"]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,1,\"banner-content\"],[12],[1,\"\\n        \"],[1,[28,[35,3],[[30,0,[\"content\"]]],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"d-icon\",\"unless\",\"html-safe\",\"i18n\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/discourse-banner.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("banner.html"), _dec2 = (0, _decorators.default)("user.dismissed_banner_key", "banner.key", "hide"), (_obj = {
    hide: false,
    content(bannerHtml) {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = bannerHtml;
      newDiv.querySelectorAll("[id^='heading--']").forEach(el => {
        el.removeAttribute("id");
      });
      return newDiv.innerHTML;
    },
    visible(dismissedBannerKey, bannerKey, hide) {
      dismissedBannerKey = dismissedBannerKey || this.keyValueStore.get("dismissed_banner_key");
      if (bannerKey) {
        bannerKey = parseInt(bannerKey, 10);
      }
      if (dismissedBannerKey) {
        dismissedBannerKey = parseInt(dismissedBannerKey, 10);
      }
      return !hide && bannerKey && dismissedBannerKey !== bannerKey;
    },
    dismiss() {
      if (this.user) {
        this.user.dismissBanner(this.get("banner.key"));
      } else {
        this.set("hide", true);
        this.keyValueStore.set({
          key: "dismissed_banner_key",
          value: this.get("banner.key")
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "content", [_dec], Object.getOwnPropertyDescriptor(_obj, "content"), _obj), _applyDecoratedDescriptor(_obj, "visible", [_dec2], Object.getOwnPropertyDescriptor(_obj, "visible"), _obj), _applyDecoratedDescriptor(_obj, "dismiss", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismiss"), _obj)), _obj))));
  _exports.default = _default;
});