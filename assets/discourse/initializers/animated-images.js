define("discourse/initializers/animated-images", ["exports", "discourse-common/lib/icon-library", "discourse/lib/utilities", "discourse/lib/plugin-api"], function (_exports, _iconLibrary, _utilities, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/icon-library",0,"discourse/lib/utilities",0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  let _gifClickHandlers = {};
  function _pauseAnimation(img) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
    canvas.setAttribute("aria-hidden", "true");
    canvas.setAttribute("role", "presentation");
    if (opts.manualPause) {
      img.classList.add("manually-paused");
    }
    img.parentNode.classList.add("paused-animated-image");
    img.parentNode.insertBefore(canvas, img);
  }
  function _resumeAnimation(img) {
    if (img.previousSibling && img.previousSibling.nodeName === "CANVAS") {
      img.previousSibling.remove();
    }
    img.parentNode.classList.remove("paused-animated-image");
  }
  function animatedImgs() {
    return document.querySelectorAll("img.animated:not(.manually-paused)");
  }
  var _default = {
    name: "animated-images-pause-on-click",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.7", api => {
        function _cleanUp() {
          Object.values(_gifClickHandlers || {}).forEach(handler => {
            handler.removeEventListener("click", _handleEvent);
            handler.removeEventListener("load", _handleEvent);
          });
          _gifClickHandlers = {};
        }
        function _handleEvent(event) {
          const img = event.target;
          if (img && !img.previousSibling) {
            _pauseAnimation(img, {
              manualPause: true
            });
          } else {
            _resumeAnimation(img);
          }
        }
        function _attachCommands(post, helper) {
          if (!helper) {
            return;
          }
          let images = post.querySelectorAll("img.animated");
          images.forEach(img => {
            // skip for edge case of multiple animated images in same block
            if (img.parentNode.querySelectorAll("img").length > 1) {
              return;
            }
            if (_gifClickHandlers[img.src]) {
              _gifClickHandlers[img.src].removeEventListener("click", _handleEvent);
              _gifClickHandlers[img.src].removeEventListener("load", _handleEvent);
              delete _gifClickHandlers[img.src];
            }
            _gifClickHandlers[img.src] = img;
            img.addEventListener("click", _handleEvent, false);
            if ((0, _utilities.prefersReducedMotion)()) {
              img.addEventListener("load", _handleEvent, false);
            }
            const wrapper = document.createElement("div"),
              overlay = document.createElement("div");
            img.parentNode.insertBefore(wrapper, img);
            wrapper.classList.add("pausable-animated-image");
            wrapper.appendChild(img);
            overlay.classList.add("animated-image-overlay");
            overlay.setAttribute("aria-hidden", "true");
            overlay.setAttribute("role", "presentation");
            overlay.innerHTML = `${(0, _iconLibrary.iconHTML)("pause")}${(0, _iconLibrary.iconHTML)("play")}`;
            wrapper.appendChild(overlay);
          });
        }
        api.decorateCookedElement(_attachCommands, {
          onlyStream: true,
          id: "animated-images-pause-on-click"
        });
        api.cleanupStream(_cleanUp);

        // paused on load when prefers-reduced-motion is active, no need for blur/focus events
        if (!(0, _utilities.prefersReducedMotion)()) {
          window.addEventListener("blur", this.blurEvent);
          window.addEventListener("focus", this.focusEvent);
        }
      });
    },
    blurEvent() {
      animatedImgs().forEach(img => {
        if (img.parentNode.querySelectorAll("img").length === 1 && !img.previousSibling) {
          _pauseAnimation(img);
        }
      });
    },
    focusEvent() {
      animatedImgs().forEach(img => {
        if (img.parentNode.querySelectorAll("img").length === 1 && img.previousSibling) {
          _resumeAnimation(img);
        }
      });
    },
    teardown() {
      window.removeEventListener("blur", this.blurEvent);
      window.removeEventListener("focus", this.focusEvent);
    }
  };
  _exports.default = _default;
});