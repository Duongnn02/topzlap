define("discourse/controllers/application", ["exports", "@ember/controller", "discourse-common/utils/decorators", "discourse-common/lib/debounce", "@ember/service", "@ember/object"], function (_exports, _controller, _decorators, _debounce, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"discourse-common/lib/debounce",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const HIDE_SIDEBAR_KEY = "sidebar-hidden";
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("navigationMenuQueryParamOverride", "siteSettings.navigation_menu", "canDisplaySidebar", "sidebarDisabledRouteOverride"), (_obj = {
    queryParams: [{
      navigationMenuQueryParamOverride: "navigation_menu"
    }],
    showTop: true,
    showFooter: false,
    router: (0, _service.inject)(),
    showSidebar: false,
    navigationMenuQueryParamOverride: null,
    sidebarDisabledRouteOverride: false,
    showSiteHeader: true,
    init() {
      this._super(...arguments);
      this.showSidebar = this.calculateShowSidebar();
    },
    canSignUp() {
      return !this.siteSettings.invite_only && this.siteSettings.allow_new_registrations && !this.siteSettings.enable_discourse_connect;
    },
    canDisplaySidebar() {
      return this.currentUser || !this.siteSettings.login_required;
    },
    loginRequired() {
      return this.siteSettings.login_required && !this.currentUser;
    },
    showFooterNav() {
      return this.capabilities.isAppWebview || this.capabilities.isiOSPWA;
    },
    _mainOutletAnimate() {
      document.querySelector("body").classList.remove("sidebar-animate");
    },
    sidebarEnabled(navigationMenuQueryParamOverride, navigationMenu, canDisplaySidebar, sidebarDisabledRouteOverride) {
      if (!canDisplaySidebar) {
        return false;
      }
      if (sidebarDisabledRouteOverride) {
        return false;
      }
      if (navigationMenuQueryParamOverride === "sidebar") {
        return true;
      }
      if (navigationMenuQueryParamOverride === "legacy" || navigationMenuQueryParamOverride === "header_dropdown") {
        return false;
      }

      // Always return dropdown on mobile
      if (this.site.mobileView) {
        return false;
      }
      return navigationMenu === "sidebar";
    },
    calculateShowSidebar() {
      return this.canDisplaySidebar && !this.keyValueStore.getItem(HIDE_SIDEBAR_KEY) && !this.site.narrowDesktopView;
    },
    toggleSidebar() {
      // enables CSS transitions, but not on did-insert
      document.querySelector("body").classList.add("sidebar-animate");
      (0, _debounce.default)(this, this._mainOutletAnimate, 250);
      this.toggleProperty("showSidebar");
      if (this.site.desktopView) {
        if (this.showSidebar) {
          this.keyValueStore.removeItem(HIDE_SIDEBAR_KEY);
        } else {
          this.keyValueStore.setItem(HIDE_SIDEBAR_KEY, "true");
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "canSignUp", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "canSignUp"), _obj), _applyDecoratedDescriptor(_obj, "canDisplaySidebar", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "canDisplaySidebar"), _obj), _applyDecoratedDescriptor(_obj, "loginRequired", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "loginRequired"), _obj), _applyDecoratedDescriptor(_obj, "showFooterNav", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "showFooterNav"), _obj), _applyDecoratedDescriptor(_obj, "sidebarEnabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "sidebarEnabled"), _obj), _applyDecoratedDescriptor(_obj, "toggleSidebar", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleSidebar"), _obj)), _obj)));
  _exports.default = _default;
});