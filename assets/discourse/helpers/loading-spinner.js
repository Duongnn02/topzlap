define("discourse/helpers/loading-spinner", ["exports", "discourse-common/lib/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.renderSpinner = renderSpinner;
  _exports.spinnerHTML = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  function renderSpinner(cssClass) {
    let html = "<div class='spinner";
    if (cssClass) {
      html += " " + cssClass;
    }
    return html + "'></div>";
  }
  let spinnerHTML = renderSpinner();
  _exports.spinnerHTML = spinnerHTML;
  var _default = (0, _helpers.htmlHelper)(params => {
    const hash = params.hash;
    return renderSpinner(hash && hash.size ? hash.size : undefined);
  });
  _exports.default = _default;
});