define("discourse/widgets/header", ["exports", "@ember/template-factory", "discourse/lib/url", "I18n", "discourse/helpers/user-avatar", "discourse/widgets/post", "discourse/widgets/widget", "discourse-common/lib/get-url", "virtual-dom", "discourse-common/lib/icon-library", "@ember/runloop", "discourse/mixins/scroll-top", "discourse/lib/intercept-click", "discourse/lib/search", "discourse/widgets/render-glimmer", "discourse/lib/user-tips"], function (_exports, _templateFactory, _url, _I18n, _userAvatar, _post, _widget, _getUrl, _virtualDom, _iconLibrary, _runloop, _scrollTop, _interceptClick, _search, _renderGlimmer, _userTips) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addToHeaderIcons = addToHeaderIcons;
  _exports.attachAdditionalPanel = attachAdditionalPanel;
  _exports.clearExtraHeaderIcons = clearExtraHeaderIcons;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"I18n",0,"discourse/helpers/user-avatar",0,"discourse/widgets/post",0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"@ember/runloop",0,"discourse/mixins/scroll-top",0,"discourse/lib/intercept-click",0,"discourse/lib/search",0,"discourse/widgets/render-glimmer",0,"ember-cli-htmlbars",0,"discourse/lib/user-tips"eaimeta@70e063a35619d71f
  let _extraHeaderIcons = [];
  function addToHeaderIcons(icon) {
    _extraHeaderIcons.push(icon);
  }
  function clearExtraHeaderIcons() {
    _extraHeaderIcons = [];
  }
  const dropdown = {
    buildClasses(attrs) {
      let classes = attrs.classNames || [];
      if (attrs.active) {
        classes.push("active");
      }
      return classes;
    },
    click(e) {
      if ((0, _interceptClick.wantsNewWindow)(e)) {
        return;
      }
      e.preventDefault();
      if (!this.attrs.active) {
        this.sendWidgetAction(this.attrs.action);
      }
    }
  };
  (0, _widget.createWidget)("header-notifications", {
    settings: {
      avatarSize: "medium"
    },
    html(attrs) {
      const {
        user
      } = attrs;
      let avatarAttrs = {
        template: user.get("avatar_template"),
        username: user.get("username")
      };
      if (this.siteSettings.enable_names) {
        avatarAttrs.name = user.get("name");
      }
      const contents = [(0, _post.avatarImg)(this.settings.avatarSize, Object.assign({
        alt: "user.avatar.header_title"
      }, (0, _userAvatar.addExtraUserClasses)(user, avatarAttrs)))];
      if (this.currentUser.status) {
        contents.push(this.attach("user-status-bubble", this.currentUser.status));
      }
      if (user.isInDoNotDisturb()) {
        contents.push((0, _virtualDom.h)("div.do-not-disturb-background", (0, _iconLibrary.iconNode)("moon")));
      } else {
        if (this.currentUser.redesigned_user_menu_enabled) {
          let ringClass = null;
          if (user.new_personal_messages_notifications_count) {
            ringClass = "personal-messages";
            contents.push(this.attach("link", {
              action: attrs.action,
              className: "badge-notification with-icon new-pms",
              icon: "envelope",
              omitSpan: true,
              title: "notifications.tooltip.new_message_notification",
              titleOptions: {
                count: user.new_personal_messages_notifications_count
              },
              attributes: {
                "aria-label": _I18n.default.t("notifications.tooltip.new_message_notification", {
                  count: user.new_personal_messages_notifications_count
                })
              }
            }));
          } else if (user.unseen_reviewable_count) {
            contents.push(this.attach("link", {
              action: attrs.action,
              className: "badge-notification with-icon new-reviewables",
              icon: "flag",
              omitSpan: true,
              title: "notifications.tooltip.new_reviewable",
              titleOptions: {
                count: user.unseen_reviewable_count
              },
              attributes: {
                "aria-label": _I18n.default.t("notifications.tooltip.new_reviewable", {
                  count: user.unseen_reviewable_count
                })
              }
            }));
          } else if (user.all_unread_notifications_count) {
            ringClass = "regular-notifications";
            contents.push(this.attach("link", {
              action: attrs.action,
              className: "badge-notification unread-notifications",
              rawLabel: user.all_unread_notifications_count,
              omitSpan: true,
              title: "notifications.tooltip.regular",
              titleOptions: {
                count: user.all_unread_notifications_count
              },
              attributes: {
                "aria-label": _I18n.default.t("user.notifications")
              }
            }));
          }
          if (ringClass && this._shouldHighlightAvatar()) {
            contents.push((0, _virtualDom.h)(`span.ring.revamped.${ringClass}`));
          }
        } else {
          const unreadNotifications = user.unread_notifications;
          if (!!unreadNotifications) {
            contents.push(this.attach("link", {
              action: attrs.action,
              className: "badge-notification unread-notifications",
              rawLabel: unreadNotifications,
              omitSpan: true,
              title: "notifications.tooltip.regular",
              titleOptions: {
                count: unreadNotifications
              }
            }));
          }
          const unreadHighPriority = user.unread_high_priority_notifications;
          if (!!unreadHighPriority) {
            if (this._shouldHighlightAvatar()) {
              contents.push((0, _virtualDom.h)("span.ring"));
            }

            // add the counter for the unread high priority
            contents.push(this.attach("link", {
              action: attrs.action,
              className: "badge-notification unread-high-priority-notifications",
              rawLabel: unreadHighPriority,
              omitSpan: true,
              title: "notifications.tooltip.high_priority",
              titleOptions: {
                count: unreadHighPriority
              }
            }));
          }
        }
      }
      return contents;
    },
    _shouldHighlightAvatar() {
      const attrs = this.attrs;
      const {
        user
      } = attrs;
      return !user.read_first_notification && !user.enforcedSecondFactor && !attrs.active;
    },
    didRenderWidget() {
      if (!this.currentUser || !this._shouldHighlightAvatar()) {
        return;
      }
      this.currentUser.showUserTip({
        id: "first_notification",
        titleText: _I18n.default.t("user_tips.first_notification.title"),
        contentText: _I18n.default.t("user_tips.first_notification.content"),
        reference: document.querySelector(".d-header .badge-notification")?.parentElement?.querySelector(".avatar"),
        appendTo: document.querySelector(".d-header .panel"),
        placement: "bottom-end"
      });
    },
    destroy() {
      (0, _userTips.hideUserTip)("first_notification");
    },
    willRerenderWidget() {
      (0, _userTips.hideUserTip)("first_notification");
    }
  });
  (0, _widget.createWidget)("user-dropdown", Object.assign({
    tagName: "li.header-dropdown-toggle.current-user",
    buildId() {
      return "current-user";
    },
    html(attrs) {
      return (0, _virtualDom.h)("button.icon.btn-flat", {
        attributes: {
          "aria-haspopup": true,
          "aria-expanded": attrs.active,
          href: attrs.user.path,
          title: attrs.user.name || attrs.user.username,
          "data-auto-route": true
        }
      }, this.attach("header-notifications", attrs));
    }
  }, dropdown));
  (0, _widget.createWidget)("header-dropdown", Object.assign({
    tagName: "li.header-dropdown-toggle",
    html(attrs) {
      const title = _I18n.default.t(attrs.title);
      const body = [(0, _iconLibrary.iconNode)(attrs.icon)];
      if (attrs.contents) {
        body.push(attrs.contents.call(this));
      }
      return (0, _virtualDom.h)("button.icon.btn-flat", {
        attributes: {
          "aria-expanded": attrs.active,
          "aria-haspopup": true,
          href: attrs.href,
          "data-auto-route": true,
          title,
          "aria-label": title,
          id: attrs.iconId
        }
      }, body);
    }
  }, dropdown));
  (0, _widget.createWidget)("header-icons", {
    tagName: "ul.icons.d-header-icons",
    html(attrs) {
      if (this.siteSettings.login_required && !this.currentUser) {
        return [];
      }
      const icons = [];
      if (_extraHeaderIcons) {
        _extraHeaderIcons.forEach(icon => {
          icons.push(this.attach(icon));
        });
      }
      const search = this.attach("header-dropdown", {
        title: "search.title",
        icon: "search",
        iconId: "search-button",
        action: "toggleSearchMenu",
        active: attrs.searchVisible,
        href: (0, _getUrl.default)("/search"),
        classNames: ["search-dropdown"]
      });
      icons.push(search);
      const hamburger = this.attach("header-dropdown", {
        title: "hamburger_menu",
        icon: "bars",
        iconId: "toggle-hamburger-menu",
        active: attrs.hamburgerVisible,
        action: "toggleHamburger",
        href: "",
        classNames: ["hamburger-dropdown"],
        contents() {
          let {
            currentUser
          } = this;
          if (currentUser?.reviewable_count && this.siteSettings.navigation_menu === "legacy") {
            return (0, _virtualDom.h)("div.badge-notification.reviewables", {
              attributes: {
                title: _I18n.default.t("notifications.reviewable_items")
              }
            }, this.currentUser.reviewable_count);
          }
        }
      });
      if (!attrs.sidebarEnabled || this.site.mobileView) {
        icons.push(hamburger);
      }
      if (attrs.user) {
        icons.push(this.attach("user-dropdown", {
          active: attrs.userVisible,
          action: "toggleUserMenu",
          user: attrs.user
        }));
      }
      return icons;
    }
  });
  (0, _widget.createWidget)("header-buttons", {
    tagName: "span.header-buttons",
    html(attrs) {
      if (this.currentUser) {
        return;
      }
      const buttons = [];
      if (attrs.canSignUp && !attrs.topic) {
        buttons.push(this.attach("button", {
          label: "sign_up",
          className: "btn-primary btn-small sign-up-button",
          action: "showCreateAccount"
        }));
      }
      buttons.push(this.attach("button", {
        label: "log_in",
        className: "btn-primary btn-small login-button",
        action: "showLogin",
        icon: "user"
      }));
      return buttons;
    }
  });
  (0, _widget.createWidget)("header-cloak", {
    tagName: "div.header-cloak",
    html() {
      return "";
    },
    click() {},
    scheduleRerender() {}
  });
  let additionalPanels = [];
  function attachAdditionalPanel(name, toggle, transformAttrs) {
    additionalPanels.push({
      name,
      toggle,
      transformAttrs
    });
  }
  (0, _widget.createWidget)("revamped-hamburger-menu-wrapper", {
    buildAttributes() {
      return {
        "data-click-outside": true
      };
    },
    html() {
      return [new _renderGlimmer.default(this, "div.widget-component-connector", (0, _templateFactory.createTemplateFactory)(
      /*
        <Sidebar::HamburgerDropdown />
      */
      {
        "id": "9LsCSALK",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"sidebar/hamburger-dropdown\"]]",
        "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/widgets/header.js",
        "isStrictMode": false
      }))];
    },
    click(event) {
      if (event.target.closest(".sidebar-section-header-button") || event.target.closest(".sidebar-section-link")) {
        this.sendWidgetAction("toggleHamburger");
      }
    },
    clickOutside() {
      this.sendWidgetAction("toggleHamburger");
    }
  });
  (0, _widget.createWidget)("revamped-user-menu-wrapper", {
    buildAttributes() {
      return {
        "data-click-outside": true
      };
    },
    html() {
      return [new _renderGlimmer.default(this, "div.widget-component-connector", (0, _templateFactory.createTemplateFactory)(
      /*
        <UserMenu::Menu @closeUserMenu={{@data.closeUserMenu}} />
      */
      {
        "id": "EiNDEokP",
        "block": "[[[8,[39,0],null,[[\"@closeUserMenu\"],[[30,1,[\"closeUserMenu\"]]]],null]],[\"@data\"],false,[\"user-menu/menu\"]]",
        "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/widgets/header.js",
        "isStrictMode": false
      }), {
        closeUserMenu: this.closeUserMenu.bind(this)
      })];
    },
    closeUserMenu() {
      this.sendWidgetAction("toggleUserMenu");
    },
    clickOutside() {
      this.closeUserMenu();
    }
  });
  var _default = (0, _widget.createWidget)("header", {
    tagName: "header.d-header.clearfix",
    buildKey: () => `header`,
    services: ["router", "search"],
    defaultState() {
      let states = {
        searchVisible: false,
        hamburgerVisible: false,
        userVisible: false,
        inTopicContext: false
      };
      if (this.site.mobileView) {
        states.skipSearchContext = true;
      }
      return states;
    },
    html(attrs, state) {
      let inTopicRoute = false;
      if (this.state.inTopicContext) {
        inTopicRoute = this.router.currentRouteName.startsWith("topic.");
      }
      let contents = () => {
        const headerIcons = this.attach("header-icons", {
          hamburgerVisible: state.hamburgerVisible,
          userVisible: state.userVisible,
          searchVisible: state.searchVisible,
          flagCount: attrs.flagCount,
          user: this.currentUser,
          sidebarEnabled: attrs.sidebarEnabled
        });
        if (attrs.onlyIcons) {
          return headerIcons;
        }
        const panels = [this.attach("header-buttons", attrs), headerIcons];
        if (state.searchVisible) {
          panels.push(this.attach("search-menu", {
            inTopicContext: state.inTopicContext && inTopicRoute
          }));
        } else if (state.hamburgerVisible) {
          if (attrs.navigationMenuQueryParamOverride === "header_dropdown" || attrs.navigationMenuQueryParamOverride !== "legacy" && this.siteSettings.navigation_menu !== "legacy" && (!attrs.sidebarEnabled || this.site.narrowDesktopView)) {
            panels.push(this.attach("revamped-hamburger-menu-wrapper", {}));
          } else {
            panels.push(this.attach("hamburger-menu"));
          }
        } else if (state.userVisible) {
          if (this.currentUser.redesigned_user_menu_enabled) {
            panels.push(this.attach("revamped-user-menu-wrapper", {}));
          } else {
            panels.push(this.attach("user-menu"));
          }
        }
        additionalPanels.map(panel => {
          if (this.state[panel.toggle]) {
            panels.push(this.attach(panel.name, panel.transformAttrs.call(this, attrs, state)));
          }
        });
        if (this.site.mobileView || this.site.narrowDesktopView) {
          panels.push(this.attach("header-cloak"));
        }
        return panels;
      };
      const contentsAttrs = {
        contents,
        minimized: !!attrs.topic
      };
      return (0, _virtualDom.h)("div.wrap", this.attach("header-contents", Object.assign({}, attrs, contentsAttrs)));
    },
    updateHighlight() {
      if (!this.state.searchVisible) {
        this.search.set("highlightTerm", "");
      }
    },
    closeAll() {
      this.state.userVisible = false;
      this.state.hamburgerVisible = false;
      this.state.searchVisible = false;
      this.toggleBodyScrolling(false);
    },
    linkClickedEvent(attrs) {
      let searchContextEnabled = false;
      if (attrs) {
        searchContextEnabled = attrs.searchContextEnabled;
        const {
          searchLogId,
          searchResultId,
          searchResultType
        } = attrs;
        if (searchLogId && searchResultId && searchResultType) {
          (0, _search.logSearchLinkClick)({
            searchLogId,
            searchResultId,
            searchResultType
          });
        }
      }
      if (!searchContextEnabled) {
        this.closeAll();
      }
      this.updateHighlight();
    },
    toggleSearchMenu() {
      if (this.site.mobileView) {
        const context = this.search.searchContext;
        let params = "";
        if (context) {
          params = `?context=${context.type}&context_id=${context.id}&skip_context=${this.state.skipSearchContext}`;
        }
        if (this.router.currentRouteName === "full-page-search") {
          (0, _scrollTop.scrollTop)();
          $(".full-page-search").focus();
          return false;
        } else {
          return _url.default.routeTo("/search" + params);
        }
      }
      this.state.searchVisible = !this.state.searchVisible;
      this.updateHighlight();
      if (this.state.searchVisible) {
        this.focusSearchInput();
      } else {
        this.state.inTopicContext = false;
      }
    },
    toggleUserMenu() {
      this.state.userVisible = !this.state.userVisible;
      this.toggleBodyScrolling(this.state.userVisible);

      // auto focus on first button in dropdown
      (0, _runloop.schedule)("afterRender", () => document.querySelector(".user-menu button")?.focus());
    },
    toggleHamburger() {
      if (this.siteSettings.navigation_menu !== "legacy" && this.attrs.sidebarEnabled && !this.site.narrowDesktopView) {
        this.sendWidgetAction("toggleSidebar");
      } else {
        this.state.hamburgerVisible = !this.state.hamburgerVisible;
        this.toggleBodyScrolling(this.state.hamburgerVisible);
        (0, _runloop.schedule)("afterRender", () => {
          if (this.siteSettings.navigation_menu !== "legacy") {
            // Remove focus from hamburger toggle button
            document.querySelector("#toggle-hamburger-menu")?.blur();
          } else {
            // auto focus on first link in dropdown
            document.querySelector(".hamburger-panel .menu-links a")?.focus();
          }
        });
      }
    },
    toggleBodyScrolling(bool) {
      if (!this.site.mobileView) {
        return;
      }
      if (bool) {
        document.body.addEventListener("touchmove", this.preventDefault, {
          passive: false
        });
      } else {
        document.body.removeEventListener("touchmove", this.preventDefault, {
          passive: false
        });
      }
    },
    preventDefault(e) {
      const windowHeight = window.innerHeight;

      // allow profile menu tabs to scroll if they're taller than the window
      if (e.target.closest(".menu-panel .menu-tabs-container")) {
        const topTabs = document.querySelector(".menu-panel .top-tabs");
        const bottomTabs = document.querySelector(".menu-panel .bottom-tabs");
        const profileTabsHeight = topTabs?.offsetHeight + bottomTabs?.offsetHeight || 0;
        if (profileTabsHeight > windowHeight) {
          return;
        }
      }

      // allow menu panels to scroll if contents are taller than the window
      if (e.target.closest(".menu-panel")) {
        const menuContentHeight = document.querySelector(".menu-panel .panel-body-contents").offsetHeight || 0;
        if (menuContentHeight > windowHeight) {
          return;
        }
      }
      e.preventDefault();
    },
    togglePageSearch() {
      const {
        state
      } = this;
      state.inTopicContext = false;
      let showSearch = this.router.currentRouteName.startsWith("topic.");

      // If we're viewing a topic, only intercept search if there are cloaked posts
      if (showSearch) {
        const controller = this.register.lookup("controller:topic");
        const total = controller.get("model.postStream.stream.length") || 0;
        const chunkSize = controller.get("model.chunk_size") || 0;
        showSearch = total > chunkSize && $(".topic-post .cooked, .small-action:not(.time-gap)").length < total;
      }
      if (state.searchVisible) {
        this.toggleSearchMenu();
        return showSearch;
      }
      if (showSearch) {
        state.inTopicContext = true;
        this.toggleSearchMenu();
        return false;
      }
      return true;
    },
    domClean() {
      const {
        state
      } = this;
      if (state.searchVisible || state.hamburgerVisible || state.userVisible) {
        this.closeAll();
      }
    },
    headerKeyboardTrigger(msg) {
      switch (msg.type) {
        case "search":
          this.toggleSearchMenu();
          break;
        case "user":
          this.toggleUserMenu();
          break;
        case "hamburger":
          this.toggleHamburger();
          break;
        case "page-search":
          if (!this.togglePageSearch()) {
            msg.event.preventDefault();
            msg.event.stopPropagation();
          }
          break;
      }
    },
    focusSearchInput() {
      if (this.state.searchVisible) {
        (0, _runloop.schedule)("afterRender", () => {
          const searchInput = document.querySelector("#search-term");
          searchInput.focus();
          searchInput.select();
        });
      }
    },
    setTopicContext() {
      this.state.inTopicContext = true;
      this.focusSearchInput();
    },
    clearContext() {
      this.state.inTopicContext = false;
      this.focusSearchInput();
    }
  });
  _exports.default = _default;
});