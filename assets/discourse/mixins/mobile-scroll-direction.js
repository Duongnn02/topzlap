define("discourse/mixins/mobile-scroll-direction", ["exports", "@ember/object/mixin", "discourse-common/lib/debounce"], function (_exports, _mixin, _debounce) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"discourse-common/lib/debounce"eaimeta@70e063a35619d71f
  // Small buffer so that very tiny scrolls don't trigger mobile header switch
  const MOBILE_SCROLL_TOLERANCE = 5;
  var _default = _mixin.default.create({
    _lastScroll: null,
    _bottomHit: 0,
    calculateDirection(offset) {
      // Difference between this scroll and the one before it.
      const delta = Math.floor(offset - this._lastScroll);

      // This is a tiny scroll, so we ignore it.
      if (delta <= MOBILE_SCROLL_TOLERANCE && delta >= -MOBILE_SCROLL_TOLERANCE) {
        return;
      }

      // don't calculate when resetting offset (i.e. going to /latest or to next topic in suggested list)
      if (offset === 0) {
        return;
      }
      const prevDirection = this.mobileScrollDirection;
      const currDirection = delta > 0 ? "down" : null;
      const distanceToBottom = Math.floor($("body").height() - offset - $(window).height());

      // Handle Safari top overscroll first
      if (offset < 0) {
        this.set("mobileScrollDirection", null);
      } else if (currDirection !== prevDirection && distanceToBottom > 0) {
        this.set("mobileScrollDirection", currDirection);
      }

      // We store this to compare against it the next time the user scrolls
      this._lastScroll = Math.floor(offset);

      // Not at the bottom yet
      if (distanceToBottom > 0) {
        this._bottomHit = 0;
        return;
      }

      // If the user reaches the very bottom of the topic, we only want to reset
      // this scroll direction after a second scroll down. This is a nicer event
      // similar to what Safari and Chrome do.
      (0, _debounce.default)(this, this._setBottomHit, 1000);
      if (this._bottomHit === 1) {
        this.set("mobileScrollDirection", null);
      }
    },
    _setBottomHit() {
      this._bottomHit = 1;
    }
  });
  _exports.default = _default;
});