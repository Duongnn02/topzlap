define("discourse/components/desktop-notification-config", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/desktop-notifications", "discourse/lib/push-notifications", "discourse/lib/key-value-store", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _desktopNotifications, _pushNotifications, _keyValueStore, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj, _init, _init2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/desktop-notifications",0,"discourse/lib/push-notifications",0,"@ember/component",0,"discourse/lib/key-value-store",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.isNotSupported}}
    <DButton
      @icon="bell-slash"
      @class="btn-default"
      @label="user.desktop_notifications.not_supported"
      @disabled="true"
    />
  {{/if}}
  {{#if this.isDeniedPermission}}
    <DButton
      @icon="bell-slash"
      @class="btn-default"
      @label="user.desktop_notifications.perm_denied_btn"
      @action={{action "recheckPermission"}}
      @disabled="true"
    />
    {{i18n "user.desktop_notifications.perm_denied_expl"}}
  {{else}}
    {{#if this.isSubscribed}}
      <DButton
        @icon="far-bell-slash"
        @class="btn-default"
        @label="user.desktop_notifications.disable"
        @action={{action "turnoff"}}
      />
    {{else}}
      <DButton
        @icon="far-bell"
        @class="btn-default"
        @label="user.desktop_notifications.enable"
        @action={{action "turnon"}}
      />
    {{/if}}
  {{/if}}
  */
  {
    "id": "1DocfkXR",
    "block": "[[[41,[30,0,[\"isNotSupported\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@icon\",\"@class\",\"@label\",\"@disabled\"],[\"bell-slash\",\"btn-default\",\"user.desktop_notifications.not_supported\",\"true\"]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"isDeniedPermission\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@icon\",\"@class\",\"@label\",\"@action\",\"@disabled\"],[\"bell-slash\",\"btn-default\",\"user.desktop_notifications.perm_denied_btn\",[28,[37,2],[[30,0],\"recheckPermission\"],null],\"true\"]],null],[1,\"\\n  \"],[1,[28,[35,3],[\"user.desktop_notifications.perm_denied_expl\"],null]],[1,\"\\n\"]],[]],[[[41,[30,0,[\"isSubscribed\"]],[[[1,\"    \"],[8,[39,1],null,[[\"@icon\",\"@class\",\"@label\",\"@action\"],[\"far-bell-slash\",\"btn-default\",\"user.desktop_notifications.disable\",[28,[37,2],[[30,0],\"turnoff\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,1],null,[[\"@icon\",\"@class\",\"@label\",\"@action\"],[\"far-bell\",\"btn-default\",\"user.desktop_notifications.enable\",[28,[37,2],[[30,0],\"turnon\"],null]]],null],[1,\"\\n\"]],[]]]],[]]]],[],false,[\"if\",\"d-button\",\"action\",\"i18n\"]]",
    "moduleName": "discourse/components/desktop-notification-config.hbs",
    "isStrictMode": false
  });
  const keyValueStore = new _keyValueStore.default(_desktopNotifications.context);
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("isNotSupported"), _dec2 = (0, _decorators.default)("isNotSupported", "notificationsPermission"), _dec3 = (0, _decorators.default)("isNotSupported", "notificationsPermission"), _dec4 = (0, _decorators.default)("isGrantedPermission", "notificationsDisabled"), _dec5 = (0, _decorators.default)("isEnabled", "isEnabledPush", "notificationsDisabled"), (_obj = {
    classNames: ["controls"],
    notificationsPermission(isNotSupported) {
      return isNotSupported ? "" : Notification.permission;
    },
    notificationsDisabled: {
      set(value) {
        keyValueStore.setItem("notifications-disabled", value);
        return keyValueStore.getItem("notifications-disabled");
      },
      get() {
        return keyValueStore.getItem("notifications-disabled");
      }
    },
    isNotSupported() {
      return typeof window.Notification === "undefined";
    },
    isDeniedPermission(isNotSupported, notificationsPermission) {
      return isNotSupported ? false : notificationsPermission === "denied";
    },
    isGrantedPermission(isNotSupported, notificationsPermission) {
      return isNotSupported ? false : notificationsPermission === "granted";
    },
    isEnabledDesktop(isGrantedPermission, notificationsDisabled) {
      return isGrantedPermission ? !notificationsDisabled : false;
    },
    isEnabledPush: {
      set(value) {
        const user = this.currentUser;
        if (!user) {
          return false;
        }
        _pushNotifications.keyValueStore.setItem((0, _pushNotifications.userSubscriptionKey)(user), value);
        return _pushNotifications.keyValueStore.getItem((0, _pushNotifications.userSubscriptionKey)(user));
      },
      get() {
        const user = this.currentUser;
        return user ? _pushNotifications.keyValueStore.getItem((0, _pushNotifications.userSubscriptionKey)(user)) : false;
      }
    },
    isEnabled: (0, _computed.or)("isEnabledDesktop", "isEnabledPush"),
    isSubscribed(isEnabled, isEnabledPush, notificationsDisabled) {
      if (!isEnabled) {
        return false;
      }
      if (this.isPushNotificationsPreferred()) {
        return isEnabledPush === "subscribed";
      } else {
        return notificationsDisabled === "";
      }
    },
    isPushNotificationsPreferred() {
      return (this.site.mobileView || this.siteSettings.enable_desktop_push_notifications) && (0, _pushNotifications.isPushNotificationsSupported)();
    },
    actions: {
      recheckPermission() {
        this.notifyPropertyChange("notificationsPermission");
      },
      turnoff() {
        if (this.isEnabledDesktop) {
          this.set("notificationsDisabled", "disabled");
          this.notifyPropertyChange("notificationsPermission");
        }
        if (this.isEnabledPush) {
          (0, _pushNotifications.unsubscribe)(this.currentUser, () => {
            this.set("isEnabledPush", "");
          });
        }
      },
      turnon() {
        if (this.isPushNotificationsPreferred()) {
          (0, _pushNotifications.subscribe)(() => {
            this.set("isEnabledPush", "subscribed");
          }, this.siteSettings.vapid_public_key_bytes);
        } else {
          this.set("notificationsDisabled", "");
          Notification.requestPermission(() => {
            (0, _desktopNotifications.confirmNotification)(this.siteSettings);
            this.notifyPropertyChange("notificationsPermission");
          });
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "notificationsPermission", [_dec], Object.getOwnPropertyDescriptor(_obj, "notificationsPermission"), _obj), _applyDecoratedDescriptor(_obj, "notificationsDisabled", [_decorators.default], (_init = Object.getOwnPropertyDescriptor(_obj, "notificationsDisabled"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "isNotSupported", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "isNotSupported"), _obj), _applyDecoratedDescriptor(_obj, "isDeniedPermission", [_dec2], Object.getOwnPropertyDescriptor(_obj, "isDeniedPermission"), _obj), _applyDecoratedDescriptor(_obj, "isGrantedPermission", [_dec3], Object.getOwnPropertyDescriptor(_obj, "isGrantedPermission"), _obj), _applyDecoratedDescriptor(_obj, "isEnabledDesktop", [_dec4], Object.getOwnPropertyDescriptor(_obj, "isEnabledDesktop"), _obj), _applyDecoratedDescriptor(_obj, "isEnabledPush", [_decorators.default], (_init2 = Object.getOwnPropertyDescriptor(_obj, "isEnabledPush"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "isSubscribed", [_dec5], Object.getOwnPropertyDescriptor(_obj, "isSubscribed"), _obj)), _obj))));
  _exports.default = _default;
});