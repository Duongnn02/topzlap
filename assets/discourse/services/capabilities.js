define("discourse/services/capabilities", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service"eaimeta@70e063a35619d71f
  const APPLE_NAVIGATOR_PLATFORMS = /iPhone|iPod|iPad|Macintosh|MacIntel/;
  const APPLE_USER_AGENT_DATA_PLATFORM = /macOS/;

  // Lets us know about browser's capabilities
  class Capabilities extends _service.default {
    constructor() {
      super(...arguments);
      const ua = navigator.userAgent;
      this.touch = navigator.maxTouchPoints > 1 || "ontouchstart" in window;
      this.isAndroid = ua.includes("Android");
      this.isWinphone = ua.includes("Windows Phone");
      this.isIpadOS = ua.includes("Mac OS") && !/iPhone|iPod/.test(ua) && this.touch;
      this.isIOS = (/iPhone|iPod/.test(navigator.userAgent) || this.isIpadOS) && !window.MSStream;
      this.isApple = APPLE_NAVIGATOR_PLATFORMS.test(navigator.platform) || navigator.userAgentData && APPLE_USER_AGENT_DATA_PLATFORM.test(navigator.userAgentData.platform);
      this.isOpera = !!window.opera || ua.includes(" OPR/");
      this.isFirefox = ua.includes("Firefox");
      this.isChrome = !!window.chrome && !this.isOpera;
      this.isSafari = /Constructor/.test(window.HTMLElement) || window.safari?.pushNotification.toString() === "[object SafariRemoteNotification]";
      this.hasContactPicker = "contacts" in navigator && "ContactsManager" in window;
      this.canVibrate = "vibrate" in navigator;
      this.isPwa = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone || document.referrer.includes("android-app://");
      this.isiOSPWA = this.isPwa && this.isIOS;
      this.wasLaunchedFromDiscourseHub = window.location.search.includes("discourse_app=1");
      this.isAppWebview = window.ReactNativeWebView !== undefined;
    }
  }
  _exports.default = Capabilities;
});