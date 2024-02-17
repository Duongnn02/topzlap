define("discourse/initializers/eager-load-raw-templates", ["exports", "discourse-common/lib/raw-templates"], function (_exports, _rawTemplates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-templates"eaimeta@70e063a35619d71f
  var _default = {
    name: "eager-load-raw-templates",
    initialize() {
      (0, _rawTemplates.eagerLoadRawTemplateModules)();
    }
  };
  _exports.default = _default;
});