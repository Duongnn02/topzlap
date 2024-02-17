define("discourse/initializers/image-aspect-ratio", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  // Browsers automatically calculate an aspect ratio based on the width/height attributes of an `<img`.
  // HOWEVER that aspect ratio only applies while the image is loading. Once loaded, it'll use the
  // image's actual dimensions. This can cause things to jump around after loading. For example:
  //  - if a user deliberately inserts false width/height
  //  - the image fails to load (404)
  //  - an optimised image is a few pixels different, due to a rounding when resizing
  //
  // This decorator explicitly sets the `aspect-ratio` property so that things are consistent throughout
  // the lifetime of all `<img` elements.
  var _default = {
    name: "image-aspect-ratio",
    initWithApi(api) {
      const supportsAspectRatio = CSS.supports("aspect-ratio: 1");
      api.decorateCookedElement(element => {
        element.querySelectorAll("img").forEach(img => {
          const declaredHeight = parseFloat(img.getAttribute("height"));
          const declaredWidth = parseFloat(img.getAttribute("width"));
          if (isNaN(declaredHeight) || isNaN(declaredWidth) || img.style.aspectRatio) {
            return;
          }
          if (supportsAspectRatio) {
            img.style.setProperty("aspect-ratio", `${declaredWidth} / ${declaredHeight}`);
          } else {
            // For older browsers (e.g. iOS < 15), we need to apply the aspect ratio manually.
            // It's not perfect, because it won't recompute on browser resize.
            // This property is consumed in `topic-post.scss` for responsive images only.
            // It's a no-op for non-responsive images.
            const calculatedHeight = img.width / (declaredWidth / declaredHeight);
            img.style.setProperty("--calculated-height", `${calculatedHeight}px`);
          }
        });
      }, {
        id: "image-aspect-ratio"
      });
    },
    initialize() {
      (0, _pluginApi.withPluginApi)("1.2.0", this.initWithApi);
    }
  };
  _exports.default = _default;
});