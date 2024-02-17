define("discourse/services/document-title", ["exports", "@ember/service", "discourse-common/lib/get-url", "discourse/lib/update-tab-count"], function (_exports, _service, _getUrl, _updateTabCount) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"discourse-common/lib/get-url",0,"discourse/lib/update-tab-count"eaimeta@70e063a35619d71f
  var _default = _service.default.extend({
    appEvents: (0, _service.inject)(),
    currentUser: (0, _service.inject)(),
    contextCount: null,
    notificationCount: null,
    _title: null,
    _backgroundNotify: null,
    init() {
      this._super(...arguments);
      this.reset();
    },
    reset() {
      this.contextCount = 0;
      this.notificationCount = 0;
      this._title = null;
      this._backgroundNotify = null;
    },
    getTitle() {
      return this._title;
    },
    setTitle(title) {
      this._title = title;
      this._renderTitle();
    },
    setFocus(focus) {
      let {
        session
      } = this;
      session.hasFocus = focus;
      if (session.hasFocus && this._backgroundNotify) {
        this.updateContextCount(0);
      }
      this._backgroundNotify = false;
      if (session.hasFocus) {
        this.notificationCount = 0;
      }
      this.appEvents.trigger("discourse:focus-changed", session.hasFocus);
      this._renderFavicon();
      this._renderTitle();
    },
    updateContextCount(count) {
      this.contextCount = count;
      this._renderTitle();
    },
    updateNotificationCount(count) {
      let {
        forced = false
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.session.hasFocus || forced) {
        this.notificationCount = count;
        this._renderFavicon();
        this._renderTitle();
      }
    },
    incrementBackgroundContextCount() {
      if (!this.session.hasFocus) {
        this._backgroundNotify = true;
        this.contextCount += 1;
        this._renderFavicon();
        this._renderTitle();
      }
    },
    _displayCount() {
      return this.currentUser && this.currentUser.user_option.title_count_mode === "notifications" ? this.notificationCount : this.contextCount;
    },
    _renderTitle() {
      let title = this._title || this.siteSettings.title;
      let displayCount = this._displayCount();
      let dynamicFavicon = this.currentUser?.user_option.dynamic_favicon;
      if (this.currentUser?.isInDoNotDisturb()) {
        document.title = title;
        return;
      }
      if (displayCount > 0 && !dynamicFavicon) {
        title = `(${displayCount}) ${title}`;
      }
      document.title = title;
    },
    _renderFavicon() {
      if (this.currentUser?.user_option.dynamic_favicon) {
        let url = this.siteSettings.site_favicon_url;

        // Since the favicon is cached on the browser for a really long time, we
        // append the favicon_url as query params to the path so that the cache
        // is not used when the favicon changes.
        if (/^http/.test(url)) {
          url = (0, _getUrl.default)("/favicon/proxied?" + encodeURIComponent(url));
        }
        (0, _updateTabCount.default)(url, this._displayCount());
      }
    }
  });
  _exports.default = _default;
});