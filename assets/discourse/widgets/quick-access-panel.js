define("discourse/widgets/quick-access-panel", ["exports", "I18n", "rsvp", "discourse/models/session", "discourse/widgets/widget", "virtual-dom", "discourse/lib/utilities"], function (_exports, _I18n, _rsvp, _session, _widget, _virtualDom, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"rsvp",0,"discourse/models/session",0,"discourse/widgets/widget",0,"virtual-dom",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  /**
   * This tries to enforce a consistent flow of fetching, caching, refreshing,
   * and rendering for "quick access items".
   *
   * There are parts to introducing a new quick access panel:
   * 1. A user menu link that sends a `quickAccess` action, with a unique `type`.
   * 2. A `quick-access-${type}` widget, extended from `quick-access-panel`.
   */
  var _default = (0, _widget.createWidget)("quick-access-panel", {
    tagName: "div.quick-access-panel",
    emptyStatePlaceholderItemKey: null,
    emptyStateWidget: null,
    settings: {
      viewAllLabel: null
    },
    buildKey: () => {
      throw Error('Cannot attach abstract widget "quick-access-panel".');
    },
    markReadRequest() {
      return _rsvp.Promise.resolve();
    },
    hideBottomItems() {
      return false;
    },
    hasUnread() {
      return false;
    },
    showAllHref() {
      return "";
    },
    findNewItems() {
      return _rsvp.Promise.resolve([]);
    },
    buildId() {
      return this.key;
    },
    buildAttributes() {
      const attributes = this.attrs;
      attributes["aria-labelledby"] = attributes.currentQuickAccess;
      attributes["tabindex"] = "0";
      attributes["role"] = "tabpanel";
      return attributes;
    },
    newItemsLoaded() {},
    itemHtml(item) {},
    // eslint-disable-line no-unused-vars

    emptyStatePlaceholderItem() {
      if (this.emptyStatePlaceholderItemKey) {
        return (0, _virtualDom.h)("li.read", _I18n.default.t(this.emptyStatePlaceholderItemKey));
      } else if (this.emptyStateWidget) {
        return this.attach(this.emptyStateWidget);
      } else {
        return "";
      }
    },
    defaultState() {
      return {
        items: [],
        loading: false,
        loaded: false
      };
    },
    markRead() {
      return this.markReadRequest().then(() => {
        this.refreshNotifications(this.state);
        (0, _utilities.postRNWebviewMessage)("markRead", "1");
      });
    },
    refreshNotifications(state) {
      if (state.loading) {
        return;
      }
      if (this.getItems().length === 0) {
        state.loading = true;
      }
      this.findNewItems().then(newItems => this.setItems(newItems)).catch(() => this.setItems([])).finally(() => {
        state.loading = false;
        state.loaded = true;
        this.newItemsLoaded();
        this.sendWidgetAction("itemsLoaded", {
          hasUnread: this.hasUnread(),
          markRead: () => this.markRead()
        });
        this.scheduleRerender();
      });
    },
    html(attrs, state) {
      if (!state.loaded) {
        this.refreshNotifications(state);
      }
      if (state.loading) {
        return [(0, _virtualDom.h)("div.spinner-container", (0, _virtualDom.h)("div.spinner"))];
      }
      const items = this.getItems().length ? this.getItems().map(item => this.itemHtml(item)) : [this.emptyStatePlaceholderItem()];
      let bottomItems = [];
      if (!this.hideBottomItems()) {
        const tab = _I18n.default.t(this.attrs.titleKey).toLowerCase();
        bottomItems.push(
        // intentionally a link so it can be ctrl clicked
        this.attach("link", {
          title: "view_all",
          titleOptions: {
            tab
          },
          icon: "chevron-down",
          label: this.settings.viewAllLabel,
          className: "btn btn-default btn-icon no-text show-all",
          "aria-label": "view_all",
          ariaLabelOptions: {
            tab
          },
          href: this.showAllHref()
        }));
      }
      if (this.hasUnread()) {
        bottomItems.push(this.attach("button", {
          title: "user.dismiss_notifications_tooltip",
          icon: "check",
          label: "user.dismiss",
          className: "btn btn-default notifications-dismiss",
          action: "dismissNotifications"
        }));
      }
      return [(0, _virtualDom.h)("ul", items), (0, _virtualDom.h)("div.panel-body-bottom", bottomItems)];
    },
    getItems() {
      return _session.default.currentProp(`${this.key}-items`) || [];
    },
    setItems(newItems) {
      _session.default.currentProp(`${this.key}-items`, newItems);
    }
  });
  _exports.default = _default;
});