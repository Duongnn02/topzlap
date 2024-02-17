define("discourse/lib/mobile", ["exports", "discourse-common/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.forceMobile = forceMobile;
  _exports.resetMobile = resetMobile;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  let mobileForced = false;

  //  An object that is responsible for logic related to mobile devices.
  const Mobile = {
    isMobileDevice: false,
    mobileView: false,
    init() {
      const $html = $("html");
      this.isMobileDevice = mobileForced || $html.hasClass("mobile-device");
      this.mobileView = mobileForced || $html.hasClass("mobile-view");
      if ((0, _environment.isTesting)() || mobileForced) {
        return;
      }
      try {
        if (window.location.search.match(/mobile_view=1/)) {
          localStorage.mobileView = true;
        }
        if (window.location.search.match(/mobile_view=0/)) {
          localStorage.mobileView = false;
        }
        if (window.location.search.match(/mobile_view=auto/)) {
          localStorage.removeItem("mobileView");
        }
        if (localStorage.mobileView) {
          let savedValue = localStorage.mobileView === "true";
          if (savedValue !== this.mobileView) {
            this.reloadPage(savedValue);
          }
        }
      } catch (err) {
        // localStorage may be disabled, just skip this
        // you get security errors if it is disabled
      }
    },
    toggleMobileView() {
      try {
        if (localStorage) {
          localStorage.mobileView = !this.mobileView;
        }
      } catch (err) {
        // localStorage may be disabled, skip
      }
      this.reloadPage(!this.mobileView);
    },
    reloadPage(mobile) {
      window.location.assign(window.location.pathname + "?mobile_view=" + (mobile ? "1" : "0"));
    }
  };
  function forceMobile() {
    mobileForced = true;
  }
  function resetMobile() {
    mobileForced = false;
  }
  var _default = Mobile;
  _exports.default = _default;
});