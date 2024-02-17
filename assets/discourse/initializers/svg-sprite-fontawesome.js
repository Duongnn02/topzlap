define("discourse/initializers/svg-sprite-fontawesome", ["exports", "discourse/lib/svg-sprite-loader"], function (_exports, _svgSpriteLoader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/svg-sprite-loader"eaimeta@70e063a35619d71f
  var _default = {
    name: "svg-sprite-fontawesome",
    after: "export-application-global",
    initialize(container) {
      const session = container.lookup("service:session");
      if (session.svgSpritePath) {
        (0, _svgSpriteLoader.loadSprites)(session.svgSpritePath, "fontawesome");
      }
    }
  };
  _exports.default = _default;
});