define("discourse-common/utils/dom-utils", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function offset(element) {
    // note that getBoundingClientRect forces a reflow.
    // When used in critical performance conditions
    // you might want to move to more involved solution
    // such as implementing an IntersectionObserver and
    // using its boundingClientRect property
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };
  }
  function position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }
  var _default = {
    offset,
    position
  };
  _exports.default = _default;
});