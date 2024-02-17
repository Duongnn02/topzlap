define("discourse/helpers/bound-date", ["exports", "discourse/lib/formatter", "discourse-common/lib/helpers"], function (_exports, _formatter, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/formatter",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)(dt => (0, _formatter.autoUpdatingRelativeAge)(new Date(dt), {
    format: "medium",
    title: true
  }));
  _exports.default = _default;
});