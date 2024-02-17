define("discourse/mixins/scrolling", ["exports", "@ember/object/mixin", "@ember/runloop", "@ember/service"], function (_exports, _mixin, _runloop, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.ScrollingDOMMethods = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"@ember/runloop",0,"@ember/service"eaimeta@70e063a35619d71f
  /**
    This object provides the DOM methods we need for our Mixin to bind to scrolling
    methods in the browser. By removing them from the Mixin we can test them
    easier.
  **/
  const ScrollingDOMMethods = {
    bindOnScroll(onScrollMethod) {
      document.addEventListener("touchmove", onScrollMethod, {
        passive: true
      });
      window.addEventListener("scroll", onScrollMethod, {
        passive: true
      });
    },
    unbindOnScroll(onScrollMethod) {
      document.removeEventListener("touchmove", onScrollMethod);
      window.removeEventListener("scroll", onScrollMethod);
    },
    screenNotFull() {
      return window.height > document.querySelector(".ember-application").offsetHeight;
    }
  };
  _exports.ScrollingDOMMethods = ScrollingDOMMethods;
  const Scrolling = _mixin.default.create({
    router: (0, _service.inject)(),
    // Begin watching for scroll events. By default they will be called at max every 100ms.
    // call with {throttle: N} to change the throttle spacing
    bindScrolling() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!opts.throttle) {
        opts.throttle = 100;
      }
      // So we can not call the scrolled event while transitioning. There is no public API for this :'(
      const microLib = this.router._router._routerMicrolib;
      let scheduleScrolled = () => {
        if (microLib.activeTransition) {
          return;
        }
        return (0, _runloop.scheduleOnce)("afterRender", this, "scrolled");
      };
      let onScrollMethod;
      if (opts.throttle) {
        onScrollMethod = () => (0, _runloop.throttle)(this, scheduleScrolled, opts.throttle, false);
      } else {
        onScrollMethod = scheduleScrolled;
      }
      this._scrollingMixinOnScrollMethod = onScrollMethod;
      ScrollingDOMMethods.bindOnScroll(onScrollMethod);
    },
    screenNotFull: () => ScrollingDOMMethods.screenNotFull(),
    unbindScrolling() {
      ScrollingDOMMethods.unbindOnScroll(this._scrollingMixinOnScrollMethod);
    }
  });
  var _default = Scrolling;
  _exports.default = _default;
});