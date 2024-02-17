define("discourse/initializers/mobile-keyboard", ["exports", "discourse-common/utils/decorators"], function (_exports, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = (_obj = {
    name: "mobile-keyboard",
    after: "mobile",
    initialize(container) {
      const site = container.lookup("service:site");
      this.capabilities = container.lookup("service:capabilities");
      if (!this.capabilities.isIpadOS && !site.mobileView) {
        return;
      }
      if (!window.visualViewport) {
        return;
      }

      // TODO: Handle device rotation?
      this.windowInnerHeight = window.innerHeight;
      this.onViewportResize();
      window.visualViewport.addEventListener("resize", this.onViewportResize);
      if ("virtualKeyboard" in navigator) {
        navigator.virtualKeyboard.overlaysContent = true;
        navigator.virtualKeyboard.addEventListener("geometrychange", this.onViewportResize);
      }
    },
    teardown() {
      window.visualViewport.removeEventListener("resize", this.onViewportResize);
      if ("virtualKeyboard" in navigator) {
        navigator.virtualKeyboard.overlaysContent = false;
        navigator.virtualKeyboard.removeEventListener("geometrychange", this.onViewportResize);
      }
    },
    onViewportResize() {
      const composerVH = window.visualViewport.height * 0.01,
        doc = document.documentElement,
        KEYBOARD_DETECT_THRESHOLD = 150;
      doc.style.setProperty("--composer-vh", `${composerVH}px`);
      let keyboardVisible = false;
      if ("virtualKeyboard" in navigator) {
        if (navigator.virtualKeyboard.boundingRect.height > 0) {
          keyboardVisible = true;
        }
      } else if (this.capabilities.isFirefox && this.capabilities.isAndroid) {
        if (Math.abs(this.windowInnerHeight - Math.min(window.innerHeight, window.visualViewport.height)) > KEYBOARD_DETECT_THRESHOLD) {
          keyboardVisible = true;
        }
      } else {
        let viewportWindowDiff = this.windowInnerHeight - window.visualViewport.height;
        if (viewportWindowDiff > 0) {
          keyboardVisible = true;
        }

        // adds bottom padding when using a hardware keyboard and the accessory bar is visible
        // accessory bar height is 55px, using 75 allows a small buffer
        if (this.capabilities.isIpadOS) {
          doc.style.setProperty("--composer-ipad-padding", `${viewportWindowDiff < 75 ? viewportWindowDiff : 0}px`);
        }
      }
      keyboardVisible ? doc.classList.add("keyboard-visible") : doc.classList.remove("keyboard-visible");
    }
  }, (_applyDecoratedDescriptor(_obj, "onViewportResize", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onViewportResize"), _obj)), _obj);
  _exports.default = _default;
});