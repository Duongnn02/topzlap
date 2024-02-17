define("discourse/components/header-extra-info", ["exports", "discourse-common/lib/deprecated"], function (_exports, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.needsSecondRowIf = needsSecondRowIf;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  function needsSecondRowIf() {
    (0, _deprecated.default)("`needsSecondRowIf` is deprecated. Use widget hooks on `header-second-row`", {
      id: "discourse.header-extra-info.needs-second-row-if"
    });
  }
});