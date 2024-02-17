define("discourse/initializers/populate-template-map", ["exports", "discourse-common/lib/discourse-template-map"], function (_exports, _discourseTemplateMap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/discourse-template-map"eaimeta@70e063a35619d71f
  var _default = {
    name: "populate-template-map",
    initialize() {
      _discourseTemplateMap.default.setModuleNames(Object.keys(requirejs.entries));
    }
  };
  _exports.default = _default;
});