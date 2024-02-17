define("discourse/lib/svg-sprite-loader", ["exports", "discourse/lib/load-script"], function (_exports, _loadScript) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.loadSprites = loadSprites;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/load-script"eaimeta@70e063a35619d71f
  const SVG_CONTAINER_ID = "svg-sprites";
  function loadSprites(spritePath, spriteName) {
    let spriteContainer = document.getElementById(SVG_CONTAINER_ID);
    if (!spriteContainer) {
      spriteContainer = document.createElement("div");
      spriteContainer.id = SVG_CONTAINER_ID;
      const spriteWrapper = document.querySelector("discourse-assets-icons");
      spriteWrapper?.appendChild(spriteContainer);
    }
    let sprites = spriteContainer.querySelector(`.${spriteName}`);
    if (!sprites) {
      sprites = document.createElement("div");
      sprites.className = spriteName;
      spriteContainer.appendChild(sprites);
    }
    (0, _loadScript.default)(spritePath).then(() => {
      sprites.innerHTML = window.__svg_sprite;
      // we got to clean up here... this is one giant string
      delete window.__svg_sprite;
    });
  }
});