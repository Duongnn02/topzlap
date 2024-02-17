define("discourse/lib/user-menu/tab", ["exports", "I18n"], function (_exports, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.CUSTOM_TABS_CLASSES = void 0;
  _exports.registerUserMenuTab = registerUserMenuTab;
  _exports.resetUserMenuTabs = resetUserMenuTabs;
  0; //eaimeta@70e063a35619d71f0,"I18n"eaimeta@70e063a35619d71f
  /**
   * abstract class representing a tab in the user menu
   */
  class UserMenuTab {
    constructor(currentUser, siteSettings, site) {
      this.currentUser = currentUser;
      this.siteSettings = siteSettings;
      this.site = site;
    }

    /**
     * @returns {boolean} Controls whether the tab should be rendered or not.
     */
    get shouldDisplay() {
      return true;
    }

    /**
     * @returns {number} Controls the blue badge (aka bubble) count that's rendered on top of the tab. If count is zero, no badge is shown.
     */
    get count() {
      return 0;
    }

    /**
     * @returns {string} title attribute for the tab element in the DOM
     */
    get title() {
      const id = this.id.replaceAll(/-/g, "_");
      const count = this.count;
      let key;
      if (this.count) {
        key = `user_menu.tabs.${id}_with_unread`;
      } else {
        key = `user_menu.tabs.${id}`;
      }
      // the lookup method returns undefined if the key doesn't exist.
      // this ensures that don't use the "missing translation" string as the
      // title for tabs that don't define title in the yml files.
      if (_I18n.default.lookup(key)) {
        return _I18n.default.t(key, {
          count
        });
      }
    }

    /**
     * @returns {Component} Component class that should be rendered in the panel area when the tab is active.
     */
    get panelComponent() {
      throw new Error("not implemented");
    }

    /**
     * @returns {string} ID for the tab. Must be unique across all visible tabs.
     */
    get id() {
      throw new Error("not implemented");
    }

    /**
     * @returns {string} Icon for the tab.
     */
    get icon() {
      throw new Error("not implemented");
    }

    /**
     * @returns {Array} Notification types displayed in tab. Those notifications will be removed from "other" tab.
     */
    get notificationTypes() {}
    getUnreadCountForType(type) {
      const key = `grouped_unread_notifications.${this.site.notification_types[type]}`;
      // we're retrieving the value with get() so that Ember tracks the property
      // and re-renders the UI when it changes.
      // we can stop using `get()` when the User model is refactored into native
      // class with @tracked properties.

      // TODO: remove old key fallback after plugins PRs are merged
      // https://github.com/discourse/discourse-chat/pull/1208
      // https://github.com/discourse/discourse-assign/pull/373
      const oldKey = `grouped_unread_high_priority_notifications.${this.site.notification_types[type]}`;
      return this.currentUser.get(key) || this.currentUser.get(oldKey) || 0;
    }
  }
  _exports.default = UserMenuTab;
  const CUSTOM_TABS_CLASSES = [];
  _exports.CUSTOM_TABS_CLASSES = CUSTOM_TABS_CLASSES;
  function registerUserMenuTab(func) {
    CUSTOM_TABS_CLASSES.push(func(UserMenuTab));
  }
  function resetUserMenuTabs() {
    CUSTOM_TABS_CLASSES.length = 0;
  }
});