define("discourse/plugins/docker_manager/discourse/docker-manager-route-map", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    resource: "admin",
    map() {
      this.route("upgrade", {
        resetNamespace: true,
        path: "upgrade"
      }, function () {
        this.route("processes");
        this.route("show", {
          path: "/:id"
        });
      });
    }
  };
  _exports.default = _default;
});