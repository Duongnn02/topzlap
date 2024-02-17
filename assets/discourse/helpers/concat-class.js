define("discourse/helpers/concat-class", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  function concatClass(args) {
    const classes = args.compact().join(" ");
    return classes.length ? classes : undefined;
  }
  var _default = (0, _helper.helper)(concatClass);
  _exports.default = _default;
});