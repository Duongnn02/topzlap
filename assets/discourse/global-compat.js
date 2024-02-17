define("discourse/global-compat", ["virtual-dom", "discourse-widget-hbs/helpers"], function (_virtualDom, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"virtual-dom",0,"discourse-widget-hbs/helpers"eaimeta@70e063a35619d71f
  window.__widget_helpers = _helpers.default;

  // TODO: Eliminate this global
  window.virtualDom = _virtualDom.default;
});