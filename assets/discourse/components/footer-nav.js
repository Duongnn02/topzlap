define("discourse/components/footer-nav", ["exports", "discourse/lib/utilities", "discourse/mixins/mobile-scroll-direction", "discourse/components/mount-widget", "discourse/mixins/scrolling", "discourse-common/utils/decorators", "@ember/runloop"], function (_exports, _utilities, _mobileScrollDirection, _mountWidget, _scrolling, _decorators, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"discourse/mixins/mobile-scroll-direction",0,"discourse/components/mount-widget",0,"discourse/mixins/scrolling",0,"discourse-common/utils/decorators",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const MOBILE_SCROLL_DIRECTION_CHECK_THROTTLE = 150;
  const FooterNavComponent = _mountWidget.default.extend(_scrolling.default, _mobileScrollDirection.default, (_dec = (0, _decorators.observes)("mobileScrollDirection"), _dec2 = (0, _decorators.observes)("currentRouteIndex"), (_obj = {
    widget: "footer-nav",
    mobileScrollDirection: null,
    scrollEventDisabled: false,
    classNames: ["footer-nav", "visible"],
    routeHistory: [],
    currentRouteIndex: 0,
    canGoBack: false,
    canGoForward: false,
    backForwardClicked: null,
    buildArgs() {
      return {
        canGoBack: this.canGoBack,
        canGoForward: this.canGoForward
      };
    },
    didInsertElement() {
      this._super(...arguments);
      this.appEvents.on("page:changed", this, "_routeChanged");
      if (this.capabilities.isAppWebview) {
        this.appEvents.on("modal:body-shown", this, "_modalOn");
        this.appEvents.on("modal:body-dismissed", this, "_modalOff");
      }
      if (this.capabilities.isIpadOS) {
        document.body.classList.add("footer-nav-ipad");
      } else {
        this.bindScrolling();
        window.addEventListener("resize", this.scrolled, false);
        this.appEvents.on("composer:opened", this, "_composerOpened");
        this.appEvents.on("composer:closed", this, "_composerClosed");
        document.body.classList.add("footer-nav-visible");
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this.appEvents.off("page:changed", this, "_routeChanged");
      if (this.capabilities.isAppWebview) {
        this.appEvents.off("modal:body-shown", this, "_modalOn");
        this.appEvents.off("modal:body-removed", this, "_modalOff");
      }
      if (this.capabilities.isIpadOS) {
        document.body.classList.remove("footer-nav-ipad");
      } else {
        this.unbindScrolling();
        window.removeEventListener("resize", this.scrolled);
        this.appEvents.off("composer:opened", this, "_composerOpened");
        this.appEvents.off("composer:closed", this, "_composerClosed");
      }
    },
    // The user has scrolled the window, or it is finished rendering and ready for processing.
    scrolled() {
      if (this.isDestroyed || this.isDestroying || this._state !== "inDOM" || this.scrollEventDisabled) {
        return;
      }
      (0, _runloop.throttle)(this, this.calculateDirection, window.pageYOffset, MOBILE_SCROLL_DIRECTION_CHECK_THROTTLE);
    },
    toggleMobileFooter() {
      this.element.classList.toggle("visible", this.mobileScrollDirection === null ? true : false);
      document.body.classList.toggle("footer-nav-visible", this.mobileScrollDirection === null ? true : false);
    },
    _routeChanged(route) {
      // only update route history if not using back/forward nav
      if (this.backForwardClicked) {
        this.backForwardClicked = null;
        return;
      }
      this.routeHistory.push(route.url);
      this.set("currentRouteIndex", this.routeHistory.length);
      this.queueRerender();
    },
    _composerOpened() {
      this.set("mobileScrollDirection", "down");
      this.set("scrollEventDisabled", true);
    },
    _composerClosed() {
      this.set("mobileScrollDirection", null);
      this.set("scrollEventDisabled", false);
    },
    _modalOn() {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        (0, _utilities.postRNWebviewMessage)("headerBg", getComputedStyle(backdrop)["background-color"]);
      }
    },
    _modalOff() {
      const dheader = document.querySelector(".d-header");
      if (dheader) {
        (0, _utilities.postRNWebviewMessage)("headerBg", getComputedStyle(dheader)["background-color"]);
      }
    },
    goBack() {
      this.set("currentRouteIndex", this.currentRouteIndex - 1);
      this.backForwardClicked = true;
      window.history.back();
    },
    goForward() {
      this.set("currentRouteIndex", this.currentRouteIndex + 1);
      this.backForwardClicked = true;
      window.history.forward();
    },
    setBackForward() {
      let index = this.currentRouteIndex;
      this.set("canGoBack", index > 1 || document.referrer ? true : false);
      this.set("canGoForward", index < this.routeHistory.length ? true : false);
    }
  }, (_applyDecoratedDescriptor(_obj, "toggleMobileFooter", [_dec], Object.getOwnPropertyDescriptor(_obj, "toggleMobileFooter"), _obj), _applyDecoratedDescriptor(_obj, "setBackForward", [_dec2], Object.getOwnPropertyDescriptor(_obj, "setBackForward"), _obj)), _obj)));
  var _default = FooterNavComponent;
  _exports.default = _default;
});