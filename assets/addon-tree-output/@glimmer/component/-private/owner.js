define("@glimmer/component/-private/owner", ["exports", "@ember/application"], function (_exports, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "setOwner", {
    enumerable: true,
    get: function () {
      return _application.setOwner;
    }
  });
});