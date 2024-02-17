define("discourse/controllers/user-notifications", ["exports", "@ember/controller", "discourse-common/lib/get-url", "discourse-common/lib/icon-library", "discourse-common/utils/decorators", "discourse/lib/ajax", "discourse/lib/show-modal", "I18n", "@ember/template"], function (_exports, _controller, _getUrl, _iconLibrary, _decorators, _ajax, _showModal, _I18n, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/lib/get-url",0,"discourse-common/lib/icon-library",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax",0,"discourse/lib/show-modal",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.observes)("model.canLoadMore"), _dec2 = (0, _decorators.default)("filter"), _dec3 = (0, _decorators.default)("model.content.@each.read"), _dec4 = (0, _decorators.default)("isFiltered", "model.content.length"), _dec5 = (0, _decorators.default)("isFiltered", "model.content.length"), _dec6 = (0, _decorators.default)(), (_obj = {
    application: (0, _controller.inject)(),
    queryParams: ["filter"],
    filter: "all",
    _showFooter() {
      this.set("application.showFooter", !this.get("model.canLoadMore"));
    },
    isFiltered() {
      return this.filter && this.filter !== "all";
    },
    allNotificationsRead() {
      return !this.get("model.content").some(notification => !notification.get("read"));
    },
    doesNotHaveNotifications(isFiltered, contentLength) {
      return !isFiltered && contentLength === 0;
    },
    nothingFound(isFiltered, contentLength) {
      return isFiltered && contentLength === 0;
    },
    emptyStateBody() {
      return (0, _template.htmlSafe)(_I18n.default.t("user.no_notifications_page_body", {
        preferencesUrl: (0, _getUrl.default)("/my/preferences/notifications"),
        icon: (0, _iconLibrary.iconHTML)("bell")
      }));
    },
    markRead() {
      return (0, _ajax.ajax)("/notifications/mark-read", {
        type: "PUT"
      }).then(() => {
        this.model.forEach(n => n.set("read", true));
      });
    },
    actions: {
      async resetNew() {
        const unreadHighPriorityNotifications = this.currentUser.get("unread_high_priority_notifications");
        if (unreadHighPriorityNotifications > 0) {
          (0, _showModal.default)("dismiss-notification-confirmation").setProperties({
            confirmationMessage: _I18n.default.t("notifications.dismiss_confirmation.body.default", {
              count: unreadHighPriorityNotifications
            }),
            dismissNotifications: () => this.markRead()
          });
        } else {
          this.markRead();
        }
      },
      loadMore() {
        this.model.loadMore();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_showFooter", [_dec], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj), _applyDecoratedDescriptor(_obj, "isFiltered", [_dec2], Object.getOwnPropertyDescriptor(_obj, "isFiltered"), _obj), _applyDecoratedDescriptor(_obj, "allNotificationsRead", [_dec3], Object.getOwnPropertyDescriptor(_obj, "allNotificationsRead"), _obj), _applyDecoratedDescriptor(_obj, "doesNotHaveNotifications", [_dec4], Object.getOwnPropertyDescriptor(_obj, "doesNotHaveNotifications"), _obj), _applyDecoratedDescriptor(_obj, "nothingFound", [_dec5], Object.getOwnPropertyDescriptor(_obj, "nothingFound"), _obj), _applyDecoratedDescriptor(_obj, "emptyStateBody", [_dec6], Object.getOwnPropertyDescriptor(_obj, "emptyStateBody"), _obj)), _obj)));
  _exports.default = _default;
});