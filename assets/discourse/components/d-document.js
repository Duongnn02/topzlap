define("discourse/components/d-document", ["exports", "@ember/component", "I18n", "discourse-common/utils/decorators", "discourse/lib/logout", "@ember/service", "discourse/lib/ajax"], function (_exports, _component, _I18n, _decorators, _logout, _service, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addPluginDocumentTitleCounter = addPluginDocumentTitleCounter;
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"discourse/lib/logout",0,"@ember/service",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let pluginCounterFunctions = [];
  function addPluginDocumentTitleCounter(counterFunction) {
    pluginCounterFunctions.push(counterFunction);
  }
  var _default = _component.default.extend((_obj = {
    tagName: "",
    documentTitle: (0, _service.inject)(),
    dialog: (0, _service.inject)(),
    _showingLogout: false,
    didInsertElement() {
      this._super(...arguments);
      this.documentTitle.setTitle(document.title);
      document.addEventListener("visibilitychange", this._focusChanged);
      document.addEventListener("resume", this._focusChanged);
      document.addEventListener("freeze", this._focusChanged);
      this.session.hasFocus = true;
      this.appEvents.on("notifications:changed", this, this._updateNotifications);
      (0, _ajax.setLogoffCallback)(() => this.displayLogoff());
    },
    willDestroyElement() {
      this._super(...arguments);
      (0, _ajax.setLogoffCallback)(null);
      document.removeEventListener("visibilitychange", this._focusChanged);
      document.removeEventListener("resume", this._focusChanged);
      document.removeEventListener("freeze", this._focusChanged);
      this.appEvents.off("notifications:changed", this, this._updateNotifications);
    },
    _updateNotifications(opts) {
      if (!this.currentUser) {
        return;
      }
      let count = pluginCounterFunctions.reduce((sum, fn) => sum + fn(), 0);
      if (this.currentUser.redesigned_user_menu_enabled) {
        count += this.currentUser.all_unread_notifications_count;
        if (this.currentUser.unseen_reviewable_count) {
          count += this.currentUser.unseen_reviewable_count;
        }
      } else {
        count += this.currentUser.unread_notifications + this.currentUser.unread_high_priority_notifications;
      }
      this.documentTitle.updateNotificationCount(count, {
        forced: opts?.forced
      });
    },
    _focusChanged() {
      if (document.visibilityState === "hidden") {
        if (this.session.hasFocus) {
          this.documentTitle.setFocus(false);
        }
      } else if (!this.hasFocus) {
        this.documentTitle.setFocus(true);
      }
    },
    displayLogoff() {
      if (this._showingLogout) {
        return;
      }
      this._showingLogout = true;
      this.messageBus.stop();
      this.dialog.alert({
        message: _I18n.default.t("logout"),
        confirmButtonLabel: "refresh",
        didConfirm: () => (0, _logout.default)(),
        didCancel: () => (0, _logout.default)()
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "_focusChanged", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_focusChanged"), _obj)), _obj));
  _exports.default = _default;
});