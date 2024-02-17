define("discourse/components/site-header", ["exports", "discourse/mixins/pan-events", "@ember/runloop", "discourse-common/lib/later", "discourse/mixins/docking", "discourse/components/mount-widget", "@discourse/itsatrap", "discourse/mixins/rerender-on-do-not-disturb-change", "discourse-common/utils/decorators", "discourse/components/topic-title", "discourse-common/config/environment", "@ember/test"], function (_exports, _panEvents, _runloop, _later, _docking, _mountWidget, _itsatrap, _rerenderOnDoNotDisturbChange, _decorators, _topicTitle, _environment, _test) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/mixins/pan-events",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/mixins/docking",0,"discourse/components/mount-widget",0,"@discourse/itsatrap",0,"discourse/mixins/rerender-on-do-not-disturb-change",0,"discourse-common/utils/decorators",0,"discourse/components/topic-title",0,"discourse-common/config/environment",0,"@glimmer/env",0,"@ember/test"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const SiteHeaderComponent = _mountWidget.default.extend(_docking.default, _panEvents.default, _rerenderOnDoNotDisturbChange.default, (_dec = (0, _decorators.observes)("currentUser.unread_notifications", "currentUser.unread_high_priority_notifications", "currentUser.all_unread_notifications_count", "currentUser.reviewable_count",
  // TODO: remove this when redesigned_user_menu_enabled is removed
  "currentUser.unseen_reviewable_count", "session.defaultColorSchemeIsDark", "session.darkModeAvailable"), _dec2 = (0, _decorators.observes)("site.narrowDesktopView"), (_obj = {
    widget: "header",
    docAt: null,
    dockedHeader: null,
    _animate: false,
    _isPanning: false,
    _panMenuOrigin: "right",
    _panMenuOffset: 0,
    _scheduledRemoveAnimate: null,
    _topic: null,
    _itsatrap: null,
    _applicationElement: null,
    notificationsChanged() {
      this.queueRerender();
    },
    narrowDesktopViewChanged() {
      this.eventDispatched("dom:clean", "header");
      if (this._dropDownHeaderEnabled()) {
        this.appEvents.on("sidebar-hamburger-dropdown:rendered", this, "_animateMenu");
      }
    },
    _animateOpening(panel) {
      let waiter;
      if (false /* DEBUG */ && (0, _environment.isTesting)()) {
        waiter = () => false;
        (0, _test.registerWaiter)(waiter);
      }
      window.requestAnimationFrame(() => {
        this._setAnimateOpeningProperties(panel);
        if (false /* DEBUG */ && (0, _environment.isTesting)()) {
          (0, _test.unregisterWaiter)(waiter);
        }
      });
    },
    _setAnimateOpeningProperties(panel) {
      const headerCloak = document.querySelector(".header-cloak");
      panel.classList.add("animate");
      headerCloak.classList.add("animate");
      this._scheduledRemoveAnimate = (0, _later.default)(() => {
        panel.classList.remove("animate");
        headerCloak.classList.remove("animate");
      }, 200);
      panel.style.setProperty("--offset", 0);
      headerCloak.style.setProperty("--opacity", 0.5);
      this._panMenuOffset = 0;
    },
    _animateClosing(panel, menuOrigin) {
      this._animate = true;
      const headerCloak = document.querySelector(".header-cloak");
      panel.classList.add("animate");
      headerCloak.classList.add("animate");
      if (menuOrigin === "left") {
        panel.style.setProperty("--offset", `-100vw`);
      } else {
        panel.style.setProperty("--offset", `100vw`);
      }
      headerCloak.style.setProperty("--opacity", 0);
      this._scheduledRemoveAnimate = (0, _later.default)(() => {
        panel.classList.remove("animate");
        headerCloak.classList.remove("animate");
        (0, _runloop.schedule)("afterRender", () => {
          this.eventDispatched("dom:clean", "header");
          this._panMenuOffset = 0;
        });
      }, 200);
    },
    _isRTL() {
      return document.querySelector("html").classList["direction"] === "rtl";
    },
    _leftMenuClass() {
      return this._isRTL() ? "user-menu" : "hamburger-panel";
    },
    _handlePanDone(event) {
      const menuPanels = document.querySelectorAll(".menu-panel");
      const menuOrigin = this._panMenuOrigin;
      menuPanels.forEach(panel => {
        panel.classList.remove("moving");
        if (this._shouldMenuClose(event, menuOrigin)) {
          this._animateClosing(panel, menuOrigin);
        } else {
          this._animateOpening(panel);
        }
      });
    },
    _shouldMenuClose(e, menuOrigin) {
      // menu should close after a pan either:
      // if a user moved the panel closed past a threshold and away and is NOT swiping back open
      // if a user swiped to close fast enough regardless of distance
      if (menuOrigin === "right") {
        return e.deltaX > _panEvents.SWIPE_DISTANCE_THRESHOLD && e.velocityX > -_panEvents.SWIPE_VELOCITY_THRESHOLD || e.velocityX > 0;
      } else {
        return e.deltaX < -_panEvents.SWIPE_DISTANCE_THRESHOLD && e.velocityX < _panEvents.SWIPE_VELOCITY_THRESHOLD || e.velocityX < 0;
      }
    },
    panStart(e) {
      const center = e.center;
      const panOverValidElement = document.elementsFromPoint(center.x, center.y).some(ele => ele.classList.contains("panel-body") || ele.classList.contains("header-cloak"));
      if (panOverValidElement && (e.direction === "left" || e.direction === "right")) {
        e.originalEvent.preventDefault();
        this._isPanning = true;
        const panel = document.querySelector(".menu-panel");
        if (panel) {
          panel.classList.add("moving");
        }
      } else {
        this._isPanning = false;
      }
    },
    panEnd(e) {
      if (!this._isPanning) {
        return;
      }
      this._isPanning = false;
      this._handlePanDone(e);
    },
    panMove(e) {
      if (!this._isPanning) {
        return;
      }
      const panel = document.querySelector(".menu-panel");
      const headerCloak = document.querySelector(".header-cloak");
      if (this._panMenuOrigin === "right") {
        const pxClosed = Math.min(0, -e.deltaX + this._panMenuOffset);
        panel.style.setProperty("--offset", `${-pxClosed}px`);
        headerCloak.style.setProperty("--opacity", Math.min(0.5, (300 + pxClosed) / 600));
      } else {
        const pxClosed = Math.min(0, e.deltaX + this._panMenuOffset);
        panel.style.setProperty("--offset", `${pxClosed}px`);
        headerCloak.style.setProperty("--opacity", Math.min(0.5, (300 + pxClosed) / 600));
      }
    },
    dockCheck() {
      const header = this.header;
      if (this.docAt === null) {
        if (!header) {
          return;
        }
        this.docAt = header.offsetTop;
      }
      const main = this._applicationElement ??= document.querySelector(".ember-application");
      const offsetTop = main ? main.offsetTop : 0;
      const offset = window.pageYOffset - offsetTop;
      if (offset >= this.docAt) {
        if (!this.dockedHeader) {
          document.body.classList.add("docked");
          this.dockedHeader = true;
        }
      } else {
        if (this.dockedHeader) {
          document.body.classList.remove("docked");
          this.dockedHeader = false;
        }
      }
    },
    setTopic(topic) {
      this.eventDispatched("dom:clean", "header");
      this._topic = topic;
      this.queueRerender();
    },
    willRender() {
      if (this.get("currentUser.staff")) {
        document.body.classList.add("staff");
      }
    },
    didInsertElement() {
      this._super(...arguments);
      this._resizeDiscourseMenuPanel = () => this.afterRender();
      window.addEventListener("resize", this._resizeDiscourseMenuPanel);
      this.appEvents.on("header:show-topic", this, "setTopic");
      this.appEvents.on("header:hide-topic", this, "setTopic");
      if (this.currentUser?.redesigned_user_menu_enabled) {
        this.appEvents.on("user-menu:rendered", this, "_animateMenu");
      }
      if (this._dropDownHeaderEnabled()) {
        this.appEvents.on("sidebar-hamburger-dropdown:rendered", this, "_animateMenu");
      }
      this.dispatch("notifications:changed", "user-notifications");
      this.dispatch("header:keyboard-trigger", "header");
      this.dispatch("user-menu:navigation", "user-menu");
      this.appEvents.on("dom:clean", this, "_cleanDom");
      if (this.currentUser) {
        this.currentUser.on("status-changed", this, "queueRerender");
      }
      const header = document.querySelector("header.d-header");
      this._itsatrap = new _itsatrap.default(header);
      const dirs = this.currentUser?.redesigned_user_menu_enabled ? ["up", "down"] : ["right", "left"];
      this._itsatrap.bind(dirs, e => this._handleArrowKeysNav(e));
    },
    _handleArrowKeysNav(event) {
      if (this.currentUser?.redesigned_user_menu_enabled) {
        const activeTab = document.querySelector(".menu-tabs-container .btn.active");
        if (activeTab) {
          let activeTabNumber = Number(document.activeElement.dataset.tabNumber || activeTab.dataset.tabNumber);
          const maxTabNumber = document.querySelectorAll(".menu-tabs-container .btn").length - 1;
          const isNext = event.key === "ArrowDown";
          let nextTab = isNext ? activeTabNumber + 1 : activeTabNumber - 1;
          if (isNext && nextTab > maxTabNumber) {
            nextTab = 0;
          }
          if (!isNext && nextTab < 0) {
            nextTab = maxTabNumber;
          }
          event.preventDefault();
          document.querySelector(`.menu-tabs-container .btn[data-tab-number='${nextTab}']`).focus();
        }
      } else {
        const activeTab = document.querySelector(".glyphs .menu-link.active");
        if (activeTab) {
          let focusedTab = document.activeElement;
          if (!focusedTab.dataset.tabNumber) {
            focusedTab = activeTab;
          }
          this.appEvents.trigger("user-menu:navigation", {
            key: event.key,
            tabNumber: Number(focusedTab.dataset.tabNumber)
          });
        }
      }
    },
    _cleanDom() {
      // For performance, only trigger a re-render if any menu panels are visible
      if (this.element.querySelector(".menu-panel")) {
        this.eventDispatched("dom:clean", "header");
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      window.removeEventListener("resize", this._resizeDiscourseMenuPanel);
      this.appEvents.off("header:show-topic", this, "setTopic");
      this.appEvents.off("header:hide-topic", this, "setTopic");
      this.appEvents.off("dom:clean", this, "_cleanDom");
      if (this.currentUser?.redesigned_user_menu_enabled) {
        this.appEvents.off("user-menu:rendered", this, "_animateMenu");
      }
      if (this._dropDownHeaderEnabled()) {
        this.appEvents.off("sidebar-hamburger-dropdown:rendered", this, "_animateMenu");
      }
      if (this.currentUser) {
        this.currentUser.off("status-changed", this, "queueRerender");
      }
      (0, _runloop.cancel)(this._scheduledRemoveAnimate);
      this._itsatrap?.destroy();
      this._itsatrap = null;
    },
    buildArgs() {
      return {
        topic: this._topic,
        canSignUp: this.canSignUp,
        sidebarEnabled: this.sidebarEnabled,
        showSidebar: this.showSidebar,
        navigationMenuQueryParamOverride: this.navigationMenuQueryParamOverride
      };
    },
    afterRender() {
      const headerTitle = document.querySelector(".header-title .topic-link");
      if (headerTitle && this._topic) {
        _topicTitle.topicTitleDecorators.forEach(cb => cb(this._topic, headerTitle, "header-title"));
      }
      this._animateMenu();
    },
    _animateMenu() {
      const menuPanels = document.querySelectorAll(".menu-panel");
      if (menuPanels.length === 0) {
        this._animate = this.site.mobileView || this.site.narrowDesktopView;
        return;
      }
      const viewMode = this.site.mobileView || this.site.narrowDesktopView ? "slide-in" : "drop-down";
      menuPanels.forEach(panel => {
        const headerCloak = document.querySelector(".header-cloak");
        let width = parseInt(panel.getAttribute("data-max-width"), 10) || 300;
        if (this._panMenuOffset) {
          this._panMenuOffset = -width;
        }
        panel.classList.remove("drop-down");
        panel.classList.remove("slide-in");
        panel.classList.add(viewMode);
        if (this._animate || this._panMenuOffset !== 0) {
          if ((this.site.mobileView || this.site.narrowDesktopView) && panel.parentElement.classList.contains(this._leftMenuClass())) {
            this._panMenuOrigin = "left";
            panel.style.setProperty("--offset", `-100vw`);
          } else {
            this._panMenuOrigin = "right";
            panel.style.setProperty("--offset", `100vw`);
          }
          headerCloak.style.setProperty("--opacity", 0);
        }
        if (viewMode === "slide-in") {
          headerCloak.style.display = "block";
        }
        if (this._animate) {
          this._animateOpening(panel);
        }
        this._animate = false;
      });
    },
    _dropDownHeaderEnabled() {
      return !this.sidebarEnabled && this.siteSettings.navigation_menu !== "legacy" || this.site.narrowDesktopView;
    }
  }, (_applyDecoratedDescriptor(_obj, "notificationsChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "notificationsChanged"), _obj), _applyDecoratedDescriptor(_obj, "narrowDesktopViewChanged", [_dec2], Object.getOwnPropertyDescriptor(_obj, "narrowDesktopViewChanged"), _obj)), _obj)));
  var _default = SiteHeaderComponent.extend({
    classNames: ["d-header-wrap"],
    classNameBindings: ["site.mobileView::drop-down-mode"],
    headerWrap: null,
    header: null,
    init() {
      this._super(...arguments);
      this._resizeObserver = null;
    },
    didInsertElement() {
      this._super(...arguments);
      this.appEvents.on("site-header:force-refresh", this, "queueRerender");
      this.headerWrap = document.querySelector(".d-header-wrap");
      if (this.headerWrap) {
        (0, _runloop.schedule)("afterRender", () => {
          this.header = this.headerWrap.querySelector("header.d-header");
          const headerOffset = this.headerWrap.offsetHeight;
          const headerTop = this.header.offsetTop;
          document.documentElement.style.setProperty("--header-offset", `${headerOffset}px`);
          document.documentElement.style.setProperty("--header-top", `${headerTop}px`);
        });
      }
      if ("ResizeObserver" in window) {
        this._resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            if (entry.contentRect) {
              const headerOffset = entry.contentRect.height;
              const headerTop = this.header.offsetTop;
              document.documentElement.style.setProperty("--header-offset", `${headerOffset}px`);
              document.documentElement.style.setProperty("--header-top", `${headerTop}px`);
            }
          }
        });
        this._resizeObserver.observe(this.headerWrap);
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this._resizeObserver?.disconnect();
      this.appEvents.off("site-header:force-refresh", this, "queueRerender");
    }
  });
  _exports.default = _default;
});