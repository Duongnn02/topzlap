define("select-kit/components/group-chooser", ["exports", "select-kit/components/multi-select"], function (_exports, _multiSelect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/multi-select"eaimeta@70e063a35619d71f
  var _default = _multiSelect.default.extend({
    pluginApiIdentifiers: ["group-chooser"],
    classNames: ["group-chooser"],
    selectKitOptions: {
      allowAny: false
    }
  });
  _exports.default = _default;
});