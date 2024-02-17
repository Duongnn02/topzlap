define("discourse/components/pwa-install-banner", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showPWAInstallBanner}}
    <div class="row">
      <div class="pwa-install-banner alert alert-info">
        <span>
          <DiscourseLinkedText
            @action={{action "turnOn"}}
            @text="pwa.install_banner"
            @textParams={{hash title=this.siteSettings.title}}
          />
        </span>
        <DButton
          @icon="times"
          @action={{action "dismiss"}}
          @class="btn btn-flat close"
          @title="banner.close"
        />
      </div>
    </div>
  {{/if}}
  */
  {
    "id": "fYm3E/4F",
    "block": "[[[41,[30,0,[\"showPWAInstallBanner\"]],[[[1,\"  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"pwa-install-banner alert alert-info\"],[12],[1,\"\\n      \"],[10,1],[12],[1,\"\\n        \"],[8,[39,1],null,[[\"@action\",\"@text\",\"@textParams\"],[[28,[37,2],[[30,0],\"turnOn\"],null],\"pwa.install_banner\",[28,[37,3],null,[[\"title\"],[[30,0,[\"siteSettings\",\"title\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,4],null,[[\"@icon\",\"@action\",\"@class\",\"@title\"],[\"times\",[28,[37,2],[[30,0],\"dismiss\"],null],\"btn btn-flat close\",\"banner.close\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"discourse-linked-text\",\"action\",\"hash\",\"d-button\"]]",
    "moduleName": "discourse/components/pwa-install-banner.hbs",
    "isStrictMode": false
  });
  const USER_DISMISSED_PROMPT_KEY = "dismissed-pwa-install-banner";
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.on)("didInsertElement"), _dec2 = (0, _decorators.on)("willDestroyElement"), _dec3 = (0, _decorators.default)("deferredInstallPromptEvent", "bannerDismissed"), (_obj = {
    deferredInstallPromptEvent: null,
    _onInstallPrompt(event) {
      // Prevent Chrome 76+ from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later
      this.set("deferredInstallPromptEvent", event);
    },
    _registerListener() {
      window.addEventListener("beforeinstallprompt", this._onInstallPrompt);
    },
    _unregisterListener() {
      window.removeEventListener("beforeinstallprompt", this._onInstallPrompt);
    },
    bannerDismissed: {
      set(value) {
        this.keyValueStore.set({
          key: USER_DISMISSED_PROMPT_KEY,
          value
        });
        return this.keyValueStore.get(USER_DISMISSED_PROMPT_KEY);
      },
      get() {
        return this.keyValueStore.get(USER_DISMISSED_PROMPT_KEY);
      }
    },
    showPWAInstallBanner(deferredInstallPromptEvent, bannerDismissed) {
      return this.capabilities.isAndroid && this.get("currentUser.trust_level") > 0 && deferredInstallPromptEvent &&
      // Pass the browser engagement checks
      !window.matchMedia("(display-mode: standalone)").matches &&
      // Not be in the installed PWA already
      !this.capabilities.isAppWebview &&
      // not launched via official app
      !bannerDismissed // Have not a previously dismissed install banner
      ;
    },

    actions: {
      turnOn() {
        this.set("bannerDismissed", true);
        this.deferredInstallPromptEvent.prompt();
      },
      dismiss() {
        this.set("bannerDismissed", true);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_onInstallPrompt", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_onInstallPrompt"), _obj), _applyDecoratedDescriptor(_obj, "_registerListener", [_dec], Object.getOwnPropertyDescriptor(_obj, "_registerListener"), _obj), _applyDecoratedDescriptor(_obj, "_unregisterListener", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_unregisterListener"), _obj), _applyDecoratedDescriptor(_obj, "bannerDismissed", [_decorators.default], (_init = Object.getOwnPropertyDescriptor(_obj, "bannerDismissed"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "showPWAInstallBanner", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showPWAInstallBanner"), _obj)), _obj))));
  _exports.default = _default;
});