define("discourse/plugins/discourse-cakeday/discourse/discourse-cakeday-route-map", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function _default() {
    this.route("cakeday", {
      path: "/cakeday",
      resetNamespace: true
    }, function () {
      this.route("birthdays", {
        path: "/birthdays"
      }, function () {
        this.route("today", {
          path: "/today"
        });
        this.route("tomorrow", {
          path: "/tomorrow"
        });
        this.route("upcoming", {
          path: "/upcoming"
        });
        this.route("all", {
          path: "/all"
        });
      });
      this.route("anniversaries", {
        path: "/anniversaries"
      }, function () {
        this.route("today", {
          path: "/today"
        });
        this.route("tomorrow", {
          path: "/tomorrow"
        });
        this.route("upcoming", {
          path: "/upcoming"
        });
        this.route("all", {
          path: "/all"
        });
      });
    });
  }
});