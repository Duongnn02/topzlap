define("discourse/helpers/page-reloader", ["exports", "discourse-common/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.reload = reload;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function reload() {
    if (!(0, _environment.isTesting)()) {
      location.reload();
    }
  }
});