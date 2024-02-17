define("discourse/widgets/quick-access-notifications", ["discourse/widgets/raw-html", "discourse-common/lib/icon-library", "discourse-common/lib/get-url", "discourse/widgets/quick-access-panel", "discourse/lib/ajax", "discourse/widgets/widget", "virtual-dom", "I18n", "@ember/string", "@ember/template"], function (_rawHtml, _iconLibrary, _getUrl, _quickAccessPanel, _ajax, _widget, _virtualDom, _I18n, _string, _template) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/raw-html",0,"discourse-common/lib/icon-library",0,"discourse-common/lib/get-url",0,"discourse/widgets/quick-access-panel",0,"discourse/lib/ajax",0,"discourse/widgets/widget",0,"virtual-dom",0,"I18n",0,"@ember/string",0,"@ember/template"eaimeta@70e063a35619d71f
  const ICON = "bell";
  (0, _widget.createWidget)("no-quick-access-notifications", {
    html() {
      return (0, _virtualDom.h)("div.empty-state", [(0, _virtualDom.h)("span.empty-state-title", _I18n.default.t("user.no_notifications_title")), (0, _virtualDom.h)("div.empty-state-body", new _rawHtml.default({
        html: "<p>" + (0, _template.htmlSafe)(_I18n.default.t("user.no_notifications_body", {
          preferencesUrl: (0, _getUrl.default)("/my/preferences/notifications"),
          icon: (0, _iconLibrary.iconHTML)(ICON)
        })) + "</p>"
      }))]);
    }
  });
  (0, _widget.createWidgetFrom)(_quickAccessPanel.default, "quick-access-notifications", {
    buildKey: () => "quick-access-notifications",
    emptyStateWidget: "no-quick-access-notifications",
    buildAttributes() {
      return {
        tabindex: -1
      };
    },
    markReadRequest() {
      return (0, _ajax.ajax)("/notifications/mark-read", {
        type: "PUT"
      });
    },
    newItemsLoaded() {
      if (!this.currentUser.enforcedSecondFactor) {
        this.currentUser.set("unread_notifications", 0);
      }
    },
    itemHtml(notification) {
      const notificationName = this.site.notificationLookup[notification.notification_type];
      return this.attach(`${(0, _string.dasherize)(notificationName)}-notification-item`, notification, {}, {
        fallbackWidgetName: "default-notification-item"
      });
    },
    findNewItems() {
      return this._findStaleItemsInStore().refresh();
    },
    showAllHref() {
      return `${this.attrs.path}/notifications`;
    },
    hasUnread() {
      return this.getItems().filterBy("read", false).length > 0;
    },
    _findStaleItemsInStore() {
      return this.store.findStale("notification", {
        recent: true,
        silent: this.currentUser.enforcedSecondFactor,
        limit: 30
      }, {
        cacheKey: "recent-notifications"
      });
    }
  });
});