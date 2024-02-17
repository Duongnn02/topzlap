define("discourse/components/notification-consent-banner", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/desktop-notification-config", "discourse-common/utils/decorators", "discourse/lib/push-notifications"], function (_exports, _component, _templateFactory, _desktopNotificationConfig, _decorators, _pushNotifications) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/desktop-notification-config",0,"discourse-common/utils/decorators",0,"discourse/lib/push-notifications"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showNotificationPromptBanner}}
    <div class="row">
      <div class="consent_banner alert alert-info">
        <span>
          {{i18n "user.desktop_notifications.consent_prompt"}}
          <DButton
            @display="link"
            @action={{action "turnon"}}
            @label="user.desktop_notifications.enable"
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
    "id": "ci2ncIyQ",
    "block": "[[[41,[30,0,[\"showNotificationPromptBanner\"]],[[[1,\"  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"consent_banner alert alert-info\"],[12],[1,\"\\n      \"],[10,1],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"user.desktop_notifications.consent_prompt\"],null]],[1,\"\\n        \"],[8,[39,2],null,[[\"@display\",\"@action\",\"@label\"],[\"link\",[28,[37,3],[[30,0],\"turnon\"],null],\"user.desktop_notifications.enable\"]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@icon\",\"@action\",\"@class\",\"@title\"],[\"times\",[28,[37,3],[[30,0],\"dismiss\"],null],\"btn btn-flat close\",\"banner.close\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"i18n\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/notification-consent-banner.hbs",
    "isStrictMode": false
  });
  const userDismissedPromptKey = "dismissed-prompt";
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _desktopNotificationConfig.default.extend((_dec = (0, _decorators.default)("isNotSupported", "isEnabled", "bannerDismissed", "currentUser.any_posts"), (_obj = {
    bannerDismissed: {
      set(value) {
        _pushNotifications.keyValueStore.setItem(userDismissedPromptKey, value);
        return _pushNotifications.keyValueStore.getItem(userDismissedPromptKey);
      },
      get() {
        return _pushNotifications.keyValueStore.getItem(userDismissedPromptKey);
      }
    },
    showNotificationPromptBanner(isNotSupported, isEnabled, bannerDismissed, anyPosts) {
      return this.siteSettings.push_notifications_prompt && !isNotSupported && this.currentUser && (this.capabilities.isPwa || anyPosts) && Notification.permission !== "denied" && Notification.permission !== "granted" && !isEnabled && !bannerDismissed;
    },
    actions: {
      turnon() {
        this._super(...arguments);
        this.set("bannerDismissed", true);
      },
      dismiss() {
        this.set("bannerDismissed", true);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "bannerDismissed", [_decorators.default], (_init = Object.getOwnPropertyDescriptor(_obj, "bannerDismissed"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "showNotificationPromptBanner", [_dec], Object.getOwnPropertyDescriptor(_obj, "showNotificationPromptBanner"), _obj)), _obj))));
  _exports.default = _default;
});